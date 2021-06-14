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
        <button class="homepage" disabled>Bất động sản</button>
        <v-btn depressed color="primary" id="social_network"> 16:52 </v-btn>
        <!-- <div id="select_amount">
          <v-select
            :options="options"
            label="title"
            placeholder="Tất cả"
            class="style-chooser"
          >
            <template slot="option" slot-scope="option">
              <div>
                <span class="number">{{ option.number }}</span>
                <span class="title"> {{ option.title }}</span>
              </div>
            </template>
          </v-select>
        </div> -->
        <SelectBox />
        <b-input-group class="search">
          <b-input-group-prepend is-text>
            <b-icon icon="search"></b-icon>
          </b-input-group-prepend>
          <b-form-input
            placeholder="Tìm kiếm tất cả thông tin"
            type="search"
          ></b-form-input>
        </b-input-group>
        <div class="option_button">
          <v-btn class="mx-2 add_btn" fab dark small color="warning">
            <v-icon dark small> mdi-plus </v-icon>
          </v-btn>
          <v-btn class="account" fab><v-icon dark small>mdi-account</v-icon></v-btn>
          <v-btn class="export" fab><img src="@image/icons/export.png" alt="" /></v-btn>

          <v-btn class="setting" fab><v-icon dark small>mdi-cog</v-icon></v-btn>
        </div>
      </v-row>
      <v-row class="data_table">
        <RealEstateTable />
      </v-row>
    </div>
  </v-lazy>
</template>

<script>
import RealEstateTable from "@component/RealEstateTable.vue";
import SelectBox from "@component/SelectBox.vue";
export default {
  components: {
    RealEstateTable,
    SelectBox,
  },
  data() {
    return {
      isActive: false,
      options: [
        {
          title: "Tất cả",
          number: ".",
        },
        {
          title: "2 tỷ",
          number: 0,
        },
        {
          title: "10 tỷ ",
          number: 1,
        },
        {
          title: "2-3 tỷ",
          number: 2,
        },
      ],
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
    // border: 1px solid rgba(96, 96, 96, 0.2);
    // border-radius: 15px;
    #vs2__combobox {
      border: 1px solid rgba(96, 96, 96, 0.2);
      border-radius: 15px !important;
    }
    // .number {
    //   width: 13px !important;
    //   height: 13px !important;
    //   border-radius: 50%;
    //   background: #c4c4c4;
    //   color: white;
    //   font-size: 11px;x`
    //   font-weight: 300;
    // }
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
      &:hover {
        border: 1px solid blue;
        transition: 0.5s;
      }
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
</style>
