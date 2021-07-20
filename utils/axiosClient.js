import axios from 'axios';

const axiosClient = axios.create({
    baseURL: "https://thinhgiacore.demo.fit/api"

})
//Tự động thêm authorization vào headers nếu có accexxToken
axiosClient.interceptors.request.use((config) => {
    // const {accessToken} = JSON.parse(localStorage.getItem("user") || {});
    const user = localStorage.getItem("user");
    if(user){
        const { results } =JSON.parse(user);
        const { access_token } = results;
        config.headers.common.Authorization = `Bearer ${access_token}`;
    }
  

    return config;
})
const user = localStorage.getItem("user");
if(user){
  axiosClient.interceptors.response.use((response) => {
    return response;
  }, (error) => {

    // if (error.response && error.response.data && error.response.data.error &&
    //   (error.response.data.session === false || error.response.data.session === "false")) {
    //   localStorage.removeItem("user"); // <-- add your var
    //   window.location = "/";   // <-- add your path
    // }
    // else if (error.response && error.response.data && error.response.data.error && error.response.data.error.message) {
    //   toastMessage(error.response.data.error.message, 1);
    // }
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("user"); // <-- add your var
        window.location = "/admin/login";  // <-- add your path
        // this.$router.push("/admin/login");
      } else
        return Promise.reject(error);
  });
}


export default axiosClient;
