import axiosClient from "~/utils/axiosClient";
import { showErrorMessage } from "~/utils/notification";

export default {
    namespaced: true,
    state: {
        dictionaryList: [],
        dictionaryType: [],
        addDicType: null,
        addDic: null,
        deleteDic: null,
        errorMessage: null,
    },
    mutations: {
        getDictionaries(state, data) {
            state.dictionaryList = data;
        },
        getDictionaryType(state, data){
            state.dictionaryType = data;
        },
        addDicType(state, data){
            state.addDicType = data;
        },
        addDictionary(state, data){
            state.addDic = data;
        },
        deleteDictionary(state, data){
            state.deleteDic = data;
        },
        showErrorMessage(state, data){
            state.errorMessage = data
        },
    },
    actions: {
        getDictionaryList: ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/dictionary-types?page=${data.page}`, method: "GET"}).then(response => {
                    commit('getDictionaries', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    reject(e);
                })
            })
        },
        getDictionaryTypeList: ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: '/admin/dictionaries?limit=10&page=1', method: "GET", data: data}).then(response => {
                    commit('getDictionaryType', response.data.results.data);
                    resolve(response.data);
                }).catch(e => {
                    reject(e);
                })
            })
        },
        createNewDictinaryType:  ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: '/admin/dictionary-types', method: "POST", data: data}).then(response => {
                    commit('addDicType', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    reject(e);
                })
            })
        },
        createNewDictinary:  ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: '/admin/dictionaries', method: "POST", data: data}).then(response => {
                    commit('addDictionary', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    commit('showErrorMessage',e.response)
                    reject(e);
                })
            })
        },
        deleteDictionaries: ({ commit }, _id) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/dictionaries/${_id}`, method: "DELETE"}).then(response => {
                    commit('deleteDictionary', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    reject(e);
                })
            })
        },
        updateDictinary:  ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/dictionaries/${data.id}`, method: "PATCH", data: data}).then(response => {
                    commit('deleteDictionary', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    reject(e);
                })
            })
        },
    }
}