<template>
  <div class="createUser" v-loading="loadingChild">
    <!-- <div class="create_title"></div> -->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
      <v-row>
        <v-col cols="4" class="img_user">
          <el-upload
            v-if="headers"
            class="avatar-uploader"
            action="https://thinhgiacore.demo.fit/api/admin/users/upload-avatar"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :headers="headers"
          >
            <img v-if="avatar_image" :src="avatar_image" class="avatar" />
            <img v-else src="@image/icons/user.svg" alt="" />
          </el-upload>
          <div class="select_img">Sửa ảnh</div>
        </v-col>
        <v-col cols="4">
          <div>Tên</div>
          <el-form-item prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <div>Email</div>
          <el-form-item prop="email">
            <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>
        </v-col>
        <v-col cols="4">
          <div>SDT</div>
          <el-form-item prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
          <div>Mật khẩu</div>
          <el-form-item prop="password">
            <el-input v-model="ruleForm.password" disabled></el-input>
          </el-form-item>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <div>Ngày sinh</div>
          <!-- <el-form-item prop="birth_day">
            <el-input v-model="ruleForm.birth_day"></el-input>
          </el-form-item> -->
          <el-form-item prop="birth_day">
            <el-date-picker
              type="date"
              placeholder="Pick a date"
              v-model="ruleForm.birth_day"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </v-col>
        <v-col cols="4">
          <div>CMND</div>
          <el-form-item prop="identity_card">
            <el-input v-model="ruleForm.identity_card"></el-input>
          </el-form-item>
        </v-col>
        <v-col cols="4">
          <div>Ngày cấp</div>
          <el-form-item prop="issued_on">
            <el-date-picker
              type="date"
              placeholder="Pick a date"
              v-model="ruleForm.issued_on"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <div>Địa chỉ</div>
          <el-form-item prop="address">
            <el-input v-model="ruleForm.address"></el-input>
          </el-form-item>
        </v-col>
        <v-col cols="6">
          <div>Phân quyền</div>
          <el-form-item prop="role_id">
            <el-input v-model="ruleForm.role_id"></el-input>
          </el-form-item>
        </v-col>
      </v-row>
      <el-form-item class="btn_submit">
        <el-button id="huy_createUser" @click="cancelModal">Hủy</el-button>
        <el-button id="new_createUser" @click="submitForm('ruleForm')"
          >Cập nhật</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  props: ["userId"],
  data() {
    return {
      headers: null,
      ruleForm: {
        name: "",
        email: "",
        phone: "",
        birth_day: "",
        identity_card: "",
        issued_on: "",
        address: "",
        role_id: "",
        avatar: "",
      },
      avatar_image: null,
      imageUrl: "",
      fileList: null,
      selectedFile: null,
      loadingChild: false,
      rules: {
        name: [
          { required: true, message: "Please input name", trigger: "blur" },
          { min: 3, max: 20, message: "Length should be 3 to 5", trigger: "blur" },
        ],
        email: [
          {
            type: "email",
            required: true,
            message: "Please input email",
            trigger: "change",
          },
        ],
        phone: [
          {
            required: true,
            message: "Please input number",
            trigger: "change",
          },
        ],
        birth_day: [
          {
            required: true,
            message: "Please pick a time",
            trigger: "change",
          },
        ],
        identity_card: [
          {
            required: true,
            message: "Please select at least one activity type",
            trigger: "change",
          },
        ],
        issued_on: [
          { required: true, message: "Please input activity form", trigger: "change" },
        ],
        address: [
          {
            required: true,
            message: "Please select activity resource",
            trigger: "change",
          },
        ],
        role_id: [
          { required: true, message: "Please input activity form", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.headers = { Authorization: `bearer ${this.currentUser.results.access_token}` };
  },
  beforeMount() {
    this.getUserDetail();
  },
  computed: {
    ...mapState("staffs", ["userDetail", "errorMessage"]),
    ...mapState("auth", ["currentUser"]),
  },
  methods: {
    async getUserDetail() {
      await this.$store.dispatch("staffs/showUserDetail", this.userId);
      await this.initialize();
    },
    initialize() {
      this.ruleForm = {
        name: this.userDetail.name,
        email: this.userDetail.email,
        phone: this.userDetail.phone,
        birth_day: this.userDetail.birth_day,
        identity_card: this.userDetail.identity_card,
        issued_on: this.userDetail.issued_on,
        address: this.userDetail.address,
        role_id: this.userDetail.role_id,
        avatar: this.userDetail.avatar,
        is_block: this.userDetail.is_block,
        id: this.userDetail.id,
      };
      this.avatar_image = this.userDetail.avatar_image?.main;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateUserToSystem();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async updateUserToSystem() {
      this.loadingChild = true;
      try {
        await this.$store.dispatch("staffs/updateUser", {
          ...this.ruleForm,
        });
        if (!this.errorMessage) {
          this.loadingChild = false;
          this.cancelModal();
          this.openNotificationUpdate();
        }
      } catch {
        this.loadingChild = false;

        this.showErrorMessage();
      }
    },
    cancelModal() {
      this.$emit("close-modals");
      this.$destroy();
    },
    openNotificationUpdate() {
      this.$notify({
        title: "Success",
        message: "Update user successfull!!!",
        type: "success",
      });
    },
    showErrorMessage() {
      this.$notify.error({
        title: "Error",
        message: "Update user failure!!!",
      });
    },
    handleAvatarSuccess(res, file) {
      this.avatar_image = URL.createObjectURL(file.raw);
      this.ruleForm.avatar = res.results.id;
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
.createUser {
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
  .col-6 {
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
</style>
