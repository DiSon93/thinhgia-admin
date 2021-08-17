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
    <div class="form">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <div class="label">Địa chỉ</div>
        <el-form-item prop="address">
          <el-input v-model="ruleForm.address"></el-input>
        </el-form-item>
        <div class="label">Email</div>
        <el-form-item prop="email">
          <el-input type="email" v-model="ruleForm.email"></el-input>
        </el-form-item>
        <div class="label">Email liên hệ</div>
        <el-form-item prop="contact">
          <el-input type="email" v-model.number="ruleForm.contact"></el-input>
        </el-form-item>
        <div class="label">Web</div>
        <el-form-item prop="web">
          <el-input v-model="ruleForm.web"></el-input>
        </el-form-item>
        <div class="label">Điện thoại</div>
        <el-form-item prop="phone">
          <el-input v-model.number="ruleForm.phone"></el-input>
        </el-form-item>
        <div class="label">Thời gian làm việc</div>
        <el-form-item prop="time">
          <el-input v-model="ruleForm.time"></el-input>
        </el-form-item>
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
      dialog: window.innerWidth < 600 ? "80%" : window.innerWidth < 1200 ? "50%" : "25%",
      ruleForm: {
        address: "",
        email: "",
        contact: "",
        web: "",
        phone: "",
        time: "",
      },
      rules: {
        address: [
          {
            required: true,
            message: "Please select activity resource",
            trigger: "change",
          },
        ],
        email: [
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
        contact: [
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
        phone: [
          {
            required: true,
            message: "Please input number",
            trigger: "change",
          },
          { validator: checkNumber, trigger: "blur" },
          {
            min: 7,
            message: "The phone must be at least 7 characters.",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleChangePassword() {
      this.centerDialogVisible03 = true;
      setTimeout(() => {
        this.centerDialogVisible02 = false;
      }, 100);
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
  width: 50%;
  margin: 0 auto;
  background: #ffffff;
  border: 1px solid #dfdfdf;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 30px 20px;
  margin-bottom: 60px;
  .label {
    font-size: 14px;
    font-weight: 500;
  }
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
    width: 80%;
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
