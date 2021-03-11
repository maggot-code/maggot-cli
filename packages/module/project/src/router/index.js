/*
 * @Author: maggot-code
 * @Date: 2021-03-11 12:42:36
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-11 12:50:12
 * @Description: application router inlet
 */
import Vue from 'vue';
import { MGrouter } from 'maggot-utils';
import baseMap from './basemap';
import powerMap from './powermap';

const { VueRouter, BeforeEach } = MGrouter;
Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'hash',
    routes: [
        ...baseMap,
        ...powerMap,
        {
            path: "*",
            name: "404",
            meta: {
                title: "404",
                power: false
            },
            component: () => import('@/pages/not-page')
        }
    ],
    basetitle: process.env.VUE_APP_TITLE,
    deftitle: "maggot-code"
})

router.beforeEach((to, from, next) => {
    const nextTo = BeforeEach(to, from, router);
    // ....
    next(nextTo);
});
export default router;
