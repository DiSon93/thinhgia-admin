import axiosClient from "~/utils/axiosClient";


export function exportFileList(base, name) {
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

export function downLoadPhoto(image_ids) {
  axiosClient
    .get(`/admin/real-estates/download-zip?image_ids=${image_ids}`, {
      responseType: "blob",
    })
    .then((response) => {
      const url = URL.createObjectURL(
        new Blob([response.data], {
          type: "application/zip",
        })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "photoList");
      document.body.appendChild(link);
      link.click();
    })
    .catch((e) => {
    });
}