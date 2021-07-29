import axiosClient from "~/utils/axiosClient";

export default {
    namespaced: true,
    state: {
        countLike: 0,
        updateLike: null,
    },
    mutations: {
        getCountLike(state, data){
            state.countLike = data.count;
        },
        updateCountLike(state, data){
            state.updateLike = data;
        }
    },
    actions: {
         getCountLikeRealEstate: ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/real-estates/count-likes`, method: "GET", data: data}).then(response => {
                    commit('getCountLike', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    commit('showError', e.response.data);
                    reject(e);
                })
            })
        },
        updateLikeStatus: ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/real-estates/likes`, method: "POST", data: data}).then(response => {
                    commit('updateCountLike', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    commit('showError', e.response.data);
                    reject(e);
                })
            })
        },
    } 
}