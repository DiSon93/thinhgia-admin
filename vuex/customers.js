import axiosClient from "~/utils/axiosClient";

export default {
    namespaced: true,
    state: {
        customerList: []
    },
    mutations: {
        getCustomerList(state, data) {
            state.customerList = data;
        }
    },
    actions: {
        getCustomerList: ({ commit }) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: '/admin/global/list-customers', method: "GET"}).then(response => {
                    commit('getCustomerList', response.data);
                    resolve(response.data);
                }).catch(e => {
                    reject(e);
                })
            })
        }
    }
}