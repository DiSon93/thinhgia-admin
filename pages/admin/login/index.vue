<template>
  <div class="login">
    <div class="login_form">
      <div class="logo">
        <img src="@image/icons/logogroup.svg" alt="" />
        <div class="login_header">
          <div class="login_title">KHOBATDONGSANVIET.COM</div>
          <div class="note">KÊNH GIAO DỊCH BẤT ĐỘNG SẢN</div>
        </div>
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
            @keyup.enter.native="submitForm('ruleForm')"
          ></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
            placeholder="Password"
            @keyup.enter.native="submitForm('ruleForm')"
          ></el-input>
        </el-form-item>
        <el-form-item class="remember">
          <el-checkbox label="Remember me" name="type" v-model="checked"></el-checkbox>
          <a href="javascript:;" @click="$router.push('/admin/forgotpassword')"
            >Forgot password?</a
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading"
            >Login</el-button
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
        pass: "",
        type: [],
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
        pass: [{ required: true, message: "Please input password", trigger: "change" }],
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
    ...mapState("auth", ["error"]),
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
    async loginIntoServer() {
      this.loading = true;
      try {
        await this.$store.dispatch("auth/loginIntoServer", {
          email: this.ruleForm.email,
          password: this.ruleForm.pass,
          remember_me: this.checked,
        });
        this.loading = false;
      } catch {
        this.loading = false;
        this.openNotification();
      }
    },
    openNotification() {
      let message = this.error.data.message;
      this.$notify.error({
        title: "Error",
        message,
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
    .logo {
      display: flex;
      margin-bottom: 30px;
      img {
        margin-right: 5px;
      }
      .login_header {
      }
      .login_title {
        margin-top: 25px;

        font-family: Lexend Deca;
        font-style: normal;
        font-weight: 700;
        font-size: 26px;
        line-height: 35px;
        letter-spacing: -0.5px;
        text-align: left;
        color: #242d4a;
      }
      .note {
        font-family: Lexend Deca;
        font-style: normal;
        font-weight: 300;
        font-size: 20px;
        line-height: 30px;
        margin-bottom: 25px;
        letter-spacing: -0.5px;
        text-align: left;
        color: #d4b59c;
      }
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
@media screen and (max-width: 600px) {
  .login {
    .login_form {
      margin-top: 30px;
      width: 90%;
      .logo {
        margin-top: -60px;
        display: block;
        text-align: center;
        .login_title {
          font-size: 16px;
        }
        .note {
          font-size: 14px;
        }
      }
      .el-input {
        font-size: 12px !important;
      }
      .remember {
        a {
          font-size: 14px;
          margin-top: 5px;
        }
      }
      .el-button {
        font-size: 16px;
      }
    }
  }
}
</style>
