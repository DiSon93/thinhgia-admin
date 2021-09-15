import axiosClient from "~/utils/axiosClient";

export default {
    namespaced: true,
    state: {
      realEstateList:[],
      total: 0,
      createNew: null,
      deleteImage: null,
      errorMessage: null,
      detailEstate: null,
      detailEstate: null,
      updateEstate: null,
      deleteEstate: null,
      approve: null,
      sharePubilc: null,
      shareWeb: null,
      changeSell: null,
      approveRealList: [],
      listOnDemand: [],
      deleteApprove: null,
      lastPage: 0,
      specialList: [],
      listChange: [],
      listProvince:[],
    },
    mutations: {
        getRealEstateList(state, data) {
            state.realEstateList = data.data;
            state.total = data.total;
            state.lastPage = data.last_page;
            state.errorMessage = null
        },
        getRealEstateSpecialList(state, data){
            state.specialList = data.data;
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
            console.log("error", data)
        },
        showDetail(state, data){
            state.detailEstate = data;
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
        },
        approveNewEstate(state, data){
            state.approve = data;
            state.errorMessage = null 
        },
        sharePublicEstate(state, data){
            state.sharePubilc = data;
            state.errorMessage = null 
        },
        shareWebEstate(state, data){
            state.shareWeb = data;
            state.errorMessage = null 
        },
        changeSellEstate(state, data){
            state.changeSell = data;
            state.errorMessage = null 
        },
        getApproveList(state, data){
            state.approveRealList = data.data;
            state.total = data.total;
            state.errorMessage = null;
        },
        getListOnDemand(state, data){
            state.listOnDemand = data;
            state.errorMessage = null;
        },
        getEstateListIsSell(state, data){
            state.realEstateList = data.data;
            state.total = data.total;
            state.errorMessage = null;
        },
        deleteAprrove(state, data){
            state.deleteApprove = data;
            state.errorMessage = null;
        },
        listChangeEstate(state, data){
            state.listChange = data;
            state.errorMessage = null;
        },
        listEstateProvince(state, data){
            state.listProvince = data;
            state.errorMessage = null;
        }
    },
    actions: {
        getRealEstateList: ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/real-estates?limit=${data.limit}&page=${data.page}&search=${data.search}&min_price=${data.min_price}&max_price=${data.max_price}&sort_price=${data.sort_price}&approve_public=${data.approve_public}&sort_view=${data.sort_view}&purpose=${data.purpose}&house_type=${data.house_type}&projects=${data.projects}&province=${data.province}&search_text=${data.search_text}`, method: "GET", data: data}).then(response => {
                    commit('getRealEstateList', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    commit('showError', e.response.data);
                    reject(e);
                })
            })
        },
        getRealEstateSpecialList: ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/real-estates?limit=${data.limit}&page=${data.page}&sort_view=${data.sort_view}`, method: "GET", data: data}).then(response => {
                    commit('getRealEstateSpecialList', response.data.results);
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
        approveRealEstate: ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/real-estates/approve/${data.id}`, method: "POST", data: data}).then(response => {
                    commit('approveNewEstate', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    commit('showError', e.response.data);
                    reject(e);
                })
            })
        },

        sharePublicRealEstate: ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/real-estates/share-public/${data.id}`, method: "POST", data: data}).then(response => {
                    commit('sharePublicEstate', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    commit('showError', e.response.data);
                    reject(e);
                })
            })
        },
        shareWebRealEstate: ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/real-estates/share-web/${data.id}`, method: "POST", data: data}).then(response => {
                    commit('shareWebEstate', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    commit('showError', e.response.data);
                    reject(e);
                })
            })
        },
        changeSellRealEstate: ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/real-estates/sell/${data.id}`, method: "POST", data: data}).then(response => {
                    commit('changeSellEstate', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    commit('showError', e.response.data);
                    reject(e);
                })
            })
        },
        getApproveRealEstateList: ({ commit }, data)  => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/real-estates/list-approve?limit=${data.limit}&page=${data.page}&share=${data.share}`, method: "GET"}).then(response => {
                    commit('getApproveList', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    commit('showError', e.response.data);
                    reject(e);
                })
            })
        },
        getRealEstateListOnDemand: ({ commit }, data)  => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/global/list-real-estates?real_estate_ids=${data}`, method: "GET"}).then(response => {
                    commit('getListOnDemand', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    commit('showError', e.response.data);
                    reject(e);
                })
            })
        },
        getEstateListIsSell:({ commit }, data)  => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/real-estates?is_sell=${data.is_sell}&share=${data.is_public}&limit=${data.limit}&page=${data.page}`, method: "GET"}).then(response => {
                    commit('getEstateListIsSell', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    commit('showError', e.response.data);
                    reject(e);
                })
            })
        },
        deleteEstateInApproveList: ({ commit }, data)  => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/real-estates/${data.id}?share=${data.share}`, method: "DELETE"}).then(response => {
                    commit('deleteAprrove', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    commit('showError', e.response.data);
                    reject(e);
                })
            })
        },
        listChangeRealEstateUpToDay:({ commit }, _id)  => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/real-estates/list-changes/${_id}`, method: "GET"}).then(response => {
                    commit('listChangeEstate', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    commit('showError', e.response.data);
                    reject(e);
                })
            })
        },
        listEstateProvince:({ commit })  => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/real-estates/list-provinces-exists`, method: "GET"}).then(response => {
                    commit('listEstateProvince', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    commit('showError', e.response.data);
                    reject(e);
                })
            })
        },
    }
}