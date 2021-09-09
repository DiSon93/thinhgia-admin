<template>
  <div class="login">
    <div class="login_form">
      <div class="logo">
        <img src="@image/icons/icons8-unlock.png" alt="" />
      </div>
      <div class="forgot_pass">QUÊN MẬT KHẨU</div>
      <div class="content">
        Vui lòng nhập địa chỉ Email. Chúng tôi sẽ gởi mật khẩu mới khôi phục tài khoản của
        bạn!
      </div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="email">
          <el-input
            type="email"
            v-model="ruleForm.email"
            autocomplete="off"
            placeholder="Email Address"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading"
            >Send password reset link</el-button
          >
          <div class="message">{{ userLogin }}</div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  layout: "auth",
  data() {
    return {
      ruleForm: {
        email: "",
      },
      checked: false,
      loading: false,
      rules: {
        email: [
          {
            required: true,
            message: "Please input email",
            trigger: "change",
          },
          {
            type: "email",
            message: "Please input correct email address",
            trigger: "submit",
          },
        ],
      },
    };
  },
  beforeMount() {
    if (this.$store.state.auth.currentUser.message == "Login success") {
      this.$router.push("/");
    }
  },

  updated() {
    if (this.$store.state.auth.currentUser.message == "Login success") {
      this.$router.push("/");
    }
    // if (this.$store.state.auth.error) {
    //   this.openNotification();
    // }
  },
  watch: {
    // showError() {
    //   this.openNotification();
    // },
  },
  // computed: {
  //   ...mapState("auth", ["currentUser"]),
  // },
  computed: {
    ...mapState("auth", ["error", "forgotPass"]),
    userLogin() {
      return this.$store.state.auth.currentUser;
    },
    showError() {
      return this.$store.state.auth.error;
    },
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.forgotPasswordSendEmail();
        } else {
          return false;
        }
      });
    },
    async forgotPasswordSendEmail() {
      this.loading = true;
      try {
        await this.$store.dispatch("auth/forgotPasswordSendEmail", {
          email: this.ruleForm.email,
        });
        this.loading = false;
        this.openNotificationSuccess();
      } catch {
        this.loading = false;
        this.openNotificationError();
      }
    },
    openNotificationSuccess() {
      let message = this.forgotPass;
      this.$notify({
        title: "Success",
        message,
        type: "success",
      });
    },
    openNotificationError() {
      let message = this.error.message;
      this.$notify.error({
        title: "Error",
        message,
      });
    },
    // ...mapActions("auth", ["loginIntoServer"]),
  },
};
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  font-family: Lexend Deca;
  display: flex;
  align-items: center;
  .login_form {
    width: 598px;
    height: 598px;
    padding: 70px 60px;
    margin: 0 auto;
    background-color: #f6fbf9;
    border-radius: 20px;
    .logo {
      margin-bottom: 30px;
      text-align: center;
      img {
        margin: 0 auto;
      }
    }
    .forgot_pass {
      font-style: normal;
      font-weight: bold;
      font-size: 35px;
      line-height: 121.69%;
      /* identical to box height, or 43px */

      text-align: center;

      color: #242d4a;
    }
    .content {
      font-style: normal;
      font-weight: normal;
      font-size: 20px;
      line-height: 121.69%;
      /* or 29px */

      margin: 20px 0;
      color: rgba(36, 45, 74, 0.8);
    }
    .el-button {
      width: 100%;
      background: #fdc251;
      border: 1.53407px solid rgba(0, 0, 0, 0.1);
      box-sizing: border-box;
      border-radius: 15.3407px;
      font-family: Lexend Deca;
      font-style: normal;
      font-weight: normal;
      font-size: 24px;
      text-align: center;
      color: #ffffff;
    }
    .remember {
      a {
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 28px;
        text-decoration: none;
        text-align: center;
        color: #a36e08;
        float: right;
      }
    }
  }
}
.message {
  display: none;
}
</style>
