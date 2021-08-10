<template>
  <div class="createUser" v-loading="loadingChild">
    <!-- <div class="create_title"></div> -->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      class="demo-ruleForm"
      v-if="userId"
    >
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
          <div>CMND/CCCD</div>
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
          <div>Giới tính</div>
          <el-form-item prop="sex">
            <!-- <el-input v-model="ruleForm.staff"></el-input> -->
            <el-select v-model="ruleForm.sex" placeholder="Chọn giới tính">
              <el-option
                v-for="item in sexs"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </v-col>
        <v-col cols="6">
          <div>Phân quyền</div>
          <el-form-item prop="role_id">
            <!-- <el-input v-model="ruleForm.staff"></el-input> -->
            <el-select
              v-model="ruleForm.role_id"
              placeholder="Chọn phân quyền"
              :disabled="role_user != 1"
            >
              <el-option
                v-for="item in roleList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </v-col>
        <v-col cols="6">
          <div>Tỉnh</div>
          <el-form-item prop="province">
            <el-select
              v-model="ruleForm.province"
              placeholder="Chọn tỉnh"
              @change="chooseProvince"
            >
              <el-option
                v-for="item in provinceList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </v-col>
        <v-col cols="6">
          <div>Huyện/TP</div>
          <el-form-item prop="district">
            <!-- <el-input v-model="ruleForm.staff"></el-input> -->
            <el-select
              v-model="ruleForm.district"
              placeholder="Chọn huyện/TP"
              @change="chooseDistrict"
              no-data-text="Vui lòng chọn tỉnh"
            >
              <el-option
                v-for="item in dictrictList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </v-col>
        <v-col cols="6">
          <div>Phường/Xã</div>
          <el-form-item prop="ward">
            <!-- <el-input v-model="ruleForm.staff"></el-input> -->
            <el-select
              v-model="ruleForm.ward"
              placeholder="Chọn phường/xã"
              no-data-text="Vui lòng chọn huyện"
            >
              <el-option
                v-for="item in wardList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </v-col>
        <v-col cols="6">
          <div>Số nhà/Tên đường</div>
          <el-form-item prop="address">
            <el-input v-model="ruleForm.address"></el-input>
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
    var checkNumber = (rule, value, callback) => {
      var regex = /^[0-9]*$/;
      if (!value.match(regex)) {
        callback(new Error("Please input digits"));
      } else {
        callback();
      }
    };
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
        sex: "",
        province: "",
        district: "",
        ward: "",
      },
      role_user: "",
      avatar_image: null,
      imageUrl: "",
      fileList: null,
      selectedFile: null,
      loadingChild: false,
      sexs: [
        {
          name: "Nam",
          value: "Nam",
        },
        {
          name: "Nữ",
          value: "Nữ",
        },
      ],
      rules: {
        name: [
          { required: true, message: "Please input name", trigger: "blur" },
          { min: 2, max: 30, message: "Length should be 2 to 30", trigger: "blur" },
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
          // { validator: checkNumber, trigger: "blur" },
          // {
          //   max: 12,
          //   message: "Indentity Card must be not longer than 12",
          //   trigger: "change",
          // },
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
          { required: true, message: "Please select role of user", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.headers = { Authorization: `bearer ${this.currentUser.results.access_token}` };
    this.role_user = this.currentUser ? this.currentUser.results.user.role_id : "";
  },
  beforeMount() {
    this.getUserDetail();
  },
  computed: {
    ...mapState("staffs", ["userDetail", "errorMessage"]),
    ...mapState("auth", ["currentUser"]),
    ...mapState("role", ["roleList"]),
    ...mapState("global", ["dictrictList"]),
    ...mapState("global", ["provinceList"]),
    ...mapState("global", ["wardList"]),
  },
  methods: {
    ...mapActions("global", ["getProvinceList"]),

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
        // if (!this.errorMessage) {
        this.loadingChild = false;
        this.$emit("update-modals");
        this.cancelModal();
        this.openNotificationUpdate();
        // }
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
      let message = "Update user failure!!!";
      if (this.errorMessage?.email) {
        message = this.errorMessage?.email[0];
      }
      if (this.errorMessage?.identity_card) {
        message = this.errorMessage?.identity_card[0];
      }
      if (this.errorMessage?.name) {
        message = this.errorMessage?.name[0];
      }
      if (this.errorMessage?.phone) {
        message = this.errorMessage?.phone[0];
      }
      if (this.errorMessage?.password) {
        message = this.errorMessage?.password[0];
      }
      this.$notify.error({
        title: "Error",
        message,
      });
    },
    handleAvatarSuccess(res, file) {
      this.avatar_image = URL.createObjectURL(file.raw);
      this.ruleForm.avatar = res.results.id;
    },

    chooseProvince() {
      this.ruleForm.district = "";
      this.ruleForm.ward = "";
      this.$store.commit("global/setNoWardList");
      this.$store.dispatch("global/getDictrictList", this.ruleForm.province);
    },
    chooseDistrict() {
      this.ruleForm.ward = "";
      this.$store.dispatch("global/getWardList", this.ruleForm.district);
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
