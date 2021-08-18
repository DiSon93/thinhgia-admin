import axiosClient from "~/utils/axiosClient";

export default {
    namespaced: true,
    state: {
        realEstateList: [],
        total: 0,
        lastPage: 0,
        errorMessage: null,
        updateLike: null,
        newComment: "",
        hide: null,
        comments: [],
        totalComemt: '',
        overview: null,
    },
    mutations: {
        getCountLikeEstate(state, data){
            state.realEstateList = data.data;
            state.total = data.total;
            state.lastPage = data.last_page;
            state.errorMessage = null
        },
        updateCountLike(state, data){
            state.updateLike = data;
            state.errorMessage = null
        },
        createNewComment(state, data){
            state.newComment = data;
            state.errorMessage = null;
        },
        showError(state, data){
            state.errorMessage = data;
        },
        hideComment(state, data){
            state.hide = data;
            state.errorMessage = null;
        },
        getCommentItem(state, data){
            state.comments = data.data;
            state.totalComemt = data.total;
            state.lastPage  = data.last_page;
            state.errorMessage = null;
        },
        getOverview(state, data){
            state.overview = data;
            state.errorMessage = null;
        }
    },
    actions: {
         getCountLikeRealEstate: ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/real-estates/list-likecomment?limit=${data.limit}&page=${data.page}`, method: "GET", data: data}).then(response => {
                    commit('getCountLikeEstate', response.data.results);
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
        createNewComment: ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/real-estates/comments`, method: "POST", data: data}).then(response => {
                    commit('createNewComment', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    commit('showError', e.response.data);
                    reject(e);
                })
            })
        },
        hideCommentDisplay:  ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/real-estates/comments/${data.id}`, method: "PATCH", data: data}).then(response => {
                    commit('hideComment', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    commit('showError', e.response.data);
                    reject(e);
                })
            })
        },
        getCommentItem:  ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/real-estates/comments?real_estate_id=${data.id}&limit=${data.limit}&page=${data.page}`, method: "GET"}).then(response => {
                    commit('getCommentItem', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    commit('showError', e.response.data);
                    reject(e);
                })
            })
        },
        getOverviewInSystem:  ({ commit }) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: "/admin/global/overview", method: "GET"}).then(response => {
                    commit('getOverview', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    commit('showError', e.response.data);
                    reject(e);
                })
            })
        },

    } 
}