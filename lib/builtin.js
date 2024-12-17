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

  getInstanceName(ast, level) {
    if (ast.left.id.tag === DSL.Tag.Tag.VID) {
      this.generator.emit(`this.${_vid(ast.left.id)}`, level);
    } else {
      this.generator.emit(`${_name(ast.left.id)}`, level);
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

  int32(ast, level) {
    this.generator.emit('(Integer)(');
    if(_isBinaryOp(ast.args[0])) {
      this.generator.emit('(');
    }
    this.generator.visitExpr(ast.args[0], level);
    if(_isBinaryOp(ast.args[0])) {
      this.generator.emit(')');
    }
    this.generator.emit(')');
  }

  int64(ast, level) {
    this.generator.emit('(Long)(');
    if(_isBinaryOp(ast.args[0])) {
      this.generator.emit('(');
    }
    this.generator.visitExpr(ast.args[0], level);
    if(_isBinaryOp(ast.args[0])) {
      this.generator.emit(')');
    }
    this.generator.emit(')');
  }

  long(ast, level) {
    this.generator.emit('(Long)(');
    if(_isBinaryOp(ast.args[0])) {
      this.generator.emit('(');
    }
    this.generator.visitExpr(ast.args[0], level);
    if(_isBinaryOp(ast.args[0])) {
      this.generator.emit(')');
    }
    this.generator.emit(')');
  }

  double(ast, level) {
    this.generator.emit('(Double)(');
    if(_isBinaryOp(ast.args[0])) {
      this.generator.emit('(');
    }
    this.generator.visitExpr(ast.args[0], level);
    if(_isBinaryOp(ast.args[0])) {
      this.generator.emit(')');
    }
    this.generator.emit(')');
  }

  float(ast, level) {
    const expr = ast.args[0];
    this.generator.emit('(Float)(');
    this.generator.visitExpr(expr, level);
    this.generator.emit(')');
  }

  string(ast, level) {
    this.generator.emit('(String)(');
    if(_isBinaryOp(ast.args[0])) {
      this.generator.emit('(');
    }
    this.generator.visitExpr(ast.args[0], level);
    if(_isBinaryOp(ast.args[0])) {
      this.generator.emit(')');
    }
    this.generator.emit(')');
  }

  boolean(ast, level) {
    const expr = ast.args[0];
    this.generator.emit('(Boolean)(');
    this.generator.visitExpr(expr, level);
    this.generator.emit(')');
  }

  // 只允许传字符串
  // bytes(ast, level, env) {
  //   const expr = ast.args[0];
  //   this.generator.emit('(byte[])(');
  //   this.generator.visitExpr(expr, level, env);
  //   this.generator.emit(')');
  // }

  any(ast, level, env) {
    const expr = ast.args[0];
    this.generator.visitExpr(expr, level, env);
  }

  // 强转成 Dictionary<string, object>
  object(ast, level, env) {
    const expr = ast.args[0];
    this.generator.emit('(Map<String, Object>)(');
    this.generator.visitExpr(expr, level);
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

class JSON extends Builtin {
  constructor(generator) {
    super(generator, 'JSON');
  }
  stringify(ast, level) {
    this.generator.emit(`JSONUitls.stringify(`);
    this.generator.visitExpr(ast.args[0], level);
    this.generator.emit(')');
  }

  parseJSON(ast, level) {
    this.generator.emit(`JSONUitls.parseJSON(`);
    this.generator.visitExpr(ast.args[0], level);
    this.generator.emit(')');
  }

  readPath(ast, level) {
    this.generator.emit(`JSONUitls.readPath(`);
    this.generator.visitExpr(ast.args[0], level);
    this.generator.emit(', ');
    this.generator.visitExpr(ast.args[1], level);
    this.generator.emit(')');
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

  sleep(ast, level) {
    // const clientName = this.getClientName('DaraCore');
    // this.generator.emit(`${clientName || 'Thread'}.Sleep(`);
    this.generator.emit(`Thread.Sleep(`);
    this.generator.visitExpr(ast.args[0], level);
    this.generator.emit(')');
  }

  isNull(ast, level) {
    
    // const clientName = this.getClientName();
    if(_isBinaryOp(ast.args[0])) {
      this.generator.emit('(');
    }
    this.generator.emit(`(null == `);
    this.generator.visitExpr(ast.args[0], level);
    if(_isBinaryOp(ast.args[0])) {
      this.generator.emit(')');
    }
    this.generator.emit(')');
  }

  equal(ast, level) {
    this.generator.visitExpr(ast.args[0], level);
    this.generator.emit(' == ');
    this.generator.visitExpr(ast.args[1], level);
  }

  default(ast, level) {
    this.generator.visitExpr(ast.args[0], level);

    if(ast.args[0].inferred && ast.args[0].inferred.name === 'boolean') {
      this.generator.emit(' || ');
    } else {
      this.generator.emit(' == null ? ');
      this.generator.visitExpr(ast.args[0], level);
      this.generator.emit(' : ');
    }
    this.generator.visitExpr(ast.args[1], level);
  }
}

module.exports = (generator) => {
  const builtin = {};
  builtin['$JSON'] = new JSON(generator);
  builtin['$Env'] = new Env(generator);

  const converter = new Converter(generator);
  types.map(type => {
    builtin[`$${type}`] = converter;
  });

  const func = new Func(generator);
  builtin['$isNull'] = func;
  builtin['$sleep'] = func;
  builtin['$default'] = func;
  builtin['$equal'] = func;

  return builtin;
};