/*
 * @Author: maggot-code
 * @Date: 2021-02-28 13:25:16
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-11 09:45:27
 * @Description: babel config
 */
module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset',
        "@babel/preset-env"
    ],
    plugins: [
        [
            "component",
            {
                "libraryName": "element-ui",
                "styleLibraryName": "theme-chalk"
            }
        ],
        "lodash"
    ]
}
