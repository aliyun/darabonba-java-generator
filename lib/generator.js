'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const DSL = require('@darabonba/parser');
const xml2js = require('xml2js');
const Entities = require('html-entities').XmlEntities;
const Annotation = require('@darabonba/annotation-parser');

const REQUEST = 'request_';
const RESPONSE = 'response_';
const RUNTIME = 'runtime_';
const {
  _name,
  _type,
  _escape,
  _string,
  _lowerFirst,
  _subModelName,
  remove,
  _upperFirst,
  md2Html,
  _doc
} = require('./helper');

function collectionType(name) {
  if (name === 'Object') {
    return '?';
  }
  return name;
}

function shouldChange(pomVersion, importVersion) {
  if (pomVersion.indexOf(',') > 0) {
    return false;
  }
  try {
    var sourceVersion = pomVersion.split('.');
    var targetVersion = importVersion.split('.');
    if (parseInt(sourceVersion[0]) < parseInt(targetVersion[0])) {
      return true;
    }
    if (parseInt(sourceVersion[1]) < parseInt(targetVersion[1])) {
      return true;
    }
    if (parseInt(sourceVersion[2]) < parseInt(targetVersion[2])) {
      return true;
    }
  } catch (error) {
    // empty
  }
  return false;
}

function avoidReserveName(name) {
  const reserves = [
    'public'
  ];

  if (reserves.indexOf(name) !== -1) {
    return `${name}_`;
  }

  return name;
}

function render(template, params = {}) {
  const needParamsKeys = ['description', 'url',
    'licenseName', 'developerId',
    'licenseUrl', 'developerName',
    'developerEmail', 'scmConnection',
    'scmDeveloperConnection', 'scmUrl', 'groupId',
    'artifactId', 'version'
  ];
  needParamsKeys.forEach(key => {
    if (params[key] === undefined) {
      params[key] = '';
    }
  });
  if (params) {
    Object.keys(params).forEach((key) => {
      template = template.split('${' + key + '}').join(params[key]);
    });
  }
  return template;
}

function getAttr(node, attrName) {
  for (let i = 0; i < node.attrs.length; i++) {
    if (_name(node.attrs[i].attrName) === attrName) {
      return node.attrs[i].attrValue.string || node.attrs[i].attrValue.lexeme || node.attrs[i].attrValue.value;
    }
  }
}

function parse(xml) {
  return new Promise((resolve, reject) => {
    xml2js.parseString(xml, function (err, result) {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
}

class Visitor {
  constructor(option = {}) {
    const javaPackage = option && option.package;
    if (!javaPackage) {
      throw new Error('Darafile -> java -> javaPackage should not empty, please add java option into Darafile.example:\n' +
        '"java": {"package": "com.aliyun.test"}');
    }

    this.pomOutputDir = option.outputDir;
    option.outputDir = path.join(option.outputDir, 'src/main/java', javaPackage.split('.').join('/'));
    if (option.java) {
      this.className = option.java.className;
      this.implements = option.java.implements;
      this.NoException = option.java.NoException;
    }
    this.baseClient = option && option.baseClient || javaPackage + '.BaseClient';
    this.package = javaPackage;
    this.packageInfo = option.java.packageInfo;
    this.packageManager = option.java.packageManager;
    this.config = Object.assign({
      outputDir: '',
      indent: '    ',
      clientPath: 'Client.java'
    }, option);
    this.output = '';
    this.outputDir = this.config.outputDir;
    this.exec = option.exec;
    this.editable = option.editable;
    this.enableMinimizeModelName = option.enableMinimizeModelName || option.java.enableMinimizeModelName;
    this.typedef = option.java.typedef || {};
    if (!this.outputDir) {
      throw new Error('Darafile -> java -> javaPackage should not empty, please add java option into Darafile.example:\n' +
        '"java": {"package": "com.aliyun.test"}');
    }

    fs.mkdirSync(this.outputDir, {
      recursive: true
    });

    this.conflictModelNameMap = {};
    this.allModleNameMap = {};

    remove(path.join(this.outputDir, 'models/'));
  }

  visit(ast, level = 0) {
    this.usedExternModel = ast.usedExternModel;
    this.conflictModels = ast.conflictModels;
    this.visitModule(ast, level);
  }

  emit(str, level) {
    this.output += this.config.indent.repeat(level) + str;
  }

  save(filepath) {
    const targetPath = path.join(this.outputDir, filepath);
    fs.mkdirSync(path.dirname(targetPath), {
      recursive: true
    });

    fs.writeFileSync(targetPath, this.output);
    this.output = '';
  }

  visitWhile(ast, level) {
    assert.equal(ast.type, 'while');
    this.emit('\n');
    this.emit('while (', level);
    this.visitExpr(ast.condition, level + 1);
    this.emit(') {\n');
    this.visitStmts(ast.stmts, level + 1);
    this.emit('}\n', level);
  }

  visitFor(ast, level) {
    assert.equal(ast.type, 'for');
    this.emit(`for (`, level);
    this.visitType(ast.list.inferred.itemType);
    this.emit(` ${_name(ast.id)} : `);
    this.visitExpr(ast.list, level + 1);
    this.emit(') {\n');
    this.visitStmts(ast.stmts, level + 1);
    this.emit('}\n', level);
  }

  visitInterface(functions, apis, level) {
    this.emit(`package ${this.package};\n\n`);
    this.emit(`import ${this.package}.models.*;\n\n`);
    this.emit(`public interface ${this.implements} {\n\n`);
    this.visitApiInterface(apis, level + 1);
    this.visitFunctionInterface(functions, level + 1);
    this.emit('}');
    this.save(this.implements + '.java');
  }

  async visitPom() {
    var entities = new Entities();
    var targetFile = this.pomOutputDir + '/pom.xml';
    let pomName = '/pom.xml';
    if (this.exec) {
      pomName = '/pomWithMain.xml';
    }
    var pomFile;
    var dependenciesClass = [];
    var havePom = false;
    if (fs.existsSync(targetFile)) {
      havePom = true;
      pomFile = fs.readFileSync(targetFile);
    } else {
      pomFile = fs.readFileSync(path.join(__dirname, pomName));
    }
    Object.keys(this.typedef).forEach((type) => {
      if (!dependenciesClass.includes(this.typedef[type].package)) {
        dependenciesClass.push(this.typedef[type].package);
      }
    });
    Object.keys(this.imports).forEach((key) => {
      dependenciesClass.push(this.imports[key].release);
      let moduleTypedef = this.imports[key].typedef || {};
      Object.keys(moduleTypedef).forEach((type) => {
        if (!dependenciesClass.includes(moduleTypedef[type].package)) {
          dependenciesClass.push(moduleTypedef[type].package);
        }
      });
    });
    const json = await parse(pomFile);
    var needAddDependencies = [];
    if (!havePom) {
      json.project.dependencies = { dependency: [] };
      dependenciesClass.push('com.aliyun:tea:1.1.14');
      dependenciesClass.forEach((value) => {
        if (value) {
          let dependency = value.split(':');
          var dependencyObject = {};
          dependencyObject.groupId = dependency[0];
          dependencyObject.artifactId = dependency[1];
          dependencyObject.version = dependency[2];
          json.project.dependencies.dependency.push(dependencyObject);
        }
      });
    } else {
      dependenciesClass.forEach((value) => {
        if (value) {
          let needAdd = true;
          let dependency = value.split(':');
          var dependencyObject = {};
          dependencyObject.groupId = dependency[0];
          dependencyObject.artifactId = dependency[1];
          dependencyObject.version = dependency[2];
          json.project.dependencies[0].dependency.forEach((dependency) => {
            if (dependency.artifactId[0] === dependencyObject.artifactId) {
              if (shouldChange(dependency.version[0], dependencyObject.version)) {
                dependency.version[0] = dependencyObject.version;
              }
              needAdd = false;
            }
          });
          if (needAdd) {
            needAddDependencies.push(dependencyObject);
          }

        }
      });
      needAddDependencies.forEach((value) => {
        json.project.dependencies[0].dependency.push(value);
      });
    }
    const builder = new xml2js.Builder();
    pomFile = builder.buildObject(json);
    const newJson = await parse(pomFile);
    needAddDependencies = [];
    Object.keys(this.packageManager || {}).forEach((value) => {
      let needAdd = true;
      let dependency = value.split(':');
      var dependencyObject = {};
      dependencyObject.groupId = dependency[0];
      dependencyObject.artifactId = dependency[1];
      dependencyObject.version = this.packageManager[`${dependency[0]}:${dependency[1]}`];
      newJson.project.dependencies[0].dependency.forEach((dependency) => {
        if (dependency.groupId[0] === dependencyObject.groupId
          && dependency.artifactId[0] === dependencyObject.artifactId) {
          dependency.version[0] = dependencyObject.version;
          needAdd = false;
        }
      });
      if (needAdd) {
        needAddDependencies.push(dependencyObject);
      }
    });
    needAddDependencies.forEach((value) => {
      newJson.project.dependencies[0].dependency.push(value);
    });
    let newPom = builder.buildObject(newJson);
    if (this.exec) {
      let mainClassPath = this.package + '.' + (this.className || 'Client');
      newPom = newPom.split('${mainClass}').join(mainClassPath);
    }
    newPom = render(newPom, this.packageInfo);
    fs.writeFileSync(targetFile, entities.decode(newPom));
  }

  visitModule(ast, level) {
    assert.equal(ast.type, 'module');

    const nonStaticWraps = ast.moduleBody.nodes.filter((item) => {
      return item.type === 'function' && !item.isStatic;
    });
    const apis = ast.moduleBody.nodes.filter((item) => {
      return item.type === 'api';
    });
    const models = ast.moduleBody.nodes.filter((item) => {
      return item.type === 'model';
    });
    const types = ast.moduleBody.nodes.filter((item) => {
      return item.type === 'type';
    });
    const init = ast.moduleBody.nodes.filter((item) => {
      return item.type === 'init';
    });
    this.comments = ast.comments;
    var extendParam = {};
    if (nonStaticWraps.length > 0 || apis.length > 0) {
      extendParam.writeConstruct = true;
    }
    if (models.length > 0) {
      extendParam.writeImport = true;
    }
    this.predefined = ast.predefined;

    this.eachImport(ast.imports, ast.usedExternModel, level);
    this.visitPom();
    if (this.implements) {
      this.visitInterface(nonStaticWraps, apis, level);
    }
    // global definition
    for (let i = 0; i < models.length; i++) {
      const modelName = models[i].modelName.lexeme;

      this.modelBefore(level, modelName);

      this.eachModel(models[i], level);
      if (ast.models) {
        const subModels = Object.keys(ast.models).filter((key) => {
          return key.startsWith(modelName + '.');
        }).map((key) => {
          return ast.models[key];
        });
        for (let i = 0; i < subModels.length; i++) {
          this.eachSubModel(subModels[i], level + 1);
        }
      }
      this.emit('}\n', level);
      this.save('models/' + modelName + '.java');
    }

    // models definition
    var extendsClass;
    if (ast.extends) {
      var extendsName = _name(ast.extends);
      extendsClass = {};
      extendsClass.className = this.imports[extendsName].className || 'Client';
      extendsClass.package = this.imports[extendsName].package;
    }
    this.apiBefore(extendParam, extendsClass, apis.length > 0, level);

    // creat class field
    for (let i = 0; i < types.length; i++) {
      this.emit('\n');
      this.eachType(types[i], level + 1);
    }

    // creat contructor
    for (let i = 0; i < init.length; i++) {
      this.emit('\n');
      this.eachInit(init[i], level + 1);
    }

    for (let i = 0; i < apis.length; i++) {
      if (i !== 0) {
        this.emit('\n');
      }

      this.eachAPI(apis[i], level + 1);
    }

    this.apiAfter(apis.length > 0, level + 1);

    this.wrapBefore(level);
    const functions = ast.moduleBody.nodes.filter((item) => {
      return item.type === 'function';
    });


    for (let i = 0; i < functions.length; i++) {
      if (i !== 0) {
        this.emit('\n');
      }

      this.eachFunction(functions[i], level + 1);
    }

    this.emit('}\n');
    let outPutclassName = this.className || 'Client';
    this.save(outPutclassName + '.java');
  }

  eachImport(imports) {
    this.imports = {};
    if (imports.length === 0) {
      return;
    }
    if (!this.config.pkgDir) {
      throw new Error(`Must specific pkgDir when have imports`);
    }

    const lockPath = path.join(this.config.pkgDir, '.libraries.json');
    const lock = JSON.parse(fs.readFileSync(lockPath, 'utf8'));
    for (let i = 0; i < imports.length; i++) {
      const item = imports[i];
      const aliasId = item.lexeme;
      const moduleDir = this.config.libraries[aliasId];
      let targetPath = '';
      if (moduleDir.startsWith('./') || moduleDir.startsWith('../')) {
        targetPath = path.join(this.config.pkgDir, moduleDir);
      } else if (moduleDir.startsWith('/')) {
        targetPath = moduleDir;
      } else {
        targetPath = path.join(this.config.pkgDir, lock[moduleDir]);
      }
      const pkgPath = fs.existsSync(path.join(targetPath, 'Teafile')) ? path.join(targetPath, 'Teafile') : path.join(targetPath, 'Darafile');
      const pkg = JSON.parse(fs.readFileSync(pkgPath));
      const releaseJava = pkg.releases && pkg.releases.java;
      const javaPkg = pkg.java;
      if (!javaPkg) {
        throw new Error(`The '${aliasId}' has no Java supported.`);
      } else {
        javaPkg.release = releaseJava;
      }

      this.imports[aliasId] = javaPkg;
    }
  }

  visitParams(ast) {
    assert.equal(ast.type, 'params');
    this.emit('(');
    for (var i = 0; i < ast.params.length; i++) {
      if (i !== 0) {
        this.emit(', ');
      }
      const node = ast.params[i];
      assert.equal(node.type, 'param');
      this.visitType(node.paramType);
      this.emit(` ${avoidReserveName(_name(node.paramName))}`);
    }

    this.emit(')');
  }

  getSubFieldClassName(className, hasModel) {
    if (className.indexOf('.') > 0) {
      var names = className.split('.');
      var name = '';
      if (hasModel) {
        name = names[0] + '.';
      }
      name += _subModelName(className, this.conflictModelNameMap, this.allModleNameMap, this.enableMinimizeModelName);
      return name;
    }
    return className;
  }

  getSubModelClassName(names, index, currentName) {
    if (index < names.length) {
      names[index] = currentName + _upperFirst(names[index]);
      return this.getSubModelClassName(names, index + 1, names[index]);
    }
    return names.join('.');
  }

  visitType(ast, isSubType = false) {
    if (ast.type === 'map') {
      this.emit(`java.util.Map<`);
      this.visitType(ast.keyType, true);
      this.emit(`, `);
      this.visitType(ast.valueType, true);
      this.emit(`>`);
    } else if (ast.type === 'array') {
      this.emit(`java.util.List<`);
      this.visitType(ast.subType || ast.itemType, true);
      this.emit(`>`);
    } else if (ast.type === 'model') {
      if (ast.moduleName) {
        this.emit(`${this.imports[ast.moduleName].package}.models.`);
      } else {
        const modelMap = `${_name(ast)}`;
        if (this.conflictModels.get(modelMap)) {
          this.emit(`${this.package}.models.`);
        }
      }
      this.emit(`${_type(this.getSubFieldClassName(ast.name, true))}`);
    } else if (ast.type === 'subModel') {
      let className = '';
      for (let i = 0; i < ast.path.length; i++) {
        const item = ast.path[i];
        if (i > 0) {
          className += '.';
        }
        className += item.lexeme;
      }
      let resultName = this.getSubModelClassName(className.split('.'), 0, '');
      this.emit(resultName);
    } else if (ast.type === 'moduleModel') {
      const [moduleId, ...rest] = ast.path;
      let pathName = rest.map((item) => {
        return item.lexeme;
      }).join('.');
      let subModelName = '';
      if (rest.length > 1) {
        subModelName = `.${_subModelName(pathName, this.conflictModelNameMap, this.allModleNameMap, this.enableMinimizeModelName)}`;
      }
      var modelName = rest[0].lexeme;
      var moduleName = moduleId.lexeme;
      var packageName = `${this.imports[moduleName].package}.models.`;
      this.emit(packageName + modelName + subModelName);
    } else if (ast.idType === 'typedef') {
      this.emit(this.typeRelover(ast));
    } else if (ast.type === 'moduleTypedef') {
      for (let i = 1; i < ast.path.length; i++) {
        this.emit(this.typeRelover(ast.path[i], ast.path[0]));
      }
    } else if (ast.type === 'basic') {
      this.emit(_type(ast.name));
    } else if (this.predefined && this.predefined[`module:${_name(ast)}`]) {
      var className = this.imports[ast.lexeme].className || 'Client';
      this.emit(`${this.imports[_name(ast)]}.${className}`);
    } else if (ast.idType === 'module') {
      let className = this.imports[ast.lexeme].className || 'Client';
      this.emit(`${this.imports[ast.lexeme].package}.${className}`);
    } else if (ast.idType === 'model') {
      const modelMap = `${_name(ast)}`;
      if (this.conflictModels.get(modelMap)) {
        this.emit(`${this.package}.models.`);
      }
      this.emit(modelMap);
    } else if (ast.type === 'module_instance') {
      let className = this.imports[_name(ast)].className || 'Client';
      this.emit(`${this.imports[_name(ast)].package}.${className}`);
    } else {
      if (isSubType) {
        this.emit(collectionType(_type(ast.lexeme || ast.name)));
      } else {
        this.emit(_type(ast.lexeme || ast.name));
      }
    }
  }

  visitAnnotation(annotation, level) {
    if (!annotation || !annotation.value) {
      return;
    }
    let comments = DSL.comment.getFrontComments(this.comments, annotation.index);
    this.visitComments(comments, level);
    var ast = Annotation.parse(annotation.value);
    var description = ast.items.find((item) => {
      return item.type === 'description';
    });
    var summary = ast.items.find((item) => {
      return item.type === 'summary';
    });
    var _return = ast.items.find((item) => {
      return item.type === 'return';
    });
    var deprecated = ast.items.find((item) => {
      return item.type === 'deprecated';
    });
    var params = ast.items.filter((item) => {
      return item.type === 'param';
    }).map((item) => {
      return {
        name: item.name.id,
        text: item.text.text.trimEnd()
      };
    });
    var throws = ast.items.filter((item) => {
      return item.type === 'throws';
    }).map((item) => {
      return item.text.text.trimEnd();
    });

    let hasNextSection = false;
    this.emit(`/**\n`, level);
    const descriptionText = description ? description.text.text : '';
    const summaryText = summary ? summary.text.text : '';
    const returnText = _return ? _return.text.text.trimEnd() : '';
    if (descriptionText !== '') {
      this.emit(` * <b>description</b> :\n`, level);
      const descriptionTexts = md2Html(descriptionText).trimEnd();
      descriptionTexts.split('\n').forEach((line) => {
        this.emit(` * ${line}\n`, level);
      });
      hasNextSection = true;
    }
    if (summaryText !== '') {
      if (hasNextSection) {
        this.emit(` * \n`, level);
      }
      this.emit(` * <b>summary</b> : \n`, level);
      const summaryTexts = md2Html(summaryText).trimEnd();
      summaryTexts.split('\n').forEach((line) => {
        this.emit(` * ${line}\n`, level);
      });
      hasNextSection = true;
    }
    if (deprecated) {
      if (hasNextSection) {
        this.emit(` * \n`, level);
      }
      const deprecatedText = deprecated.text.text.trimEnd();
      this.emit(` * @deprecated `, level);
      deprecatedText.split('\n').forEach((line, index) => {
        if (index === 0) {
          this.emit(`${line}\n`);
        } else {
          this.emit(` * ${line}\n`, level);
        }
      });
      hasNextSection = true;
    }
    if (params.length > 0) {
      if (hasNextSection) {
        this.emit(` * \n`, level);
      }
      params.forEach((item) => {
        this.emit(` * @param ${item.name} `, level);
        const items = item.text.trimEnd().split('\n');
        items.forEach((line, index) => {
          if (index === 0) {
            this.emit(`${line}\n`);
          } else {
            this.emit(` * ${line}\n`, level);
          }
        });
      });
      hasNextSection = true;
    }
    if (returnText !== '') {
      this.emit(` * @return `, level);
      const returns = returnText.split('\n');
      returns.forEach((line, index) => {
        if (index === 0) {
          this.emit(`${line}\n`);
        } else {
          this.emit(` * ${line}\n`, level);
        }
      });
      hasNextSection = true;
    }
    if (throws.length > 0) {
      if (hasNextSection) {
        this.emit(` * \n`, level);
      }
      throws.forEach((item) => {
        this.emit(` * @throws `, level);
        const items = item.trimEnd().split('\n');
        items.forEach((line, index) => {
          if (index === 0) {
            this.emit(`${line}\n`);
          } else {
            this.emit(` * ${line}\n`, level);
          }
        });
      });
    }
    this.emit(` */`, level);
    this.emit(`\n`);
    if (deprecated) {
      this.emit(`@Deprecated\n`, level);
    }
  }

  visitAPIBody(ast, level) {
    assert.equal(ast.type, 'apiBody');
    this.emit(`TeaRequest ${REQUEST} = new TeaRequest();\n`, level);
    if (ast.stmts.stmts) {
      for (var i = 0; i < ast.stmts.stmts.length; i++) {
        this.visitStmt(ast.stmts.stmts[i], level);
      }
    }
  }

  visitRuntimeBefore(ast, level) {
    assert.equal(ast.type, 'object');
    let comments = DSL.comment.getFrontComments(this.comments, ast.tokenRange[0]);
    this.visitComments(comments, level + 1);
    this.emit(`java.util.Map<String, Object> ${RUNTIME} = `, level);
    this.visitObject(ast, level);
    this.emit(';\n');
    this.emit('\n');
    this.emit('TeaRequest _lastRequest = null;\n', level);
    this.emit('Exception _lastException = null;\n', level);
    this.emit('long _now = System.currentTimeMillis();\n', level);
    this.emit('int _retryTimes = 0;\n', level);
    this.emit(`while (Tea.allowRetry((java.util.Map<String, Object>) ${RUNTIME}.get("retry"), _retryTimes, _now)) {\n`, level);
    this.emit('if (_retryTimes > 0) {\n', level + 1);
    this.emit(`int backoffTime = Tea.getBackoffTime(${RUNTIME}.get("backoff"), _retryTimes);\n`, level + 2);
    this.emit('if (backoffTime > 0) {\n', level + 2);
    this.emit('Tea.sleep(backoffTime);\n', level + 3);
    this.emit('}\n', level + 2);
    this.emit('}\n', level + 1);
    this.emit('_retryTimes = _retryTimes + 1;\n', level + 1);
    this.emit('try {\n', level + 1);
  }

  visitStmt(ast, level) {
    let comments = DSL.comment.getFrontComments(this.comments, ast.tokenRange[0]);
    this.visitComments(comments, level);
    if (ast.type === 'return') {
      this.visitReturn(ast, level);
    } else if (ast.type === 'if') {
      this.visitIf(ast, level);
    } else if (ast.type === 'throw') {
      this.visitThrow(ast, level);
    } else if (ast.type === 'assign') {
      this.visitAssign(ast, level);
    } else if (ast.type === 'retry') {
      this.visitRetry(ast, level);
    } else if (ast.type === 'break') {
      this.emit(`break;\n`, level);
    } else if (ast.type === 'declare') {
      this.visitDeclare(ast, level);
    } else if (ast.type === 'while') {
      this.visitWhile(ast, level);
    } else if (ast.type === 'for') {
      this.visitFor(ast, level);
    } else if (ast.type === 'try') {
      this.visitTry(ast, level);
    } else {
      this.emit(``, level);
      this.visitExpr(ast, level);
      this.emit(';\n');
    }
  }

  visitTry(ast, level) {
    this.emit('try {\n', level);
    this.visitStmts(ast.tryBlock, level + 1);
    this.emit('}', level);
    if (ast.catchBlock && ast.catchBlock.stmts.length > 0) {
      let errorName = _name(ast.catchId);
      this.emit(` catch (TeaException ${errorName}) {\n`);
      this.visitStmts(ast.catchBlock, level + 1);
      this.emit(`} catch (Exception _${errorName}) {`, level);
      this.emit('\n');
      this.emit(`TeaException ${errorName} = new TeaException(_${errorName}.getMessage(), _${errorName});\n`, level + 1);
      this.visitStmts(ast.catchBlock, level + 1);
      this.emit('}', level);
    }

    if (ast.finallyBlock && ast.finallyBlock.stmts.length > 0) {
      this.emit(' finally {\n');
      this.visitStmts(ast.finallyBlock, level + 1);
      this.emit('}', level);
    }
    this.emit('\n', level);
  }

  visitFieldType(value, node, modelName) {
    if (value.fieldType === 'array') {
      // basic type
      this.emit(`java.util.List<`);
      if (value.fieldItemType.tag === 8) {
        this.emit(`${collectionType(_type(value.fieldItemType.lexeme))}`);
      } else if (value.fieldItemType.type === 'map') {
        this.visitType(value.fieldItemType);
      } else if (value.fieldItemType.fieldType === 'array') {
        this.visitFieldType(value.fieldItemType, node, modelName);
      } else {
        if (node.fieldValue.itemType) {
          this.emit(_subModelName(node.fieldValue.itemType, this.conflictModelNameMap, this.allModleNameMap, this.enableMinimizeModelName));
        } else if (value.fieldItemType) {
          this.emit(`${_name(value.fieldItemType)}`);
        } else {
          this.emit(`${_name(node.fieldValue.fieldItemType)}`);
        }
      }
      this.emit(`>`);
    } else if (value.fieldType === 'map') {
      this.emit(`java.util.Map<${collectionType(_type(value.keyType.lexeme))}, `);
      if (value.valueType.type) {
        this.visitType(value.valueType);
      } else {
        this.emit(`${collectionType(_type(value.valueType.lexeme))}`);
      }
      this.emit('>');
    } else if (typeof value.fieldType === 'string') {
      this.emit(`${_type(value.fieldType)}`);
    } else if (value.fieldType) {
      if (value.fieldType.idType && value.fieldType.idType === 'module') {
        var className = this.imports[`${_type(value.fieldType.lexeme)}`].className || 'Client';
        this.emit(this.imports[`${_type(value.fieldType.lexeme)}`].package);
        this.emit(`.${className}`);
      } else if (value.fieldType.idType && value.fieldType.idType === 'typedef') {
        this.emit(this.typeRelover(value.fieldType));
      } else if (value.fieldType.type && value.fieldType.type === 'moduleModel') {
        this.emit(this.imports[_name(value.fieldType.path[0])].package);
        this.emit(`.models.${_name(value.fieldType.path[1])}`);
      } else if (value.fieldType.type && value.fieldType.type === 'moduleTypedef') {
        for (let i = 1; i < value.fieldType.path.length; i++) {
          this.emit(this.typeRelover(value.fieldType.path[i], value.fieldType.path[0]));
        }
      } else {
        this.emit(`${_type(value.fieldType.lexeme)}`);
      }
    } else {
      this.emit(_subModelName([modelName, _name(node.fieldName)].join('.'), this.conflictModelNameMap, this.allModleNameMap, this.enableMinimizeModelName));
    }
  }

  visitModelBody(ast, level, modelName) {
    assert.equal(ast.type, 'modelBody');
    let node;
    for (let i = 0; i < ast.nodes.length; i++) {
      node = ast.nodes[i];
      let comments = DSL.comment.getFrontComments(this.comments, node.tokenRange[0]);
      this.visitComments(comments, level);
      const value = node.fieldValue;
      const realName = getAttr(node, 'name') || _name(node.fieldName);
      const description = getAttr(node, 'description');
      const example = getAttr(node, 'example');
      const checkBlank = getAttr(node, 'checkBlank');
      const nullable = getAttr(node, 'nullable');
      const sensitive = getAttr(node, 'sensitive');
      const pattern = getAttr(node, 'pattern') || '';
      const maxLength = getAttr(node, 'maxLength') || 0;
      const minLength = getAttr(node, 'minLength') || 0;
      const maximum = getAttr(node, 'maximum') || 0;
      const minimum = getAttr(node, 'minimum') || 0;
      const required = node.required || false;
      const deprecated = getAttr(node, 'deprecated');
      let hasNextSection = false;
      if (description || example || typeof checkBlank !== 'undefined' || typeof nullable !== 'undefined' || typeof sensitive !== 'undefined') {
        this.emit('/**\n', level);
        if (description) {
          const descriptions = md2Html(description).trimEnd().split('\n');
          for (let j = 0; j < descriptions.length; j++) {
            this.emit(` * ${_doc(descriptions[j])}\n`, level);
          }
          hasNextSection = true;
        }
        if (example) {
          if (hasNextSection) {
            this.emit(' * \n', level);
          }
          const examples = md2Html(example).trimEnd().split('\n');
          this.emit(' * <strong>example:</strong>\n', level);
          for (let j = 0; j < examples.length; j++) {
            this.emit(` * ${_doc(examples[j])}\n`, level);
          }
          hasNextSection = true;
        }
        if (typeof checkBlank !== 'undefined') {
          if (hasNextSection) {
            this.emit(' * \n', level);
          }
          this.emit(' * <strong>check if is blank:</strong>\n', level);
          this.emit(` * <p>${checkBlank}</p>\n`, level);
          hasNextSection = true;
        }
        if (typeof nullable !== 'undefined') {
          if (hasNextSection) {
            this.emit(' * \n', level);
          }
          this.emit(' * <strong>if can be null:</strong>\n', level);
          this.emit(` * <p>${nullable}</p>\n`, level);
          hasNextSection = true;
        }
        if (typeof sensitive !== 'undefined') {
          if (hasNextSection) {
            this.emit(' * \n', level);
          }
          this.emit(' * <strong>if sensitive:</strong>\n', level);
          this.emit(` * <p>${sensitive}</p>\n`, level);
        }
        this.emit(' */\n', level);
      }
      this.emit(`@NameInMap("${_doc(realName)}")\n`, level);
      if (deprecated === 'true') {
        this.emit(`@Deprecated\n`, level);
      }
      if (required || maxLength > 0 || maximum > 0 || pattern !== '') {
        var validationAnnotation = '@Validation(';
        if (required) {
          validationAnnotation += `required = ${required}`;
        }
        if (pattern !== '') {
          if (!validationAnnotation.endsWith('(')) {
            validationAnnotation += ', ';
          }
          validationAnnotation += `pattern = "${pattern}"`;
        }
        // 不能超过Java中Integer最大值
        if (maxLength > 0 && maxLength <= 2147483647) {
          if (!validationAnnotation.endsWith('(')) {
            validationAnnotation += ', ';
          }
          validationAnnotation += `maxLength = ${maxLength}`;
        }
        // 不能超过Java中Integer最大值
        if (minLength > 0 && minLength <= 2147483647) {
          if (!validationAnnotation.endsWith('(')) {
            validationAnnotation += ', ';
          }
          validationAnnotation += `minLength = ${minLength}`;
        }
        // 不能超过JS中最大安全整数
        if (maximum > 0 && maximum <= Number.MAX_SAFE_INTEGER) {
          if (!validationAnnotation.endsWith('(')) {
            validationAnnotation += ', ';
          }
          validationAnnotation += `maximum = ${maximum}`;
          if (maximum > 2147483647) {
            validationAnnotation += 'D';
          }
        }
        // 不能超过JS中最大安全整数
        if (minimum > 0 && minimum <= Number.MAX_SAFE_INTEGER) {
          if (!validationAnnotation.endsWith('(')) {
            validationAnnotation += ', ';
          }
          validationAnnotation += `minimum = ${minimum}`;
          if (minimum > 2147483647) {
            validationAnnotation += 'D';
          }
        }
        this.emit(validationAnnotation, level);
        this.emit(')\n');
      }
      this.emit('public ', level);
      this.visitFieldType(value, node, modelName);
      this.emit(` ${avoidReserveName(_name(node.fieldName))};\n`);
      this.emit('\n');
    }
    if (node) {
      //find the last node's back comment
      let comments = DSL.comment.getBetweenComments(this.comments, node.tokenRange[0], ast.tokenRange[1]);
      this.visitComments(comments, level);
    }

    if (ast.nodes.length === 0) {
      //empty block's comment
      let comments = DSL.comment.getBetweenComments(this.comments, ast.tokenRange[0], ast.tokenRange[1]);
      this.visitComments(comments, level);
    }
  }
  createGetSetMethod(ast, level, modelName) {
    assert.equal(ast.type, 'modelBody');
    let node;
    for (let i = 0; i < ast.nodes.length; i++) {
      node = ast.nodes[i];
      const value = node.fieldValue;

      const deprecated = getAttr(node, 'deprecated');
      let fieldName = _name(node.fieldName);
      if (deprecated === 'true') {
        this.emit(`@Deprecated\n`, level);
      }
      this.emit(`public ${_subModelName(modelName, this.conflictModelNameMap, this.allModleNameMap, this.enableMinimizeModelName)} set`, level);
      this.emit(`${_upperFirst(fieldName)}(`);
      this.visitFieldType(value, node, modelName);
      this.emit(` ${fieldName}) {\n`);
      this.emit(`this.${fieldName} = ${fieldName};\n`, level + 1);
      this.emit('return this;\n', level + 1);
      this.emit('}\n', level);

      this.emit('public ', level);
      this.visitFieldType(value, node, modelName);
      this.emit(' get');
      this.emit(`${_upperFirst(fieldName)}() {\n`);
      this.emit(`return this.${fieldName};\n`, level + 1);
      this.emit('}\n\n', level);
    }
  }
  eachModel(ast, level) {
    assert.equal(ast.type, 'model');
    const modelName = _name(ast.modelName);
    this.visitAnnotation(ast.annotation, level);
    this.emit(`public class ${_subModelName(modelName, this.conflictModelNameMap, this.allModleNameMap, this.enableMinimizeModelName)} extends TeaModel {\n`, level);
    this.visitModelBody(ast.modelBody, level + 1, modelName);
    this.visitBuildMethod(ast, level + 1);
    this.createGetSetMethod(ast.modelBody, level + 1, modelName);
  }

  visitBuildMethod(ast, level) {
    var className = this.getSubFieldClassName(ast.modelName.lexeme);
    this.emit(`public static ${className} build(java.util.Map<String, ?> map)`, level);
    if (!this.NoException) {
      this.emit(` throws Exception`);
    }
    this.emit(` {\n`);
    this.emit(`${className} self = new ${className}();\n`, level + 1);
    this.emit('return TeaModel.build(map, self);\n', level + 1);
    this.emit(`}\n\n`, level);
  }

  eachSubModel(ast, level) {
    assert.equal(ast.type, 'model');
    const modelName = _name(ast.modelName);
    this.visitAnnotation(ast.annotation, level);
    this.emit(`public static class ${_subModelName(modelName, this.conflictModelNameMap, this.allModleNameMap, this.enableMinimizeModelName)} extends TeaModel {\n`, level);
    this.visitModelBody(ast.modelBody, level + 1, modelName);
    this.visitBuildMethod(ast, level + 1);
    this.createGetSetMethod(ast.modelBody, level + 1, modelName);
    this.emit('}\n\n', level);
  }

  visitObjectFieldValue(ast, level) {
    this.visitExpr(ast, level);
  }

  visitObjectField(ast, level) {
    let comments = DSL.comment.getFrontComments(this.comments, ast.tokenRange[0]);
    this.visitComments(comments, level);
    if (ast.type === 'objectField') {
      var key = _escape(_name(ast.fieldName) || _string(ast.fieldName));
      this.emit(`new TeaPair("${key}", `, level);
      this.visitObjectFieldValue(ast.expr, level);
    } else {
      throw new Error('unimpelemented');
    }
    this.emit(')');
  }

  visitObject(ast, level) {
    assert.equal(ast.type, 'object');
    if (ast.fields.length === 0) {
      this.emit('new java.util.HashMap<>()');
      return;
    }
    var hasExpandField = false;
    var hasNotExpandField = false;
    for (let i = 0; i < ast.fields.length; i++) {
      const field = ast.fields[i];
      if (field.type === 'expandField') {
        hasExpandField = true;
        break;
      } else {
        hasNotExpandField = true;
      }
    }

    if (!hasExpandField) {
      this.emit('TeaConverter.buildMap(\n');
      for (let i = 0; i < ast.fields.length; i++) {
        this.visitObjectField(ast.fields[i], level + 1);
        if (i < ast.fields.length - 1) {
          this.emit(',');
        }
        this.emit('\n');
      }
      this.emit(')', level);
      return;
    }

    var all = [];
    // 分段
    var current = [];
    for (let i = 0; i < ast.fields.length; i++) {
      const field = ast.fields[i];
      if (field.type === 'objectField') {
        current.push(field);
      } else {
        if (current.length > 0) {
          all.push(current);
        }
        all.push(field);
        current = [];
      }
    }

    if (current.length > 0) {
      all.push(current);
    }

    this.emit('TeaConverter.merge(');
    if (ast.inferred && ast.inferred.valueType.name === 'string') {
      this.emit('String.class');
    } else {
      this.emit('Object.class');
    }
    var hasExpandFieldBuildMap = false;
    if (hasExpandField && hasNotExpandField) {
      hasExpandFieldBuildMap = true;
      this.emit(',\n');
      this.emit('TeaConverter.buildMap(\n', level + 1);
    } else {
      this.emit(',\n');
    }

    for (let i = 0; i < all.length; i++) {
      const item = all[i];
      if (Array.isArray(item)) {
        for (var j = 0; j < item.length; j++) {
          this.visitObjectField(item[j], level + 2);
          if (item[j + 1]) {
            this.emit(',\n');
          } else {
            this.emit('\n');
          }
        }
      } else {
        this.emit('', level + 1);
        this.visitExpr(item.expr, level);
        if (all[i + 1]) {
          this.emit(',');
        }
        this.emit('\n');
      }
      if (hasExpandFieldBuildMap) {
        this.emit(')', level + 1);
        if (all[i + 1]) {
          this.emit(',\n');
        } else {
          this.emit('\n');
        }
        hasExpandFieldBuildMap = false;
      }
    }
    this.emit(')', level);
  }

  visitCall(ast, level) {
    assert.equal(ast.type, 'call');
    if (ast.left.type === 'method_call') {
      this.visitMethodCall(ast, level);
    } else if (ast.left.type === 'instance_call') {
      this.visitInstanceCall(ast, level);
    } else if (ast.left.type === 'static_call') {
      this.visitStaticCall(ast, level);
    } else {
      throw new Error('unimplemented');
    }
  }

  visitStaticCall(ast, level) {
    assert.equal(ast.left.type, 'static_call');
    var className = this.imports[ast.left.id.lexeme].className || 'Client';
    this.emit(`${this.imports[ast.left.id.lexeme].package}.${className}.${_name(ast.left.propertyPath[0])}(`);
    for (let i = 0; i < ast.args.length; i++) {
      const expr = ast.args[i];
      if (expr.needCast) {
        this.emit('TeaModel.buildMap(');
      }
      this.visitExpr(expr, level);
      if (expr.needCast) {
        this.emit(')');
      }
      if (i !== ast.args.length - 1) {
        this.emit(', ');
      }
    }
    this.emit(')');
  }

  visitInstanceCall(ast, level) {
    assert.equal(ast.left.type, 'instance_call');
    const method = ast.left.propertyPath[0];
    var id = _name(ast.left.id);
    if (id.indexOf('@') > -1) {
      id = `_${_lowerFirst(id.substr(1))}`;
    }
    this.emit(`${id}.${_name(method)}(`);
    for (let i = 0; i < ast.args.length; i++) {
      const expr = ast.args[i];
      this.visitExpr(expr, level);
      if (i !== ast.args.length - 1) {
        this.emit(', ');
      }
    }
    this.emit(')');
  }

  visitMethodCall(ast, level) {
    assert.equal(ast.left.type, 'method_call');
    if (ast.isStatic) {
      var className = this.className || 'Client';
      this.emit(`${className}.${_name(ast.left.id)}(`);
    } else {
      this.emit(`this.${_name(ast.left.id)}(`);
    }
    for (let i = 0; i < ast.args.length; i++) {
      const expr = ast.args[i];
      if (expr.needCast) {
        this.emit('TeaModel.buildMap(');
      }
      this.visitExpr(expr, level);
      if (expr.needCast) {
        this.emit(')');
      }
      if (i !== ast.args.length - 1) {
        this.emit(', ');
      }
    }
    this.emit(')');
  }

  visitPropertyAccess(ast) {
    assert.equal(ast.type, 'property_access');

    var id = _name(ast.id);
    var expr = '';
    if (id === '__response') {
      expr += RESPONSE;
    } else if (id === '__request') {
      expr += REQUEST;
    } else {
      expr += avoidReserveName(id);
    }
    var current = ast.id.inferred;
    for (var i = 0; i < ast.propertyPath.length; i++) {
      var name = _name(ast.propertyPath[i]);
      if (current.type === 'model') {
        expr += `.${name}`;
      } else {
        expr += `.get("${name}")`;
      }
      current = ast.propertyPathTypes[i];
    }

    this.emit(expr);
  }
  emitNumber(ast, level) {
    this.emit(ast.value.value, level);
    if (ast.value.type === 'long') {
      this.emit('L');
    }
    if (ast.value.type === 'double') {
      this.emit('D');
    }
    if (ast.value.type === 'float') {
      this.emit('F');
    }
  }

  visitExpr(ast, level) {
    if (ast.type === 'boolean') {
      this.emit(`${ast.value}`);
    } else if (ast.type === 'property_access') {
      this.visitPropertyAccess(ast, level);
    } else if (ast.type === 'string') {
      this.emit(`"${ast.value.string.replace(new RegExp('"', 'g'), '\\"')}"`);
    } else if (ast.type === 'null') {
      this.emit('null');
    } else if (ast.type === 'number') {
      this.emitNumber(ast);
    } else if (ast.type === 'object') {
      this.visitObject(ast, level);
    } else if (ast.type === 'variable') {
      var id = _name(ast.id);
      if (id === '__response') {
        this.emit(RESPONSE);
      } else if (id === '__request') {
        this.emit(REQUEST);
      } else if (ast.inferred && ast.inferred.name === 'class') {
        this.emit(avoidReserveName(id) + '.class');
      } else {
        this.emit(avoidReserveName(id));
      }
    } else if (ast.type === 'virtualVariable') {
      const vid = `_${_lowerFirst(_name(ast.vid).substr(1))}`;
      this.emit(`${vid}`);
    } else if (ast.type === 'template_string') {
      for (let i = 0; i < ast.elements.length; i++) {
        var item = ast.elements[i];
        if (item.type === 'element') {
          this.emit('"');
          this.emit(item.value.string);
          this.emit('"');
        } else if (item.type === 'expr') {
          if (item.expr.type === 'property_access' && _name(item.expr.id) === '__module') {
            var value = this.__module;
            for (let i = 0; i < item.expr.propertyPath.length; i++) {
              value = value[_name(item.expr.propertyPath[i])];
            }
            this.emit('"');
            this.emit(value);
            this.emit('"');
          } else {
            this.visitExpr(item.expr, level);
          }
        } else {
          throw new Error('unimpelemented');
        }

        if (i < ast.elements.length - 1) {
          this.emit(' + ');
        }
      }
    } else if (ast.type === 'call') {
      this.visitCall(ast, level);
    } else if (ast.type === 'construct') {
      this.visitConstruct(ast, level);
    } else if (ast.type === 'array') {
      this.visitArray(ast, level);
    } else if (ast.type === 'and') {
      this.visitExpr(ast.left, level);
      this.emit(' && ');
      this.visitExpr(ast.right, level);
    } else if (ast.type === 'or') {
      this.visitExpr(ast.left, level);
      this.emit(' || ');
      this.visitExpr(ast.right, level);
    } else if (ast.type === 'null') {
      this.emit('null');
    } else if (ast.type === 'not') {
      this.emit('!');
      this.visitExpr(ast.expr, level);
    } else if (ast.type === 'construct_model') {
      this.visitConstructModel(ast, level);
    } else if (ast.type === 'super') {
      this.emit('super(');
      if (ast.args) {
        for (let i = 0; i < ast.args.length; i++) {
          if (i > 0) {
            this.emit(', ');
          }
          this.visitExpr(ast.args[i], level);
        }
      }
      this.emit(')');
    } else if (ast.type === 'map_access') {
      this.visitMapAccess(ast, true);
    } else if (ast.type === 'array_access') {
      this.visitArrayAccess(ast, true);
    } else {
      throw new Error('unimpelemented');
    }
  }

  visitMapAccess(ast, isExpr, level) {
    assert.equal(ast.type, 'map_access');
    let expr = _name(ast.id);
    if (expr.indexOf('@') > -1) {
      expr = `_${_lowerFirst(expr.substr(1))}`;
    }
    if (ast.propertyPath && ast.propertyPath.length) {
      var current = ast.id.inferred;
      for (var i = 0; i < ast.propertyPath.length; i++) {
        var name = _name(ast.propertyPath[i]);
        if (current.type === 'model') {
          expr += `.${name}`;
        } else {
          expr += `.get("${name}")`;
        }
        current = ast.propertyPathTypes[i];
      }
    }

    if (isExpr) {
      this.emit(`${expr}.get(`);
      this.visitExpr(ast.accessKey);
      this.emit(`)`);
    } else {
      this.emit(`${expr}.put(`, level);
      this.visitExpr(ast.accessKey);
      this.emit(`, `);
    }
  }


  visitArrayAccess(ast, isExpr, level) {
    assert.equal(ast.type, 'array_access');
    let expr = _name(ast.id);
    if (expr.indexOf('@') > -1) {
      expr = `_${_lowerFirst(expr.substr(1))}`;
    }
    if (ast.propertyPath && ast.propertyPath.length) {
      var current = ast.id.inferred;
      for (var i = 0; i < ast.propertyPath.length; i++) {
        var name = _name(ast.propertyPath[i]);
        if (current.type === 'model') {
          expr += `.${name}`;
        } else {
          expr += `.get("${name}")`;
        }
        current = ast.propertyPathTypes[i];
      }
    }
    if (isExpr) {
      this.emit(`${expr}.get(`);
      this.visitExpr(ast.accessKey);
      this.emit(`)`);
    } else {
      this.emit(`${expr}.set(`, level);
      this.visitExpr(ast.accessKey);
      this.emit(', ');
    }
  }


  visitConstruct(ast, level) {
    assert.equal(ast.type, 'construct');
    this.emit('new ');
    let className = this.imports[ast.inferred.name].className || 'Client';
    let pathName = this.imports[ast.inferred.name].package;
    this.emit(`${pathName}.${className}`);
    this.visitArgs(ast.args, level);
  }

  visitArgs(args, level) {
    this.emit('(');
    for (let i = 0; i < args.length; i++) {
      const expr = args[i];
      this.visitExpr(expr, level);
      if (i !== args.length - 1) {
        this.emit(', ');
      }
    }
    this.emit(')');
  }

  visitArray(ast, level) {
    assert.equal(ast.type, 'array');
    if (ast.items.length === 0) {
      this.emit('new java.util.ArrayList<>()');
      return;
    }

    this.emit('java.util.Arrays.asList(\n');
    for (let i = 0; i < ast.items.length; i++) {
      const item = ast.items[i];
      var comments = DSL.comment.getFrontComments(this.comments, item.tokenRange[0]);
      this.visitComments(comments, level + 1);
      this.emit('', level + 1);
      this.visitExpr(item, level + 1);
      if (i < ast.items.length - 1) {
        this.emit(',');
      }
      this.emit('\n');
    }
    this.emit(')', level);
  }

  visitConstructModel(ast, level) {
    assert.equal(ast.type, 'construct_model');
    if (ast.object && ast.object.fields && ast.object.fields.length > 0 && !this.exec) {
      this.visitType(ast.inferred);
      this.emit(`.build(`);
      this.visitObject(ast.object, level);
      this.emit(`)`);
      return;
    }
    this.emit(`new `);
    this.visitType(ast.inferred);
    this.emit(`()`);

    if (this.exec) {
      this.visitSetMethod(ast.object, level);
    }
  }

  visitSetMethod(ast, level) {
    let classFieldName = '';
    for (let i = 0; i < ast.fields.length; i++) {
      classFieldName = _name(ast.fields[i].fieldName);
      this.emit('\n');
      let comments = DSL.comment.getFrontComments(this.comments, ast.fields[i].tokenRange[0]);
      this.visitComments(comments, level + 2);
      this.emit('', level + 2);
      this.emit(`.set${_upperFirst(classFieldName)}(`);
      this.visitObjectFieldValue(ast.fields[i].expr, level + 2);
      this.emit(')');
    }
  }
  visitReturn(ast, level) {
    assert.equal(ast.type, 'return');
    this.emit('return ', level);
    if (!ast.expr) {
      this.emit(';\n');
      return;
    }
    if (ast.needCast) {
      this.emit('TeaModel.toModel(');
    }

    this.visitExpr(ast.expr, level);

    if (ast.needCast) {
      this.emit(`, new `);
      this.visitType(ast.expectedType);
      this.emit(`())`);
    }

    this.emit(';\n');
  }

  visitRetry(ast, level) {
    assert.equal(ast.type, 'retry');
    this.emit(`throw new TeaRetryableException();\n`, level);
  }

  visitIf(ast, level) {
    assert.equal(ast.type, 'if');
    this.emit('if (', level);
    this.visitExpr(ast.condition, level + 1);
    this.emit(') {\n');
    this.visitStmts(ast.stmts, level + 1);
    this.emit('}', level);
    if (ast.elseIfs) {
      for (let i = 0; i < ast.elseIfs.length; i++) {
        const branch = ast.elseIfs[i];
        this.emit(' else if (');
        this.visitExpr(branch.condition, level + 1);
        this.emit(') {\n');
        this.visitStmts(branch.stmts, level + 1);
        this.emit('}', level);
      }
    }

    if (ast.elseStmts) {
      this.emit(' else {\n');
      for (let i = 0; i < ast.elseStmts.stmts.length; i++) {
        this.visitStmt(ast.elseStmts.stmts[i], level + 1);
      }
      this.emit('}', level);
    }

    this.emit('\n');
    this.emit('\n');
  }

  visitThrow(ast, level) {
    this.emit('throw new TeaException(', level);
    this.visitObject(ast.expr, level);
    this.emit(');\n');
  }

  visitAssign(ast, level) {
    var isCollection = false;
    if (ast.left.type === 'id') {
      this.emit(`${_name(ast.left.id)}`, level);
    } else if (ast.left.type === 'property_assign' || ast.left.type === 'property') {
      var id = _name(ast.left.id);
      if (id === '__request') {
        id = 'request_';
      }
      this.emit(`${id}`, level);
      for (var i = 0; i < ast.left.propertyPath.length; i++) {
        if ((i === ast.left.propertyPath.length - 1 && ast.left.propertyPathTypes[i - 1] && ast.left.propertyPathTypes[i - 1].type === 'map') ||
          (ast.left.id.inferred && ast.left.id.inferred.type === 'map')) {
          this.emit(`.put("${_name(ast.left.propertyPath[i])}", `);
          isCollection = true;
        } else {
          this.emit(`.${_name(ast.left.propertyPath[i])}`);
        }
      }
    } else if (ast.left.type === 'virtualVariable') {
      this.emit(`this._${_name(ast.left.vid).substr(1)}`, level);
    } else if (ast.left.type === 'variable') {
      this.emit(`${_name(ast.left.id)}`, level);
    } else if (ast.left.type === 'map_access') {
      isCollection = true;
      this.visitMapAccess(ast.left, false, level);
    } else if (ast.left.type === 'array_access') {
      isCollection = true;
      this.visitArrayAccess(ast.left, false, level);
    } else {
      throw new Error('unimpelemented');
    }
    if (!isCollection) {
      this.emit(' = ');
    }
    if (ast.expr.needToReadable) {
      this.emit('Tea.toReadable(');
    }
    this.visitExpr(ast.expr, level);
    if (isCollection) {
      this.emit(')');
    }
    if (ast.expr.needToReadable) {
      this.emit(')');
    }
    this.emit(';\n');
  }

  visitDeclare(ast, level) {
    var id = _name(ast.id);
    this.emit(``, level);
    this.visitType(ast.expr.inferred);
    this.emit(` ${id} = `);
    this.visitExpr(ast.expr, level);
    this.emit(';\n');
  }

  visitComments(comments, level) {
    comments.forEach(comment => {
      this.emit(`${comment.value}`, level);
      this.emit(`\n`);
    });
  }

  visitStmts(ast, level) {
    assert.equal(ast.type, 'stmts');
    let node;
    for (var i = 0; i < ast.stmts.length; i++) {
      node = ast.stmts[i];
      this.visitStmt(node, level);
    }
    if (node) {
      //find the last node's back comment
      let comments = DSL.comment.getBackComments(this.comments, node.tokenRange[1]);
      this.visitComments(comments, level);
    }

    if (ast.stmts.length === 0) {
      //empty block's comment
      let comments = DSL.comment.getBetweenComments(this.comments, ast.tokenRange[0], ast.tokenRange[1]);
      this.visitComments(comments, level);
    }
  }

  visitReturnBody(ast, level) {
    assert.equal(ast.type, 'returnBody');
    this.emit('\n');
    this.visitStmts(ast.stmts, level);
  }

  visitFunctionBody(ast, level) {
    assert.equal(ast.type, 'functionBody');
    this.visitStmts(ast.stmts, level);
  }

  eachFunction(ast, level) {
    this.visitAnnotation(ast.annotation, level);
    let comments = DSL.comment.getFrontComments(this.comments, ast.tokenRange[0]);
    this.visitComments(comments, level);
    if (this.implements && !ast.isStatic) {
      this.emit(`@Override\n`, level);
    }
    this.emit('public ', level);
    if (ast.isStatic) {
      this.emit('static ');
    }
    this.visitType(ast.returnType);
    this.emit(` ${_name(ast.functionName)}`);
    if (_name(ast.functionName) === 'main') {
      if (!ast.params.params || ast.params.params.length === 0) {
        throw new Error('static function main must have a argument');
      }
      this.emit(`(String[] ${_name(ast.params.params[0].paramName)}_)`);
    } else {
      this.visitParams(ast.params, level);
    }
    if (!this.NoException) {
      this.emit(' throws Exception');
    }
    this.emit(' {\n');
    if (ast.functionBody) {
      if (_name(ast.functionName) === 'main') {
        const args = _name(ast.params.params[0].paramName);
        this.emit(`java.util.List<String> ${args} = java.util.Arrays.asList(${args}_);\n`, level + 1);
      }
      this.visitFunctionBody(ast.functionBody, level + 1);
    }
    this.emit('}\n', level);
  }

  eachType(ast, level) {
    this.emit('public ', level);
    this.visitType(ast.value);
    this.emit(` _${_lowerFirst(_name(ast.vid).substr(1))};`);
  }

  eachInit(ast, level) {
    var className = this.className || 'Client';
    this.visitAnnotation(ast.annotation, level);
    let comments = DSL.comment.getFrontComments(this.comments, ast.tokenRange[0]);
    this.visitComments(comments, level);
    this.emit(`public ${className}`, level);
    this.visitParams(ast.params, level);
    if (!this.NoException) {
      this.emit(' throws Exception');
    }
    this.emit(' {\n');
    if (ast.initBody) {
      this.visitStmts(ast.initBody, level + 1);
    }
    this.emit('}\n\n', level);
  }

  visitApiInterface(apis, level) {
    for (let i = 0; i < apis.length; i++) {
      this.visitAnnotation(apis[i].annotation, level);
      this.emit('', level);
      this.visitType(apis[i].returnType);
      this.emit(` ${_name(apis[i].apiName)}`);
      this.visitParams(apis[i].params, level);
      this.emit(';\n\n');
    }
  }

  visitFunctionInterface(functions, level) {
    for (let i = 0; i < functions.length; i++) {
      if (_name(functions[i].functionName) === 'main') {
        continue;
      }
      this.visitAnnotation(functions[i].annotation, level);
      let comments = DSL.comment.getFrontComments(this.comments, functions[i].tokenRange[0]);
      this.visitComments(comments, level);
      this.emit('', level);
      this.visitType(functions[i].returnType);
      this.emit(` ${_name(functions[i].functionName)}`);
      this.visitParams(functions[i].params, level);
      this.emit(';\n\n');
    }
  }

  eachAPI(ast, level) {
    this.visitAnnotation(ast.annotation, level);
    let comments = DSL.comment.getFrontComments(this.comments, ast.tokenRange[0]);
    this.visitComments(comments, level);
    this.emit('public ', level);
    this.visitType(ast.returnType);
    this.emit(` ${_name(ast.apiName)}`);
    this.visitParams(ast.params, level);
    if (!this.NoException) {
      this.emit(' throws Exception');
    }
    this.emit(' {\n');
    for (var i = 0; i < ast.params.params.length; i++) {
      const param = ast.params.params[i];
      if (_name(param.paramType) && !DSL.util.isBasicType(_name(param.paramType)) && param.paramName.lexeme !== 'client') {
        this.emit(`TeaModel.validateParams(${param.paramName.lexeme}, "${param.paramName.lexeme}");\n`, level + 1);
      }
    }
    let baseLevel = ast.runtimeBody ? level + 2 : level;
    // api level
    if (ast.runtimeBody) {
      this.visitRuntimeBefore(ast.runtimeBody, level + 1);
    }
    this.visitAPIBody(ast.apiBody, baseLevel + 1);
    if (ast.runtimeBody) {
      this.emit(`_lastRequest = ${REQUEST};\n`, baseLevel + 1);
    }

    this.emit(`TeaResponse ${RESPONSE} = Tea.doAction(${REQUEST}`, baseLevel + 1);
    if (ast.runtimeBody) {
      this.emit(`, ${RUNTIME}`);
    } else {
      this.emit(`, new java.util.HashMap<String, Object>()`);
    }
    this.emit(', interceptorChain);\n');

    if (ast.returns) {
      this.visitReturnBody(ast.returns, baseLevel + 1);
    }

    if (ast.runtimeBody) {
      this.visitRuntimeAfter(ast.runtimeBody, level + 1);
    }

    this.emit('}\n', level);
  }

  visitRuntimeAfter(ast, level) {
    this.emit('} catch (Exception e) {\n', level + 1);
    this.emit('if (Tea.isRetryable(e)) {\n', level + 2);
    this.emit('_lastException = e;\n', level + 3);
    this.emit('continue;\n', level + 3);
    this.emit('}\n', level + 2);
    if (!this.NoException) {
      this.emit('throw e;\n', level + 2);
    } else {
      this.emit('if (e instanceof TeaException) {\n', level + 2);
      this.emit('throw e;\n', level + 3);
      this.emit('}\n', level + 2);
      this.emit('throw new TeaException(e.getMessage(), e);\n', level + 2);
    }
    this.emit('}\n', level + 1);
    this.emit('}\n', level);
    this.emit('throw new TeaUnretryableException(_lastRequest, _lastException);\n', level);
  }

  visitImport() { }

  importBefore(level) {
    if (this.editable !== true) {
      this.emit(`// This file is auto-generated, don't edit it. Thanks.\n`, level);
    }
  }
  modelBefore() {
    if (this.editable !== true) {
      this.emit(`// This file is auto-generated, don't edit it. Thanks.\n`);
    }
    this.emit(`package ${this.package}.models;

import com.aliyun.tea.*;

`);
  }

  apiBefore(extendParam, extendsClass, hasAPI, level) {
    if (this.editable !== true) {
      this.emit(`// This file is auto-generated, don't edit it. Thanks.\n`);
    }
    this.emit(`package ${this.package};

import com.aliyun.tea.*;
`);
    if (hasAPI) {
      this.emit('import com.aliyun.tea.interceptor.InterceptorChain;\n');
      this.emit('import com.aliyun.tea.interceptor.RuntimeOptionsInterceptor;\n');
      this.emit('import com.aliyun.tea.interceptor.RequestInterceptor;\n');
      this.emit('import com.aliyun.tea.interceptor.ResponseInterceptor;\n');
    }

    if (extendParam.writeImport) {
      this.emit(`import ${this.package}.models.*;\n`);
    }

    this.visitImport();

    this.emit(`
public class ${this.className || 'Client'}`);
    if (extendsClass) {
      this.emit(` extends ${extendsClass.package + '.' + extendsClass.className}`);
    }

    if (this.implements) {
      this.emit(` implements ${this.implements}`);
    }
    this.emit(` {\n`);

    if (hasAPI) {
      this.emit(`\n`);
      this.emit('private final static InterceptorChain interceptorChain = InterceptorChain.create();\n', 1);
    }
  }

  wrapBefore() {
    this.emit(`\n`);
  }

  apiAfter(hasAPI, level) {
    if (hasAPI) {
      this.emit(`\n`);
      this.emit('public void addRuntimeOptionsInterceptor(RuntimeOptionsInterceptor interceptor) {\n', level);
      this.emit('interceptorChain.addRuntimeOptionsInterceptor(interceptor);\n', level + 1);
      this.emit('}\n', level);
      this.emit(`\n`);
      this.emit('public void addRequestInterceptor(RequestInterceptor interceptor) {\n', level);
      this.emit('interceptorChain.addRequestInterceptor(interceptor);\n', level + 1);
      this.emit('}\n', level);
      this.emit(`\n`);
      this.emit('public void addResponseInterceptor(ResponseInterceptor interceptor) {\n', level);
      this.emit('interceptorChain.addResponseInterceptor(interceptor);\n', level + 1);
      this.emit('}\n', level);
    }
  }

  typeRelover(type, module) {
    if (module && module.idType === 'module') {
      const aliasId = _name(module);
      if (this.imports[aliasId] && this.imports[aliasId].typedef && this.imports[aliasId].typedef[type.lexeme]) {
        let reslut = this.imports[aliasId].typedef[type.lexeme].import;
        if (this.imports[aliasId].typedef[type.lexeme].type) {
          reslut = `${reslut}.${this.imports[aliasId].typedef[type.lexeme].type}`;
        }
        return reslut;
      }
    }
    if (type.idType === 'typedef' && this.typedef[type.lexeme]) {
      let reslut = this.typedef[type.lexeme].import;
      if (this.typedef[type.lexeme].type) {
        reslut = `${reslut}.${this.typedef[type.lexeme].type}`;
      }
      return reslut;
    }
    return _type(type);
  }

}

module.exports = Visitor;