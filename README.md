English | [简体中文](/README-CN.md)

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![codecov][cov-image]][cov-url]
[![David deps][david-image]][david-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/@darabonba/java-generator.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@darabonba/java-generator
[travis-image]: https://img.shields.io/travis/aliyun/darabonba-java-generator.svg?style=flat-square
[travis-url]: https://travis-ci.org/aliyun/darabonba-java-generator
[cov-image]: https://codecov.io/gh/aliyun/darabonba-java-generator/branch/master/graph/badge.svg
[cov-url]: https://codecov.io/gh/aliyun/darabonba-java-generator
[david-image]: https://img.shields.io/david/aliyun/darabonba-java-generator.svg?style=flat-square
[david-url]: https://david-dm.org/aliyun/darabonba-java-generator
[download-image]: https://img.shields.io/npm/dm/@darabonba/java-generator.svg?style=flat-square
[download-url]: https://npmjs.org/package/@darabonba/java-generator

# Darabonba Code Generator for Java

## Installation

Darabonba Code Generator was designed to work in Node.js. The preferred way to install the Generator is to use the [NPM](https://www.npmjs.com/) package manager. Simply type the following into a terminal window:
```shell
npm install @darabonba/java-generator
```

## Usage

```js
'use strict';
const path = require('path');
const fs = require('fs');
const parser = require('@darabonba/parser');
const javaGenerator = require('@darabonba/java-generator');
const sourceDir = "<Darabonda package directory>";
const outputDir = "<Generate output directory>";
// generate AST data by parser
let packageMetaFilePath = path.join(sourceDir, 'Teafile');
let packageMeta = JSON.parse(fs.readFileSync(packageMetaFilePath, 'utf8'));
let mainFile = path.join(sourceDir, packageMeta.main);
let ast = parser.parse(fs.readFileSync(mainFile, 'utf8'), mainFile);
// initialize generator
let generatorConfig = {
  ...packageMeta,
  pkgDir: sourceDir,
  outputDir
};
let generator = new javaGenerator(generatorConfig);
// generate Java code by generator
generator.visit(ast);
// The execution result will be output in the 'outputDir'
```

## Issues

[Opening an Issue](https://github.com/aliyun/darabonba-java-generator/issues/new/choose), Issues not conforming to the guidelines may be closed immediately.

## Changelog

Detailed changes for each release are documented in the [release notes](/CHANGELOG.md).

## License

[Apache-2.0](/LICENSE)
Copyright (c) 2009-present, Alibaba Cloud All rights reserved.