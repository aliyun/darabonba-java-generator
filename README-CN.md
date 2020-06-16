[English](/README.md) | 简体中文

# Darabonba Java 生成器

## 安装

> Darabonba 生成器只能在 Node.js 环境下运行。
> 建议使用 [NPM](https://www.npmjs.com/) 包管理工具安装
> 在终端输入以下命令进行安装:
```shell
npm install @darabonba/java-generator
```

## 使用示例

> 生成 Java 代码
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
      ...darabonbaPackageMeta,
      pkgDir: sourceDir,
      outputDir
    };
let generator = new javaGenerator(generatorConfig);
// generate Java code by generator
generator.visit(ast);
// The execution result will be output in the 'outputDir'
```

## 问题反馈

[提出问题](https://github.com/aliyun/darabonba-java-generator/issues/new/choose), 不符合指南的问题可能会立即关闭。

## 发布日志

发布详情会更新在 [release notes](/CHANGELOG.md) 文件中

## 许可证

[Apache-2.0](/LICENSE)
Copyright (c) 2009-present, Alibaba Cloud All rights reserved.