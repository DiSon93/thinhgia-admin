import axiosClient from "~/utils/axiosClient";

const currentUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : "";

export default {
    namespaced: true,
    state: {
        currentUser: currentUser,
        error: null,
        changePass: null,
        forgotPass: null,
        resetPass: null,
    },
    mutations: {
        setUser(state, data) {
            state.currentUser = data;
           state.error = null;
        },
        setError (state, data){
           state.error = data;
        },
        changePassword(state, data){
            state.changePass = data;
           state.error = null;
        },
        forgotPassword(state, data){
            state.forgotPass = data.message;
            state.error = null; 
        },
        resetPassword(state, data){
            state.resetPass  = data.message;
            state.error = null;
        }
    },
    actions: {
        loginIntoServer: ({commit}, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: '/auth/login', method: 'POST', data: data}).then(response => {
                    localStorage.setItem("user", JSON.stringify(response.data));
                    commit('setUser', response.data);
                    resolve(response.data);
                }).catch(e => {
                    commit('setError', e.response);
                    reject(e);
                })
            })
        },
        changePassword: ({commit}, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: '/admin/users/change-password', method: 'POST', data: data}).then(response => {
                    commit('changePassword', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    commit('setError', e.response.data);
                    reject(e);
                })
            })
        },
        forgotPasswordSendEmail:  ({commit}, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: '/auth/send-reset-link', method: 'POST', data: data}).then(response => {
                    commit('forgotPassword', response.data);
                    resolve(response.data);
                }).catch(e => {
                    commit('setError', e.response.data);
                    reject(e);
                })
            })
        },
        changePasswordIntoServer: ({commit}, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/auth/change-password?resetToken=${data.reset_token}`, method: 'POST', data: data}).then(response => {
                    commit('resetPassword', response.data);
                    resolve(response.data);
                }).catch(e => {
                    commit('setError', e.response.data);
                    reject(e);
                })
            })
        },
    },
}