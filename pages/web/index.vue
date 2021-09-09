<template>
  <div class="web">
    <div class="header_box d-flex">
      <v-row align="center" d-flex>
        <button class="homepage" disabled>Thông tin web</button>
        <div class="option_button">
          <v-btn class="account" fab @click="centerDialogVisible02 = true"
            ><v-icon dark small>mdi-account</v-icon></v-btn
          >
        </div>
      </v-row>
    </div>
    <div class="form" v-if="setting" v-loading="loading">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <v-row>
          <v-col cols="12" sm="6">
            <div class="label">Site Title <span style="color: red">*</span></div>
            <el-form-item prop="title_website">
              <el-input v-model="ruleForm.title_website"></el-input>
            </el-form-item>
          </v-col>
          <v-col cols="12" sm="6">
            <div class="label">Email Address<span style="color: red">*</span></div>
            <el-form-item prop="site_email">
              <el-input type="email" v-model="ruleForm.site_email"></el-input>
            </el-form-item>
          </v-col>
          <v-col cols="12" sm="6">
            <div class="label">Điện thoại <span style="color: red">*</span></div>
            <el-form-item prop="site_phone">
              <el-input v-model="ruleForm.site_phone"></el-input>
            </el-form-item>
          </v-col>
          <v-col cols="12" sm="6">
            <div class="label">Thêm số điện thoại</div>
            <el-form-item prop="site_extra_phone">
              <el-input v-model="ruleForm.site_extra_phone"></el-input>
            </el-form-item>
          </v-col>
          <v-col cols="12" sm="6">
            <div class="label">Địa chỉ <span style="color: red">*</span></div>
            <el-form-item prop="site_head_office_vi">
              <el-input v-model="ruleForm.site_head_office_vi"></el-input>
            </el-form-item>
          </v-col>
          <v-col cols="12" sm="6">
            <div class="label">Chi nhánh</div>
            <!-- <el-form-item prop="site_branch_office_vi">
              <el-input v-model="ruleForm.site_branch_office_vi"></el-input>
            </el-form-item> -->
            <el-input
              class="input-new-tag"
              v-model="inputValue"
              ref="saveTagInput"
              size="mini"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
              placeholder="Thêm chi nhánh ở đây"
            >
            </el-input>
            <el-tag
              :key="tag"
              v-for="tag in dynamicTags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
              type="info"
            >
              {{ tag }}
            </el-tag>

            <!-- <el-button v-else class="button-new-tag" size="small" @click="showInput"
              >+ New Tag</el-button
            > -->
          </v-col>
          <v-col cols="12">
            <div class="label">Mô tả <span style="color: red">*</span></div>
            <el-form-item prop="site_description_vi">
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 10 }"
                placeholder="Please input"
                v-model="ruleForm.site_description_vi"
              >
              </el-input>
            </el-form-item>
          </v-col>
          <v-col cols="12" sm="6">
            <div class="label">Web</div>
            <el-form-item prop="site_domain">
              <el-input v-model="ruleForm.site_domain"></el-input>
            </el-form-item>
          </v-col>
          <v-col cols="12" sm="6">
            <div class="label">Thời gian làm việc</div>
            <el-form-item prop="time">
              <el-input v-model="ruleForm.open_time"></el-input>
            </el-form-item>
          </v-col>
          <v-col cols="12" sm="6">
            <div class="label">Favicon <span style="color: red">*</span></div>
            <el-upload
              v-if="headers"
              action="https://thinhgiacore.demo.fit/api/admin/blogs/image"
              list-type="picture-card"
              drag
              name="file[]"
              :on-preview="handlePictureCardPreviewFavicon"
              :on-remove="handleRemoveFavicon"
              :on-change="handleChangeFavicon"
              :on-success="handleAvatarSuccessFavicon"
              :headers="headers"
              :show-file-list="false"
              ref="upload"
            >
              <img v-if="imageUrlFav" :src="imageUrlFav" class="avatar" />

              <i v-else slot="default" class="el-icon-picture"></i>
            </el-upload>
          </v-col>
          <v-col cols="12" sm="6">
            <div class="label">Logo <span style="color: red">*</span></div>
            <el-upload
              v-if="headers"
              action="https://thinhgiacore.demo.fit/api/admin/blogs/image"
              list-type="picture-card"
              drag
              name="file[]"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-change="handleChange"
              :on-success="handleAvatarSuccess"
              :headers="headers"
              :show-file-list="false"
              ref="upload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else slot="default" class="el-icon-picture"></i>
            </el-upload>
          </v-col>
          <v-col cols="12" sm="6">
            <div class="label">Logo Slogan</div>
            <el-form-item prop="site_slogan">
              <el-input v-model="ruleForm.site_slogan"></el-input>
            </el-form-item>
          </v-col>

          <v-col cols="12" sm="6">
            <div class="label">Link Facebook</div>
            <el-form-item prop="site_facebook">
              <el-input v-model="ruleForm.site_facebook"></el-input>
            </el-form-item>
          </v-col>
          <v-col cols="12" sm="6">
            <div class="label">Link Zalo</div>
            <el-form-item prop="site_zalo">
              <el-input v-model="ruleForm.site_zalo"></el-input>
            </el-form-item>
          </v-col>
        </v-row>

        <el-form-item id="btn_submit">
          <!-- <el-button id="btn_web" @click="submitForm('ruleForm')">Lưu</el-button> -->
        </el-form-item>
      </el-form>
    </div>
    <div id="btn_submit">
      <el-button id="btn_web" @click="submitForm('ruleForm')">Lưu</el-button>
    </div>
    <el-dialog
      :visible.sync="centerDialogVisible02"
      :width="dialog"
      center
      id="user_detail_dialog"
    >
      <UserDetail v-on:close-modals="handleChangePassword" />
    </el-dialog>
    <el-dialog
      :visible.sync="centerDialogVisible03"
      :width="dialog"
      center
      id="user_changePass_dialog"
      title="Đổi mật khẩu"
      destroy-on-close
    >
      <ChangePassword v-on:close-modals="centerDialogVisible03 = false" />
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import UserDetail from "@component/Form/UserDetail";
import ChangePassword from "@component/Form/ChangePassword";
export default {
  components: {
    UserDetail,
    ChangePassword,
  },
  data() {
    var checkNumber = (rule, value, callback) => {
      var regex = /^[0-9]*$/;
      if (!value.match(regex)) {
        callback(new Error("Please input digits"));
      } else {
        callback();
      }
    };
    return {
      centerDialogVisible02: false,
      centerDialogVisible03: false,
      dialogVisible: false,
      dialog: window.innerWidth < 600 ? "80%" : window.innerWidth < 1200 ? "50%" : "25%",
      fileList: [],
      headers: null,
      token: "",
      favicon: "",
      site_logo: "",
      imageUrlFav: "",
      imageUrl: "",
      loading: false,
      dynamicTags: [],
      inputVisible: false,
      branch: "",
      inputValue: "",
      ruleForm: {
        title_website: "",
        site_email: "",
        site_phone: "",
        site_extra_phone: "",
        site_head_office_vi: "",
        // site_branch_office_vi: "",
        site_description_vi: "",
        site_domain: "",
        open_time: "",
        logo_slogan: "",
        site_facebook: "",
        site_zalo: "",
      },
      rules: {
        title_website: [
          {
            required: true,
            message: "Please select activity resource",
            trigger: "change",
          },
        ],
        site_email: [
          {
            required: true,
            message: "Please input email",
            trigger: "change",
          },
          {
            type: "email",
            message: "Please input email address",
            trigger: "submit",
          },
        ],
        site_phone: [
          {
            required: true,
            message: "Please input number",
            trigger: "change",
          },
          // { validator: checkNumber, trigger: "blur" },
          {
            min: 7,
            message: "The phone must be at least 7 characters.",
            trigger: "blur",
          },
        ],
        site_extra_phone: [
          {
            required: true,
            message: "Please input number",
            trigger: "change",
          },
          // { validator: checkNumber, trigger: "blur" },
          {
            min: 7,
            message: "The phone must be at least 7 characters.",
            trigger: "blur",
          },
        ],
        site_head_office_vi: [
          {
            required: true,
            message: "Please select activity resource",
            trigger: "change",
          },
        ],
        // site_branch_office_vi: [
        //   {
        //     required: true,
        //     message: "Please select activity resource",
        //     trigger: "change",
        //   },
        // ],
        site_description_vi: [
          {
            required: true,
            message: "Please select activity resource",
            trigger: "change",
          },
        ],
      },
    };
  },
  watch: {
    dynamicTags: function () {
      console.log("tag", this.dynamicTags);
      this.branch = this.dynamicTags.join("?");
      console.log("branch", this.branch);
    },
  },
  mounted() {
    this.token = `bearer ${this.currentUser.results.access_token}`;
    this.headers = { Authorization: `bearer ${this.currentUser.results.access_token}` };
    this.getSettingList();
  },
  computed: {
    ...mapState("auth", ["currentUser"]),
    ...mapState("web", ["setting"]),
  },
  methods: {
    async getSettingList() {
      try {
        await this.$store.dispatch("web/getSettingList");
        this.ruleForm = {
          title_website: this.setting.title_website,
          site_email: this.setting.site_email,
          site_phone: this.setting.site_phone,
          site_extra_phone: this.setting.site_extra_phone,
          site_head_office_vi: this.setting.site_head_office_vi,
          // site_branch_office_vi: this.setting.site_branch_office_vi,
          site_description_vi: this.setting.site_description_vi,
          site_domain: this.setting.site_domain,
          open_time: this.setting.open_time,
          site_slogan: this.setting.site_slogan,
          site_facebook: this.setting.site_facebook,
          site_zalo: this.setting.site_zalo,
        };
        this.favicon = this.setting.favicon;
        this.site_logo = this.setting.site_logo;
        this.imageUrlFav = this.setting.favicon;
        this.imageUrl = this.setting.site_logo;
        this.dynamicTags = this.setting.site_branch_office_vi.split("?");
      } catch {
        console.log("Error Setting!");
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateSettingType();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleRemove(file, fileList) {},
    handleRemoveFavicon(file, fileList) {
      console.log("remore", file);
      this.$store.dispatch("blog/deleteBlogPhoto", file.response.results[0].id);
    },
    handlePictureCardPreview(file) {},
    handlePictureCardPreviewFavicon(file) {},
    handleChange(list, fileList) {},
    handleChangeFavicon(list, fileList) {},
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.site_logo = res.results[0].main;
    },
    handleAvatarSuccessFavicon(res, file) {
      this.imageUrlFav = URL.createObjectURL(file.raw);
      this.favicon = res.results[0].thumbnail;
    },
    handleChangePassword() {
      this.centerDialogVisible03 = true;
      setTimeout(() => {
        this.centerDialogVisible02 = false;
      }, 100);
    },
    async updateSettingType() {
      console.log("rule", this.ruleForm);
      this.loading = true;
      // debugger;
      try {
        await this.$store.dispatch("web/updateSettingType", {
          // setting_name: {
          ...this.ruleForm,
          site_branch_office_vi: this.branch,
          favicon: this.favicon,
          site_logo: this.site_logo,
          google_analytics: "",
          seo_separator: "",
          site_branch_office_en: "",
          site_description_en: "",
          site_head_office_en: "",
          seo_keywords: "",
          site_linkedin: "",
          site_telegram: "",
          site_twitter: "",
          site_youtube: "",
          // },
        });
        this.loading = false;
        this.openNotificationSuccess();
      } catch {
        this.loading = false;
        this.showErrorNotification();
      }
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
        message: "Update type of contact successfull!!!",
        type: "success",
      });
    },

    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.header_box {
  left: 208px !important;
  background: #eff5f9 !important;
  margin: 20px 0 40px !important;
  padding-top: 10px;
  .homepage {
    width: 100px;
    height: 25px !important;
    margin-left: 30px;
    // margin-top: 35px;
    background: #ffffff;
    border: 1px solid rgba(96, 96, 96, 0.2);
    border-radius: 15px;
    font-size: 12px;
    letter-spacing: 0.5px;
    color: #606060;
  }
  .option_button {
    position: absolute;
    right: 30px;
    .account {
      margin-left: 2px;
      padding: 0;
      width: 24px !important;
      height: 24px !important;
      border-radius: 50%;
      background-color: #fff !important;
      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.15);
      &:hover {
        border: 1px solid blue;
        transition: 0.5s;
      }
    }
  }
}
.form {
  width: 100%;
  margin: 0 auto;
  background: #ffffff;
  border: 1px solid #dfdfdf;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 30px 20px;
  margin-bottom: 60px;
  .col-sm-6.col-12 {
    padding: 0 12px;
  }
  .label {
    font-size: 14px;
    font-weight: 500;
    margin-top: -10px;
  }
}

.el-tag + .el-tag {
  margin-top: 10px;
  // display: block;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  margin-bottom: 10px;
}
@media screen and (min-width: 1265px) {
  .header_box {
    margin-top: -50px !important;
  }
}

@media screen and (max-width: 600px) {
  .data_table {
    padding: 30px 15px 80px;
  }
  .homepage {
    margin-left: 15px !important;
  }
  .user_noti {
    span {
      font-size: 11px !important;
    }
  }
  .form {
    width: 96%;
    margin-bottom: 100px;
  }
  .header_box {
    .option_button {
      width: 30px;
      top: 30px;
      right: 30px;
      .account {
      }
    }
  }
}
</style>
