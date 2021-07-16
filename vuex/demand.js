import axiosClient from "~/utils/axiosClient";

export default {
    namespaced: true,
    state: {
        demandList: []
    },
    mutations: {
        getDemandList(state, data) {
            state.demandList = data;
            console.log(data)
        }
    },
    actions: {
        getDemandList: ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/needs?limit=${data.limit}&page=${data.page}&resolved=${data.resolved}`, method: "GET"}).then(response => {
                    commit('getDemandList', response.data.results.data);
                    resolve(response.data);
                }).catch(e => {
                    reject(e);
                })
            })
        }
    }
}