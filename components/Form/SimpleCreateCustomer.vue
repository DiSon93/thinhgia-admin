<template>
  <div class="createCustomer" v-loading="loadingChild">
    <!-- <div class="create_title"></div> -->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
      <v-row>
        <v-col cols="12" class="img_user">
          <el-upload
            v-if="headers"
            class="avatar-uploader"
            action="https://thinhgiacore.demo.fit/api/admin/customers/upload-avatar"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :headers="headers"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <img v-else src="@image/icons/user.svg" alt="" />
          </el-upload>
        </v-col>
        <div class="select_img">Thêm ảnh</div>
        <v-col cols="12">
          <div>Tên</div>
          <el-form-item prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <div>SDT</div>
          <el-form-item prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
          <el-button id="showMore_createUser" @click="showMore = !showMore">{{
            showMore ? "- Rút gọn" : "+ Thêm thông tin"
          }}</el-button>
          <div v-if="showMore">
            <div>Số Fax</div>
            <el-form-item prop="fax">
              <el-input v-model="ruleForm.fax"></el-input>
            </el-form-item>
          </div>
        </v-col>
      </v-row>
      <v-row v-if="showMore">
        <v-col cols="6">
          <div>Email</div>
          <el-form-item prop="email">
            <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>
        </v-col>
        <v-col cols="6">
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
        <v-col cols="6">
          <div>CMND/CCCD</div>
          <el-form-item prop="identity_card">
            <el-input v-model="ruleForm.identity_card"></el-input>
          </el-form-item>
        </v-col>
        <v-col cols="6">
          <div>Nhân viên</div>
          <el-form-item prop="user_id">
            <!-- <el-input v-model="ruleForm.staff"></el-input> -->
            <el-select v-model="ruleForm.user_id" placeholder="Chọn nhân viên">
              <el-option
                v-for="item in staffList"
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

        <v-col cols="12">
          <div>Ghi chú</div>
          <el-form-item prop="note">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="Please input"
              v-model="ruleForm.note"
            >
            </el-input>
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
      showMore: false,
      ruleForm: {
        name: "",
        email: "",
        phone: "",
        user_id: "",
        fax: "",
        birth_day: "",
        identity_card: "",
        address: "",
        note: "",
        avatar: "",
        province_id: "",
        district_id: "",
        ward_id: "",
      },
      imageUrl: "",
      avatar_id: null,
      selectedFile: null,
      rules: {
        name: [
          { required: true, message: "Please input name", trigger: "blur" },
          { min: 2, max: 30, message: "Length should be 2 to 30", trigger: "blur" },
        ],
        email: [
          {
            type: "email",
            message: "Please input email address",
            trigger: "submit",
          },
        ],
        phone: [
          {
            required: true,
            message: "Please input phone",
            trigger: "change",
          },
          { validator: checkNumber, trigger: "blur" },
          {
            min: 7,
            message: "The phone must be at least 7 characters.",
            trigger: "blur",
          },
        ],
        fax: [{ validator: checkNumber, trigger: "blur" }],
        birth_day: [],
        identity_card: [
          { validator: checkNumber, trigger: "blur" },
          {
            max: 12,
            message: "Indentity Card must be not longer than 12",
            trigger: "blur",
          },
        ],
        user_id: [],
        address: [],
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
    this.getStaffList();
    this.getProvinceList();
  },
  computed: {
    ...mapState("staffs", ["staffList"]),
    ...mapState("auth", ["currentUser"]),
    ...mapState("customers", ["errorMessage"]),
    ...mapState("global", ["dictrictList"]),
    ...mapState("global", ["provinceList"]),
    ...mapState("global", ["wardList"]),
  },
  methods: {
    ...mapActions("staffs", ["getStaffList"]),
    ...mapActions("global", ["getProvinceList"]),

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addCustomerToSystem();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async addCustomerToSystem() {
      this.loadingChild = true;
      try {
        await this.$store.dispatch("customers/createNewCustomer", {
          ...this.ruleForm,
          avatar: this.avatar_id ? this.avatar_id : 0,
          province_id: 0,
          district_id: 0,
          ward_id: 0,
        });

        // if (!this.errorMessage) {
        this.loadingChild = false;
        this.cancelModal();
        setTimeout(this.openNotificationCreate(), 1000);
        this.$emit("reload-page");
        // }
      } catch {
        this.loadingChild = false;
        this.showErrorMessage();
      }
    },
    showErrorMessage() {
      let message = "Create customer failure!!!";
      console.log(this.errorMessage);
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
        message: "Create customer successfull!!!",
        type: "success",
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.avatar_id = res.results.id;
      console.log(this.avatar_id);
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
.createCustomer {
  .img_user {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    img {
      width: 100px;
      height: 100px;
    }
  }
  .select_img {
    margin: 0 auto;
  }
  .col.col-4,
  .col-6,
  .col-12 {
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
