<template>
  <div class="user_detail" v-if="userDetail">
    <div class="avatar">
      <el-upload
        v-if="headers"
        class="avatar-uploader"
        action="https://thinhgiacore.demo.fit/api/admin/users/upload-avatar"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :headers="headers"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <img v-else src="@image/icons/user.svg" alt="" />
      </el-upload>
      <div>Chọn ảnh</div>
    </div>
    <div class="name">{{ userDetail.name ? userDetail.name.toUpperCase() : null }}</div>
    <div class="sdt d-flex">
      <div>SĐT</div>
      <div>{{ userDetail.phone }}</div>
    </div>
    <div class="sdt d-flex">
      <div>Quyền</div>
      <div>{{ userDetail.role ? userDetail.role.name : null }}</div>
    </div>
    <div class="sdt d-flex">
      <div>Ngày sinh</div>
      <div>{{ userDetail.birth_day }}</div>
    </div>
    <div class="d-flex changePass">
      <el-button id="changePass" @click="handleChangePassword">Đổi mật khẩu</el-button>
    </div>
    <el-button id="logout" @click="openLogout">
      <img src="@image/icons/logout.png" alt="" />
      Đăng Xuất
    </el-button>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      headers: null,
      token: "",
      imageUrl: "",
    };
  },
  computed: {
    ...mapState("auth", ["currentUser"]),
    ...mapState("role", ["roleList"]),
    ...mapState("staffs", ["userDetail"]),
  },
  created() {
    this.getUserDetail();
  },
  mounted() {
    this.token = `bearer ${this.currentUser.results.access_token}`;
    this.headers = { Authorization: `bearer ${this.currentUser.results.access_token}` };
  },
  methods: {
    async getUserDetail() {
      try {
        await this.$store.dispatch(
          "staffs/showUserDetail",
          this.currentUser.results.user.id
        );
        this.imageUrl = this.userDetail.avatar_image.thumbnail;
      } catch {
        console.log("Error");
      }
    },
    openLogout() {
      this.$confirm("Are you sure to logout. Continue?", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(() => {
          this.handleLogout();
          setTimeout(
            this.$message({
              type: "success",
              message: "Logout completed",
            }),
            2000
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Logout canceled",
          });
        });
    },
    handleLogout() {
      window.localStorage.clear();
      window.location.reload(true);
      window.location.replace("/admin/login");
    },
    handleChangePassword() {
      this.$emit("close-modals");
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log("res", res);
      this.$store.dispatch("staffs/updateAvatarUser", {
        avatar: res.results.id,
      });
      // this.avatar_id = res.results.id;
      // console.log(this.avatar_id);
    },
  },
};
</script>

<style lang="scss" scoped>
.user_detail {
  .avatar {
    margin-top: -20px;
    text-align: center;
    img {
      border-radius: 50%;
      width: 150px;
      height: 150px;
    }
  }
  .name {
    font-weight: bold;
    font-size: 18px;
    line-height: 21px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #242d4a;
    margin-bottom: 20px;
    margin-top: 10px;
  }
  .sdt {
    justify-content: space-between;
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
    display: flex;
    align-items: center;
    line-height: 30px;

    color: #606060;
  }
  .changePass {
    #changePass {
      background: #fbad18;
      border-radius: 20px;
      color: #fff;
      border: none;
      font-size: 16px;
      margin-top: 10px !important;
    }
    justify-content: center;
  }

  #logout {
    color: #fbad18;
    font-size: 16px;
    border: none;
    margin-top: 10px;
    margin-bottom: -10px;
  }
}
@media screen and (max-width: 600px) {
  .changePass {
    #changePass {
      font-size: 14px !important;
    }
  }

  #logout {
    font-size: 14px !important;
  }
}
</style>
