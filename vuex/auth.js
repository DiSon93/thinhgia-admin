import axiosClient from "~/utils/axiosClient";
//xài nuxt auth thử đi
//Thôi tạm fix cái này đã

const currentUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : "";

export default {
    namespaced: true,
    state: {
        currentUser: currentUser,
        error: null
    },
    mutations: {
        setUser(state, data) {
            state.currentUser = data;
        },
        // setCountries(state, data) {
        //     state.countries = data;
        // }
        setError (state, data){
           state.error = data
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
                    commit('setError', e);
                    reject(e);
                    console.log(e);
                    console.log("thất bại")

                })
            })
        },
    },
}