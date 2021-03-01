<!--
 * @Author: maggot-code
 * @Date: 2021-02-28 13:25:16
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-01 10:16:52
 * @Description: application App home pages
-->
<template>
    <div id="app">{{ title }}</div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            title: process.env.VUE_APP_TITLE || "Vue",
        };
    },
};
</script>
<style lang="scss">
@import "~@/App.scss";
</style>
