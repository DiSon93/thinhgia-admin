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
        <button class="homepage" disabled>Khách hàng</button>
        <v-btn depressed color="primary" id="social_network"> {{ total }} </v-btn>
        <div id="select_amount"></div>
        <div id="search">
          <el-input
            placeholder="Tìm kiếm tất cả thông tin"
            prefix-icon="el-icon-search"
            v-model="input"
          >
          </el-input>
        </div>
        <div class="option_button">
          <v-btn
            class="mx-2 add_btn"
            fab
            dark
            small
            color="warning"
            @click="centerDialogVisible = true"
          >
            <v-icon dark small> mdi-plus </v-icon>
          </v-btn>
          <v-btn class="account" fab @click="centerDialogVisible02 = true"
            ><v-icon dark small>mdi-account</v-icon></v-btn
          >
          <v-btn class="export" fab @click="exportCustomerList"
            ><img src="@image/icons/export.png" alt=""
          /></v-btn>
        </div>
      </v-row>
      <el-dialog
        title="Tạo khách hàng mới"
        :visible.sync="centerDialogVisible"
        :width="modal"
        center
        destroy-on-close
        id="createCustomers"
      >
        <CreateCustomer
          v-on:close-modals="centerDialogVisible = false"
          v-on:reload-page="reload"
        />
      </el-dialog>
      <el-dialog
        :visible.sync="centerDialogVisible02"
        :width="dialog"
        center
        id="user_detail_dialog"
      >
        <UserDetail v-on:close-modals="handleChangePassword" />
      </el-dialog>
      <el-dialog
        :visible.sync="centerDialogVisible03"
        :width="dialog"
        center
        id="user_changePass_dialog"
        title="Đổi mật khẩu"
        destroy-on-close
      >
        <ChangePassword v-on:close-modals="centerDialogVisible03 = false" />
      </el-dialog>
      <v-row class="data_table" v-loading="loading">
        <CustomerTable :key="keyChild" :searchKey="input" />
      </v-row>
    </div>
  </v-lazy>
</template>

<script>
import CustomerTable from "@component/CustomerTable";
import CreateCustomer from "@component/Form/CreateCustomer";
import { mapState } from "vuex";
import UserDetail from "@component/Form/UserDetail";
import ChangePassword from "@component/Form/ChangePassword";
import { exportFileList } from "../../utils/exportFile";

export default {
  components: {
    CustomerTable,
    CreateCustomer,
    UserDetail,
    ChangePassword,
  },
  data() {
    return {
      keyChild: 0,
      isActive: false,
      centerDialogVisible: false,
      centerDialogVisible02: false,
      centerDialogVisible03: false,
      textContent: "",
      input: "",
      loading: false,
      dialog: window.innerWidth < 600 ? "80%" : window.innerWidth < 1200 ? "50%" : "25%",
      modal: window.innerWidth < 600 ? "96%" : window.innerWidth < 1200 ? "70%" : "40%",
    };
  },
  watch: {
    input: function (val) {
      this.keyChild += 1;
    },
  },
  computed: {
    ...mapState("customers", ["total", "exportList"]),
  },
  methods: {
    reload() {
      this.keyChild += 1;
    },
    searchKey(e) {
      // if (e.key != "noBackspace" && e.key != "Backspace") {
      this.textContent += `${e.key}`;
      console.log(e);
      // }
    },
    handleChangePassword() {
      this.centerDialogVisible03 = true;
      setTimeout(() => {
        this.centerDialogVisible02 = false;
      }, 100);
    },

    async exportCustomerList() {
      this.loading = true;
      try {
        await exportFileList("/admin/customers/export", "Danh Sách Khách Hàng");
        this.loading = false;
      } catch {
        this.showErrorNotification();
        this.loading = false;
      }
    },
    showErrorNotification() {
      this.$notify.error({
        title: "Error",
        message: "Cannot export Customer List!!!",
      });
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
    width: 37px;
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
    width: 100px;
    height: 25px !important;
    margin-left: 30px;
    // margin-top: 35px;
    background: #ffffff;
    border: 1px solid rgba(96, 96, 96, 0.2);
    border-radius: 15px;
    font-size: 12px;
    letter-spacing: 0.5px;
    color: #606060;
  }
  .style-chooser {
    width: 100px !important;
    font-size: 11px !important;
    font-weight: 300 !important;
    margin-left: 8px;
    // border: 1px solid rgba(96, 96, 96, 0.2);
    // border-radius: 15px;
    #vs2__combobox {
      border: 1px solid rgba(96, 96, 96, 0.2);
      border-radius: 15px !important;
    }
    .number {
      width: 13px !important;
      height: 13px !important;
      border-radius: 50%;
      background: #c4c4c4;
      color: white;
      font-size: 11px;
      font-weight: 300;
    }
    .title {
      font-size: 11px !important;
      font-weight: 300 !important;
    }
    .v-application ul,
    .v-application ol {
      padding-left: 0 !important;
      width: 100px !important;

      &:hover {
        background-color: #fdd27f !important;
      }
    }
    .vs--searchable .vs__dropdown-toggle {
      //   height: 10px !important;
      min-height: auto;
    }
  }

  .option_button {
    position: absolute;
    right: 30px;
    .add_btn {
      width: 24px;
      height: 24px;
      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.15);
    }
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
    .export {
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

.data_table {
  margin-top: 60px;
  padding: 0 30px;
}
@media screen and (min-width: 1265px) {
  .header_box {
    margin-top: -50px !important;
  }
}
@media screen and (max-width: 600px) {
  #search {
    display: none;
  }
  .option_button {
    top: 65px;
    left: 10px;
  }
  .data_table {
    padding: 30px 15px 80px;
  }
  .homepage {
    margin-left: 15px !important;
  }
}
</style>
