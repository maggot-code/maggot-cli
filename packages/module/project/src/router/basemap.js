/*
 * @Author: maggot-code
 * @Date: 2021-03-11 12:44:40
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-14 22:48:36
 * @Description: application router base map
 */
export default [
    {
        path: '/',
        redirect: '/login',
        name: 'root',
        meta: {
            title: 'Root',
            power: false
        }
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            title: "Login",
            power: false
        },
        component: () => import('@/pages/login')
    },
    {
        path: "/404",
        name: "404",
        meta: {
            title: "404",
            power: false
        },
        component: () => import('@/pages/not-page')
    }
]
