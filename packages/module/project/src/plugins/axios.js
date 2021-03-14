/*
 * @Author: maggot-code
 * @Date: 2021-03-11 13:13:09
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-15 00:02:51
 * @Description: application axios inlet
 */
import axios from 'axios';
import store from '@/stroe';
import router from '@/router';
import { MGaxios } from 'maggot-utils';
import { flake, delToken } from 'maggot-utils';

const BASEURL = process.env.NODE_ENV === 'production' ? window.location.origin : '/';
const { Send, SendAll } = MGaxios;
/**
 * @description: 取消请求
 * @param {Object} config axios实例配置参数
 * @return {Function} axios.CancelToken
 */
const cancelRequest = config => new axios.CancelToken(cancel => {
    const { url, requestId, requestTag } = config;
    store.dispatch('_addRequestQueue', {
        url,
        requestId,
        requestTag,
        cancelFunc: cancel
    });
})
/**
 * @description: 集成响应返回数据
 * @param {String} requestId 请求ID
 * @param {String} requestTag 请求标签
 * @param {Number} status 响应状态码
 * @param {String} statusText 响应状态说明
 * @param {String} url 请求地址
 * @param {Object} data 服务响应数据
 * @return {Object} 响应数据集合
 */
const returnResponse = (requestId, requestTag, status, statusText, url, data) => ({
    ...data,
    url,
    response: { requestId, requestTag, status, statusText },
})
/**
 * @description: 请求响应后操作
 * @param {Object | String} error
 * @return {Object} 中断数据
 */
const deleteRequest = (error) => {
    // url, requestId, requestTag, message
    if (error.config) {
        const { url, requestId, requestTag, } = error.config;
        // 移除队列中的该请求
        store.dispatch('_removeRequestQueue', requestId);

        return {
            url,
            requestId,
            requestTag,
            message: error.message
        };
    }

    // 请求中断返回结构
    return {
        url: error.message.url,
        requestId: error.message.requestId,
        requestTag: error.message.requestTag,
        message: error.message.msg
    }
}

const baseAxios = axios.create({ baseURL: BASEURL });

// 请求拦截器
baseAxios.interceptors.request.use(config => {
    config.requestId = flake.gen();
    config.cancelToken = cancelRequest(config);

    return config;
}, error => Promise.reject(error));

// 响应拦截器
baseAxios.interceptors.response.use(res => {
    const { config, status, statusText, data } = res;
    const { code } = data;
    const { url, requestId, requestTag } = config;
    const response = returnResponse(requestId, requestTag, status, statusText, url, data);

    // 移除队列中的该请求
    store.dispatch('_removeRequestQueue', requestId);

    return code < 400 ? response : Promise.reject(response);
}, error => {
    if (error.message) {
        // Something happened in setting up the request that triggered an Error
        const { url, requestId, requestTag, message } = deleteRequest(error);
        const responseError = returnResponse(requestId, requestTag, -1, message, url, {
            code: -1,
            msg: message,
            data: {}
        });

        return Promise.reject(responseError);
    }

    if (error.response && error.config) {
        // 1. response adderss as error.config.url
        // 2. response id as error.config.responseId
        const { url, requestId, requestTag } = deleteRequest(error.config);
        const { data, status, statusText, } = error.response;

        // 身份验证过期/不正确
        if (status === 401) {
            delToken();
            router.push({ name: 'login' });
        }

        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const responseError = returnResponse(requestId, requestTag, status, statusText, url, data);

        return Promise.reject(responseError);
    }

    return Promise.reject(error);
});

export const send = Send(baseAxios);
export const sendAll = SendAll(baseAxios);
