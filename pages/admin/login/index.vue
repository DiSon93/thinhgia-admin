<template>
  <div class="login">
    <div class="login_form">
      <div class="login_title">KhobatdongsanViet</div>
      <div class="note">Sign in and start managing your candidates!</div>
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
        <el-form-item prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
            placeholder="Password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="type" class="remember">
          <el-checkbox label="Remember me" name="type"></el-checkbox>
          <a href="#">Forgot password?</a>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading"
            >Login</el-button
          >
          <div class="message">{{ userLogin }} {{ showError }}</div>
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
        pass: "",
        type: [],
      },
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
        pass: [{ required: true, message: "Please input passwword", trigger: "change" }],
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
    showError() {
      this.openNotification();
    },
  },
  // computed: {
  //   ...mapState("auth", ["currentUser"]),
  // },
  computed: {
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
          this.loginIntoServer();
        } else {
          return false;
        }
      });
    },
    loginIntoServer() {
      this.loading = true;
      this.$store.dispatch("auth/loginIntoServer", {
        email: this.ruleForm.email,
        password: this.ruleForm.pass,
      });
    },
    openNotification() {
      this.$notify.error({
        title: "Error",
        message: "The email or password does not match.",
      });
      this.loading = false;
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
    padding: 90px 60px;
    margin: 0 auto;
    background-color: #f6fbf9;
    border-radius: 20px;
    .login_title {
      font-family: Lexend Deca;
      font-style: normal;
      font-weight: 500;
      font-size: 60px;
      line-height: 75px;
      letter-spacing: 0.1px;
      text-align: center;
      color: #224957;
    }
    .note {
      font-family: Lexend Deca;
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 30px;
      margin-bottom: 25px;
      text-align: center;
      color: #224957;
    }
    .el-button {
      width: 100%;
      background: #84c7ae;
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
        color: #84c7ae;
        float: right;
      }
    }
  }
}
.message {
  display: none;
}
</style>
