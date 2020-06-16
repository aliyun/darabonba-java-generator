English | [简体中文](/README-CN.md)

# Darabonba Code Generator for Java

## Installation

> Darabonba Code Generator was designed to work in Node.js.
> The preferred way to install the Generator is to use the [NPM](https://www.npmjs.com/) package manager.
> Simply type the following into a terminal window:
```shell
npm install @darabonba/java-generator
```

## Usage

> Generate Java Code
```javascript
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