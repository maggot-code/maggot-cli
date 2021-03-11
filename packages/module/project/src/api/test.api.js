/*
 * @Author: maggot-code
 * @Date: 2021-03-11 13:16:07
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-11 14:37:15
 * @Description: export test api
 */
import { send } from '@/plugins/axios';
export const ping = (data) => send({
    tag: "jump",
    url: '/api/v1/ping',
    method: 'GET',
    params: data
});
