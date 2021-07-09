<template>
  <div class="createUser">
    <!-- <div class="create_title"></div> -->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
      <v-row>
        <v-col cols="4" class="img_user">
          <img src="@image/icons/user.svg" alt="" />
          <div class="select_img">Chọn ảnh</div>
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
          <el-form-item prop="sdt">
            <el-input v-model="ruleForm.sdt"></el-input>
          </el-form-item>
          <div>Mật khẩu</div>
          <el-form-item prop="pass">
            <el-input v-model="ruleForm.pass"></el-input>
          </el-form-item>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <div>Ngày sinh</div>
          <el-form-item prop="birthday">
            <el-input v-model="ruleForm.birthday"></el-input>
          </el-form-item>
        </v-col>
        <v-col cols="4">
          <div>CMND</div>
          <el-form-item prop="cmnd">
            <el-input v-model="ruleForm.cmnd"></el-input>
          </el-form-item>
        </v-col>
        <v-col cols="4">
          <div>Ngày cấp</div>
          <el-form-item prop="date">
            <el-input v-model="ruleForm.date"></el-input>
          </el-form-item>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <div>Địa chỉ</div>
          <el-form-item prop="date">
            <el-input v-model="ruleForm.address"></el-input>
          </el-form-item>
        </v-col>
        <v-col cols="6">
          <div>Phân quyền</div>
          <el-form-item prop="role">
            <el-input v-model="ruleForm.role"></el-input>
          </el-form-item>
        </v-col>
      </v-row>
      <el-form-item class="btn_submit">
        <el-button id="huy_createUser">Hủy</el-button>
        <el-button id="new_createUser" @click="submitForm('ruleForm')">Tạo mới</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        email: "",
        sdt: "",
        pass: "",
        birthday: "",
        cmnd: "",
        date: "",
        address: "",
        role: "",
      },
      rules: {
        name: [
          { required: true, message: "Please input name", trigger: "blur" },
          { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
        ],
        email: [
          {
            type: "email",
            required: true,
            message: "Please input email",
            trigger: "change",
          },
        ],
        sdt: [
          {
            type: "number",
            required: true,
            message: "Please input number",
            trigger: "change",
          },
        ],
        birthday: [
          {
            type: "date",
            required: true,
            message: "Please pick a time",
            trigger: "change",
          },
        ],
        cmnd: [
          {
            type: "number",
            required: true,
            message: "Please select at least one activity type",
            trigger: "change",
          },
        ],
        date: [
          { required: true, message: "Please input activity form", trigger: "blur" },
        ],
        address: [
          {
            required: true,
            message: "Please select activity resource",
            trigger: "change",
          },
        ],
        role: [
          { required: true, message: "Please input activity form", trigger: "blur" },
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
</style>
