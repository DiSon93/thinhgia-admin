<template>
  <div class="createCustomer" v-loading="loadingChild">
    <!-- <div class="create_title"></div> -->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
      <v-row>
        <v-col cols="4" class="img_user">
          <el-upload
            v-if="headers"
            class="avatar-uploader"
            action="https://thinhgiacore.demo.fit/api/admin/customers/upload-avatar"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :headers="headers"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <img v-else src="@image/icons/user.svg" alt="" />
          </el-upload>
          <div class="select_img">Thêm ảnh</div>
        </v-col>
        <v-col cols="8">
          <div>Tên</div>
          <el-form-item prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <v-row>
            <v-col cols="6">
              <div>SDT</div>
              <el-form-item prop="phone">
                <el-input v-model="ruleForm.phone"></el-input>
              </el-form-item>
            </v-col>
            <v-col cols="6">
              <div>Số Fax</div>
              <el-form-item prop="phone">
                <el-input v-model="ruleForm.fax"></el-input>
              </el-form-item>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <div>Email</div>
          <el-form-item prop="email">
            <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>
        </v-col>
        <v-col cols="6">
          <div>Ngày sinh</div>
          <el-form-item prop="birth_day">
            <el-date-picker
              type="date"
              placeholder="Pick a date"
              v-model="ruleForm.birth_day"
              style="width: 100%"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </v-col>
        <v-col cols="6">
          <div>CMND</div>
          <el-form-item prop="identity_card">
            <el-input v-model="ruleForm.identity_card"></el-input>
          </el-form-item>
        </v-col>
        <v-col cols="6">
          <div>Nhân viên</div>
          <el-form-item prop="user_id">
            <!-- <el-input v-model="ruleForm.staff"></el-input> -->
            <el-select v-model="ruleForm.user_id" placeholder="Chọn nhân viên">
              <el-option
                v-for="item in staffList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </v-col>
        <v-col cols="12">
          <div>Địa chỉ</div>
          <el-form-item prop="address">
            <el-input v-model="ruleForm.address"></el-input>
          </el-form-item>
        </v-col>

        <v-col cols="12">
          <div>Ghi chú</div>
          <el-form-item prop="note">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="Please input"
              v-model="ruleForm.note"
            >
            </el-input>
          </el-form-item>
        </v-col>
      </v-row>
      <el-form-item class="btn_submit">
        <el-button id="huy_createUser" @click="cancelModal">Hủy</el-button>
        <el-button id="new_createUser" @click="submitForm('ruleForm')">Tạo mới</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { showErrorMessage, showSuccessMessage } from "../../utils/notification";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      token: "",
      dropzoneOptions: null,
      headers: null,
      loadingChild: false,
      ruleForm: {
        name: "",
        email: "",
        phone: "",
        user_id: "",
        fax: "",
        birth_day: "",
        identity_card: "",
        address: "",
        note: "",
        avatar: "",
      },
      imageUrl: "",
      avatar_id: null,
      selectedFile: null,
      rules: {
        name: [
          { required: true, message: "Please input name", trigger: "blur" },
          { min: 2, max: 30, message: "Length should be 2 to 30", trigger: "blur" },
        ],
        email: [
          {
            type: "email",
            required: true,
            message: "Please input email",
            trigger: "submit",
          },
        ],
        phone: [
          {
            required: true,
            message: "Please input phone",
            trigger: "submit",
          },
          // {
          //   message: "Please input number",
          //   trigger: "change",
          // },
        ],
        fax: [
          {
            required: true,
            message: "Please input fax",
            trigger: "submit",
          },
          // {
          //   message: "Please input number",
          //   trigger: "change",
          // },
        ],
        birth_day: [
          {
            required: true,
            message: "Please pick a time",
            trigger: "submit",
          },
        ],
        identity_card: [
          {
            required: true,
            // type: "numner",
            message: "Please select at least one activity type",
            trigger: "submit",
          },
          // {
          //   type: "numner",
          //   message: "Please input number",
          //   trigger: "change",
          // },
        ],
        user_id: [
          { required: true, message: "Please select staff name", trigger: "change" },
        ],
        address: [
          {
            required: true,
            message: "Please select activity resource",
            trigger: "change",
          },
        ],
      },
    };
  },
  mounted() {
    this.token = `bearer ${this.currentUser.results.access_token}`;
    // console.log(this.token);
    // this.dropzoneOptions = {
    //   url: "https://thinhgiacore.demo.fit/api/admin/users/upload-avatar",
    //   thumbnailWidth: 120,
    //   thumbnailHeight: 100,
    //   maxFilesize: 5,
    //   dictDefaultMessage: "<i class='el-icon-user-solid avatar_img'></i>",
    //   headers: { Authorization: `bearer ${this.currentUser.results.access_token}` },
    // };
    this.headers = { Authorization: `bearer ${this.currentUser.results.access_token}` };
    this.getStaffList();
  },
  computed: {
    ...mapState("staffs", ["errorMessage", "loading", "staffList"]),
    ...mapState("auth", ["currentUser"]),
  },
  methods: {
    ...mapActions("staffs", ["getStaffList"]),

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addCustomerToSystem();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async addCustomerToSystem() {
      this.loadingChild = true;
      try {
        await this.$store.dispatch("customers/createNewCustomer", {
          ...this.ruleForm,
          avatar: this.avatar_id ? this.avatar_id : 0,
        });

        if (!this.errorMessage) {
          this.loadingChild = false;
          this.cancelModal();
          setTimeout(this.openNotificationCreate(), 1000);
          this.$emit("reload-page");
        }
      } catch {
        this.loadingChild = false;
        this.showErrorMessage();
      }
    },
    showErrorMessage() {
      this.$notify.error({
        title: "Error",
        message: "Create customer failure!!!",
      });
    },
    cancelModal() {
      this.$emit("close-modals");
    },
    openNotificationCreate() {
      this.$notify({
        title: "Success",
        message: "Create customer successfull!!!",
        type: "success",
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.avatar_id = res.results.id;
      console.log(this.avatar_id);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("Avatar picture must be JPG format!");
      }
      if (!isLt2M) {
        this.$message.error("Avatar picture size can not exceed 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>

<style lang="scss" scoped>
.createCustomer {
  .img_user {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .select_img {
      position: absolute;
      bottom: 5%;
    }
    img {
      width: 100px;
      height: 100px;
    }
  }
  .col.col-4,
  .col-6,
  .col-12 {
    padding: 0 12px;
  }
  .btn_submit {
    text-align: right;
    margin-bottom: -10px;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
#dropzone {
  padding: 0px;
}
</style>
