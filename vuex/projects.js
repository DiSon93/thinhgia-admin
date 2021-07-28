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
       errorMessage: null,
    },
    mutations: {
        getProjectList(state, data){
           state.projectList = data.data;
           state.total = data.total;
           state.errorMessage = null;
        },
        getProjectListOverPageOne(state, data){
            state.projectList = data;
        },
        getAllProjectList(state, data){
             state.allProject = data;
           state.errorMessage = null;

        },
        createProject(state, data){
           state.addProject = data;
           state.errorMessage = null;
        },
        deleteProject(state, data){
          state.deleteProject = data;
          state.errorMessage = null;
        },
        deleteImage(state, data){
            state.deleteImage = data;  
           state.errorMessage = null;
         },
         selectedProject(state, data){
          state.selectedProject = data;
          state.errorMessage = null;
         },
         updateNewProject(state, data){
             state.updateProject = data;
           state.errorMessage = null;
         },
         showErrorr(state, data){
             state.errorMessage = data;
         }
    },
    actions: {
        getProjectList: ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                axiosClient({ url: `/admin/projects?limit=${data.limit}&page=${data.page}`, method: "GET"}).then(response => {
                    commit('getProjectList', response.data.results);
                    resolve(response.data);
                }).catch(e => {
                    commit('showErrorr', e.response.data)
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
                    commit('showErrorr', e.response.data)
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
                    commit('showErrorr', e.response.data)
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
                    commit('showErrorr', e.response.data)
                    reject(e);
                })
            })
        },
    }
}
