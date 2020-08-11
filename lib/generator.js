'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const DSL = require('@darabonba/parser');
const xml2js = require('xml2js');
const Entities = require('html-entities').XmlEntities;

const REQUEST = 'request_';
const RESPONSE = 'response_';
const RUNTIME = 'runtime_';
const {
  _name, _type, _lowerFirst, _subModelName, remove, _upperFirst
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

function render(tamplate, params = {}) {
  const needParamsKeys = ['description', 'url',
    'licenseNmae', 'developerId',
    'licenseUrl', 'developerName',
    'developerEmail', 'scmConnection',
    'scmDeveloperConnection', 'scmUrl', 'groupId',
    'artifactId', 'version'];
  needParamsKeys.forEach(key => {
    if (params[key] === undefined) {
      params[key] = '';
    }
  });
  if (params) {
    Object.keys(params).forEach((key) => {
      tamplate = tamplate.split('${' + key + '}').join(params[key]);
    });
  }
  return tamplate;
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
      throw new Error('`option.outputDir` should not empty');
    }

    this.pomOutputDir = option.outputDir;
    option.outputDir = path.join(option.outputDir, 'src/main/java', javaPackage.split('.').join('/'));
    this.className = option && option.className;
    this.baseClient = option && option.baseClient || javaPackage + '.BaseClient';
    this.package = javaPackage;
    this.packageInfo = option.java.packageInfo;
    this.config = Object.assign({
      outputDir: '',
      indent: '    ',
      clientPath: 'Client.java'
    }, option);
    this.output = '';
    this.outputDir = this.config.outputDir;
    if (!this.outputDir) {
      throw new Error('`option.outputDir` should not empty');
    }

    fs.mkdirSync(this.outputDir, {
      recursive: true
    });

    remove(path.join(this.outputDir, 'models/'));
  }

  visit(ast, level = 0) {
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
    this.emit('\n');
    var realClass = _type(ast.list.inferred.itemType.name);
    if (realClass.type === 'model') {
      realClass = `${realClass.moduleName}.${realClass.name}`;
    }
    this.emit(`for (${realClass} ${_name(ast.id)} : `, level);
    this.visitExpr(ast.list, level + 1);
    this.emit(') {\n');
    this.visitStmts(ast.stmts, level + 1);
    this.emit('}\n', level);
  }

  async visitPom() {
    var entities = new Entities();
    var targetFile = this.pomOutputDir + '/pom.xml';
    var pomFile;
    var dependenciesClass = [];
    var havePom = false;
    if (fs.existsSync(targetFile)) {
      havePom = true;
      pomFile = fs.readFileSync(targetFile);
    } else {
      pomFile = fs.readFileSync(path.join(__dirname, 'pom.xml'));
    }
    Object.keys(this.imports).forEach((key) => {
      dependenciesClass.push(this.imports[key].release);
    });
    const json = await parse(pomFile);
    var needAddDependencies = [];
    if (!havePom) {
      json.project.dependencies = { dependency: [] };
      dependenciesClass.push('com.aliyun:tea:[0.0.24, 1.0.0)');
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
    let newPom = builder.buildObject(json);
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
    // global definition
    for (let i = 0; i < models.length; i++) {
      const modelName = models[i].modelName.lexeme;

      this.modelBefore(level, modelName);

      this.eachModel(models[i], level);
      if (ast.models) {
        const subModels = Object.keys(ast.models).filter((key) => {
          return key.indexOf(modelName + '.') !== -1;
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
    this.apiBefore(level, extendParam, extendsClass);

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
    this.save(this.config.clientPath);
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
      for (var i = 0; i < names.length; i++) {
        name += _upperFirst(names[i]);
      }
      return name;
    }
    return className;

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
    } else if (ast.fieldType === 'array') {
      this.emit(`java.util.List<`);
      this.visitType(ast.fieldItemType, true);
      this.emit(`>`);
    } else if (ast.type === 'model') {
      if (ast.moduleName) {
        this.emit(`${this.imports[ast.moduleName].package}.models.`);
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
      this.emit(className);
    } else if (ast.type === 'moduleModel') {
      let className = '';
      for (let i = 0; i < ast.path.length; i++) {
        const item = ast.path[i];
        if (i > 0) {
          className += '.';
        }
        className += item.lexeme;
      }
      var index = className.indexOf('.');
      var key = className.substring(0, index);
      var packageName = this.imports[key].package + '.models';
      className = packageName + className.substring(index);
      this.emit(className);
    } else if (ast.type === 'basic') {
      this.emit(_type(ast.name));
    } else if (this.predefined && this.predefined[`module:${_name(ast)}`]) {
      var className = this.imports[ast.lexeme].className || 'Client';
      this.emit(`${this.imports[_name(ast)]}.${className}`);
    } else if (ast.type === 'moduleModel') {
      this.emit(`${this.imports[ast.path[0].lexeme].package}.models`);
      for (var i = 1; i < ast.path.length; i++) {
        this.emit(`.${ast.path[i].lexeme}`);
      }
    } else if (ast.idType === 'module') {
      let className = this.imports[ast.lexeme].className || 'Client';
      this.emit(`${this.imports[ast.lexeme].package}.${className}`);
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
    annotation.value.split('\n').forEach((line) => {
      this.emit(`${line}`, level);
      this.emit(`\n`);
    });
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
      this.emit('try {\n', level);
      this.visitStmts(ast.tryBlock, level + 1);
      this.emit('}', level);
      if (ast.catchBlock && ast.catchBlock.stmts.length > 0) {
        this.emit(` catch (Exception ${_name(ast.catchId)}){\n`);
        this.visitStmts(ast.catchBlock, level + 1);
        this.emit('}', level);
      }
      if (ast.finallyBlock && ast.finallyBlock.stmts.length > 0) {
        this.emit(' finally {\n');
        this.visitStmts(ast.finallyBlock, level + 1);
        this.emit('}', level);
      }
      this.emit('\n', level);
    } else {
      this.emit(``, level);
      this.visitExpr(ast, level);
      this.emit(';\n');
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
      const pattern = getAttr(node, 'pattern') || '';
      const maxLength = getAttr(node, 'maxLength') || 0;
      const minLength = getAttr(node, 'minLength') || 0;
      const required = node.required || false;
      const deprecated = getAttr(node, 'deprecated');
      if (description) {
        this.emit(`// ${description}\n`, level);
      }
      this.emit(`@NameInMap("${realName}")\n`, level);
      if (deprecated === 'true') {
        this.emit(`@Deprecated\n`, level);
      }
      if (required || maxLength > 0 || pattern !== '') {
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
        if (maxLength > 0) {
          if (!validationAnnotation.endsWith('(')) {
            validationAnnotation += ', ';
          }
          validationAnnotation += `maxLength = ${maxLength}`;
        }
        if (minLength > 0) {
          if (!validationAnnotation.endsWith('(')) {
            validationAnnotation += ', ';
          }
          validationAnnotation += `minLength = ${minLength}`;
        }
        this.emit(validationAnnotation, level);
        this.emit(')\n');
      }
      this.emit('public ', level);
      if (value.fieldType === 'array') {
        // basic type
        this.emit(`java.util.List<`);
        if (value.fieldItemType.tag === 8) {
          this.emit(`${collectionType(_type(value.fieldItemType.lexeme))}`);
        } else if (value.fieldItemType.type === 'map') {
          this.emit(`java.util.Map<${collectionType(_type(value.fieldItemType.keyType.lexeme))}, ${collectionType(_type(value.fieldItemType.valueType.lexeme))}>`);
        } else if (value.fieldItemType.fieldType === 'array') {
          this.visitType(value.fieldItemType);
        } else {
          if (node.fieldValue.itemType) {
            this.emit(`${_subModelName(node.fieldValue.itemType)}`);
          } else {
            this.emit(`${_name(node.fieldValue.fieldItemType)}`);
          }
        }
        this.emit(`>`);
      } else if (value.fieldType === 'map') {
        this.emit(`java.util.Map<${collectionType(_type(value.keyType.lexeme))}, ${collectionType(_type(value.valueType.lexeme))}>`);
      } else if (typeof value.fieldType === 'string') {
        this.emit(`${_type(value.fieldType)}`);
      } else if (value.fieldType) {
        if (value.fieldType.idType && value.fieldType.idType === 'module') {
          var className = this.imports[`${_type(value.fieldType.lexeme)}`].className || 'Client';
          this.emit(this.imports[`${_type(value.fieldType.lexeme)}`].package);
          this.emit(`.${className}`);
        } else if (value.fieldType.type && value.fieldType.type === 'moduleModel') {
          this.emit(this.imports[_name(value.fieldType.path[0])].package);
          this.emit(`.models.${_name(value.fieldType.path[1])}`);
        } else {
          this.emit(`${_type(value.fieldType.lexeme)}`);
        }
      } else {
        this.emit(_subModelName([modelName, _name(node.fieldName)].join('.')));
      }
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
  eachModel(ast, level) {
    assert.equal(ast.type, 'model');
    const modelName = _name(ast.modelName);
    this.visitAnnotation(ast.annotation, level);
    this.emit(`public class ${modelName} extends TeaModel {\n`, level);
    this.visitModelBody(ast.modelBody, level + 1, modelName);
    this.visitBuildMethod(ast, level + 1);
  }
  visitBuildMethod(ast, level) {
    var className = this.getSubFieldClassName(ast.modelName.lexeme);
    this.emit(`public static ${className} build(java.util.Map<String, ?> map) throws Exception {\n`, level);
    this.emit(`${className} self = new ${className}();\n`, level + 1);
    this.emit('return TeaModel.build(map, self);\n', level + 1);
    this.emit(`}\n\n`, level);
  }

  eachSubModel(ast, level) {
    assert.equal(ast.type, 'model');
    const modelName = _subModelName(_name(ast.modelName));
    this.visitAnnotation(ast.annotation, level);
    this.emit(`public static class ${modelName} extends TeaModel {\n`, level);
    this.visitModelBody(ast.modelBody, level + 1, modelName);
    this.visitBuildMethod(ast, level + 1);
    this.emit('}\n\n', level);
  }

  visitObjectFieldValue(ast, level) {
    this.visitExpr(ast, level);
  }

  visitObjectField(ast, level) {
    let comments = DSL.comment.getFrontComments(this.comments, ast.tokenRange[0]);
    this.visitComments(comments, level);
    if (ast.type === 'objectField') {
      var key = _name(ast.fieldName);
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
      throw new Error('un-implemented');
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
      this.emit(`Client.${_name(ast.left.id)}(`);
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
      this.emit(`${expr}.get(`)
      this.visitExpr(ast.accessKey);
      this.emit(`)`);
    } else {
      this.emit(`${expr}.put(`, level)
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
      this.emit(`${expr}.get(`)
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
    var pathName = this.imports[ast.inferred.name].package;
    this.emit(`${pathName}.Client`);
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
    if (ast.object && ast.object.fields && ast.object.fields.length > 0) {
      this.visitType(ast.inferred);
      this.emit(`.build(`);
      this.visitObject(ast.object, level);
      this.emit(`)`);
      return;
    }
    this.emit(`new `);
    this.visitType(ast.inferred);
    this.emit(`()`);
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
      this.visitArrayAccess(ast.left, false, level)
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
    this.emit('public ', level);
    if (ast.isStatic) {
      this.emit('static ');
    }
    this.visitType(ast.returnType);
    this.emit(` ${_name(ast.functionName)}`);
    if (_name(ast.functionName) === 'main') {
      this.emit('(String[] args)');
    } else {
      this.visitParams(ast.params, level);
    }
    this.emit(' throws Exception');
    this.emit(' {\n');
    if (ast.functionBody) {
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
    this.emit(`public ${className}`, level);
    this.visitParams(ast.params, level);
    this.emit(' throws Exception {\n');
    if (ast.initBody) {
      this.visitStmts(ast.initBody, level + 1);
    }
    this.emit('}\n\n', level);
  }

  eachAPI(ast, level) {
    // if (ast.annotation) {
    //   this.emit(`${ _anno(ast.annotation.value) } \n`, level);
    // }
    this.emit('public ', level);
    this.visitType(ast.returnType);
    this.emit(` ${_name(ast.apiName)}`);
    this.visitParams(ast.params, level);
    this.emit(' throws Exception');
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
      this.emit(`, ${RUNTIME});\n`);
    } else {
      this.emit(`, new java.util.HashMap<>());\n`);
    }

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
    this.emit('continue;\n', level + 3);
    this.emit('}\n', level + 2);
    this.emit('throw e;\n', level + 2);
    this.emit('}\n', level + 1);
    this.emit('}\n\n', level);
    this.emit('throw new TeaUnretryableException(_lastRequest);\n', level);
  }

  importBefore(level) {
    this.emit(`// This file is auto-generated, don't edit it. Thanks.\n`, level);
  }

  modelBefore() {
    this.emit(`// This file is auto-generated, don't edit it. Thanks.
package ${this.package}.models;

import com.aliyun.tea.*;

`);
  }

  apiBefore(level, extendParam, extendsClass) {
    this.emit(`// This file is auto-generated, don't edit it. Thanks.
package ${this.package};

import com.aliyun.tea.*;
`);
    if (extendParam.writeImport) {
      this.emit(`import ${this.package}.models.*;`);
    }

    this.emit(`

public class Client `);
    if (extendsClass) {
      this.emit(`extends ${extendsClass.package + '.' + extendsClass.className} {`);
    } else {
      this.emit(`{\n`);
    }
  }

  wrapBefore() {
    this.emit(`\n`);
  }

}

module.exports = Visitor;