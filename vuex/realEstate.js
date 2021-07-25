import axiosClient from "~/utils/axiosClient";

export default {
    namespaced: true,
    state: {
      realEstateList:[],
      total: 0,
      createNew: null,
      deleteImage: null,
      errorMessage: null,
      showDetail: null,
      detailEstate: null,
      updateEstate: null,
      deleteEstate: null,
    },
    mutations: {
        getRealEstateList(state, data) {
            state.realEstateList = data.data;
            state.total = data.total;
            state.errorMessage = null
        },
        createNewRealEstate(state, data){
           state.createNew = data;
           state.errorMessage = null
        },
        deleteImage(state, data){
            state.deleteImage = data;
            state.errorMessage = null
        },
        showError(state, data){
            state.errorMessage = data;
        },
        showDetail(state, data){
            state.showDetail = data;
            state.errorMessage = null
        },
        getRealEstateDetail(state, data){
            state.detailEstate = data;
            state.errorMessage = null
        },
        updateNewEstate(state, data){
            state.updateEstate = data;
            state.errorMessage = null
        },
        deleteNewEstate(state, data){
            state.deleteEstate = data;
            state.errorMessage = null 
        }
    },
    actions: {
        getRealEstateList: ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/real-estates?limit=${data.limit}&page=${data.page}`, method: "GET"}).then(response => {
                    commit('getRealEstateList', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    commit('showError', e.response.data);
                    reject(e);
                })
            })
        },
        getRealEstateDetail: ({ commit }, _id) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/real-estates/${_id}`, method: "GET"}).then(response => {
                    commit('getRealEstateDetail', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    commit('showError', e.response.data);
                    reject(e);
                })
            })
        },
        createNewRealEstate: ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: '/admin/real-estates', method: "POST", data: data}).then(response => {
                    commit('createNewRealEstate', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    commit('showError', e.response.data);
                    reject(e);
                })
            })
        },
        deleteImageInProject: ({ commit }, _id) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/real-estates/image/${_id}`, method: "DELETE"}).then(response => {
                    commit('deleteImage', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    commit('showError', e.response.data);
                    reject(e);
                })
            })
        },
        showDetailRealEstate: ({ commit }, _id) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/real-estates/${_id}`, method: "GET"}).then(response => {
                    commit('showDetail', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    commit('showError', e.response.data);
                    reject(e);
                })
            })
        },
        updateNewEstateDetail: ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/real-estates/${data.id}`, method: "PATCH", data: data}).then(response => {
                    commit('updateNewEstate', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    commit('showError', e.response.data);
                    reject(e);
                })
            })
        },
        deleteEstateInSystem: ({ commit }, _id) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/real-estates/${_id}`, method: "DELETE"}).then(response => {
                    commit('deleteNewEstate', response.data.results);
                    resolve(response.data);

                }).catch(e => {

                    commit('showError', e.response.data);
                    reject(e);
                })
            })
        },
    }
}