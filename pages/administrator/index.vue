<template>
  <v-lazy
    v-model="isActive"
    :options="{
      threshold: 0.5,
    }"
    min-height="200"
    transition="fade-transition"
  >
    <div class="header_box">
      <v-row align="center" d-flex>
        <v-col cols="8" sm="6" class="app_bar">
          <button class="homepage" disabled>Quản trị</button>
          <v-btn-toggle v-model="toggle_exclusive" mandatory id="administrator_btn">
            <v-btn v-on:click="user"> Người dùng </v-btn>
            <v-btn @click="dictionary"> Từ điển </v-btn>
            <v-btn @click="realEstate"> Duyệt BĐS </v-btn>
          </v-btn-toggle>
        </v-col>
        <v-col cols="4" sm="6" class="app_bar">
          <div class="option_button">
            <v-btn class="account" fab @click="centerDialogVisible02 = true"
              ><v-icon dark small>mdi-account</v-icon></v-btn
            >
            <!-- <v-btn class="notifiaction" fab
              ><img src="@image/icons/bell-badge-noti.jpg" alt=""
            /></v-btn> -->
            <el-popover
              placement="bottom-end"
              width="500"
              trigger="click"
              id="notification"
            >
              <NuxtLink to="/detail/house/10" class="d-flex notification_item">
                <div class="d-flex">
                  <img src="@image/icons/user.svg" alt="" />
                  <div class="name">
                    <span class="staff_name">Vũ Nguyễn Lệ Chi</span> đã chia sẻ bất động
                    sản lên cộng đồng
                  </div>
                </div>
                <div class="time">a few seconds ago</div>
              </NuxtLink>
              <el-divider><i class="el-icon-star-on"></i></el-divider>
              <NuxtLink to="/detail/house/10" class="d-flex notification_item">
                <div class="d-flex">
                  <img src="@image/icons/user.svg" alt="" />
                  <div class="name">
                    <span class="staff_name">Vũ Nguyễn Lệ Chi</span> đã chia sẻ bất động
                    sản lên cộng đồng
                  </div>
                </div>
                <div class="time">26 minutes ago</div>
              </NuxtLink>

              <el-divider><i class="el-icon-star-on"></i></el-divider>

              <NuxtLink to="/detail/house/10" class="d-flex notification_item">
                <div class="d-flex">
                  <img src="@image/icons/user.svg" alt="" />
                  <div class="name">
                    <span class="staff_name">Vũ Nguyễn Lệ Chi</span> đã chia sẻ bất động
                    sản lên cộng đồng
                  </div>
                </div>
                <div class="time">39 minutes ago</div>
              </NuxtLink>
              <el-divider><i class="el-icon-star-on"></i></el-divider>

              <NuxtLink to="/detail/house/10" class="d-flex notification_item">
                <div class="d-flex">
                  <img src="@image/icons/user.svg" alt="" />
                  <div class="name">
                    <span class="staff_name">Vũ Nguyễn Lệ Chi</span> đã chia sẻ bất động
                    sản lên cộng đồng
                  </div>
                </div>
                <div class="time">39 minutes ago</div>
              </NuxtLink>
              <el-divider><i class="el-icon-star-on"></i></el-divider>

              <NuxtLink to="/detail/house/10" class="d-flex notification_item">
                <div class="d-flex">
                  <img src="@image/icons/user.svg" alt="" />
                  <div class="name">
                    <span class="staff_name">Vũ Nguyễn Lệ Chi</span> đã chia sẻ bất động
                    sản lên cộng đồng
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
            </el-popover>
          </div>
        </v-col>
      </v-row>
      <v-row class="admin_option">
        <v-col cols="6" sm="4" v-if="isUser">
          <span class="figure">{{ totalUser }}</span> người dùng
        </v-col>
        <v-col cols="6" sm="4" v-if="isDictionary">
          Tổng cộng:
          <span class="figure"> {{ dicSelected[0].dictionaries.length }}</span>
          {{ dicSelected[0].name }}
        </v-col>
        <v-col cols="6" sm="4" v-if="isRealEstate">
          <span class="figure">{{ approveRealList.length }}</span> BĐS
        </v-col>

        <v-col cols="6" sm="4" align="center" v-if="isUser || isDictionary">
          1 / 1
        </v-col>
        <v-col cols="6" sm="4" align="center" v-if="isRealEstate"> </v-col>
        <v-col cols="12" sm="4" align="right" class="res_phanquyen">
          <div class="phanquyen" :class="{ adjust: isRealEstate }">
            <span v-if="isUser">Phân quyền</span>
            <span v-if="isDictionary">Loại từ điển</span>
            <span v-if="isRealEstate"></span>
            <!-- <div> -->
            <!-- <v-select :options="options" label="title" placeholder="Tất cả">
                <template slot="option" slot-scope="option">
                  <span> {{ option.title }}</span>
                </template>
              </v-select> -->

            <el-select
              v-model="value1"
              placeholder="Tất cả"
              v-if="isUser"
              @change="handleChangeRole($event)"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-select
              v-model="value2"
              placeholder="Tất cả"
              v-if="isDictionary"
              @change="handleChangeDic($event)"
            >
              <el-option
                v-for="item in dictionaris"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-select
              v-model="value3"
              placeholder="Tất cả"
              v-if="isRealEstate"
              class="congDong"
              @change="handleChangeApp($event)"
            >
              <el-option
                v-for="item in estate"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <!-- </div> -->
            <v-btn
              class="mx-2 add_btn"
              fab
              dark
              small
              color="warning"
              v-if="isUser"
              @click="centerDialogVisible = true"
            >
              <v-icon dark small> mdi-plus </v-icon>
            </v-btn>
            <v-btn
              class="mx-2 add_btn"
              fab
              dark
              small
              color="warning"
              v-if="isDictionary"
              @click="dialogVisible = true"
            >
              <v-icon dark small> mdi-plus </v-icon>
            </v-btn>
            <v-btn class="export" fab v-if="!isRealEstate" @click="openExportConfirm"
              ><img src="@image/icons/export.png" alt=""
            /></v-btn>
          </div>
        </v-col>
      </v-row>
      <el-dialog
        title="Tạo người dùng mới"
        :visible.sync="centerDialogVisible"
        width="40%"
        center
        destroy-on-close
      >
        <CreateUser
          v-on:close-modals="centerDialogVisible = false"
          v-on:reload-page="reload"
        />
      </el-dialog>
      <el-dialog :visible.sync="dialogVisible" width="30%" destroy-on-close>
        <CreateDictionaries
          :select_dic="dicSelected[0]"
          v-on:close-modals="dialogVisible = false"
          v-on:close-add-modals="reloadDic"
        />
      </el-dialog>
      <v-row class="data_table" v-show="isUser">
        <AdminTable :key="keyChild" @getTotal="getTotalUser" :select_role="role_id" />
      </v-row>
      <v-row class="data_table dictionary" v-if="isDictionary">
        <Dictionary
          :key="keyDic"
          :select_dic="dicSelected[0]"
          v-on:close-update="reloadDic"
        />
      </v-row>
      <v-row class="data_table define" v-if="isRealEstate">
        <DefineRealEstate :is_share="value3" :key="keyApp" />
      </v-row>
      <v-row class="data_table" v-if="isUser"> </v-row>
      <el-dialog
        :visible.sync="centerDialogVisible02"
        width="25%"
        center
        id="user_detail_dialog"
      >
        <UserDetail v-on:close-modals="handleChangePassword" />
      </el-dialog>
      <el-dialog
        :visible.sync="centerDialogVisible03"
        width="25%"
        center
        id="user_changePass_dialog"
        title="Đổi mật khẩu"
        destroy-on-close
      >
        <ChangePassword v-on:close-modals="centerDialogVisible03 = false" />
      </el-dialog>
    </div>
  </v-lazy>
</template>

<script>
import AdminTable from "@component/AdminTable";
import Dictionary from "@component/Dictionary";
import DefineRealEstate from "@component/DefineRealEstate";
import CreateUser from "@component/Form/CreateUser";
import CreateDictionaries from "@component/Form/CreateDictionaries";
import { mapState, mapActions } from "vuex";
import UserDetail from "@component/Form/UserDetail";
import ChangePassword from "@component/Form/ChangePassword";

export default {
  components: {
    AdminTable,
    Dictionary,
    DefineRealEstate,
    CreateUser,
    CreateDictionaries,
    UserDetail,
    ChangePassword,
  },
  data() {
    return {
      keyChild: 0,
      keyDic: 0,
      keyApp: 0,
      isActive: false,
      isUser: true,
      isDictionary: false,
      isRealEstate: false,
      toggle_exclusive: [],
      centerDialogVisible: false,
      centerDialogVisible02: false,
      centerDialogVisible03: false,
      dialogVisible: false,
      saw_noti: false,
      dicSelected: "",
      opSelected: 1,
      addDicVal: 1,
      options: [],
      totalUser: 0,
      role_id: 0,
      estate: [
        {
          value: "Cộng Đồng",
          label: "Cộng Đồng",
        },
        {
          value: "Web",
          label: "Web",
        },
      ],
      dictionaris: [],
      value1: "",
      value2: 1,
      value3: "Cộng Đồng",
    };
  },
  mounted() {
    this.getRoleList();
    this.getDictionaryTypeList();
  },
  computed: {
    ...mapState("role", ["roleList"]),
    ...mapState("dictionaries", ["dictionaryList"]),
    ...mapState("realEstate", ["approveRealList"]),
  },
  methods: {
    getTotalUser(value) {
      this.totalUser = value;
    },
    handleChangeDic(e) {
      this.opSelected = e;
      this.dicSelected = this.dictionaryList.filter((u, i) => u.id == e);
      this.keyDic += 1;
    },
    handleChangeRole(e) {
      this.role_id = e;
      this.keyChild += 1;
    },
    handleChangeApp(e) {
      this.keyApp += 1;
    },
    reload() {
      this.keyChild += 1;
    },
    async reloadDic() {
      await this.getDictionaryTypeList();
      await this.handleChangeDic(this.opSelected);
      this.dialogVisible = false;
    },
    async getRoleList() {
      await this.$store.dispatch("role/getRoleList");
      await this.getRoleOptions();
    },
    async getDictionaryTypeList() {
      await this.$store.dispatch("dictionaries/getDictionaryList", {
        limit: 10,
        page: 1,
      });
      await this.getDicOptions();
    },
    getRoleOptions() {
      this.options = this.roleList.map((item, index) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
      this.options.push({
        value: 0,
        label: "Tất cả",
      });
    },
    getDicOptions() {
      if (!this.dicSelected) {
        this.dicSelected = this.dictionaryList;
      }
      this.dictionaris = this.dictionaryList.map((item, index) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
    },
    handleChangePassword() {
      this.centerDialogVisible03 = true;
      setTimeout(() => {
        this.centerDialogVisible02 = false;
      }, 100);
    },
    openExportConfirm() {
      this.$alert("Bộ phận kỹ thuật đang cập nhật", "Title", {
        confirmButtonText: "OK",
        callback: (action) => {
          this.$message({
            type: "info",
            message: `Please wait`,
          });
        },
      });
    },
    user: function () {
      this.isUser = true;
      this.isDictionary = false;
      this.isRealEstate = false;
    },
    dictionary: function () {
      this.isUser = false;
      this.isDictionary = true;
      this.isRealEstate = false;
    },
    realEstate: function () {
      this.isUser = false;
      this.isDictionary = false;
      this.isRealEstate = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.header_box {
  left: 208px !important;
  background: #eff5f9 !important;
  margin-top: 20px !important;
  #social_network {
    width: 25px !important;
    height: 15px;
    background: #2db7f5;
    border: 1px solid rgba(96, 96, 96, 0.2);
    border-radius: 15px;
    font-weight: 400;
    font-size: 11px;
    letter-spacing: 0.5px;
    margin-left: 8px;
  }
  .homepage {
    width: 90px;
    height: 25px !important;
    margin-left: 30px;
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
    top: -12px;
    .account {
      margin-left: 2px;
      margin-right: 40px;
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
    // .notifiaction {
    //   border: none;
    //   box-shadow: none;
    //   background-color: #eff5f9 !important;
    //   width: 24px !important;
    //   height: 24px !important;
    //   //   margin-right: 10px;
    //   margin-left: 10px;
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
    .setting {
      padding: 0;
      width: 24px !important;
      height: 24px !important;
      border-radius: 50%;
      background-color: #fff !important;
      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.15);
      margin-left: 10px;
      &:hover {
        border: 1px solid blue;
        transition: 0.5s;
      }
    }
  }
}
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
  right: 0px;
  bottom: -2px;
  padding: 4px;
}
.admin_option {
  margin-top: 40px;
  font-size: 13px;
  padding: 0 10px 0 20px;
  align-items: center;
  .add_btn {
    width: 24px;
    height: 24px;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.15);
    margin-left: 25px;
    margin-top: 8px;
  }
  .export {
    padding: 0;
    width: 24px !important;
    height: 24px !important;
    border-radius: 50%;
    background-color: #fff !important;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.15);
    margin-left: 4px;
    margin-top: 8px;
    &:hover {
      border: 1px solid blue;
      transition: 0.5s;
    }
  }
  .phanquyen {
    display: flex;
    width: 292px;
    .el-select {
      width: 126px !important;
      // margin-left: 10px;
      margin-right: 10px;
      .el-input {
        input.el-input__inner {
          height: 70% !important;
        }
      }
    }
    span {
      padding-top: 10px;
      padding-right: 5px;
    }
    .selected_options {
      width: 120px;
      font-size: 12px !important;
      background-color: white;
      border-radius: 15px !important;
      margin-right: 4px;
      ul {
        font-size: 12px !important;
      }
      .vs__dropdown-menu {
        min-width: 100px !important;
      }
      #vs1__listbox {
        padding-left: 0 !important;
        width: 120px !important;
        overflow-x: hidden;
        font-size: 12px !important;
        text-align: left;
      }
      .number {
        width: 108px;
        height: 18px;
        background-color: aqua;
      }
    }
    .congDong {
      right: 0;
    }
  }
  .adjust {
    width: 150px !important;
  }
}
.app_bar {
  padding: 0;
}
.data_table {
  margin-top: 40px;
  padding: 0 30px;
}
.tabs {
  .nav-tab {
    border-bottom: none !important;
  }
}
#navtab_admin {
  .tabs {
    .nav-tab {
      border-bottom: none !important;
      .nav-item {
        a {
          font-size: 12px;
          color: red;
        }
      }
    }
  }
}
@media screen and (min-width: 1265px) {
  .header_box {
    margin-top: -50px !important;
  }
}
@media screen and (max-width: 600px) {
  .data_table {
    padding: 20px 15px 20px;
  }
  .app_bar {
    display: block;
  }
  #administrator_btn {
    margin-top: 20px;
    .v-btn {
      width: 90px;
      font-size: 11px !important;
    }
  }
  .option_button {
    top: -35px !important;
  }
  .admin_option {
    padding: 0 15px !important;
  }
  .res_phanquyen {
    padding: 12px 0;
  }
  .dictionary {
    margin-bottom: 60px;
    margin-top: 20px;
  }
  .define {
    margin-top: 20px;
    margin-bottom: 60px;
  }
  .homepage {
    margin-left: 15px !important;
  }
  .congDong {
    margin-top: -60px;
    .el-select-dropdown__item.hover,
    .el-select-dropdown__item:hover {
      height: 40px !important;
    }
  }
}
.figure {
  color: teal;
  font-weight: 500;
  font-size: 15px;
}
</style>
