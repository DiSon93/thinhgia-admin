import axiosClient from "~/utils/axiosClient";

export default {
    namespaced: true,
    state: {
        blogList: [],
        total: 0,
        errorMessage: null,
        createBlog: null,
        deletePhoto: null,
        updateBlog: null,
        blogDetail: {},
        deleteBlog: null,
        lastPage: 0,
    },
    mutations: {
        getBlogList(state, data) {
            state.blogList = data.data;
            state.total = data.total;
            state.lastPage = data.last_page;
            state.errorMessage = null
        },
        createBlogList(state, data){
            state.createBlog = data;
            state.errorMessage = null
        },
        deleteBlogPhoto(state, data){
            state.deletePhoto = data;
            state.errorMessage = null
        },
        showError(state, data){
            state.errorMessage = data;
        },
        updateBlog(state, data){
            state.updateBlog = data;
            state.errorMessage = null
        },
        getBlogDetail(state, data){
            state.blogDetail = data;
            state.errorMessage = null
        },
        deleteBlog(state, data){
            state.deleteBlog = data;
            state.errorMessage = null
        }
    },
    actions: {
        getBlogList: ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/blogs?limit=${data.limit}&page=${data.page}`, method: "GET"}).then(response => {
                    commit('getBlogList', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    commit('showError', e.response.data);
                    reject(e);
                })
            })
        },
        createBlogList: ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: '/admin/blogs', method: "POST", data: data}).then(response => {
                    commit('createBlogList', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    commit('showError', e.response.data);
                    reject(e);
                })
            })
        },
        deleteBlogPhoto: ({ commit }, _id) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/blogs/image/${_id}`, method: "DELETE"}).then(response => {
                    commit('deleteBlogPhoto', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    commit('showError', e.response.data);
                    reject(e);
                })
            })
        },
        updateBlogInSystem: ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/blogs/${data.id}`, method: "PATCH", data: data}).then(response => {
                    commit('updateBlog', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    commit('showError', e.response.data);
                    reject(e);
                })
            })
        },
        getBlogDetail: ({ commit }, _id) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/blogs/${_id}`, method: "GET"}).then(response => {
                    commit('getBlogDetail', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    commit('showError', e.response.data);
                    reject(e);
                })
            })
        },
        deleteBlog: ({ commit }, _id) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/blogs/${_id}`, method: "DELETE"}).then(response => {
                    commit('deleteBlog', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    commit('showError', e.response.data);
                    reject(e);
                })
            })
        },
    }
}