import axiosClient from "~/utils/axiosClient";

export default {
    namespaced: true,
    state: {
        staffList: [],
        userList: [],
        total: 0,
        errorMessage: null,
        loading: false,
        blockUser: "",
        addUser: "",
        userDetail: null,
        delete: "",
        avatar: null,
        resetPass: null,
        updateUser: null,
    },
    mutations: {
        getStaffList(state, data) {
            state.staffList = data;
            state.errorMessage = null
        },
        getUserList(state, data) {
            state.userList = data.data;
            state.total = data.total;
            state.errorMessage = null;
        },
        blockUser(state, data) {
            state.blockUser = data;
            state.errorMessage = null
        },
        addUser(state, data) {
            state.addUser = data;
            state.errorMessage = null;
        },
        showUserDetail(state, data) {
            state.userDetail = data;
            state.errorMessage = null;
        },
        showError(state, data) {
            state.errorMessage = true;
            state.loading = false;
        },
        deleteUser(state, data) {
            state.delete = data;
            state.errorMessage = null
        },
        setLoading(state) {
            state.loading = !state.loading;
        },
        uploadAvatar(state, data) {
            state.avatar = data;
            state.errorMessage = null
        },
        resetPassword(state, data) {
            state.resetPass = data;
            state.errorMessage = null
        },
        updateUser(state, data) {
            state.updateUser = data;
            state.errorMessage = null
        },
    },
    actions: {
        getStaffList: ({ commit }) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: '/admin/global/list-staffs', method: "GET" }).then(response => {
                    commit('getStaffList', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    reject(e);
                })
            })
        },
        getUserListPerPage: ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/users?limit=${data.rowPerPage}&page=${data.page}&role_id=${data.role_id}`, method: "GET" }).then(response => {
                    commit('getUserList', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    commit('showError', e.response.data);
                    reject(e);
                })
            })
        },
        // async getUserListPerPage ({ commit }, data) {
        //     const ip = await this.$axios.$get(`/admin/users?limit=${data.rowPerPage}&page=${data.page}`)
        //     commit('getUserList', ip)
        //   },
        blockUser: ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/users/block/${data._id}`, method: "POST", data: data }).then(response => {
                    commit('blockUser', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    commit('showError', e.response.data);
                    reject(e);
                })
            })
        },
        createUser: ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({
                    url: '/admin/users', method: "POST", data: data
                }).then(response => {
                    commit('addUser', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    commit('showError', e.response.data);
                    reject(e);
                })
            })
        },
        showUserDetail: ({ commit }, _id) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/users/${_id}`, method: "GET" }).then(response => {
                    commit('showUserDetail', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    commit('showError', e.response.data);
                    reject(e);
                })
            })
        },
        deleteUser: ({ commit }, _id) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/users/${_id}`, method: "DELETE" }).then(response => {
                    commit('deleteUser', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    commit('showError', e.response.data);
                    reject(e);
                })
            })
        },
        uploadAvatar: ({ commit }, file) => {
            return new Promise((resolve, reject) => {
                axiosClient({
                    url: '/admin/users/upload-avatar', method: "POST", data: file, headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(response => {
                    commit('uploadAvatar', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    commit('showError', e.response.data);
                    reject(e);
                })
            })
        },
        resetPassword: ({ commit }, _id) => {
            return new Promise((resolve, reject) => {
                axiosClient({
                    url: `/admin/users/reset-password/${_id}`, method: "GET"
                }).then(response => {
                    commit('resetPassword', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    commit('showError', e.response.data);
                    reject(e);
                })
            })
        },
        updateUser: ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({
                    url: `/admin/users/${data.id}?_method=PATCH`, method: "POST", data: data
                }).then(response => {
                    commit('updateUser', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    commit('showError', e.response.data);
                    reject(e);
                })
            })
        },
    }
}