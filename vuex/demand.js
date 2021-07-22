import axiosClient from "~/utils/axiosClient";

export default {
    namespaced: true,
    state: {
        demandList: [],
        demandAdd: [],
        deleteDemand: null,
        selected: [],
        convert: null,
        total: 0,
    },
    mutations: {
        getDemandList(state, data) {
            state.demandList = data.data;
            state.total = data.total;
        },
        addDemandList(state, data) {
            state.demandAdd = data;
        },
        deleteDemands(state, data) {
            state.deleteDemand = data;
        },
        selectedDemand(state, data){
            state.selected = data;
        },
        convertDemands(state, data){
            state.convert = data;
        }
    },
    actions: {
        getDemandList: ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/needs?limit=${data.limit}&page=${data.page}&resolved=${data.resolved}`, method: "GET" }).then(response => {
                    commit('getDemandList', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    reject(e);
                })
            })
        },
        createDemandList: ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/needs?is_save=:`, method: "POST", data: data }).then(response => {
                    commit('addDemandList', response.data.results.data);
                    resolve(response.data);
                }).catch(e => {
                    reject(e);
                })
            })
        },
        deleteDemandIntoSystem: ({ commit }, _id) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/needs/${_id}`, method: "DELETE" }).then(response => {
                    commit('deleteDemands', response.data.results.data);
                    resolve(response.data);
                }).catch(e => {
                    reject(e);
                })
            })
        },
        updateDemandOfCustomer: ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/needs/${data.id}?is_save=`, method: "PATCH", data: data }).then(response => {
                    commit('deleteDemands', response.data.results.data);
                    resolve(response.data);
                }).catch(e => {
                    reject(e);
                })
            })
        },
        convertDemandOfCustomer: ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/needs/update-resolve/${data.id}?resolved=${data.resolved}`, method: "PATCH"}).then(response => {
                    commit('convertDemands', response.data.results.data);
                    resolve(response.data);
                }).catch(e => {
                    reject(e);
                })
            })
        },
    }
}