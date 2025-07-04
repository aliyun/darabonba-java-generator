'use strict';
const DSL = require('@darabonba/parser');
const { _vid, _name, _upperFirst, _isBinaryOp } = require('./helper');

const types = [
  'integer', 'int8', 'int16', 'int32',
  'int64', 'long', 'ulong', 'string',
  'uint8', 'uint16', 'uint32', 'uint64',
  'number', 'float', 'double', 'boolean',
  'bytes', 'readable', 'writable', 'object', 'any'
];

const BuiltinModule = {
  DaraCore : {
    packageName: 'com.aliyun.darabonba',
    className: 'Core',
  },
  JSON: {
    packageName: 'com.aliyun.darabonba.utils',
    className: 'JSONUtils',
  },
};

class Builtin {
  constructor(generator, aliasId = '', methods = []) {
    this.generator = generator;
    this.module = module;
    this.aliasId = aliasId;

    methods.forEach(method => {
      this[method] = function (ast, level, env) {
        const clientName = this.getClientName();
        this.generator.emit(`${clientName}.${method}`);
        this.generator.visitArgs(ast, level, env);
      };
    });
  }

  getInstanceName(ast, level, options) {
    if (ast.left.id.tag === DSL.Tag.Tag.VID) {
      this.generator.emit(`this.${_vid(ast.left.id)}`);
    } else {
      // this.generator.visitExpr(ast.left.id, level);
      this.generator.emit(`${_name(ast.left.id)}`);
    }
  }

  getClientName(aliasId) {
    const { packageName, className } = BuiltinModule[aliasId || this.aliasId];
    if (!this.generator.moduleClass.has(aliasId || this.aliasId)) {
      this.generator.moduleClass.set(aliasId || this.aliasId, {
        packageName,
        className,
      });
    }
    this.generator.clientName.set(className, false);
    return this.generator.getRealClientName(aliasId || this.aliasId);
  }
}

class Converter extends Builtin {
  constructor(generator) {
    super(generator, 'Converter');
  }

  int32(ast, level, options) {
    this.generator.emit('ConverterUtils.parseInt(');
    if(_isBinaryOp(ast.args[0])) {
      this.generator.emit('(');
    }
    this.generator.visitExpr(ast.args[0], level, options);
    if(_isBinaryOp(ast.args[0])) {
      this.generator.emit(')');
    }
    this.generator.emit(')');
  }

  int64(ast, level, options) {
    this.generator.emit('ConverterUtils.parseInt(');
    if(_isBinaryOp(ast.args[0])) {
      this.generator.emit('(');
    }
    this.generator.visitExpr(ast.args[0], level, options);
    if(_isBinaryOp(ast.args[0])) {
      this.generator.emit(')');
    }
    this.generator.emit(')');
  }

  long(ast, level, options) {
    this.generator.emit('ConverterUtils.parseLong(');
    if(_isBinaryOp(ast.args[0])) {
      this.generator.emit('(');
    }
    this.generator.visitExpr(ast.args[0], level, options);
    if(_isBinaryOp(ast.args[0])) {
      this.generator.emit(')');
    }
    this.generator.emit(')');
  }

  double(ast, level, options) {
    this.generator.emit('Double.parseDouble(');
    if(_isBinaryOp(ast.args[0])) {
      this.generator.emit('(');
    }
    this.generator.visitExpr(ast.args[0], level, options);
    if(_isBinaryOp(ast.args[0])) {
      this.generator.emit(')');
    }
    this.generator.emit('.toString())');
  }

  float(ast, level, options) {
    const expr = ast.args[0];
    this.generator.emit('ConverterUtils.parseFloat(');
    this.generator.visitExpr(expr, level, options);
    this.generator.emit(')');
  }

  string(ast, level, options) {
    if(_isBinaryOp(ast.args[0])) {
      this.generator.emit('(');
    }
    this.generator.visitExpr(ast.args[0], level, options);
    if(_isBinaryOp(ast.args[0])) {
      this.generator.emit(')');
    }
    this.generator.emit('.toString()');
  }

  boolean(ast, level, options) {
    const expr = ast.args[0];
    this.generator.emit('ConverterUtils.parseBoolean(');
    this.generator.visitExpr(expr, level, options);
    this.generator.emit(')');
  }

  // 只允许传字符串
  // bytes(ast, level, options) {
  //   const expr = ast.args[0];
  //   this.generator.emit('(byte[])(');
  //   this.generator.visitExpr(expr, level, options);
  //   this.generator.emit(')');
  // }

  any(ast, level, options) {
    const expr = ast.args[0];
    this.generator.visitExpr(expr, level, options);
  }

  object(ast, level, options) {
    const expr = ast.args[0];
    this.generator.emit('(Map<String, Object>)(');
    this.generator.visitExpr(expr, level, options);
    this.generator.emit(')');
  }

  // readable(ast, level, env) {
  //   const clientName = this.getClientName('ConverterUtil');
  //   this.generator.emit(`${clientName}.ToStream(`);
  //   this.generator.visitExpr(ast.args[0], level, env);
  //   this.generator.emit(')');
  // }

  // writable(ast, level, env) {
  //   this.generator.used.push('System.IO');
  //   const expr = ast.args[0];
  //   this.generator.emit('(Stream)');
  //   this.generator.visitExpr(expr, level, env);
  // }
}

class String extends Builtin {
  constructor(generator) {
    super(generator, 'String');
  }

  equals(ast, level, options) {
    const expr = ast.args[0];
    this.getInstanceName(ast, level, options);
    this.generator.emit('.equals(');
    this.generator.visitExpr(expr, level, options);
    this.generator.emit(')');
  }

  split(ast, level, options) {
    const expr = ast.args[0];
    this.getInstanceName(ast, level, options);
    this.generator.emit('.split(');
    this.generator.visitExpr(expr, level, options);
    this.generator.emit(')');
  }

  contains(ast, level, options) {
    const expr = ast.args[0];
    this.getInstanceName(ast, level, options);
    this.generator.emit('.contains(');
    this.generator.visitExpr(expr, level, options);
    this.generator.emit(')');
  }

  length(ast, level, options) {
    this.getInstanceName(ast, level, options);
    this.generator.emit('.length()');
  }

  hasPrefix(ast, level, options) {
    const expr = ast.args[0];
    this.getInstanceName(ast, options);
    this.generator.emit('.startsWith(');
    this.generator.visitExpr(expr, level, options);
    this.generator.emit(')');
  }

  hasSuffix(ast, level, options) {
    const expr = ast.args[0];
    this.getInstanceName(ast, options);
    this.generator.emit('.endsWith(');
    this.generator.visitExpr(expr, level, options);
    this.generator.emit(')');
  }

  index(ast, level, options) {
    const expr = ast.args[0];
    this.getInstanceName(ast, options);
    this.generator.emit('.indexOf(');
    this.generator.visitExpr(expr, level, options);
    this.generator.emit(')');
  }

  subString(ast, level, options) {
    this.getInstanceName(ast, options);
    this.generator.emit('.substring(');
    this.generator.visitExpr(ast.args[0], level, options);
    this.generator.emit(', ');
    this.generator.visitExpr(ast.args[1], level, options);
    this.generator.emit(')');
  }
  
  toLower(ast, level, options) {
    this.getInstanceName(ast, level, options);
    this.generator.emit('.toLowerCase()');
  }

  toUpper(ast, level, options) {
    this.getInstanceName(ast, level, options);
    this.generator.emit('.toUpperCase()');
  }

  // TODO 是否要包含为null的情况
  empty(ast, level, options) {
    this.getInstanceName(ast, level, options);
    this.generator.emit('.isEmpty()');
  }

  // 是否要支持小数转整数的情况，如果要支持，则需要写到核心库中
  parseInt(ast, level, options) {
    this.generator.emit('Integer.parseInt(');
    this.getInstanceName(ast, level, options);
    this.generator.emit(')');
  }

  parseLong(ast, level, options) {
    this.generator.emit('Long.parseLong(');
    this.getInstanceName(ast, level, options);
    this.generator.emit(')');
  }

  parseFloat(ast, level, options) {
    this.generator.emit('Float.parseFloat(');
    this.getInstanceName(ast, level, options);
    this.generator.emit(')');
  }

  parseDouble(ast, level, options) {
    this.generator.emit('Double.parseDouble(');
    this.getInstanceName(ast, level, options);
    this.generator.emit(')');
  }
}

class JSON extends Builtin {
  constructor(generator) {
    super(generator, 'JSON');
  }
  stringify(ast, level, options) {
    this.generator.emit(`JSONUtils.stringify(`);
    this.generator.visitExpr(ast.args[0], level, options);
    this.generator.emit(')');
  }

  parseJSON(ast, level, options) {
    this.generator.emit(`JSONUtils.parseJSON(`);
    this.generator.visitExpr(ast.args[0], level, options);
    this.generator.emit(')');
  }

  readPath(ast, level, options) {
    this.generator.emit(`JSONUtils.readPath(`);
    this.generator.visitExpr(ast.args[0], level, options);
    this.generator.emit(', ');
    this.generator.visitExpr(ast.args[1], level, options);
    this.generator.emit(')');
  }

}

class XML extends Builtin {
  constructor(generator) {
    const methods = ['parseXml', 'toXML'];
    super(generator, `XmlUtils`, methods);
  }
}

class Form extends Builtin {
  constructor(generator) {
    const methods = ['toFormString', 'getBoundary', 'toFileForm'];
    super(generator, 'FormUtils', methods);
  }
}

class URL extends Builtin {
  constructor(generator) {
    const methods = ['parse', 'urlEncode', 'percentEncode', 'pathEncode'];
    super(generator, `URL`, methods);
  }
}


class Stream extends Builtin {
  constructor(generator) {
    const methods = ['readAsBytes', 'readAsBytesAsync', 'readAsJSON', 'readAsJSONAsync', 'readAsString', 'readAsStringAsync', 'readAsSSE', 'readAsSSEAsync'];
    super(generator, 'StreamUtils', methods);
  }

  read(ast, level, env) {
    const clientName = this.getClientName();
    this.generator.emit(`${clientName}.Read(`);
    this.getInstanceName(ast);
    this.generator.emit(', ');
    env.groupOp = false;
    this.generator.visitExpr(ast.args[0], level, env);
    this.generator.emit(')');
  }

  write(ast, level, env) {
    this.getInstanceName(ast);
    this.generator.emit('.Write(');
    this.generator.visitExpr(ast.args[0], level, env);
    this.generator.emit(', 0, ');
    env.groupOp = true;
    this.generator.visitExpr(ast.args[0], level, env);
    this.generator.emit('.Length');
    this.generator.emit(')');
  }

  pipe(ast, level, env) {
    const clientName = this.getClientName();
    this.generator.emit(`${clientName}.Pipe(`);
    this.getInstanceName(ast);
    this.generator.emit(', ');
    env.groupOp = false;
    this.generator.visitExpr(ast.args[0], level, env);
    this.generator.emit(')');
  }
}

class File extends Builtin {
  constructor(generator) {
    // TODO read/write/close
    const methods = ['createReadStream', 'createWriteStream', 'exists'];
    super(generator, 'File', methods);
  }
}

class Bytes extends Builtin {
  constructor(generator) {
    super(generator, 'BytesUtils');
  }
  from(ast, level, env) {
    // 同 TeaString.ToBytes
    const clientName = this.getClientName();
    this.generator.emit(`${clientName}.From(`);
    this.generator.visitExpr(ast.args[0], level, env);
    this.generator.emit(', ');
    this.generator.visitExpr(ast.args[1], level, env);
    this.generator.emit(')');
  }

  toString(ast) {
    this.generator.used.push('System.Text');
    this.generator.emit(`Encoding.UTF8.GetString(`);
    this.getInstanceName(ast);
    this.generator.emit(')');
  }

  // 和sdk的hexEncode方法保持一致：https://github.com/aliyun/darabonba-openapi-util/blob/master/csharp/core/Client.cs
  // 原生方法 BitConverter.ToString()，生成以’-‘连接的16进制格式
  toHex(ast) {
    const clientName = this.getClientName();
    this.generator.emit(`${clientName}.ToHex(`);
    this.getInstanceName(ast);
    this.generator.emit(')');
  }

  toBase64(ast) {
    this.generator.emit('Convert.ToBase64String(');
    this.getInstanceName(ast);
    this.generator.emit(')');
  }

  toJSON(ast) {
    this.toString(ast);
  }

  length(ast) {
    this.getInstanceName(ast);
    this.generator.emit('.Length');
  }
}

class Map extends Builtin {
  constructor(generator) {
    super(generator, 'ConverterUtils');
  }

  length(ast) {
    this.getInstanceName(ast);
    this.generator.emit('.Count');
  }

  keySet(ast) {
    this.getInstanceName(ast);
    this.generator.emit('.Keys.ToList()');
  }

  entries(ast) {
    this.getInstanceName(ast);
    this.generator.emit('.ToList()');
  }

  toJSON(ast) {
    this.generator.used.push('Newtonsoft.Json');
    this.generator.emit('JsonConvert.SerializeObject(');
    this.getInstanceName(ast);
    this.generator.emit(')');
  }

  merge(ast) {
    const clientName = this.getClientName();
    this.generator.emit(`${clientName}.Merge(`);
    this.getInstanceName(ast);
    this.generator.emit(' , ');
    this.generator.visitExpr(ast.args[0]);
    this.generator.emit(')');
  }
}

class Entry extends Builtin {

  key(ast) {
    this.getInstanceName(ast);
    this.generator.emit('.Key');
  }

  value(ast) {
    this.getInstanceName(ast);
    this.generator.emit('.Value');
  }
}

class ModelInstance extends Builtin {

  toMap(ast) {
    this.getInstanceName(ast);
    this.generator.emit('.ToMap()');
  }

}

class Env extends Builtin {
  get(ast, level) {
    const key = ast.args[0];
    this.generator.emit(`System.getenv(`);
    this.generator.visitExpr(key, level);
    this.generator.emit(')');
  }
}

class Func extends Builtin {

  sleep(ast, level, options) {
    this.generator.emit(`Thread.sleep(`);
    this.generator.visitExpr(ast.args[0], level, options);
    this.generator.emit(')');
  }

  isNull(ast, level, options) {
    if(_isBinaryOp(ast.args[0])) {
      this.generator.emit('(');
    }
    this.generator.emit(`(null == `);
    this.generator.visitExpr(ast.args[0], level, options);
    if(_isBinaryOp(ast.args[0])) {
      this.generator.emit(')');
    }
    this.generator.emit(')');
  }

  equal(ast, level, options) {
    this.generator.visitExpr(ast.args[0], level, options);
    this.generator.emit(' == ');
    this.generator.visitExpr(ast.args[1], level, options);
  }

  default(ast, level, options) {
    this.generator.visitExpr(ast.args[0], level, options);

    if(ast.args[0].inferred && ast.args[0].inferred.name === 'boolean') {
      this.generator.emit(' || ');
    } else {
      this.generator.emit(' == null ? ');
      this.generator.visitExpr(ast.args[0], level, options);
      this.generator.emit(' : ');
    }
    this.generator.visitExpr(ast.args[1], level, options);
  }
}

class Logger {
  constructor(generator) {
    this.generator = generator;
    const methods = ['trace', 'debug', 'info', 'warning', 'error'];
    methods.forEach(method => {
      this[method] = function (ast, level) {
        this.generator.emit('System.out.println');
        this.generator.visitArgs(ast.args, level);
      };
    });
  }
}

module.exports = (generator) => {
  const builtin = {};
  builtin['$JSON'] = new JSON(generator);
  builtin['$XML'] = new XML(generator);
  builtin['$URL'] = new URL(generator);
  builtin['$Env'] = new Env(generator);
  builtin['$Form'] = new Form(generator);
  builtin['$File'] = new File(generator);
  builtin['$Logger'] = new Logger(generator);
  builtin['$String'] = new String(generator);
  builtin['$Stream'] = new Stream(generator);
  builtin['$Number'] = new Number(generator);
  builtin['$Bytes'] = new Bytes(generator);
  builtin['$Array'] = new Array(generator);
  builtin['$Date'] = new Date(generator);
  builtin['$Map'] = new Map(generator);
  builtin['$Entry'] = new Entry(generator);

  const converter = new Converter(generator);
  types.map(type => {
    builtin[`$${type}`] = converter;
  });

  const func = new Func(generator);
  builtin['$isNull'] = func;
  builtin['$sleep'] = func;
  builtin['$default'] = func;
  builtin['$equal'] = func;

  builtin['$ModelInstance'] = new ModelInstance(generator);

  return builtin;
};