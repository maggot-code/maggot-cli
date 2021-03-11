/*
 * @Author: maggot-code
 * @Date: 2021-03-11 13:13:09
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-11 16:18:30
 * @Description: application axios inlet
 */
import axios from 'axios';
import { MGaxios } from 'maggot-utils';

const { InterceptRequest, InterceptResponse, Send, SendAll } = MGaxios;
const BASEURL = process.env.NODE_ENV === 'production' ? window.location.origin : '/';
const baseAxios = axios.create({ baseURL: BASEURL });

InterceptRequest(baseAxios);
InterceptResponse(baseAxios);

export const send = Send(baseAxios);
