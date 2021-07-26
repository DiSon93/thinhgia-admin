<template>
  <div class="create_project" v-loading="loading">
    <div class="project_title">Tạo dự án</div>
    <!-- <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm"> -->
    <div class="project_overview">
      <div class="address">
        <div class="overview">Tổng quan dự án</div>
        <v-row>
          <v-col cols="3">
            <div class="label">Tỉnh <span style="color: red">*</span></div>
            <el-select v-model="value01" placeholder="Chọn tỉnh" @change="chooseProvince">
              <el-option
                v-for="item in provinceList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <p class="error_message" v-if="errorMessage">
              {{ errorMessage.province_id ? errorMessage.province_id[0] : null }}
            </p>
          </v-col>
          <v-col cols="3">
            <div class="label">Huyện/TP <span style="color: red">*</span></div>
            <el-select
              v-model="value02"
              placeholder="Chọn huyện/TP"
              @change="chooseDistrict"
              no-data-text="Vui lòng chọn tỉnh"
            >
              <el-option
                v-for="item in dictrictList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <p class="error_message" v-if="errorMessage">
              {{ errorMessage.district_id ? errorMessage.district_id[0] : null }}
            </p>
          </v-col>
          <v-col cols="3">
            <div class="label">Phường/Xã <span style="color: red">*</span></div>
            <el-select
              v-model="value03"
              placeholder="Chọn phường/xã"
              no-data-text="Vui lòng chọn huyện"
            >
              <el-option
                v-for="item in wardList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <p class="error_message" v-if="errorMessage">
              {{ errorMessage.ward_id ? errorMessage.ward_id[0] : null }}
            </p>
          </v-col>
          <v-col cols="3">
            <div class="label">Tên đường/Số nhà</div>
            <el-input v-model="value04"></el-input>
          </v-col>
          <v-col cols="3">
            <div class="label">Loại dự án <span style="color: red">*</span></div>
            <el-select v-model="value05" placeholder="Chọn loại dự án">
              <el-option
                v-for="item in projectType"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <p class="error_message" v-if="errorMessage">
              {{ errorMessage.type ? errorMessage.type[0] : null }}
            </p>
          </v-col>
          <v-col cols="3">
            <div class="label">Tiến độ</div>
            <!-- <el-input v-model="value06"></el-input> -->
            <el-select v-model="value06" placeholder="Chọn tiến độ">
              <el-option
                v-for="item in proccessType"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </v-col>
          <v-col cols="3">
            <div class="label">Chủ đầu tư</div>
            <el-input v-model="value07"></el-input>
          </v-col>
          <v-col cols="3">
            <div class="label">Tên dự án <span style="color: red">*</span></div>
            <el-input v-model="value08"></el-input>
          </v-col>
        </v-row>
      </div>

      <v-row>
        <v-col cols="6" class="cms">
          <div class="overlay overlay_left">
            <div class="overview">Vị trí dự án</div>
            <div class="tieude">
              <div class="form_label">Mô tả</div>
              <editor
                api-key="onivchqt2jlmk6u6jubfmjfzk2s33x828b1yq198t8fiv9aq"
                v-model="value09"
                :init="{
                  menubar: true,
                  selector: 'textarea#local-upload',
                  resize: true,
                  fontsize_formats:
                    '8pt 9pt 10pt 11pt 12pt 14pt 18pt 24pt 30pt 36pt 48pt 60pt 72pt 96pt',
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    ' autoresize',
                    'insertdatetime media table paste code help wordcount',
                  ],
                  toolbar:
                    'undo redo | formatselect | forecolor   | fontsizeselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | insertfile link image |  code | \
           bullist numlist outdent indent | removeformat | help',
                  images_upload_url: 'postAcceptor.php',
                  automatic_uploads: false,
                  file_picker_types: 'image',
                  images_reuse_filename: true,
                  images_file_types: 'jpg,svg,webp,png,gif',
                  content_style: 'p { margin: 0; }',
                }"
              />
            </div>
          </div>
        </v-col>
        <v-col cols="6" class="cms">
          <div class="overlay overlay_right">
            <div class="overview">Tiện ích</div>
            <div class="tieude">
              <div class="form_label">Mô tả</div>
              <editor
                api-key="onivchqt2jlmk6u6jubfmjfzk2s33x828b1yq198t8fiv9aq"
                v-model="value10"
                :init="{
                  menubar: true,
                  selector: 'textarea#local-upload',
                  resize: true,
                  fontsize_formats:
                    '8pt 9pt 10pt 11pt 12pt 14pt 18pt 24pt 30pt 36pt 48pt 60pt 72pt 96pt',
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    ' autoresize',
                    'insertdatetime media table paste code help wordcount',
                  ],
                  toolbar:
                    'undo redo | formatselect | forecolor   | fontsizeselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | insertfile link image |  code | \
           bullist numlist outdent indent | removeformat | help',
                  images_upload_url: 'postAcceptor.php',
                  automatic_uploads: false,
                  file_picker_types: 'image',
                  images_reuse_filename: true,
                  images_file_types: 'jpg,svg,webp,png,gif',
                  content_style: 'p { margin: 0; }',
                }"
              />
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row class="cms_upload">
        <v-col cols="6" class="cms">
          <div class="upload">
            <div class="upload_img">
              <div class="title_upload">Hình ảnh</div>
              <i>Kéo và thả nhiều tệp để tải lên</i>
              <el-upload
                v-if="headers"
                action="https://thinhgiacore.demo.fit/api/admin/projects/image"
                list-type="picture-card"
                drag
                multiple
                name="file[]"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-change="handleChange"
                :on-success="handleAvatarSuccess"
                :headers="headers"
                :file-list="fileList"
                ref="upload"
              >
                <i slot="default" class="el-icon-picture"></i>

                <!-- <div slot="tip" slot-scope="{ file }">
                  <img
                    class="el-upload-list__item-thumbnail"
                    :src="file.thumbnail"
                    alt=""
                  />
                </div> -->
              </el-upload>

              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="" />
              </el-dialog>
            </div>
          </div>
          <div class="overlay overlay_left">
            <div class="overview">Thông tin thêm</div>
            <div class="tieude">
              <div class="form_label">Tiêu đề</div>
              <el-input v-model="value13" id="input_estate"></el-input>

              <div class="form_label">Mô tả</div>
              <editor
                api-key="onivchqt2jlmk6u6jubfmjfzk2s33x828b1yq198t8fiv9aq"
                v-model="value14"
                :init="{
                  menubar: true,
                  selector: 'textarea#local-upload',
                  resize: true,
                  fontsize_formats:
                    '8pt 9pt 10pt 11pt 12pt 14pt 18pt 24pt 30pt 36pt 48pt 60pt 72pt 96pt',
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    ' autoresize',
                    'insertdatetime media table paste code help wordcount',
                  ],
                  toolbar:
                    'undo redo | formatselect | forecolor   | fontsizeselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | insertfile link image |  code | \
           bullist numlist outdent indent | removeformat | help',
                  images_upload_url: 'postAcceptor.php',
                  automatic_uploads: false,
                  file_picker_types: 'image',
                  images_reuse_filename: true,
                  images_file_types: 'jpg,svg,webp,png,gif',
                  content_style: 'p { margin: 0; }',
                }"
              />
            </div>
          </div>
        </v-col>
        <v-col cols="6" class="cms">
          <div class="overlay overlay_right mathang">
            <div class="overview">Mặt bằng</div>
            <div class="tieude">
              <div class="form_label">Mô tả</div>
              <editor
                api-key="onivchqt2jlmk6u6jubfmjfzk2s33x828b1yq198t8fiv9aq"
                v-model="value12"
                :init="{
                  menubar: true,
                  selector: 'textarea#local-upload',
                  resize: true,
                  fontsize_formats:
                    '8pt 9pt 10pt 11pt 12pt 14pt 18pt 24pt 30pt 36pt 48pt 60pt 72pt 96pt',
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    ' autoresize',
                    'insertdatetime media table paste code help wordcount',
                  ],
                  toolbar:
                    'undo redo | formatselect | forecolor   | fontsizeselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | insertfile link image |  code | \
           bullist numlist outdent indent | removeformat | help',
                  images_upload_url: 'postAcceptor.php',
                  automatic_uploads: false,
                  images_reuse_filename: true,
                  file_picker_types: 'image',
                  images_file_types: 'jpg,svg,webp,png,gif',
                  content_style: 'p { margin: 0; }',
                }"
              />
            </div>
          </div>
        </v-col>
      </v-row>
      <div class="save">
        <el-button id="save" @click="updateNewProject">Lưu</el-button>
      </div>
    </div>
    <!-- </el-form> -->
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import { mapState, mapActions } from "vuex";
import axiosClient from "~/utils/axiosClient";
export default {
  components: {
    editor: Editor,
  },
  data() {
    return {
      fileList: [],
      value01: "",
      value02: "",
      value03: "",
      value04: "",
      value05: "",
      value06: "",
      value07: "",
      value08: "",
      value09: "",
      value10: "",
      value11: "",
      value12: "",
      value13: "",
      value14: "",
      image_id: [],
      headers: null,
      token: "",
      projectType: [],
      proccessType: [],
      images: "",
      dialogVisible: false,
      loading: false,
      dialogImageUrl: "",
      disabled: false,
      attacment: null,
      form: new FormData(),
    };
  },
  mounted() {
    this.getProvinceList();
    this.getDictionaryTypeList();
    this.token = `bearer ${this.currentUser.results.access_token}`;
    this.headers = { Authorization: `bearer ${this.currentUser.results.access_token}` };
    this.getProjectUpdate();
  },
  computed: {
    ...mapState("global", ["dictrictList"]),
    ...mapState("global", ["provinceList"]),
    ...mapState("global", ["wardList"]),
    ...mapState("projects", ["selectedProject", "deleteImage"]),
    ...mapState("dictionaries", ["dictionaryList"]),
    ...mapState("auth", ["currentUser"]),
    ...mapState("projects", ["errorMessage"]),
  },
  methods: {
    ...mapActions("global", ["getProvinceList"]),

    chooseProvince() {
      this.value02 = "";
      this.value03 = "";
      this.$store.commit("global/setNoWardList");
      this.$store.dispatch("global/getDictrictList", this.value01);
    },
    chooseDistrict() {
      this.value03 = "";
      this.$store.dispatch("global/getWardList", this.value02);
    },

    async getProjectUpdate() {
      this.value01 = this.selectedProject.province_id;
      await this.$store.dispatch("global/getDictrictList", this.value01);
      this.value02 = this.selectedProject.district_id;
      await this.$store.dispatch("global/getWardList", this.value02);
      this.value03 = this.selectedProject.ward_id;
      this.value04 = this.selectedProject.street;
      this.value05 = this.selectedProject.type;
      this.value06 = this.selectedProject.progress;
      this.value07 = this.selectedProject.investor;
      this.value08 = this.selectedProject.name;
      this.value09 = this.selectedProject.location;
      this.value10 = this.selectedProject.utilities;
      this.value12 = this.selectedProject.ground;
      this.value13 = this.selectedProject.title;
      this.value14 = this.selectedProject.descriptions;
      this.image_id = this.selectedProject.image_id.split(",");
      this.fileList = this.selectedProject.images.map((item, index) => {
        return { ...item, url: item.thumbnail };
      });
    },
    async getDictionaryTypeList() {
      try {
        await this.$store.dispatch("dictionaries/getDictionaryList", {
          limit: 10,
          page: 1,
        });
        let projects = this.dictionaryList.filter((item, index) => item.id == 7);
        this.projectType = projects[0].dictionaries;
        let proccess = this.dictionaryList.filter((item, index) => item.id == 8);
        this.proccessType = proccess[0].dictionaries;
      } catch {}
    },

    async updateNewProject() {
      this.loading = true;
      try {
        await this.$store.dispatch("projects/updateNewProject", {
          province_id: this.value01,
          district_id: this.value02,
          ward_id: this.value03,
          street: this.value04,
          type: this.value05,
          progress: this.value06,
          investor: this.value07,
          name: this.value08,
          location: this.value09,
          utilities: this.value10,
          ground: this.value12,
          title: this.value13,
          descriptions: this.value14,
          image_id: this.image_id,
          id: this.selectedProject.id,
        });
        setTimeout(this.openNotificationSuccess(), 1000);
        this.loading = false;
        this.$router.push("/projects");
      } catch {
        this.showErrorNotification();
        this.loading = false;
      }
    },

    handleRemove(file, fileList) {
      // if (file.id) {
      // console.log("before", this.image_id);
      console.log("file", file);
      if (!file.id) {
        this.$store.dispatch(
          "projects/deleteImageInProject",
          file.response.results[0].id
        );
        this.image_id = this.image_id.filter((u) => {
          return u != file.response.results[0].id;
        });
        this.fileList = this.fileList.filter((u) => {
          return u.response?.results[0].id != file.response.results[0].id;
        });
        console.log("fileList", this.fileList);
      } else {
        this.$store.dispatch("projects/deleteImageInProject", file.id);
        this.image_id = this.image_id.filter((u) => {
          return u != file.id;
        });
        this.fileList = this.fileList.filter((u) => {
          return u.id != file.id;
        });
      }

      // console.log("after", this.image_id);
      // console.log("fileLisst", this.fileList);
      // }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    handleAvatarSuccess(res, file) {
      this.image_id.push(res.results[0].id);
      this.fileList.push(res.results);
      // console.log("successList", this.fileList);

      // console.log("image_id", this.image_id);
      // console.log("file", file);
    },
    handleChange(list, fileList) {
      this.fileList = fileList;
    },
    showErrorNotification() {
      this.$notify.error({
        title: "Error",
        message: "Unsuccess require!!!",
      });
    },
    openNotificationSuccess() {
      this.$notify({
        title: "Success",
        message: "Update project successfull!!!",
        type: "success",
      });
    },

    // submitUpload() {
    //   this.loading_btn = true;
    //   this.showErr = false;
    //   this.fileList = this.fileList.filter((u) => {
    //     return u.id != undefined;
    //   });
    //   let { uploadFiles } = this.$refs.upload;
    //   let selectedUpload = uploadFiles.filter((u, i) => u.id == undefined);
    //   const img_arr = [];
    //   let form = new FormData();
    //   selectedUpload.forEach((item) => {
    //     form.append("file[]", item.raw);
    //   });
    //   axiosClient
    //     .post("/admin/projects/image", form)
    //     .then((response) => {
    //       this.img_arr = response.data.results.map((item) => {
    //         return { ...item, url: item.thumbnail };
    //       });
    //       setTimeout(() => {
    //         this.fileList = this.fileList.concat(this.img_arr);
    //       }, 1000);
    //       // console.log(this.fileList);
    //       this.image_id = this.image_id.concat(this.img_arr.map((u) => u.id));
    //       // console.log(this.image_id);
    //       this.loading_btn = false;
    //       this.btn_upload = false;
    //       this.showAlert = true;
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //       this.loading_btn = false;
    //       this.showErrorNotification();
    //     });
    // },
  },
};
</script>

<style lang="scss" scoped>
.create_project {
  .project_title {
    font-weight: bold;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.5px;
    color: #606060;
    margin-top: -60px;
  }
  .project_overview {
    .overview {
      font-weight: bold;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: 0.5px;
      color: #606060;
    }
    .label {
      font-weight: 500;
      font-size: 14px;
      line-height: 24px;
      display: flex;
      align-items: center;
      color: #606060;
    }
  }
  .cms {
    .tieude {
      .form_label {
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        display: flex;
        align-items: center;
        color: #606060;
        margin-top: 5px;
      }
    }
    .upload {
      width: 100%;
      padding: 5px;
      .upload_img {
        background: #ffffff;
        border: 1px solid #dfdfdf;
        box-sizing: border-box;
        border-radius: 4px;
        padding: 10px;
        font-size: 14px;
        .title_upload {
          font-weight: 700;
          font-size: 16px;
        }
      }
    }
  }
  .address,
  .overlay {
    margin-top: 12px;
    background: #ffffff;
    border: 1px solid #dfdfdf;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 8px 12px 24px;
    .overview {
      margin-bottom: 8px;
    }
    .col-3 {
      padding-bottom: 0px;
    }
  }
  .overlay_left {
    margin-right: -6px !important;
  }
  .overlay_right {
    margin-left: -6px !important;
  }
  .cms_upload {
    margin-top: -16px;
  }
  .mathang {
    margin-top: 6px;
  }
  .save {
    margin-top: 12px;
    padding: 12px;
    text-align: center;
    background: #ffffff;
    border: 1px solid #dfdfdf;
    box-sizing: border-box;
    border-radius: 4px;
    #save {
      background: #fbad18;
      border-radius: 15px;
      color: #fff;
      padding: 8px 20px;
    }
  }
}
.error_message {
  color: red;
  font-size: 12px;
  margin-bottom: 0px;
  margin-top: 0px;
}
</style>
