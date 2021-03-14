/*
 * @Author: maggot-code
 * @Date: 2021-03-11 15:54:54
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-14 23:51:14
 * @Description: store inlet
 */
import { filter } from 'lodash';

const screenId = (baseKeysList) => {
    const keysList = [];
    for (const iterator of baseKeysList) {
        keysList.push(iterator);
    }

    return keysList;
}

export const state = {
    requestQueue: new Map()
}
export const getters = {
    getRequestQueue: state => state.requestQueue
}
export const mutations = {
    /**
     * @description: 加入请求队列
     * @param {Object} member 入列成员对象
     */
    addRequestQueue(state, member) {
        const {
            url,
            requestId,
            requestTag,
            cancelFunc
        } = member;

        state.requestQueue.set({ requestId, requestTag }, {
            url,
            requestId,
            requestTag,
            func: cancelFunc
        });
    },

    removeRequestQueue(state, memberId) {
        const find = filter(screenId(state.requestQueue.keys()), (member) => member.requestId === memberId);

        if (find.length <= 0) {
            return false;
        }

        state.requestQueue.has(find[0]) && state.requestQueue.delete(find[0]);
    },

    cancelTagRequest(state, memberTag) {
        const queue = filter(screenId(state.requestQueue.keys()), (member) => member.requestTag === memberTag);

        if (queue.length <= 0) {
            return false;
        }

        queue.forEach(cell => {
            const target = state.requestQueue.has(cell);

            if (target) {
                const { url, requestId, requestTag, func } = state.requestQueue.get(cell);
                func.url = url;
                func({
                    url,
                    requestId,
                    requestTag,
                    msg: `cancel request ${memberTag}`,
                });

                state.requestQueue.delete(cell);
            }
        });
    }
}
export const actions = {
    _addRequestQueue({ commit }, member) {
        commit('addRequestQueue', member);
    },
    _removeRequestQueue({ commit }, memberId = '') {
        commit('removeRequestQueue', memberId)
    },
    _cancelTagRequest({ commit }, tag = 'default') {
        commit('cancelTagRequest', tag);
    }
}
