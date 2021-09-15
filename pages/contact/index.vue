<template>
  <div class="contact">
    <div class="header_box d-flex">
      <!-- <v-row align="center" d-flex>
        <button class="homepage" disabled>Liên hệ</button>
        <div class="option_button">
          <v-btn class="account" fab @click="centerDialogVisible02 = true"
            ><v-icon dark small>mdi-account</v-icon></v-btn
          >
        </div>
      </v-row> -->
      <v-row align="center" d-flex>
        <v-col cols="8" sm="6" class="app_bar">
          <button class="homepage" disabled>Liên hệ</button>
          <v-btn-toggle v-model="toggle_exclusive" mandatory id="administrator_btn">
            <v-btn v-on:click="overview"> Tổng quan </v-btn>
            <v-btn @click="request"> Yêu cầu khách hàng </v-btn>
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
          </div>
        </v-col>
      </v-row>
    </div>
    <div v-if="isOverview">
      <ContactOverview />
    </div>
    <div v-if="isResquest">
      <CustomerRequest />
    </div>
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
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import UserDetail from "@component/Form/UserDetail";
import ChangePassword from "@component/Form/ChangePassword";
import ContactOverview from "@component/ContactOverview";
import CustomerRequest from "@component/CustomerRequest";

export default {
  components: {
    UserDetail,
    ChangePassword,
    ContactOverview,
    CustomerRequest,
  },
  data() {
    return {
      loading: false,
      centerDialogVisible02: false,
      centerDialogVisible03: false,
      toggle_exclusive: [],
      isOverview: true,
      isResquest: false,
      dialog: window.innerWidth < 600 ? "80%" : window.innerWidth < 1200 ? "50%" : "25%",
    };
  },
  mounted() {
    // this.getContactTypeList();
  },
  computed: {
    // ...mapState("contact", ["contactTypeList"]),
  },
  methods: {
    // ...mapActions("contact", ["getContactTypeList"]),

    editItem() {},
    handleChangePassword() {
      this.centerDialogVisible03 = true;
      setTimeout(() => {
        this.centerDialogVisible02 = false;
      }, 100);
    },
    overview: function () {
      this.isOverview = true;
      this.isResquest = false;
    },
    request: function () {
      this.isOverview = false;
      this.isResquest = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.contact {
  .header_box {
    margin-bottom: 20px;
  }
}

// .header_box {
//   left: 208px !important;
//   background: #eff5f9 !important;
//   margin: 20px 0 60px !important;
//   padding-top: 10px;
//   .homepage {
//     width: 100px;
//     height: 25px !important;
//     margin-left: 30px;
//     // margin-top: 55px;
//     background: #ffffff;
//     border: 1px solid rgba(96, 96, 96, 0.2);
//     border-radius: 15px;
//     font-size: 12px;
//     letter-spacing: 0.5px;
//     color: #606060;
//   }
//   .option_button {
//     position: absolute;
//     right: 30px;
//     .account {
//       margin-left: 2px;
//       padding: 0;
//       width: 24px !important;
//       height: 24px !important;
//       border-radius: 50%;
//       background-color: #fff !important;
//       box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.15);
//       &:hover {
//         border: 1px solid blue;
//         transition: 0.5s;
//       }
//     }
//   }
// }

.header_box {
  left: 208px !important;
  background: #eff5f9 !important;
  margin-top: 20px !important;
  .homepage {
    width: 90px;
    height: 25px !important;
    margin-left: 20px;
    background: #ffffff;
    border: 1px solid rgba(96, 96, 96, 0.2);
    border-radius: 15px;
    font-size: 12px;
    letter-spacing: 0.5px;
    color: #606060;
  }
  #administrator_btn .v-btn {
    width: auto !important;
  }
  .option_button {
    position: absolute;
    right: 0px;
    top: 0px;
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
@media screen and (min-width: 1265px) {
  .header_box {
    margin-top: -50px !important;
  }
}
@media screen and (max-width: 600px) {
  .data_table {
    padding: 30px 15px 80px;
  }
  .user_noti {
    span {
      font-size: 11px !important;
    }
  }
  .header_box {
    .option_button {
      width: 30px;
      top: 30px;
      right: 30px;
    }
    .homepage {
      position: fixed;
      top: 30px;
      left: 5px;
    }
  }
}
</style>
