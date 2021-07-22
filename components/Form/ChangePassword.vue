<template>
  <div class="changePass">
    <div class="form">
      <div class="label">Mật khẩu hiện tại</div>
      <el-input placeholder="Please input" v-model="oldPass" type="password"></el-input>
      <div class="label">Mật khẩu mới</div>
      <el-input placeholder="Please input" v-model="newPass" type="password"></el-input>
      <div class="label">Nhập lại mật khẩu mới</div>
      <el-input placeholder="Please input" v-model="renewPass" type="password"></el-input>
      <div class="btn_group">
        <el-button id="changePass">Đổi mật khẩu</el-button>
        <el-button id="delete" @click="cancelModal">Hủy</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      oldPass: "",
      newPass: "",
      renewPass: "",
    };
  },
  methods: {
    cancelModal() {
      this.$emit("close-modals");
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
