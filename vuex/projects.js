import axiosClient from "~/utils/axiosClient";

export default {
    namespaced: true,
    state: {
       projectList: [],
       allProject: [],
       total: 0,
       addProject: null,
       deleteProject: null,
       deleteImage: null,
       selectedProject: null,
       updateProject: null,
    },
    mutations: {
        getProjectList(state, data){
           state.projectList = data.data;
           state.total = data.total;
        },
        getAllProjectList(state, data){
             state.allProject = data
        },
        createProject(state, data){
           state.addProject = data;
        },
        deleteProject(state, data){
          state.deleteProject = data;
        },
        deleteImage(state, data){
            state.deleteImage = data;       
         },
         selectedProject(state, data){
          state.selectedProject = data;
         },
         updateNewProject(state, data){
             state.updateProject = data;
         },
    },
    actions: {
        getProjectList: ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/projects?limit=${data.limit}&page=${data.page}`, method: "GET"}).then(response => {
                    commit('getProjectList', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    reject(e);
                })
            })
        },
        getAllProjectList: ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/projects?page=${data.page}`, method: "GET"}).then(response => {
                    commit('getAllProjectList', response.data);
                    resolve(response.data);
                }).catch(e => {
                    reject(e);
                })
            })
        },
        createNewProject: ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: '/admin/projects', method: "POST", data: data}).then(response => {
                    commit('createProject', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    reject(e);
                })
            })
        },
        deleteProjectIntoSystem: ({ commit }, _id) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/projects/${_id}`, method: "DELETE"}).then(response => {
                    commit('deleteProject', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    reject(e);
                })
            })
        },
        deleteImageInProject:({ commit }, _id) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/projects/image/${_id}`, method: "DELETE"}).then(response => {
                    commit('deleteImage', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    reject(e);
                })
            })   
        },
        updateNewProject:({ commit }, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/projects/${data.id}`, method: "PATCH", data: data}).then(response => {
                    commit('updateNewProject', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    reject(e);
                })
            })
        },
    }
}
