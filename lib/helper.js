'use strict';

const fs = require('fs');
const path = require('path');

function _name(str) {
  const keywords = ['default', 'abstract', 'assert',
    'break', 'case', 'catch', 'class', 'const',
    'continue', 'default', 'do', 'else', 'enum',
    'extends', 'final', 'finally', 'for', 'goto',
    'if', 'implements', 'import', 'instanceof',
    'interface', 'native', 'new', 'package',
    'private', 'protected', 'public', 'return',
    'strictfp', 'static', 'super', 'switch',
    'synchronized', 'this', 'throw', 'throws',
    'transient', 'try', 'volatile', 'while',
    'boolean', 'void', 'int', 'char', 'long',
    'short', 'byte', 'float', 'double',
    'true', 'false', 'null'];
  var name = str.lexeme || str.name;
  if (keywords.indexOf(name) > -1) {
    return '_' + name;
  }
  return name;
}

function _upperFirst(str) {
  return str[0].toUpperCase() + str.substring(1);
}

function _subModelName(name, conflictModelNameMap, allModleNameMap) {
  if (!name) {
    return '';
  }
  if (allModleNameMap[name]) {
    return allModleNameMap[name];
  }
  var modelName = name.split('.').map((name) => _upperFirst(name)).join('');
  const names = name.split('.');
  const modelNameKey = names[0];
  if (!conflictModelNameMap[modelNameKey]) {
    conflictModelNameMap[modelNameKey] = [];
  }
  if (modelName.length > 100 && names.length > 0) {
    modelName = _upperFirst(names.pop());
    while (names.length > 0 && conflictModelNameMap[modelNameKey] && conflictModelNameMap[modelNameKey].includes(modelName)) {
      modelName = _upperFirst(names.pop()) + modelName;
    }
  }
  conflictModelNameMap[modelNameKey].push(modelName);
  allModleNameMap[name] = modelName;
  return modelName;
}

function _lowerFirst(str) {
  return str[0].toLowerCase() + str.substring(1);
}

function _type(name) {
  if (name === 'number') {
    return 'Number';
  }

  if (name === 'integer' || name === 'int32') {
    return 'Integer';
  }

  if (name === 'readable') {
    return 'java.io.InputStream';
  }

  if (name === 'writeable') {
    return 'java.io.OutputStream';
  }

  if (name === 'long' | name === 'int64') {
    return 'Long';
  }

  if (name === 'float') {
    return 'Float';
  }

  if (name === 'double') {
    return 'Double';
  }

  if (name === 'object') {
    return 'java.util.Map<String, ?>';
  }

  if (name === 'string') {
    return 'String';
  }

  if (name === 'any') {
    return 'Object';
  }

  if (name === '$Request') {
    return 'TeaRequest';
  }

  if (name === '$Model') {
    return 'TeaModel';
  }

  if (name === '$Response') {
    return 'TeaResponse';
  }

  if (name === 'bytes') {
    return 'byte[]';
  }

  if (name === 'boolean') {
    return 'Boolean';
  }

  return name;
}

function remove(...filesPath) {
  filesPath.forEach(filePath => {
    if (fs.existsSync(filePath)) {
      if (fs.statSync(filePath).isDirectory()) {
        const files = fs.readdirSync(filePath);
        files.forEach((file, index) => {
          let curPath = path.join(filePath, file);
          if (fs.statSync(curPath).isDirectory()) {
            remove(curPath);
          } else {
            fs.unlinkSync(curPath);
          }
        });
        fs.rmdirSync(filePath);
      } else {
        fs.unlinkSync(filePath);
      }
    }
  });
}

module.exports = {
  _name, _type,
  _lowerFirst, _subModelName, remove, _upperFirst
};
