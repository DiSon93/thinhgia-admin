import axiosClient from "~/utils/axiosClient";

export default {
    namespaced: true,
    state: {
        dictrictList: [],
        provinceList: [],
        wardList: [],
    },
    mutations: {
        getDictrictList(state, data) {
            state.dictrictList = data;
        },
        getProvinceList(state, data) {
            state.provinceList = data;
        },
        getWardList(state, data) {
            state.wardList = data;
        }
    },
    actions: {
        getDictrictList: ({ commit }, province_id) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/global/list-districts/${province_id}`, method: "GET"}).then(response => {
                    commit('getDictrictList', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    reject(e);
                })
            })
        },
        getProvinceList: ({ commit }) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: '/admin/global/list-provinces', method: "GET"}).then(response => {
                    console.log(response.data.results)
                    commit('getProvinceList', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    reject(e);
                })
            })
        },
        getWardList: ({ commit }, district_id) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/global/list-wards/${district_id}`, method: "GET"}).then(response => {
                    commit('getWardList', response.data.results);
                    resolve(response.data);
                    console.log(response)
                }).catch(e => {
                    reject(e);
                })
            })
        },
    }
}