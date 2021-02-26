/*
 * @Author: maggot-code
 * @Date: 2021-02-26 15:58:54
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-02-26 17:34:45
 * @Description: file content
 */
const path = require('path');
const fs = require('fs');

// 读取并复制文件
const readAndCopyFile = (targetPath, dirPath) => {
    // 读取目录结构
    const files = fs.readdirSync(targetPath);

    files.forEach(file => {
        // 源文件地址
        const curPath = `${targetPath}/${file}`;

        // 项目文件地址
        const filePath = `${dirPath}/${file}`;

        // 获取源文件地址路径的详细信息
        const stat = fs.statSync(curPath);

        // 判断是否存在，用来判断是不是需要直接copy
        if (stat.isDirectory()) {
            // 是目录，在项目地址创建文件
            fs.mkdirSync(filePath);

            // 递归读取并复制文件
            readAndCopyFile(curPath, filePath);
        } else {
            // 读取文件内容
            const contents = fs.readFileSync(curPath, 'utf-8');

            // 写入文件内容
            fs.writeFileSync(filePath, contents, 'utf-8');
        }
    });
}

// 复制模板
const CopyTemplates = (name, dir) => {
    // console.log(name, dir);
    const targetPath = path.join(__dirname, '..', `module/${name}`);
    readAndCopyFile(targetPath, dir);
}

module.exports = {
    CopyTemplates
}
