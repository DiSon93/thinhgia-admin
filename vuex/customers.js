import axiosClient from "~/utils/axiosClient";

export default {
    namespaced: true,
    state: {
        customerList: [],
        customers: [],
        addCustomer: null,
        updateCustomer: null,
        total: null,
    },
    mutations: {
        getCustomerList(state, data) {
            state.customerList = data;
        },
        getCustomerListPerPage(state, data){
          state.customers = data.data;
          state.total = data.total;
        },
        addCustomerList(state, data){
            state.addCustomer = data;
        },
        updateCustomerList(state, data){
            state.updateCustomer = data;
        }
    },
    actions: {
        getCustomerList: ({ commit }) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: '/admin/global/list-customers', method: "GET"}).then(response => {
                    commit('getCustomerList', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    reject(e);
                })
            })
        },
        getCustomerListPerPage:  ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/customers?limit=${data.limit}&page=${data.page}&search=${data.search}`, method: "GET"}).then(response => {
                    commit('getCustomerListPerPage', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    reject(e);
                })
            })
        },
        createNewCustomer:  ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: "/admin/customers", method: "POST", data: data}).then(response => {
                    commit('addCustomerList', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    reject(e);
                })
            })
        }, 
        updateNewCustomer:  ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/customers/${data.id}?_method=PATCH`, method: "POST", data: data}).then(response => {
                    commit('updateCustomerList', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    reject(e);
                })
            })
        }, 
    }
}