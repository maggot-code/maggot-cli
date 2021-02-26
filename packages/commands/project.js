/*
 * @Author: maggot-code
 * @Date: 2021-02-26 13:26:27
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-02-26 17:50:36
 * @Description: file content
 */
const inquirer = require('inquirer');
const path = require('path');
const chalk = require('chalk');
const fs = require('fs');
const { CopyTemplates } = require('../lib/files');
const log = console.log;

// 参数准备
function paramsGetready(projectName) {
    // 获取node进程的工作目录
    const cwd = process.cwd();

    // 判断是否是在当前目录
    const inCurrentDir = projectName === '.';

    // 获取项目名(当前目录 or 指定的项目名)
    const name = inCurrentDir ? path.relative('../', cwd) : projectName;

    // 真正的目录地址
    const targetDir = path.resolve(cwd, projectName);

    return {
        cwd: cwd,
        inCurrentDir: inCurrentDir,
        name: name,
        targetDir: targetDir,
    }
}

function ProjectRun(projectName) {
    const { targetDir } = paramsGetready(projectName);

    // 判断目录是否存在
    if (fs.existsSync(targetDir)) {
        // 目录存在，提示检查目录是否为空，是否可用
        log(
            `\n${chalk.hex('#ff9900')(
                '警告：目录已经存在，检查目录是否为空，是否可用？'
            )} \n${chalk.hex('#F56C6C')(targetDir)}\n`
        );
    } else {
        inquirer.prompt([{
            name: "ok",
            type: 'confirm',
            message: `确定要在目录：\n${chalk.hex('#5cadff')(targetDir)
                }\n创建 ${chalk.hex('#19be6b')(`<${projectName}>`)} 项目吗？\n`
        }]).then(res => {
            const { ok } = res;
            if (!ok) return false;

            // 当前目录创建文件夹
            fs.mkdirSync(targetDir);
            // 复制模板
            CopyTemplates('project', targetDir);

            log(chalk.hex('#19be6b')(`项目${chalk.hex('#ff9900')(` <${projectName}> `)}创建完成!`));

        }).catch(error => log(chalk.hex('#F56C6C')(error)));
    }
}

module.exports = ProjectRun;
