import axiosClient from "~/utils/axiosClient";

export default {
    namespaced: true,
    state: {
        roleList: null
    },
    mutations: {
        getRoleList(state, data) {
            state.roleList = data;
        }
    },
    actions: {
        getRoleList: ({ commit }) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: '/admin/users/get-roles', method: "GET"}).then(response => {
                    commit('getRoleList', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    reject(e);
                })
            })
        }
    }
}