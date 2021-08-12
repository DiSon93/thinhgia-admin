import axiosClient from "~/utils/axiosClient";


export function  exportFileList(base, name) {
    axiosClient
      .get(base, {
        responseType: "blob",
      })
      .then((response) => {
        const url = URL.createObjectURL(
          new Blob([response.data], {
            type: "application/vnd.ms-excel",
          })
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", name);
        document.body.appendChild(link);
        link.click();
      })
      .catch((e) => {       
      });
  }