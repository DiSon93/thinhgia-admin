<template>
  <v-app v-if="this.$store.state.auth.currentUser">
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
        <v-list-item to="/" router exact>
          <v-list-item-action>
            <v-icon>mdi-home-edit</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Trang chủ</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/real-estate" router exact>
          <v-list-item-action>
            <v-icon>mdi-bank-check</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Bất động sản</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/customers" router exact>
          <v-list-item-action>
            <v-icon>mdi-account-switch</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Khách hàng</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/demands" router exact>
          <v-list-item-action>
            <v-icon>mdi-email-multiple</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Nhu cầu</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/projects" router exact>
          <v-list-item-action>
            <v-icon>mdi-share-variant-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dự án</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/news" router exact>
          <v-list-item-action>
            <v-icon>mdi-newspaper-variant-multiple-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Tin tức</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/administrator" router exact>
          <v-list-item-action>
            <v-icon>mdi-account-cog</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Quản trị</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/contact" router>
          <v-list-item-action>
            <v-icon>mdi-account-details</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Liên hệ</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/web" router exact>
          <v-list-item-action>
            <v-icon>mdi-web-clock</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Thông tin web</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      class="header_box"
      v-if="this.$route.path == '/' || this.$route.path == `/search/${routeId}`"
    >
      <v-row align="center">
        <v-col cols="12" sm="3">
          <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="app-bar-icon" />
          <button class="homepage" disabled>Trang chủ</button>
        </v-col>
        <v-col cols="12" sm="4" class="col_search">
          <div id="search_all">
            <el-select
              v-model="value"
              filterable
              placeholder="Tìm kiếm tất cả thông tin"
              class="el-input--prefix"
              @change="chooseSearchAll($event)"
              remote
              reserve-keyword
              :remote-method="remoteMethod"
              :loading="loading"
            >
              <el-option-group
                v-for="group in options"
                :key="group.label"
                :label="group.label"
              >
                <el-option
                  v-for="item in group.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-option-group>
            </el-select>
            <i class="el-icon-search"></i>
          </div>
        </v-col>
        <v-col cols="12" sm="5">
          <v-btn color="warning" dark id="createBDS" @click="$router.push('/form/house')"
            ><img src="@image/icons/Vector.svg" />Tạo BĐS
          </v-btn>
          <el-button
            type="info"
            circle
            icon="el-icon-user-solid"
            @click="centerDialogVisible02 = true"
            class="account"
          >
          </el-button>

          <!-- <el-popover
            placement="bottom-end"
            width="500"
            trigger="click"
            id="notification"
          >
            <NuxtLink :to="`/detail/house/${bds_id}`" class="d-flex notification_item">
              <div class="d-flex">
                <img src="@image/icons/user.svg" alt="" />
                <div class="name">
                  <span class="staff_name">Vũ Nguyễn Lệ Chi</span> đã chia sẻ bất động sản
                  lên cộng đồng
                </div>
              </div>
              <div class="time">a few seconds ago</div>
            </NuxtLink>
            <el-divider><i class="el-icon-star-on"></i></el-divider>
            <NuxtLink :to="`/detail/house/${bds_id}`" class="d-flex notification_item">
              <div class="d-flex">
                <img src="@image/icons/user.svg" alt="" />
                <div class="name">
                  <span class="staff_name">Vũ Nguyễn Lệ Chi</span> đã chia sẻ bất động sản
                  lên cộng đồng
                </div>
              </div>
              <div class="time">26 minutes ago</div>
            </NuxtLink>

            <el-divider><i class="el-icon-star-on"></i></el-divider>

            <NuxtLink :to="`/detail/house/${bds_id}`" class="d-flex notification_item">
              <div class="d-flex">
                <img src="@image/icons/user.svg" alt="" />
                <div class="name">
                  <span class="staff_name">Vũ Nguyễn Lệ Chi</span> đã chia sẻ bất động sản
                  lên cộng đồng
                </div>
              </div>
              <div class="time">39 minutes ago</div>
            </NuxtLink>
            <el-divider><i class="el-icon-star-on"></i></el-divider>

            <NuxtLink :to="`/detail/house/${bds_id}`" class="d-flex notification_item">
              <div class="d-flex">
                <img src="@image/icons/user.svg" alt="" />
                <div class="name">
                  <span class="staff_name">Vũ Nguyễn Lệ Chi</span> đã chia sẻ bất động sản
                  lên cộng đồng
                </div>
              </div>
              <div class="time">39 minutes ago</div>
            </NuxtLink>
            <el-divider><i class="el-icon-star-on"></i></el-divider>

            <NuxtLink :to="`/detail/house/${bds_id}`" class="d-flex notification_item">
              <div class="d-flex">
                <img src="@image/icons/user.svg" alt="" />
                <div class="name">
                  <span class="staff_name">Vũ Nguyễn Lệ Chi</span> đã chia sẻ bất động sản
                  lên cộng đồng
                </div>
              </div>
              <div class="time">39 minutes ago</div>
            </NuxtLink>

            <el-button
              slot="reference"
              circle
              class="btn_notification"
              @click="saw_noti = true"
              ><img v-if="!saw_noti" src="@image/icons/bell-badge-noti.jpg" alt="" />
              <img class="saw_noti" v-else src="@image/icons/notification.png" alt="" />
            </el-button>
          </el-popover> -->
          <el-popover
            placement="bottom-end"
            width="500"
            trigger="click"
            id="notification"
          >
            <div v-if="noti">
              <NuxtLink
                :to="`/detail/house/${item.bds_id}`"
                class="d-flex notification_item"
                v-for="item in noti"
                :key="item.bds_id"
              >
                <div class="d-flex">
                  <img :src="item.message.avatar" alt="" />
                  <div class="name">
                    <span class="staff_name">{{ item.message.username }}</span> đã
                    {{ item.message.type == "like" ? "like" : "chia sẻ" }} bất động sản
                    {{ item.message.type == "like" ? null : "lên cộng đồng" }}
                  </div>
                </div>
                <div class="time">
                  {{ moment(item.message.timestamp).startOf("day").fromNow() }}
                </div>
              </NuxtLink>
            </div>

            <div v-else class="empty_noti"><i>Không có thông báo nào</i></div>

            <el-button
              slot="reference"
              circle
              class="btn_notification"
              @click="saw_noti = true"
              ><img v-if="!saw_noti" src="@image/icons/bell-badge-noti.jpg" alt="" />
              <img class="saw_noti" v-else src="@image/icons/notification.png" alt="" />
            </el-button>
          </el-popover>
          <!-- <v-btn class="account" fab><v-icon dark small>mdi-account</v-icon></v-btn> -->
          <!-- <v-btn class="notifiaction" fab
            ><img src="@image/icons/bell-badge-noti.jpg" alt=""
          /></v-btn> -->
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
        <el-dialog
          title="Update thông tin người dùng"
          :visible.sync="centerDialogVisible03"
          width="40%"
          center
          destroy-on-close
        >
          <UpdateUser
            :userId="selectedUser"
            v-on:close-modals="centerDialogVisible03 = false"
            :key="childKey"
          />
        </el-dialog>
        <el-dialog
          title="Update thông tin người dùng"
          :visible.sync="centerDialogVisible04"
          width="40%"
          center
          destroy-on-close
          id="createCustomers"
        >
          <UpdateCustomerSearch
            :customerId="selectedCustomer"
            v-on:close-modals="centerDialogVisible04 = false"
            :key="childKey02"
          />
        </el-dialog>
      </v-container>
    </v-main>

    <v-bottom-navigation v-model="value" shift>
      <v-list class="d-flex">
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-icon small>{{ item.icon }}</v-icon>
        </v-list-item>
      </v-list>
    </v-bottom-navigation>
    <v-footer :absolute="!fixed" app>
      <span class="footer_state">© 2021 KhoBatdongsanViet. All rights reserved.</span>
    </v-footer>
  </v-app>
</template>

<script>
import SelectBox from "@component/SelectBox.vue";
import { mapState, mapActions } from "vuex";
import UserDetail from "@component/Form/UserDetail";
import ChangePassword from "@component/Form/ChangePassword";
import moment from "moment";
import UpdateUser from "@component/Form/UpdateUser.vue";
import UpdateCustomerSearch from "@component/Form/UpdateCustomerSearch.vue";
export default {
  components: {
    SelectBox,
    UserDetail,
    ChangePassword,
    UpdateUser,
    UpdateCustomerSearch,
  },
  data() {
    return {
      // dialog: false,
      clipped: false,
      isWidth: window.innerWidth > 600 ? true : false,
      drawer: false,
      fixed: false,
      value: "recent",
      centerDialogVisible02: false,
      centerDialogVisible: false,
      centerDialogVisible03: false,
      centerDialogVisible04: false,
      saw_noti: false,
      bds_id: 17,
      selectedUser: "",
      selectedCustomer: "",
      childKey: 0,
      childKey02: 0,
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
        {
          icon: "mdi-account-details",
          title: "Liên lạc",
          to: "/contact",
        },
        {
          icon: "mdi-web-clock",
          title: "Thông tin web",
          to: "/web",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
      noti: null,
      role_user: "",
      options: [],
      value: "",
      loading: false,
      routeId: "",
    };
  },
  computed: {
    ...mapState("auth", ["currentUser"]),
    ...mapState("role", ["roleList"]),
    ...mapState("homepage", ["searchList"]),
  },
  sockets: {
    // initRoom: function (message) {
    //   // Đây là nơi nhận cái even initRoom với param là message mà server emit về
    //   this.messages.push({
    //     message,
    //     type: "status",
    //   });
    // },
    // statusRoom: function (message) {
    //   this.messages.push({
    //     message,
    //     type: "status",
    //   });
    // },
    // receiveMessage: function (message) {
    //   console.log("GGGG");
    //   this.messages.push({
    //     message,
    //     type: "receive",
    //   });
    // },
    // connect: function (data) {
    //   console.log(data);
    // },
    // customEmit: function (data) {
    //   console.log(data);
    // },
    message: function (data) {
      console.log("message", data);
    },
    notifications: function (data) {
      console.log("notifications", data);
      this.noti = data;
    },
  },
  beforeCreate() {
    if (!this.$store.state.auth.currentUser) {
      this.$router.push("/admin/login");
    } else {
      this.$store.dispatch("auth/loginIntoServer", {
        email: this.$store.state.auth.currentUser.results.user.email,
        password: "",
        login_token: this.$store.state.auth.currentUser.results.access_token,
      });
    }
  },
  beforeMount() {
    this.drawer = this.isWidth;
    this.role_user = this.currentUser ? this.currentUser.results.user.role_id : "";
  },
  mounted() {
    if (window.innerWidth > 600 && window.innerWidth < 1200) {
      this.drawer = false;
    }
    // this.getHandleBarRole();
  },
  methods: {
    getHandleBarRole() {
      if (this.currentUser.results.user.id == 2) {
        this.items.splice(2, 1);
      }
    },
    chooseSearchAll(e) {
      let keyWord = e.split(":");
      console.log("key", keyWord);
      if (keyWord[0] == "bds") {
        this.$router.push(`/detail/house/${keyWord[1]}`);
      } else if (keyWord[0] == "user") {
        this.selectedUser = keyWord[1];
        this.childKey += 1;
        this.centerDialogVisible03 = true;
      } else if (keyWord[0] == "customer") {
        this.selectedCustomer = keyWord[1];
        this.childKey02 += 1;
        if (this.role_user != 2) {
          this.centerDialogVisible04 = true;
        }
      } else if (keyWord[0] == "project") {
        // this.$store.commit("homepage/selectedSearch", this.searchList);
        this.routeId = keyWord[1];
        this.$router.push(`/search/${keyWord[1]}`);
      }
    },
    async remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        await this.$store.dispatch("homepage/searchAllList", query);
        console.log("searchList", this.searchList);
        let projects = this.searchList.projects.map((u) => {
          return { value: `project:${u.id}`, label: u.name, id: u.id };
        });
        let real_estates = this.searchList.real_estates.map((u) => {
          return { value: `bds:${u.id}`, label: u.title, id: u.id };
        });
        let customers = this.searchList.customers.map((u) => {
          return { value: `customer:${u.id}`, label: u.name, id: u.id };
        });
        let users = this.searchList.users.map((u) => {
          return { value: `user:${u.id}`, label: u.name, id: u.id };
        });
        this.options = [
          {
            label: "Dự án",
            options: projects,
          },
          {
            label: "Bất động sản",
            options: real_estates,
          },
          {
            label: "Khách hàng",
            options: customers,
          },
          {
            label: "Nhân viên",
            options: users,
          },
        ];
      } else {
        this.options = [];
        this.loading = false;
      }
      this.loading = false;
    },
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
      this.centerDialogVisible = true;
      setTimeout(() => {
        this.centerDialogVisible02 = false;
      }, 100);
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
    width: 100%;
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
    font-weight: 500 !important;
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
  // .notifiaction {
  //   position: absolute;
  //   right: 30px;
  //   bottom: 0px;
  //   border: none;
  //   box-shadow: none;
  //   background-color: #eff5f9 !important;
  //   width: 24px !important;
  //   height: 24px !important;
  //   img {
  //     width: 18px;
  //     height: 20.57px;
  //     border-radius: 50%;
  //   }
  //   &:hover {
  //     border: 1px solid blue;
  //     transition: 0.5s;
  //   }
  // }
  .btn_notification {
    background-color: #eff5f9 !important;
    border: none;
    img {
      width: 18px;
      height: 20.57px;
      border-radius: 50%;
    }
    img.saw_noti {
      margin-top: 7px;
      width: 16px;
      height: 22px;
    }
    position: absolute;
    right: 25px;
    bottom: -4px;
    padding: 4px;
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
@media screen and (max-width: 900px) {
  .header_box {
    .search {
      margin-left: -30px !important;
    }
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
    background: #ffc107 !important;
    overflow-x: auto;
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
