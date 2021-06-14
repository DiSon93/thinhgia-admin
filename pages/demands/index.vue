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
        <v-btn depressed color="primary" id="social_network"> 16:52 </v-btn>
        <div id="select_amount"></div>
        <div class="option_button">
          <v-btn class="mx-2 add_btn" fab dark small color="warning">
            <v-icon dark small> mdi-plus </v-icon>
          </v-btn>
          <v-btn class="account" fab><v-icon dark small>mdi-account</v-icon></v-btn>
        </div>
      </v-row>
      <v-row id="pagination_select">
        <v-col cols="4">
          <v-select
            :options="['Hiển thị 10', 'Hiển thị 20', 'Hiển thị 50', 'Hiển thị 100']"
            class="option"
            placeholder="Hiển thị 10"
          ></v-select>
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
              <el-select v-model="value" placeholder="Chưa giải quyết">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <v-btn class="export" fab><img src="@image/icons/export.png" alt="" /></v-btn>
          </div>
        </v-col>
      </v-row>
      <v-row class="data_table">
        <Demand />
      </v-row>
    </div>
  </v-lazy>
</template>

<script>
import DemandTable from "@component/DemandTable";
import Demand from "@component/Demand";
export default {
  components: {
    DemandTable,
    Demand,
  },
  data() {
    return {
      isActive: false,
      // options: [
      //   {
      //     title: "Chưa giải quyết",
      //   },
      //   {
      //     title: "Giải quyết",
      //   },
      // ],
      options: [
        {
          value: "Chưa giải quyết",
          label: "Chưa giải quyết",
        },
        {
          value: "Giải quyết",
          label: "Giải quyết",
        },
      ],
      value: "Chưa giải quyết",
    };
  },
};
</script>

<style lang="scss" scoped>
.header_box {
  left: 208px !important;
  background: #eff5f9 !important;
  margin-top: -50px !important;
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
</style>
