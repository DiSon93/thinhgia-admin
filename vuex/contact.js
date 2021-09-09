import axiosClient from "~/utils/axiosClient";

export default {
    namespaced: true,
    state: {
        contactTypeList: [],
        total: 0,
        errorMessage: null,
        detailContact: {},
        updateType: null,
    },
    mutations: {
        getContactTypeList(state, data) {
            state.contactTypeList = data;
            // state.total = data.total;
            console.log(data);
            state.errorMessage = null
        },
        showError(state, data){
            state.errorMessage = data.message;
            console.log(data)
        },
        getDetailContactTypeList(state, data){
            state.detailContact = data;
            state.errorMessage = null
        },
        updateContactType(state, data){
            state.updateType = data;
            state.errorMessage = null
        }
    },
    actions: {
        getContactTypeList: ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/contact-type`, method: "GET"}).then(response => {
                    commit('getContactTypeList', response.data.message);
                    resolve(response.data);
                }).catch(e => {
                    commit('showError', e.response.data);
                    reject(e);
                })
            })
        },
        getDetailContactTypeList: ({ commit }, _id) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/contact-type/${_id}`, method: "GET"}).then(response => {
                    commit('getDetailContactTypeList', response.data.message);
                    resolve(response.data);
                }).catch(e => {
                    commit('showError', e.response.data);
                    reject(e);
                })
            })
        },
        updateContactType:({ commit }, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/contact-type/${data.id}`, method: "POST", data: data}).then(response => {
                    commit('updateContactType', response.data.message);
                    resolve(response.data);
                }).catch(e => {
                    commit('showError', e.response.data);
                    reject(e);
                })
            })
        },
    }
}