'use strict';

const path = require('path');
const fs = require('fs');
const assert = require('assert');

async function msleep(n) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, n);
  });
}

const DSL = require('@darabonba/parser');

let Generator = require('../lib/generator');

function check(mainFilePath, outputDir, expectedPath, testPath = 'src/main/java/com/aliyun/test/Client.java', options = {}) {
  const generator = new Generator({
    outputDir,
    baseClient: 'com.aliyun.test.BaseClient',
    package: 'com.aliyun.test',
    java: {},
    ...options
  });

  const dsl = fs.readFileSync(mainFilePath, 'utf8');
  const ast = DSL.parse(dsl, mainFilePath);
  generator.visit(ast);
  const clientPath = path.join(outputDir, testPath);
  const expected = fs.readFileSync(expectedPath, 'utf8');
  assert.deepStrictEqual(fs.readFileSync(clientPath, 'utf8'), expected);
}

describe('new Generator', function () {
  it('must pass in outputDir', function () {
    assert.throws(function () {
      new Generator({});
    }, function (err) {
      assert.deepStrictEqual(err.message,
        'Darafile -> java -> javaPackage should not empty, please add java option into Darafile.example:\n"java": {"package": "com.aliyun.test"}');
      return true;
    });
  });

  it('one model should ok', function () {
    const outputDir = path.join(__dirname, 'output/model');
    const mainFilePath = path.join(__dirname, 'fixtures/model/main.dara');
    check(mainFilePath, outputDir, path.join(__dirname, 'fixtures/model/Client.java'));
    check(mainFilePath, outputDir, path.join(__dirname, 'fixtures/model/MyModel.java'), 'src/main/java/com/aliyun/test/models/MyModel.java');
  });

  it('enableMinimizeModelName should ok', function () {
    const outputDir = path.join(__dirname, 'output/model');
    const mainFilePath = path.join(__dirname, 'fixtures/model/main.dara');
    const pkgContent = fs.readFileSync(path.join(__dirname, 'fixtures/model/Darafile'), 'utf8');
    const pkg = JSON.parse(pkgContent);
    check(mainFilePath, outputDir, path.join(__dirname, 'fixtures/model/Client.java'));
    check(mainFilePath, outputDir, path.join(__dirname, 'fixtures/model/MinimizeModel.java'), 'src/main/java/com/aliyun/test/models/MyModel.java', {
      pkgDir: path.join(__dirname, 'fixtures/model'),
      enableMinimizeModelName: true,
      ...pkg
    });
    check(mainFilePath, outputDir, path.join(__dirname, 'fixtures/model/MinimizeModel.java'), 'src/main/java/com/aliyun/test/models/MyModel.java', {
      pkgDir: path.join(__dirname, 'fixtures/model'),
      ...pkg
    });
  });

  it('one api should ok', function () {
    const outputDir = path.join(__dirname, 'output/api');
    const mainFilePath = path.join(__dirname, 'fixtures/api/main.dara');
    check(mainFilePath, outputDir, path.join(__dirname, 'fixtures/api/Client.java'));
  });

  it('one function should ok', function () {
    const outputDir = path.join(__dirname, 'output/function');
    const mainFilePath = path.join(__dirname, 'fixtures/function/main.dara');
    check(mainFilePath, outputDir, path.join(__dirname, 'fixtures/function/Client.java'));
  });

  it('statements should ok', function () {
    const outputDir = path.join(__dirname, 'output/statements');
    const mainFilePath = path.join(__dirname, 'fixtures/statements/main.dara');
    check(mainFilePath, outputDir, path.join(__dirname, 'fixtures/statements/Client.java'));
  });

  it('comment should ok', function () {
    const outputDir = path.join(__dirname, 'output/comment');
    const mainFilePath = path.join(__dirname, 'fixtures/comment/main.dara');
    check(mainFilePath, outputDir, path.join(__dirname, 'fixtures/comment/Client.java'));
    assert.deepStrictEqual(fs.readFileSync(path.join(__dirname, 'fixtures/comment/models/Test1.java'), 'utf8'),
      fs.readFileSync(path.join(outputDir, 'src/main/java/com/aliyun/test/models/Test1.java'), 'utf8'));
    assert.deepStrictEqual(fs.readFileSync(path.join(__dirname, 'fixtures/comment/models/Test2.java'), 'utf8'),
      fs.readFileSync(path.join(outputDir, 'src/main/java/com/aliyun/test/models/Test2.java'), 'utf8'));
    assert.deepStrictEqual(fs.readFileSync(path.join(__dirname, 'fixtures/comment/models/Test3.java'), 'utf8'),
      fs.readFileSync(path.join(outputDir, 'src/main/java/com/aliyun/test/models/Test3.java'), 'utf8'));
    assert.deepStrictEqual(fs.readFileSync(path.join(__dirname, 'fixtures/comment/models/Test4.java'), 'utf8'),
      fs.readFileSync(path.join(outputDir, 'src/main/java/com/aliyun/test/models/Test4.java'), 'utf8'));
  });

  it('complex should ok', function () {
    const outputDir = path.join(__dirname, 'output/complex');
    const mainFilePath = path.join(__dirname, 'fixtures/complex/main.dara');
    const pkgContent = fs.readFileSync(path.join(__dirname, 'fixtures/complex/Darafile'), 'utf8');
    const pkg = JSON.parse(pkgContent);
    check(mainFilePath, outputDir, path.join(__dirname, 'fixtures/complex/NameTest.java'), 'src/main/java/com/aliyun/test/NameTest.java', {
      pkgDir: path.join(__dirname, 'fixtures/complex'),
      ...pkg
    });
    check(mainFilePath, outputDir, path.join(__dirname, 'fixtures/complex/ComplexRequest.java'), 'src/main/java/com/aliyun/test/models/ComplexRequest.java', {
      pkgDir: path.join(__dirname, 'fixtures/complex'),
      ...pkg
    });
    check(mainFilePath, outputDir, path.join(__dirname, 'fixtures/complex/ImplementsTest.java'), 'src/main/java/com/aliyun/test/ImplementsTest.java', {
      pkgDir: path.join(__dirname, 'fixtures/complex'),
      ...pkg
    });
  });

  it('import should ok', function () {
    const outputDir = path.join(__dirname, 'output/import');
    const mainFilePath = path.join(__dirname, 'fixtures/import/main.dara');
    const pkgContent = fs.readFileSync(path.join(__dirname, 'fixtures/import/Darafile'), 'utf8');
    const pkg = JSON.parse(pkgContent);
    check(mainFilePath, outputDir, path.join(__dirname, 'fixtures/import/Client.java'), 'src/main/java/com/aliyun/test/Client.java', {
      pkgDir: path.join(__dirname, 'fixtures/import'),
      ...pkg
    });
  });

  it('try should ok', function () {
    const outputDir = path.join(__dirname, 'output/try');
    const mainFilePath = path.join(__dirname, 'fixtures/try/main.dara');
    const pkgContent = fs.readFileSync(path.join(__dirname, 'fixtures/try/Darafile'), 'utf8');
    const pkg = JSON.parse(pkgContent);
    check(mainFilePath, outputDir, path.join(__dirname, 'fixtures/try/Client.java'), 'src/main/java/com/aliyun/test/Client.java', {
      pkgDir: path.join(__dirname, 'fixtures/try'),
      ...pkg
    });
  });

  it('tea should ok', function () {
    const outputDir = path.join(__dirname, 'output/tea');
    const mainFilePath = path.join(__dirname, 'fixtures/tea/main.tea');
    const pkgContent = fs.readFileSync(path.join(__dirname, 'fixtures/tea/Teafile'), 'utf8');
    const pkg = JSON.parse(pkgContent);
    check(mainFilePath, outputDir, path.join(__dirname, 'fixtures/tea/Client.java'), 'src/main/java/com/aliyun/test/Client.java', {
      pkgDir: path.join(__dirname, 'fixtures/tea'),
      ...pkg
    });
  });

  it('extend should ok', function () {
    const outputDir = path.join(__dirname, 'output/extend');
    const mainFilePath = path.join(__dirname, 'fixtures/extend/main.dara');
    const pkgContent = fs.readFileSync(path.join(__dirname, 'fixtures/extend/Darafile'), 'utf8');
    const pkg = JSON.parse(pkgContent);
    check(mainFilePath, outputDir, path.join(__dirname, 'fixtures/extend/Client.java'), 'src/main/java/com/aliyun/test/Client.java', {
      pkgDir: path.join(__dirname, 'fixtures/extend'),
      ...pkg
    });
  });

  it('set should ok', function () {
    const outputDir = path.join(__dirname, 'output/set');
    const mainFilePath = path.join(__dirname, 'fixtures/set/main.dara');
    const pkgContent = fs.readFileSync(path.join(__dirname, 'fixtures/set/Darafile'), 'utf8');
    const pkg = JSON.parse(pkgContent);
    check(mainFilePath, outputDir, path.join(__dirname, 'fixtures/set/Client.java'), 'src/main/java/com/aliyun/test/Client.java', {
      pkgDir: path.join(__dirname, 'fixtures/set'),
      exec: true,
      ...pkg
    });
  });
  it('main should ok', function () {
    const outputDir = path.join(__dirname, 'output/main');
    const mainFilePath = path.join(__dirname, 'fixtures/main/main.dara');
    const pkgContent = fs.readFileSync(path.join(__dirname, 'fixtures/main/Darafile'), 'utf8');
    const pkg = JSON.parse(pkgContent);
    check(mainFilePath, outputDir, path.join(__dirname, 'fixtures/main/Client.java'), 'src/main/java/com/aliyun/test/Client.java', {
      pkgDir: path.join(__dirname, 'fixtures/main'),
      ...pkg
    });
  });
  it('for should ok', function () {
    const outputDir = path.join(__dirname, 'output/for');
    const mainFilePath = path.join(__dirname, 'fixtures/for/main.dara');
    const pkgContent = fs.readFileSync(path.join(__dirname, 'fixtures/for/Darafile'), 'utf8');
    const pkg = JSON.parse(pkgContent);
    check(mainFilePath, outputDir, path.join(__dirname, 'fixtures/for/Client.java'), 'src/main/java/com/aliyun/test/Client.java', {
      pkgDir: path.join(__dirname, 'fixtures/for'),
      ...pkg
    });
  });
  it('typedef should ok', function () {
    const outputDir = path.join(__dirname, 'output/typedef');
    const mainFilePath = path.join(__dirname, 'fixtures/typedef/main.dara');
    const pkgContent = fs.readFileSync(path.join(__dirname, 'fixtures/typedef/Darafile'), 'utf8');
    const pkg = JSON.parse(pkgContent);
    check(mainFilePath, outputDir, path.join(__dirname, 'fixtures/typedef/Client.java'), 'src/main/java/com/aliyun/test/Client.java', {
      pkgDir: path.join(__dirname, 'fixtures/typedef'),
      ...pkg
    });
    check(mainFilePath, outputDir, path.join(__dirname, 'fixtures/typedef/M.java'), 'src/main/java/com/aliyun/test/models/M.java', {
      pkgDir: path.join(__dirname, 'fixtures/typedef'),
      ...pkg
    });
  });

  it('pom should ok', async function () {
    const outputDir = path.join(__dirname, 'output/pom');
    const mainFilePath = path.join(__dirname, 'fixtures/pom/main.dara');
    const pkgContent = fs.readFileSync(path.join(__dirname, 'fixtures/pom/Darafile'), 'utf8');
    const pkg = JSON.parse(pkgContent);
    // 由于pom文件的生成是异步的，所以没有使用其他测试用例check逻辑，通过sleep时间进行验证
    const generator = new Generator({
      outputDir,
      baseClient: 'com.aliyun.test.BaseClient',
      package: 'com.aliyun.test',
      java: {},
      pkgDir: path.join(__dirname, 'fixtures/pom'),
      ...pkg
    });
    const dsl = fs.readFileSync(mainFilePath, 'utf8');
    const ast = DSL.parse(dsl, mainFilePath);
    generator.visit(ast);
    const clientPath = path.join(outputDir, 'pom.xml');
    const expected = fs.readFileSync(path.join(__dirname, 'fixtures/pom/pom.xml'), 'utf8');
    await msleep(500);
    assert.deepStrictEqual(fs.readFileSync(clientPath, 'utf8'), expected);
  });
});