/*
 * @Author: maggot-code
 * @Date: 2021-03-01 10:31:40
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-12 16:43:34
 * @Description: application store inlet
 */
import Vue from 'vue';
import Vuex from 'vuex';
import * as axiosStore from './axios';
import modules from './modules';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        ...axiosStore.state
    },
    getters: {
        ...axiosStore.getters
    },
    mutations: {
        ...axiosStore.mutations
    },
    actions: {
        ...axiosStore.actions
    },
    modules: { ...modules }
});
