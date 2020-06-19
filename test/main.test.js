'use strict';

const path = require('path');
const fs = require('fs');
const assert = require('assert');

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
      assert.deepStrictEqual(err.message, '`option.outputDir` should not empty');
      return true;
    });
  });

  it('one model should ok', function () {
    const outputDir = path.join(__dirname, 'output/model');
    const mainFilePath = path.join(__dirname, 'fixtures/model/main.dara');
    check(mainFilePath, outputDir, path.join(__dirname, 'fixtures/model/Client.java'));
    check(mainFilePath, outputDir, path.join(__dirname, 'fixtures/model/MyModel.java'), 'src/main/java/com/aliyun/test/models/MyModel.java');
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
  });

  it('complex should ok', function () {
    const outputDir = path.join(__dirname, 'output/complex');
    const mainFilePath = path.join(__dirname, 'fixtures/complex/main.dara');
    const pkgContent = fs.readFileSync(path.join(__dirname, 'fixtures/complex/Darafile'), 'utf8');
    const pkg = JSON.parse(pkgContent);
    check(mainFilePath, outputDir, path.join(__dirname, 'fixtures/complex/Client.java'), 'src/main/java/com/aliyun/test/Client.java', {
      pkgDir: path.join(__dirname, 'fixtures/complex'),
      ...pkg
    });
    check(mainFilePath, outputDir, path.join(__dirname, 'fixtures/complex/ComplexRequest.java'), 'src/main/java/com/aliyun/test/models/ComplexRequest.java', {
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
});
