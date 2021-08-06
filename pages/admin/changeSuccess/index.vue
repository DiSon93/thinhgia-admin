<template>
  <div class="login">
    <div class="login_form">
      <div class="logo">
        <img src="@image/icons/icons8-successful-delivery.png" alt="" />
      </div>
      <div class="forgot_pass">ĐỔI MẬT KHẨU THÀNH CÔNG!</div>
      <div class="content">Mật khẩu của bạn đã thay đổi thành công.</div>
      <div class="content">Bạn có thể quay trở lại trang đăng nhập để tiếp tục</div>
      <div>
        <el-button type="primary" @click="$router.push('/admin/login')">Login</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  layout: "auth",
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
      text-align: center;

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
