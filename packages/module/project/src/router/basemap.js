/*
 * @Author: maggot-code
 * @Date: 2021-03-11 12:44:40
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-11 12:48:49
 * @Description: application router base map
 */
export default [
    {
        path: '/',
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
    }
]
