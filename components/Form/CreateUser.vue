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
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
            <img v-else src="@image/icons/user.svg" alt="" />
          </el-upload>
          <div class="select_img">Thêm ảnh</div>

          <!-- <dropzone
            v-if="dropzoneOptions"
            @vdropzone-file-added="onFileAdded"
            @vdropzone-error="onError"
            @vdropzone-success="onSuccess"
            @vdropzone-complete="onComplete"
            ref="myDropzone"
            id="dropzone"
            :options="dropzoneOptions"
          /> -->
          <!-- <img src="@image/icons/user.svg" alt="" /> -->
          <!-- <div class="select_img">Chọn ảnh</div> -->
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
            <el-input v-model="ruleForm.password"></el-input>
          </el-form-item>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <div>Ngày sinh</div>
          <el-form-item prop="birth_day">
            <el-date-picker
              type="date"
              placeholder="Pick a date"
              v-model="ruleForm.birth_day"
              style="width: 100%"
              value-format="yyyy-MM-dd"
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
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </v-col>
      </v-row>
      <v-row>
        <!-- <v-col cols="6">
          <div>Địa chỉ</div>
          <el-form-item prop="address">
            <el-input v-model="ruleForm.address"></el-input>
          </el-form-item>
        </v-col> -->
        <v-col cols="6">
          <div>Giới tính</div>
          <el-form-item prop="gender">
            <!-- <el-input v-model="ruleForm.staff"></el-input> -->
            <el-select v-model="ruleForm.gender" placeholder="Chọn giới tính">
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
        <!-- <v-col cols="6">
          <div>Phân quyền</div>
          <el-form-item prop="role_id">
            <el-input v-model="ruleForm.role_id"></el-input>
          </el-form-item>
        </v-col> -->
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
          <el-form-item prop="province_id">
            <el-select
              v-model="ruleForm.province_id"
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
          <el-form-item prop="district_id">
            <!-- <el-input v-model="ruleForm.staff"></el-input> -->
            <el-select
              v-model="ruleForm.district_id"
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
          <el-form-item prop="ward_id">
            <!-- <el-input v-model="ruleForm.staff"></el-input> -->
            <el-select
              v-model="ruleForm.ward_id"
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
        <el-button id="new_createUser" @click="submitForm('ruleForm')">Tạo mới</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { showErrorMessage, showSuccessMessage } from "../../utils/notification";
import { mapState, mapActions } from "vuex";
export default {
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
      token: "",
      dropzoneOptions: null,
      headers: null,
      loadingChild: false,
      ruleForm: {
        name: "",
        email: "",
        phone: "",
        password: "",
        birth_day: "",
        identity_card: "",
        issued_on: "",
        address: "",
        role_id: "",
        province_id: "",
        district_id: "",
        ward_id: "",
        gender: "",
      },
      role_user: "",
      imageUrl: "",
      avatar_id: null,
      selectedFile: null,
      sexs: [
        {
          name: "Nam",
          value: "Nam",
        },
        {
          name: "Nữ",
          value: "Nữ",
        },
        {
          name: "Khác",
          value: "Khác",
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
        password: [
          {
            required: true,
            message: "Please input password",
            trigger: "change",
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
          { validator: checkNumber, trigger: "blur" },
          {
            max: 12,
            message: "Indentity Card must be not longer than 12",
            trigger: "blur",
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
          { required: true, message: "Please select role of user", trigger: "blur" },
        ],
        province_id: [
          { required: true, message: "Please select province", trigger: "blur" },
        ],
        district_id: [
          { required: true, message: "Please select district", trigger: "blur" },
        ],
        ward_id: [{ required: true, message: "Please select ward", trigger: "blur" }],
        gender: [{ required: true, message: "Please select gender", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.token = `bearer ${this.currentUser.results.access_token}`;
    // console.log(this.token);
    // this.dropzoneOptions = {
    //   url: "https://thinhgiacore.demo.fit/api/admin/users/upload-avatar",
    //   thumbnailWidth: 120,
    //   thumbnailHeight: 100,
    //   maxFilesize: 5,
    //   dictDefaultMessage: "<i class='el-icon-user-solid avatar_img'></i>",
    //   headers: { Authorization: `bearer ${this.currentUser.results.access_token}` },
    // };
    this.headers = { Authorization: `bearer ${this.currentUser.results.access_token}` };
    this.getProvinceList();
    this.role_user = this.currentUser ? this.currentUser.results.user.role_id : "";
  },
  computed: {
    ...mapState("staffs", ["errorMessage", "loading"]),
    ...mapState("auth", ["currentUser"]),
    ...mapState("role", ["roleList"]),
    ...mapState("global", ["dictrictList"]),
    ...mapState("global", ["provinceList"]),
    ...mapState("global", ["wardList"]),
  },
  methods: {
    ...mapActions("global", ["getProvinceList"]),
    onFileAdded(e) {},
    onError(e) {},
    onSuccess(e) {},
    onComplete(e) {},
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addUserToSystem();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async addUserToSystem() {
      this.loadingChild = true;
      this.$store.commit("staffs/setLoading");
      try {
        await this.$store.dispatch("staffs/createUser", {
          ...this.ruleForm,
          is_block: 0,
          avatar: this.avatar_id,
        });

        // if (!this.errorMessage) {
        this.loadingChild = false;
        this.cancelModal();
        setTimeout(this.openNotificationCreate(), 2000);
        setTimeout(this.$store.commit("staffs/setLoading"), 5000);
        this.$emit("reload-page");
        // }
      } catch {
        this.loadingChild = false;
        this.showErrorMessage();
      }
    },
    showErrorMessage() {
      let message = "Create user failure!!!";
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
    cancelModal() {
      this.$emit("close-modals");
    },
    openNotificationCreate() {
      this.$notify({
        title: "Success",
        message: "Create user successfull!!!",
        type: "success",
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.avatar_id = res.results.id;
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

    chooseProvince() {
      this.ruleForm.district_id = "";
      this.ruleForm.ward_id = "";
      this.$store.commit("global/setNoWardList");
      this.$store.dispatch("global/getDictrictList", this.ruleForm.province_id);
    },
    chooseDistrict() {
      this.ruleForm.ward_id = "";
      this.$store.dispatch("global/getWardList", this.ruleForm.district_id);
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
#dropzone {
  padding: 0px;
}
</style>
