/*
 * @Author: maggot-code
 * @Date: 2021-03-01 10:31:40
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-11 16:18:44
 * @Description: application store inlet
 */
import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: { ...modules }
});
