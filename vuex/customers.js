import axiosClient from "~/utils/axiosClient";

export default {
    namespaced: true,
    state: {
        customerList: [],
        customers: [],
        addCustomer: null,
        updateCustomer: null,
        total: null,
        errorMessage: null,
        exportList: [],
    },
    mutations: {
        getCustomerList(state, data) {
            state.customerList = data;
            state.errorMessage = null
        },
        getCustomerListPerPage(state, data){
          state.customers = data.data;
          state.total = data.total;
          state.errorMessage = null
        },
        addCustomerList(state, data){
            state.addCustomer = data;
            state.errorMessage = null
        },
        updateCustomerList(state, data){
            state.updateCustomer = data;
            state.errorMessage = null
        },
        showError(state, data) {
            state.errorMessage = data;
        },
        exportCustomerList(state, data){
            state.exportList = data;
            state.errorMessage = null
        }
    },
    actions: {
        getCustomerList: ({ commit }) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: '/admin/global/list-customers', method: "GET"}).then(response => {
                    commit('getCustomerList', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    commit('showError', e.response.data);
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
                    commit('showError', e.response.data);
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
                    commit('showError', e.response.data);
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
                    commit('showError', e.response.data);
                    reject(e);
                })
            })
        }, 
        exportCustomerList:  () => {
            // return new Promise((resolve, reject) => {
                axiosClient.get( '/admin/customers/export', {
                    responseType: 'blob'
                }).then(response => {
                    commit('exportCustomerList', response.data);
                    console.log(response.data);

                    const url = URL.createObjectURL(new Blob([response.data], {
                        type: 'application/vnd.ms-excel'
                      }));
                      const link = document.createElement('a');
                      link.href = url;
                      link.setAttribute('download', "customerList");
                      document.body.appendChild(link);
                      link.click();
        
                }).catch(e => {
                    // commit('showError', e.response.data);
                    // reject(e);
                })
            // })
        },
    }
}