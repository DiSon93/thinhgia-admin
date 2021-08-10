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
      <v-row align="center">
        <button class="homepage" disabled>Bất động sản</button>
        <v-btn depressed color="primary" id="social_network"> {{ total }} </v-btn>
        <div class="select_box">
          <el-select v-model="value" placeholder="Select">
            <el-option
              v-for="item in search"
              :key="item.value"
              :label="item.price"
              :value="item.value"
            >
              <span style="float: left" class="search_label">{{ item.label }}</span>
              <span
                style="float: right; color: #8492a6; font-size: 13px"
                class="prices"
                >{{ item.price }}</span
              >
            </el-option>
          </el-select>
        </div>
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
            @click="$router.push('/form/house')"
          >
            <v-icon dark small> mdi-plus </v-icon>
          </v-btn>
          <v-btn class="account" fab @click="centerDialogVisible02 = true"
            ><v-icon dark small>mdi-account</v-icon></v-btn
          >
          <v-btn class="export" fab @click="openExportConfirm"
            ><img src="@image/icons/export.png" alt=""
          /></v-btn>

          <!-- <v-btn class="setting" fab><v-icon dark small>mdi-cog</v-icon></v-btn> -->
          <el-popover placement="bottom-end" width="200" trigger="click" id="setting">
            <span class="setting">
              <div class="label">Tùy chỉnh</div>
              <el-divider></el-divider>
              <el-select
                v-model="value01"
                placeholder="Cộng đồng"
                @change="handleChangePublic($event)"
              >
                <el-option
                  v-for="item in shares"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
              <el-select
                v-model="value02"
                placeholder="Mở bán"
                @change="handleChangeSell($event)"
              >
                <el-option
                  v-for="item in sells"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </span>

            <el-button slot="reference" circle class="btn_notification"
              ><v-icon dark small>mdi-cog</v-icon></el-button
            >
          </el-popover>
        </div>
      </v-row>
      <div class="selected_estate" v-if="isSelectedEstate">
        <el-button type="primary" plain>Nhãn</el-button>
        <el-button @click="removeSelectedEstate">Bỏ chọn</el-button>
        <el-button @click="selestedEstateDisplay" type="warning" plain
          >Hiển thị</el-button
        >
      </div>

      <v-row class="data_table">
        <EstateTable
          :is_public="is_public"
          :is_sell="is_sell"
          :key="keyChild"
          :searchKey="input"
          :min_price="min_price"
          :max_price="max_price"
          ref="childComponent"
          v-on:display-select="isSelectedEstate = true"
          v-on:display-nonselect="isSelectedEstate = false"
        />
      </v-row>
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
  </v-lazy>
</template>

<script>
import RealEstateTable from "@component/RealEstateTable.vue";
import EstateTable from "@component/EstateTable.vue";
import UserDetail from "@component/Form/UserDetail";
import ChangePassword from "@component/Form/ChangePassword";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    RealEstateTable,
    EstateTable,
    UserDetail,
    ChangePassword,
  },
  data() {
    return {
      input: "",
      clipped: false,
      drawer: true,
      fixed: false,
      isActive: false,
      centerDialogVisible02: false,
      centerDialogVisible03: false,
      value01: "",
      value02: "",
      keyChild: 0,
      min_price: "",
      max_price: "",
      is_public: null,
      is_sell: null,
      isSelectedEstate: false,
      dialog: window.innerWidth < 600 ? "80%" : window.innerWidth < 1200 ? "50%" : "25%",
      shares: [
        {
          id: 1,
          name: "Cộng đồng",
        },
        {
          id: 2,
          name: "Cá nhân",
        },
      ],
      sells: [
        {
          id: 1,
          name: "Mở bán",
        },
        {
          id: 2,
          name: "Ngưng bán",
        },
      ],
      search: [
        {
          value: "1",
          label: "1",
          price: "1 tỷ",
        },
        {
          value: "2",
          label: "2",
          price: "2 tỷ",
        },
        {
          value: "5",
          label: "5",
          price: "5 tỷ",
        },
        {
          value: "10",
          label: "10",
          price: "10 tỷ",
        },
        {
          value: "0",
          label: "0",
          price: "Tất cả",
        },
      ],
      value: "0",
    };
  },

  computed: {
    ...mapState("realEstate", ["total"]),
  },
  watch: {
    input: function (val) {
      this.keyChild += 1;
    },
    value: function (val) {
      console.log("val", val);
      if (val == 1) {
        this.min_price = 0;
        this.max_price = 1;
      } else if (val == 2) {
        this.min_price = 1;
        this.max_price = 2;
      } else if (val == 5) {
        this.min_price = 2;
        this.max_price = 5;
      } else if (val == 10) {
        this.min_price = 5;
        this.max_price = 10;
      } else if (val == 0) {
        this.min_price = "";
        this.max_price = "";
      }
      this.keyChild += 1;
    },
  },
  methods: {
    handleChangePassword() {
      this.centerDialogVisible03 = true;
      setTimeout(() => {
        this.centerDialogVisible02 = false;
      }, 100);
    },
    handleChangePublic(e) {
      if (this.is_sell == null) {
        this.is_sell = 1;
      }
      if (e == 1) {
        this.is_public = "public";
        this.keyChild += 1;
      }
      if (e == 2) {
        this.is_public = "web";
        this.keyChild += 1;
      }
    },
    selestedEstateDisplay() {
      this.$refs.childComponent.handleSelectedChange();
    },
    removeSelectedEstate() {
      this.$refs.childComponent.removeSelected();
    },
    async handleChangeSell(e) {
      if (this.is_public == null) {
        this.is_public = "public";
      }
      if (e == 1) {
        this.is_sell = 1;
        this.keyChild += 1;
      }
      if (e == 2) {
        this.is_sell = 0;
        this.keyChild += 1;
      }
    },
    openExportConfirm() {
      this.$alert("Bộ phận kỹ thuật đang cập nhật", "Thông báo", {
        confirmButtonText: "OK",
        callback: (action) => {
          this.$message({
            type: "info",
            message: `Please wait`,
          });
        },
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
    margin-right: 8px;
  }
  .selected_estate {
    position: absolute;
    top: 0px;
    left: 30px;
    z-index: 99;
    .el-button {
      padding: 8px 10px;
      font-size: 12px;
    }
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
    background-color: #fff;
    #vs2__combobox {
      border: 1px solid rgba(96, 96, 96, 0.2);
      border-radius: 15px !important;
    }

    .title {
      font-size: 11px !important;
      font-weight: 300 !important;
    }
    .v-application ul,
    .v-application ol {
      padding-left: 0 !important;
      width: 100px !important;
    }
    .vs--searchable .vs__dropdown-toggle {
      //   height: 10px !important;
      min-height: auto;
    }
    .vs_dropdown-otp {
      background-color: orange;
    }
  }

  .search {
    margin-left: 378px;
    position: relative;
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
    #setting {
      padding: 0;
      // width: 24px !important;
      // height: 24px !important;
      border-radius: 50%;
      background-color: #fff !important;
      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.15);
      margin-left: 10px;

      .el-button {
        padding: 4px !important;
        .v-icon {
          // line-height: 24px;
          color: #000;
        }
        &:hover {
          border: 1px solid blue;
          transition: 0.5s;
        }
      }
    }
  }
  #select_amount {
    width: 120px !important;
    border-radius: 15px !important;
    .style-chooser {
      width: 120px !important;
      border-radius: 15px !important;
    }
  }
}
.data_table {
  margin-top: 60px;
  padding: 0 10px;
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
  .select_box {
    position: absolute;
    top: 65px;
    left: 15px;
  }
  .data_table {
    padding: 30px 15px 80px;
  }
  .option_button {
    top: 68px;
    right: 15px !important;
  }
  .homepage {
    margin-left: 15px !important;
  }
  .v-input--hide-details {
    display: none !important;
  }
  .header_box {
    .selected_estate {
      left: 200px;
      top: 5px;
    }
  }
}
</style>
