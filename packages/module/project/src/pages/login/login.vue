<!--
 * @Author: maggot-code
 * @Date: 2021-03-02 18:00:38
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-11 14:24:37
 * @Description: mg-login.vue
-->
<template>
    <div class="mg-login">mg-login</div>
</template>

<script>
import { ping } from "@/api/test.api";
export default {
    name: "mg-login",
    mixins: [],
    components: {},
    props: {},
    data() {
        //这里存放数据
        return {};
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {},
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        ping({
            a: 11,
        });
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {},
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped></style>
