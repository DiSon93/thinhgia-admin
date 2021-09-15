<template>
  <div>
    <div class="header_box d-flex">
      <v-row align="center" d-flex>
        <button class="homepage" disabled>Thông báo</button>
        <v-btn depressed color="primary" id="social_network">
          {{ notiList.length }}/{{ total }}
        </v-btn>
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
          <v-btn class="account" fab @click="centerDialogVisible02 = true"
            ><v-icon dark small>mdi-account</v-icon></v-btn
          >
        </div>
      </v-row>
    </div>
    <div class="noti_content" v-if="notiList.length != 0" v-loading="loading">
      <el-divider></el-divider>
      <div v-for="item in notiList" :key="item.id">
        <div class="d-flex user_noti" @click="$router.push(`/detail/house/${item.id}`)">
          <div class="d-flex">
            <img v-if="item.staff.image[0]" :src="item.staff.image[0].thumbnail" alt="" />
            <img src="@image/icons/username.png" alt="" v-else />
            <div>
              <div class="name">
                {{ item.staff.name.toUpperCase() }}
                <span>đã chia sẻ bất động sản lên cộng đồng</span>
              </div>
              <div class="contents">
                {{ item.title ? item.title.toUpperCase() : null }}
              </div>
            </div>
          </div>
          <div class="times">{{ item.fromNow }}</div>
        </div>
        <el-divider></el-divider>
      </div>
    </div>
    <v-btn color="warning" dark id="btn_readmore" @click="readMore" v-if="btn_display">
      Xem thêm
    </v-btn>
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
import moment from "moment";
import UserDetail from "@component/Form/UserDetail";
import ChangePassword from "@component/Form/ChangePassword";
export default {
  components: {
    UserDetail,
    ChangePassword,
  },
  data() {
    return {
      page: 1,
      input: "",
      search: "",
      loading: false,
      notiList: [],
      btn_display: true,
      centerDialogVisible02: false,
      centerDialogVisible03: false,
      dialog: window.innerWidth < 600 ? "80%" : window.innerWidth < 1200 ? "50%" : "25%",
    };
  },
  mounted() {
    this.getNotifications();
  },
  computed: {
    ...mapState("realEstate", ["realEstateList", "lastPage", "total"]),
  },
  watch: {
    input: function (val) {
      this.search = val;
      this.getNotifications();
    },
  },
  methods: {
    readMore() {
      this.page += 1;
      // if (this.lastPage == this.page) {
      //   this.btn_display = false;
      // }
      this.getNotifications();
    },
    async getNotifications() {
      this.loading = true;
      try {
        await this.$store.dispatch("realEstate/getRealEstateList", {
          limit: 4,
          page: this.page,
          approve_public: 2,
          search: this.search,
          sort_price: "",
          min_price: "",
          max_price: "",
          purpose: "",
          house_type: "",
          projects: "",
          province: "",
        });
        if (this.lastPage == this.page) {
          this.btn_display = false;
        }
        let notis = this.realEstateList.map((item, index) => {
          return { ...item, fromNow: moment(item.updated_at).startOf("hour").fromNow() };
        });
        if (this.search == "") {
          this.notiList = this.notiList.concat(notis);
        } else {
          if (this.page == 1) {
            this.notiList = notis;
          } else {
            this.notiList = this.notiList.concat(notis);
          }
        }
        this.loading = false;
      } catch {
        this.loading = false;
      }
    },
    handleChangePassword() {
      this.centerDialogVisible03 = true;
      setTimeout(() => {
        this.centerDialogVisible02 = false;
      }, 100);
    },
  },
};
</script>

<style lang="scss" scoped>
.notification {
  justify-content: space-between;
  margin-bottom: 20px;
  margin-top: -50px;
  align-items: center;
  .title {
    font-weight: 500;
    font-size: 15px !important;
    color: #fbad18;
    letter-spacing: 0.5px !important;
  }
}
#btn_readmore {
  text-transform: capitalize;
  font-weight: 300;
  font-size: 10px;
  line-height: 24px;
  letter-spacing: 0.5px;
  color: #000000;
  width: 64px;
  border-radius: 15px;
  width: 70px;
  height: 18px;
}
.noti_content {
  background: #ffffff;
  padding: 10px 0;
  border-radius: 5px;
  .el-divider.el-divider--horizontal {
    margin: 0px;
  }
  .user_noti {
    justify-content: space-between;
    // margin-top: 10px;
    // border-radius: 15px;
    // height: 48px;
    align-items: center;
    padding: 10px 20px;
    // margin-bottom: 10px;
    &:hover {
      background-color: rgba(192, 192, 192, 0.466);
      transition: 0.5s;
    }
    img {
      width: 40px;
      height: 40px;
      margin: 0 20px;
      border-radius: 50%;
    }
    .name {
      font-weight: 500;
      font-size: 15px;
      color: orange;
    }
    span {
      font-size: 13px;
      letter-spacing: 0.5px;
      font-weight: normal;
      color: #000;
    }
    .contents {
      font-weight: 500;
      font-size: 16px;
    }
    .times {
      font-weight: 300;
      font-size: 13px;
    }
  }
}
.header_box {
  left: 208px !important;
  background: #eff5f9 !important;
  margin: 20px 0 40px !important;
  padding-top: 10px;
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
  }
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
  .data_table {
    padding: 30px 15px 80px;
  }
  .homepage {
    margin-left: 15px !important;
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
  }
  .noti_content {
    .user_noti {
      img {
        margin: 0 10px 0 0;
      }
      .name {
        font-size: 13px;
      }
      .contents {
        font-size: 14px;
      }
      .times {
        font-size: 12px;
        margin-left: 8px;
      }
    }
  }
}
</style>
