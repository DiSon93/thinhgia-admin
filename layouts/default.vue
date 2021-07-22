<template>
  <v-app v-if="this.$store.state.auth.currentUser && roleList">
    <v-navigation-drawer
      class="toolbar"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <img src="@image/layouts/bansaodanhthiep.png" />
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      class="header_box"
      v-if="this.$route.path == '/'"
    >
      <v-row align="center">
        <v-col cols="12" sm="4">
          <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="app-bar-icon" />
          <button class="homepage" disabled>Trang chủ</button>
        </v-col>
        <v-col cols="12" sm="4" class="col_search">
          <b-input-group class="search">
            <b-input-group-prepend is-text>
              <b-icon icon="search"></b-icon>
            </b-input-group-prepend>
            <b-form-input
              placeholder="Tìm kiếm tất cả thông tin"
              type="search"
            ></b-form-input>
          </b-input-group>
        </v-col>
        <v-col cols="12" sm="4">
          <v-btn color="warning" dark id="createBDS" @click="$router.push('/form/house')"
            ><img src="@image/icons/Vector.svg" />Tạo BĐS
          </v-btn>
          <!-- <el-dropdown class="account" @command="handleCommand"> -->
          <el-button
            type="info"
            circle
            icon="el-icon-user-solid"
            @click="centerDialogVisible02 = true"
            class="account"
          >
          </el-button>
          <!-- <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>Thông tin tài khoản</el-dropdown-item>
              <el-dropdown-item divided command="logout">Log out</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
          <!-- <v-btn class="account" fab><v-icon dark small>mdi-account</v-icon></v-btn> -->
          <v-btn class="notifiaction" fab
            ><img src="@image/icons/bell-badge-noti.jpg" alt=""
          /></v-btn>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-main>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="app-bar-icon add_nav"
        v-if="this.$route.path != '/'"
      />

      <v-container class="main_content" fluid>
        <nuxt />
        <el-dialog
          :visible.sync="centerDialogVisible02"
          width="25%"
          center
          id="user_detail_dialog"
        >
          <UserDetail v-on:close-modals="handleChangePassword" />
        </el-dialog>
        <el-dialog
          :visible.sync="centerDialogVisible"
          width="25%"
          center
          id="user_changePass_dialog"
          title="Đổi mật khẩu"
          destroy-on-close
        >
          <ChangePassword v-on:close-modals="centerDialogVisible = false" />
        </el-dialog>
      </v-container>
    </v-main>
    <v-bottom-navigation v-model="value" background-color="teal" shift>
      <v-list class="d-flex">
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-icon small>{{ item.icon }}</v-icon>
        </v-list-item>
      </v-list>
    </v-bottom-navigation>
    <v-footer :absolute="!fixed" app>
      <span class="footer_state">© 2021 Thinh Gia Land. All rights reserved.</span>
    </v-footer>
  </v-app>
</template>

<script>
import SelectBox from "@component/SelectBox.vue";
import { mapState } from "vuex";
import UserDetail from "@component/Form/UserDetail";
import ChangePassword from "@component/Form/ChangePassword";

export default {
  components: {
    SelectBox,
    UserDetail,
    ChangePassword,
  },
  data() {
    return {
      // dialog: false,
      clipped: false,
      isWidth: window.innerWidth > 600 ? true : false,
      drawer: true,
      fixed: false,
      value: "recent",
      centerDialogVisible02: false,
      centerDialogVisible: false,
      items: [
        {
          icon: "mdi-home-edit",
          title: "Trang chủ",
          to: "/",
        },
        {
          icon: "mdi-bank-check",
          title: "Bất động sản",
          to: "/real-estate",
        },
        {
          icon: "mdi-account-switch",
          title: "Khách hàng",
          to: "/customers",
        },
        {
          icon: "mdi-email-multiple",
          title: "Nhu cầu",
          to: "/demands",
        },
        {
          icon: "mdi-share-variant-outline",
          title: "Dự án",
          to: "/projects",
        },
        {
          icon: "mdi-newspaper-variant-multiple-outline",
          title: "Tin tức",
          to: "/news",
        },
        {
          icon: "mdi-account-cog",
          title: "Quản trị",
          to: "/administrator",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
    };
  },
  beforeCreate() {
    if (!this.$store.state.auth.currentUser) {
      this.$router.push("/admin/login");
    } else {
      this.$store.dispatch("role/getRoleList");
    }
  },
  beforeMount() {
    this.drawer = this.isWidth;
  },
  computed: {
    ...mapState("role", ["roleList"]),
  },
  methods: {
    handleCommand(command) {
      if (command == "logout") {
        this.openLogout();
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
      this.centerDialogVisible02 = false;
      this.centerDialogVisible = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.toolbar {
  background: #f8f8f8;
  // width: 208px !important;
  // z-index: 99999;
  line-height: 24px;
  img {
    width: 208px;
    height: 60px;
    left: 0px;
    top: 0px;
    // margin-top: 6px;
  }
  .v-list-item--active {
    color: #fff;
    background: #fbad18;
  }
  .v-list-item {
    text-decoration: none;
  }
  .v-navigation-drawer__border {
    display: none;
  }
  .v-list-item__title {
    font-size: 14px !important;
    text-decoration: none;
  }
  .v-list-item__action {
    margin-left: 20px;
    margin-right: 10px;
  }
}
.v-bottom-navigation {
  display: none;
}
.header_box {
  // left: 208px !important;
  background: #eff5f9 !important;
  .homepage {
    width: 77px;
    height: 25px;
    margin-left: 36px;
    // margin-top: 35px;
    background: #ffffff;
    border: 1px solid rgba(96, 96, 96, 0.2);
    border-radius: 15px;
    font-size: 12px;
    letter-spacing: 0.5px;
    color: #606060;
  }
  .search {
    // margin-left: 378px;
    position: relative;
    top: 12px !important;
    .bi-search {
      position: absolute;
      top: 5px;
      left: 16px;
      font-weight: 700;
      z-index: 9999;
      font-size: 16px;
    }
    .form-control {
      position: absolute;
      font-size: 12px;
      top: -26px;
      padding-left: 45px;
      height: 26px;
      letter-spacing: 0.5px;
      width: 295px;
      border-radius: 15px;
      border: 1px solid rgba(96, 96, 96, 0.2);
      border-left: none;
    }
    .input-group-text {
      position: absolute;
      top: -26px;
      border: none;
      background-color: transparent;
    }
  }
  #createBDS {
    position: absolute;
    right: 40%;
    bottom: 0px;
    border-radius: 15px;
    width: 109px;
    height: 26px;
    border-radius: 15px;
    font-weight: 500;
    font-size: 12px;
    text-transform: capitalize;
    img {
      margin-top: -4px;
      margin-right: 4px;
      width: 17px;
      height: 15px;
    }
  }
  .account.el-button {
    position: absolute;
    right: 70px;
    bottom: -1px;
    padding: 4px;

    // &:hover {
    //   border: 1px solid blue;
    //   transition: 0.5s;
    // }
  }
  .notifiaction {
    position: absolute;
    right: 30px;
    bottom: 0px;
    border: none;
    box-shadow: none;
    background-color: #eff5f9 !important;
    width: 24px !important;
    height: 24px !important;
    img {
      width: 18px;
      height: 20.57px;
      border-radius: 50%;
    }
    &:hover {
      border: 1px solid blue;
      transition: 0.5s;
    }
  }
}
.v-main {
  // padding: 64px 0px 36px 209px !important;
  background: #eff5f9;
}
.main_content {
  margin-top: 0px;
  margin-left: 0px;
  margin-right: 0px;
  width: 100% !important;
}
.v-footer--absolute {
  .footer_state {
    font-weight: 300;
    font-size: 13px;
    text-align: center;
    margin: 0 auto;
  }
}
.app-bar-icon {
  background-color: #eff5f9;
  margin-left: 30px;
}
.add_nav {
  margin-bottom: -10px;
}

@media screen and (min-width: 1265px) {
  .toolbar {
    width: 208px !important;
  }
  .header_box {
    left: 208px !important;
  }
  .v-main {
    padding: 64px 0px 36px 209px !important;
    margin-right: 0 !important;
    width: 100% !important;
  }
  .app-bar-icon {
    display: none;
  }
}
@media screen and (max-width: 600px) {
  .header_box {
    display: none;
  }
  .v-main {
    padding-top: 0 !important;
  }
  .v-bottom-navigation {
    // background: orange !important;
    height: auto !important;
    display: block;
    position: fixed;
    z-index: 9999;
    .v-list {
      padding: 0;
    }
    .v-sheet.v-list {
      background: #ffc107;
      color: #fff;
    }
    a {
      text-decoration: none;
    }
  }
  .v-footer {
    display: none;
  }
  a.v-list-item {
    width: 14%;
    padding: 0 auto !important;
  }
  .v-list-item__action {
    min-width: 0 !important;
    margin: 0 auto;
  }
  .add_nav {
    display: none;
  }
}
</style>
