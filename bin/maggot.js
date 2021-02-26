#! /usr/bin/env node

/*
 * @Author: maggot-code
 * @Date: 2021-02-26 13:21:59
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-02-26 17:48:16
 * @Description: maggot-cli inlet
 */
const { program } = require('commander');

const ProjectRun = require('../packages/commands/project');
const ViewRun = require('../packages/commands/view');
const ComponentRun = require('../packages/commands/component');

// const packageConfig = require('../package.json');
const {
    name,
    version
} = require('../package.json');
const {
    argv
} = process;

program
    .name(name)
    .version(version, '-v, --version')
    .usage('<command> [options]');

// 创建项目指令
program
    .command('project <project-name>')
    .description('project <项目名称>')
    .action((projectName) => ProjectRun(projectName))
// 创建视图目录指令
program
    .command('view <work-name>')
    .description('view <视图目录名称>')
    .action((viewName) => ViewRun(viewName))

// 创建组件目录指令
program
    .command('component <component-name>')
    .description('component <组件名称>')
    .action((componentName) => ComponentRun(componentName))

// 设置需要解析的参数，省略参数，直接使用 process.argv
program.parse(argv);

// 没有参数的情况下，输出参数帮助文档
if (argv.slice(2).length <= 0) { program.outputHelp() }

