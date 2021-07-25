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
          <v-btn class="export" fab><img src="@image/icons/export.png" alt="" /></v-btn>

          <v-btn class="setting" fab><v-icon dark small>mdi-cog</v-icon></v-btn>
        </div>
      </v-row>

      <v-row class="data_table">
        <EstateTable />
      </v-row>
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
      desserts: [
        {
          id: 2971,
          name: "18-04 30 tháng 04",
          calories: 159,
          web: true,
        },
        {
          id: 2972,
          name: "18-04 30 tháng 04",
          calories: 237,
        },
        {
          id: 2973,
          name: "18-04 30 tháng 04",
          calories: 262,
          web: true,
        },
        {
          id: 2974,
          name: "18-04 30 tháng 04",
          calories: 305,
        },
        {
          id: 2975,
          name: "18-04 30 tháng 04",
          calories: 356,
        },
        {
          id: 2976,
          name: "18-04 30 tháng 04",
          calories: 375,
        },
        {
          id: 2977,
          name: "18-04 30 tháng 04",
          calories: 392,
        },
        {
          id: 2978,
          name: "18-04 30 tháng 04",
          calories: 408,
        },
        {
          id: 2979,
          name: "18-04 30 tháng 04",
          calories: 452,
        },
        {
          id: 2980,
          name: "18-04 30 tháng 04",
          calories: 518,
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
          value: "15",
          label: "X",
          price: "2 - 3 tỷ",
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
  methods: {
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
}
</style>
