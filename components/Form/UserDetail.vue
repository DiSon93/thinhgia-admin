<template>
  <div class="user_detail">
    <div class="avatar">
      <img
        v-if="currentUser.results.user.avatar_image"
        :src="currentUser.results.user.avatar_image.thumbnail"
        alt=""
      />
      <img v-else src="@image/icons/user.svg" alt="" />
      <div>Chọn ảnh</div>
    </div>
    <div class="name">{{ currentUser.results.user.name.toUpperCase() }}</div>
    <div class="sdt d-flex">
      <div>SĐT</div>
      <div>{{ currentUser.results.user.phone }}</div>
    </div>
    <div class="sdt d-flex">
      <div>Quyền</div>
      <div>{{ role }}</div>
    </div>
    <div class="sdt d-flex">
      <div>Ngày sinh</div>
      <div>{{ currentUser.results.user.birth_day }}</div>
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
      role: "",
    };
  },
  computed: {
    ...mapState("auth", ["currentUser"]),
    ...mapState("role", ["roleList"]),
  },
  mounted() {
    this.getRole();
  },
  methods: {
    getRole() {
      let rollFilled = this.roleList.find(
        (u) => u.id == this.currentUser.results.user.role_id
      );
      this.role = rollFilled.name;
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
