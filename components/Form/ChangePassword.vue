<template>
  <div class="changePass" v-loading="loading">
    <div class="form">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <div class="label">Mật khẩu hiện tại</div>
        <el-form-item prop="current_password">
          <el-input
            placeholder="Please input"
            v-model="ruleForm.current_password"
            type="password"
          ></el-input>
        </el-form-item>
        <div class="label">Mật khẩu mới</div>
        <el-form-item prop="new_password">
          <el-input
            placeholder="Please input"
            v-model="ruleForm.new_password"
            type="password"
          ></el-input>
        </el-form-item>
        <div class="label">Nhập lại mật khẩu mới</div>
        <el-form-item prop="new_password_confirmation">
          <el-input
            placeholder="Please input"
            v-model="ruleForm.new_password_confirmation"
            type="password"
          ></el-input>
        </el-form-item>
        <div class="btn_group">
          <el-button id="changePass" @click="submitForm('ruleForm')"
            >Đổi mật khẩu</el-button
          >
          <el-button id="delete" @click="cancelModal">Hủy</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    var newPass = (rule, value, callback) => {
      if (this.error?.new_password) {
        callback(new Error(`${this.error?.new_password[0]}`));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
      },
      loading: false,
      rules: {
        current_password: [
          { required: true, message: "Please input current password", trigger: "change" },
        ],
        new_password: [
          { required: true, message: "Please input new password", trigger: "change" },
          // { validator: newPass, trigger: "submit" },
        ],
        new_password_confirmation: [
          {
            required: true,
            message: "Please input new password again",
            trigger: "change",
          },
        ],
      },
    };
  },
  computed: {
    ...mapState("auth", ["error"]),
  },
  methods: {
    cancelModal() {
      this.$emit("close-modals");
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.changePassword();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async changePassword() {
      this.loading = true;
      try {
        await this.$store.dispatch("auth/changePassword", this.ruleForm);
        this.loading = false;
        setTimeout(this.openNotificationSuccess(), 1000);
        this.handleLogout();
      } catch {
        this.loading = false;
        console.log("error", this.error);
        this.showErrorNotification();
      }
    },
    openNotificationSuccess() {
      this.$notify({
        title: "Success",
        message: "Change password successfull!!!",
        type: "success",
      });
    },
    showErrorNotification() {
      let message = "Unsuccess require!!!";
      if (this.error?.new_password) {
        message = this.error?.new_password[0];
      }
      if (this.error?.message) {
        message = this.error.message;
      }
      this.$notify.error({
        title: "Error",
        message,
      });
    },
    handleLogout() {
      window.localStorage.clear();
      window.location.reload(true);
      window.location.replace("/admin/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.btn_group {
  #changePass {
    background: #fbad18;
    border-radius: 20px;
    color: #fff;
    border: none;
    font-size: 16px;
    margin-top: 10px !important;
  }
  #delete {
    border: 1px solid #dfdfdf;
    box-sizing: border-box;
    border-radius: 20px;
    margin-top: 10px !important;
  }
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
}

.changePass {
  .form {
    margin-top: -10px;
    .label {
      font-weight: bold;
      font-size: 14px;
      line-height: 16px;
      display: flex;
      align-items: center;
      color: #606060;
      margin: 12px 0;
    }
  }
}
</style>
