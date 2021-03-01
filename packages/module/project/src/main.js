/*
 * @Author: maggot-code
 * @Date: 2021-02-28 13:25:16
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-01 10:33:48
 * @Description: application main
 */
import Vue from 'vue';
import App from './App.vue';
import store from '@/stroe';
import 'normalize.css';

Vue.config.productionTip = false;

new Vue({
    store,
    render: h => h(App),
}).$mount('#app');
