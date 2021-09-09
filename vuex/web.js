import axiosClient from "~/utils/axiosClient";

export default {
    namespaced: true,
    state: {
        setting: {},
        total: 0,
        errorMessage: null,
        detailContact: {},
        updateSetting: null,
    },
    mutations: {
        getSettingList(state, data) {
            state.setting = data;
            // state.total = data.total;
            state.errorMessage = null
        },
        showError(state, data){
            state.errorMessage = data;
        },

        updateSettingType(state, data){
            state.updateSetting = data;
            state.errorMessage = null
        }
    },
    actions: {
        getSettingList: ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/settings`, method: "GET"}).then(response => {
                    commit('getSettingList', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    commit('showError', e.response.data);
                    reject(e);
                })
            })
        },
        updateSettingType:({ commit }, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/settings`, method: "POST", data: data}).then(response => {
                    commit('updateSettingType', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    commit('showError', e.response.data);
                    reject(e);
                })
            })
        },
    }
}