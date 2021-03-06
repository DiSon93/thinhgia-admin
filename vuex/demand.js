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
       errorMessage: null,
       demandDetail: {},
    },
    mutations: {
        getDemandList(state, data) {
            state.demandList = data.data;
            state.total = data.total;
           state.errorMessage = null;
        },
        getDemandListOverPageOne(state, data){
           state.demandList = data;
        },
        addDemandList(state, data) {
            state.demandAdd = data;
           state.errorMessage = null;
        },
        deleteDemands(state, data) {
            state.deleteDemand = data;
           state.errorMessage = null;
        },
        selectedDemand(state, data){
            state.selected = data;
           state.errorMessage = null;
        },
        convertDemands(state, data){
            state.convert = data;
        },
        showErrorr(state, data){
            state.errorMessage = data;
        },
        showDemanDetail(state, data){
            state.demandDetail = data;
        }
    },
    actions: {
        getDemandList: ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/needs?limit=${data.limit}&page=${data.page}&resolved=${data.resolved}`, method: "GET" }).then(response => {
                    commit('getDemandList', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    commit('showErrorr', e.response.data)
                    reject(e);
                })
            })
        },
        createDemandList: ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/needs?is_save=${data.is_save}`, method: "POST", data: data }).then(response => {
                    commit('addDemandList', response.data.results.data);
                    resolve(response.data);
                }).catch(e => {
                    commit('showErrorr', e.response.data)
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
                    commit('showErrorr', e.response.data)
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
                    commit('showErrorr', e.response.data)
                    reject(e);
                })
            })
        },
        convertDemandOfCustomer: ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/needs/update-resolve/${data.id}`, method: "POST", data: data}).then(response => {
                    commit('convertDemands', response.data.results.data);
                    resolve(response.data);
                }).catch(e => {
                    reject(e);
                })
            })
        },
        showDemanDetail:({ commit }, _id) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/needs/${_id}`, method: "GET"}).then(response => {
                    commit('showDemanDetail', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    reject(e);
                })
            })
        },
    }
}