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
        <button class="homepage" disabled>Nhu cầu</button>
        <v-btn depressed color="primary" id="social_network"> {{ total }} </v-btn>
        <div id="select_amount"></div>
        <div class="option_button">
          <v-btn class="mx-2 add_btn" fab dark small color="warning">
            <v-icon dark small @click="$router.push('/form/demand')"> mdi-plus </v-icon>
          </v-btn>
          <v-btn class="account" fab
            ><v-icon dark small @click="centerDialogVisible02 = true"
              >mdi-account</v-icon
            ></v-btn
          >
        </div>
      </v-row>
      <v-row id="pagination_select">
        <v-col cols="4">
          Tổng cộng: <span class="highlight">{{ total }}</span>
        </v-col>
        <v-col cols="4" align="center"> 1 / 1 </v-col>
        <v-col cols="4" align="right" class="option_right">
          <!-- <button class="solution">Chưa giải quyết</button> -->
          <div class="solution_option">
            <div id="select_solution">
              <!-- <v-select :options="options" label="title" placeholder="Chưa giải quyết">
                <template slot="option" slot-scope="option">
                  <span> {{ option.title }}</span>
                </template>
              </v-select> -->
              <el-select
                v-model="value"
                placeholder="Chưa giải quyết"
                @change="handleChange($event)"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <v-btn class="export" fab
              ><img src="@image/icons/export.png" alt="" @click="exportDemandList"
            /></v-btn>
          </div>
        </v-col>
      </v-row>
      <v-row class="data_table">
        <Demand :selected_op="resolved" :key="keyChild" />
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
import { mapState } from "vuex";
import Demand from "@component/Demand";
import UserDetail from "@component/Form/UserDetail";
import ChangePassword from "@component/Form/ChangePassword";
import { exportFileList } from "../../utils/exportFile";

export default {
  components: {
    Demand,
    UserDetail,
    ChangePassword,
  },
  data() {
    return {
      isActive: false,
      keyChild: 0,
      resolved: 0,
      centerDialogVisible02: false,
      centerDialogVisible03: false,
      dialog: window.innerWidth < 600 ? "80%" : window.innerWidth < 1200 ? "50%" : "25%",
      options: [
        {
          value: "0",
          label: "Chưa giải quyết",
        },
        {
          value: "1",
          label: "Giải quyết",
        },
      ],
      value: "0",
    };
  },
  computed: {
    ...mapState("demand", ["total"]),
  },
  methods: {
    handleChange(e) {
      this.resolved = e;
      this.keyChild += 1;
    },
    handleChangePassword() {
      this.centerDialogVisible03 = true;
      setTimeout(() => {
        this.centerDialogVisible02 = false;
      }, 100);
    },
    async exportDemandList() {
      try {
        await exportFileList("/admin/needs/export", "Danh Sách Nhu Cầu Khách Hàng");
      } catch {
        this.showErrorNotification();
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
  }
}
#pagination_select {
  margin-top: 40px;
  font-size: 12px;
  padding: 0 20px;
  .option_right {
    position: relative;
    .solution_option {
      position: absolute;
      display: flex;
      // width: 165px;
      right: 0px;
      .el-select {
        width: 145px;
        .el-input__inner {
          font-size: 13px !important;
        }
      }
      .export {
        padding: 0;
        width: 24px !important;
        height: 24px !important;
        border-radius: 50%;
        background-color: #fff !important;
        box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.15);
        margin-left: 15px;
        margin-right: 10px;
        margin-top: 8px;
        &:hover {
          border: 1px solid blue;
          transition: 0.5s;
        }
      }
    }
  }

  .selected_amount {
    font-size: 13px;
  }
}
.data_table {
  margin-top: 40px;
  padding: 0 30px;
}
@media screen and (min-width: 1265px) {
  .header_box {
    margin-top: -50px !important;
  }
}
@media screen and (max-width: 600px) {
  #pagination_select {
    margin-top: 20px;
    .option {
      display: none;
    }
  }
  .data_table {
    padding: 0px 15px 80px;
  }
  .homepage {
    margin-left: 15px !important;
  }
  .option_button {
    right: 15px !important;
  }
  .solution_option {
    right: -15px !important;
  }
}
.highlight {
  color: teal;
  font-weight: 500;
  font-size: 15px;
}
</style>
