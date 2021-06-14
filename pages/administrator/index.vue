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
        <v-col cols="6" class="app_bar">
          <button class="homepage" disabled>Quản trị</button>
          <v-btn-toggle v-model="toggle_exclusive" mandatory id="administrator_btn">
            <v-btn v-on:click="user"> Người dùng </v-btn>
            <v-btn @click="dictionary"> Từ điển </v-btn>
            <v-btn @click="realEstate"> Duyệt BĐS </v-btn>
          </v-btn-toggle>
        </v-col>
        <v-col cols="6" class="app_bar">
          <div class="option_button">
            <v-btn class="account" fab><v-icon dark small>mdi-account</v-icon></v-btn>
            <v-btn class="notifiaction" fab
              ><img src="@image/icons/bell-badge-noti.jpg" alt=""
            /></v-btn>
          </div>
        </v-col>
      </v-row>
      <v-row class="admin_option">
        <v-col cols="4" v-if="isUser"> 51 người dùng </v-col>
        <v-col cols="4" v-if="isDictionary"> Tổng cộng: 8 loại Loại BĐS </v-col>
        <v-col cols="4" v-if="isRealEstate"> 2 BĐS </v-col>

        <v-col cols="4" align="center"> 1 / 1 </v-col>
        <v-col cols="4" align="right">
          <div class="phanquyen">
            <span>Phân quyền</span>
            <!-- <div> -->
            <!-- <v-select :options="options" label="title" placeholder="Tất cả">
                <template slot="option" slot-scope="option">
                  <span> {{ option.title }}</span>
                </template>
              </v-select> -->
            <el-select v-model="value" placeholder="Tất cả">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <!-- </div> -->
            <v-btn class="mx-2 add_btn" fab dark small color="warning">
              <v-icon dark small> mdi-plus </v-icon>
            </v-btn>
            <v-btn class="export" fab><img src="@image/icons/export.png" alt="" /></v-btn>
          </div>
        </v-col>
      </v-row>
      <v-row class="data_table" v-if="isUser">
        <AdminTable />
      </v-row>
      <v-row class="data_table" v-if="isDictionary">
        <Dictionary />
      </v-row>
      <v-row class="data_table" v-if="isRealEstate">
        <DefineRealEstate />
      </v-row>
      <v-row class="data_table" v-if="isUser"> </v-row>
    </div>
  </v-lazy>
</template>

<script>
import AdminTable from "@component/AdminTable";
import Dictionary from "@component/Dictionary";
import DefineRealEstate from "@component/DefineRealEstate";

export default {
  components: {
    AdminTable,
    Dictionary,
    DefineRealEstate,
  },
  data() {
    return {
      isActive: false,
      isUser: true,
      isDictionary: false,
      isRealEstate: false,
      toggle_exclusive: [],
      // options: [
      //   {
      //     title: "Tất cả",
      //   },
      //   {
      //     title: "Super Admin",
      //   },
      //   {
      //     title: "Admin",
      //   },
      //   {
      //     title: "Staff",
      //   },
      //   {
      //     title: "Marketer",
      //   },
      // ],
      options: [
        {
          value: "Tất cả",
          label: "Tất cả",
        },
        {
          value: "Super Admin",
          label: "Super Admin",
        },
        {
          value: "Admin",
          label: "Admin",
        },
        {
          value: "Staff",
          label: "Staff",
        },
        {
          value: "Marketer",
          label: "Marketer",
        },
      ],
      value: "",
    };
  },
  methods: {
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
  margin-top: -50px !important;
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
    .notifiaction {
      border: none;
      box-shadow: none;
      background-color: #eff5f9 !important;
      width: 24px !important;
      height: 24px !important;
      //   margin-right: 10px;
      margin-left: 10px;
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
</style>
