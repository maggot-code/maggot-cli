<!--
 * @Author: maggot-code
 * @Date: 2021-02-28 13:25:16
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-11 12:47:39
 * @Description: application App home pages
-->
<template>
    <div id="app"><router-view></router-view></div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            title: process.env.VUE_APP_TITLE || "Vue",
        };
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
};
</script>
<style lang="scss">
@import "~@/App.scss";
</style>
