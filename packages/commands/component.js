/*
 * @Author: maggot-code
 * @Date: 2021-02-26 17:48:51
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-06-23 16:15:49
 * @Description: file content
 */
const path = require('path');
const fs = require('fs');

function ComponentRun(componentName) {
    createComponentName(componentName);
}
// 通过用户写入组件名称，生成组件目录名称、组件实例名称和组件名称
function createComponentName(componentName) {
    const baseName = componentName.slice("-");
    console.log(baseName);
}

// 生成组件目录
function createComponentList(fileName, name) {
    return new Promise((resolve, reject) => {

    })
}

// 创建组件目录和入口文件
function mkComponentAndInlet() { }

// 创建实例目录和组件实例
function mkSrcAndVue() { }

module.exports = ComponentRun;