<template>
  <div class="create_demand" v-loading="loading">
    <div class="demand_title">Tạo nhu cầu</div>
    <div class="note">
      <div>Nhu cầu của khách hàng?</div>
      <el-checkbox v-model="checked01" @change="checked02 = false">Mua</el-checkbox>
      <el-checkbox v-model="checked02" @change="checked01 = false">Thuê</el-checkbox>
    </div>
    <div class="address">
      <div class="addres_items">
        <div class="label">Tỉnh <span style="color: red">*</span></div>
        <el-select v-model="value01" placeholder="Chọn huyện" @change="chooseProvince">
          <el-option
            v-for="item in provinceList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <p class="error_message" v-if="errorMessage">
          {{ errorMessage.province_id ? errorMessage.province_id[0] : null }}
        </p>
      </div>
      <div class="addres_items">
        <div class="label">Huyện <span style="color: red">*</span></div>
        <el-select
          v-model="value02"
          placeholder="Chọn huyện"
          @change="chooseDistrict"
          no-data-text="Vui lòng chọn tỉnh"
        >
          <el-option
            v-for="item in dictrictList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <p class="error_message" v-if="errorMessage">
          {{ errorMessage.district_id ? errorMessage.district_id[0] : null }}
        </p>
      </div>
      <div class="addres_items">
        <div class="label">Phường <span style="color: red">*</span></div>
        <el-select
          v-model="value03"
          placeholder="Chọn phường"
          multiple
          no-data-text="Vui lòng chọn huyện"
        >
          <el-option
            v-for="item in wardList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="estate">
      <div class="estate_items">
        <div class="label">Loại Bất động sản <span style="color: red">*</span></div>
        <el-select v-model="value04" placeholder="Chọn loại BĐS">
          <el-option
            v-for="item in estates"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <p class="error_message" v-if="errorMessage">
          {{ errorMessage.real_estate_type ? errorMessage.real_estate_type[0] : null }}
        </p>
      </div>
      <div class="estate_items">
        <div class="label">Loại nhà <span style="color: red">*</span></div>
        <el-select v-model="value05" placeholder="Chọn loại nhà">
          <el-option
            v-for="item in houses"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <p class="error_message" v-if="errorMessage">
          {{ errorMessage.house_type ? errorMessage.house_type[0] : null }}
        </p>
      </div>
    </div>
    <div class="price_staff">
      <div class="price">
        <div class="label">Giá tối thiểu (VNĐ) <span style="color: red">*</span></div>
        <el-input v-model="value06" id="input_price"></el-input>
        <p class="error_message" v-if="errorMessage">
          {{ errorMessage.price_min ? errorMessage.price_min[0] : null }}
        </p>

        <div class="label">Giá tối đa (VNĐ) <span style="color: red">*</span></div>
        <el-input v-model="value07" id="input_price"></el-input>
        <p class="error_message" v-if="errorMessage">
          {{ errorMessage.price_max ? errorMessage.price_max[0] : null }}
        </p>
      </div>

      <div class="staff">
        <div class="label">Nhân viên <span style="color: red">*</span></div>
        <el-select v-model="value08" placeholder="Chọn nhân viên">
          <el-option
            v-for="item in staffList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <p class="error_message" v-if="errorMessage">
          {{ errorMessage.user_id ? errorMessage.user_id[0] : null }}
        </p>
        <div class="label">Khách hàng <span style="color: red">*</span></div>
        <div class="d-flex">
          <el-select v-model="value09" placeholder="Chọn khách hàng">
            <el-option
              v-for="item in customerList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <el-button round @click="centerDialogVisible = true">+ Tạo</el-button>
        </div>
        <p class="error_message" v-if="errorMessage">
          {{ errorMessage.customer_id ? errorMessage.customer_id[0] : null }}
        </p>
      </div>
    </div>
    <div class="direction">
      <div class="label">Hướng<span style="color: red">*</span></div>
      <el-select v-model="value10" placeholder="Chọn Hướng" multiple>
        <el-option
          v-for="item in directions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="tool">
      <div class="tool_item">
        <div class="label">Số phòng ngủ tối thiểu <span style="color: red">*</span></div>
        <el-input v-model="value11" id="input_price"></el-input>
        <p class="error_message" v-if="errorMessage">
          {{
            errorMessage.bedroom_number_min ? errorMessage.bedroom_number_min[0] : null
          }}
        </p>
      </div>
      <div class="tool_item">
        <div class="label">Số lầu tối thiểu <span style="color: red">*</span></div>
        <el-input v-model="value12" id="input_price"></el-input>
        <p class="error_message" v-if="errorMessage">
          {{ errorMessage.floor_number_min ? errorMessage.floor_number_min[0] : null }}
        </p>
      </div>
      <div class="tool_item">
        <div class="label">Diện tích tối thiểu <span style="color: red">*</span></div>
        <el-input v-model="value13" id="input_price"></el-input>
        <p class="error_message" v-if="errorMessage">
          {{ errorMessage.land_area_min ? errorMessage.land_area_min[0] : null }}
        </p>
      </div>
    </div>
    <div class="discription">
      <div class="label">Mô tả</div>
      <el-input v-model="value14" id="input_price"></el-input>
    </div>
    <div class="save">
      <el-button id="soft_save" @click="updateDemandOffCustomer(0)">Lưu nháp</el-button>
      <el-button id="save" @click="updateDemandOffCustomer(1)">Lưu</el-button>
    </div>
    <el-dialog
      title="Tạo khách hàng mới"
      :visible.sync="centerDialogVisible"
      :width="dialog"
      center
      destroy-on-close
      id="createCustomersSimple"
    >
      <SimpleCreateCustomer
        v-on:close-modals="centerDialogVisible = false"
        v-on:reload-page="reload"
      />
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import SimpleCreateCustomer from "@component/Form/SimpleCreateCustomer";
export default {
  components: {
    SimpleCreateCustomer,
  },
  data() {
    return {
      checked01: true,
      checked02: false,
      value01: "",
      value02: "",
      value03: "",
      value04: "",
      value05: "",
      value06: "",
      value07: "",
      value08: "",
      value09: "",
      value10: "",
      value11: "",
      value12: "",
      value13: "",
      value14: "",
      directions: [],
      estates: [],
      houses: [],
      loading: false,
      centerDialogVisible: false,
      dialog: window.innerWidth < 600 ? "80%" : window.innerWidth < 1200 ? "50%" : "25%",
      customers: [
        {
          id: 1,
          name: "Dương Thị Mỹ Ánh",
        },
        {
          id: 2,
          name: "Phạm Việt Tiến",
        },
        {
          id: 3,
          name: "Lý Hồng Linh",
        },
      ],
    };
  },
  mounted() {
    this.getCustomerList();
    this.getStaffList();
    this.getProvinceList();
    this.getDictionaryList();
    this.getUpdateList();
  },
  computed: {
    ...mapState("global", ["dictrictList"]),
    ...mapState("global", ["provinceList"]),
    ...mapState("global", ["wardList"]),
    ...mapState("staffs", ["staffList"]),
    ...mapState("dictionaries", ["dictionaryList"]),
    ...mapState("demand", ["selected"]),
    ...mapState("customers", ["customerList"]),
    ...mapState("demand", ["errorMessage"]),
  },
  methods: {
    ...mapActions("customers", ["getCustomerList"]),
    ...mapActions("staffs", ["getStaffList"]),
    ...mapActions("global", ["getProvinceList"]),
    reload() {
      this.getCustomerList();
    },
    async getUpdateList() {
      this.value01 = this.selected.province_id;
      await this.$store.dispatch("global/getDictrictList", this.value01);
      this.value02 = this.selected.dictrict_id;
      await this.$store.dispatch("global/getWardList", this.value02);
      this.value03 = this.selected.wards_id;
      this.value04 = this.selected.type_estate_id;
      this.value05 = this.selected.type_house_id;
      this.value06 = this.selected.price_min;
      this.value07 = this.selected.price_max;
      this.value08 = this.selected.user_id;
      this.value09 = this.selected.customer_id;
      this.value10 = this.selected.direction_id;
      this.value11 = this.selected.bedroom;
      this.value12 = this.selected.floor;
      this.value13 = this.selected.square;
      this.value14 = this.selected.discription;
      this.checked01 = this.selected.side == "Mua" ? true : false;
      this.checked02 = this.selected.side == "Thuê" ? true : false;
    },

    async updateDemandOffCustomer(e) {
      this.loading = true;
      try {
        await this.$store.dispatch("demand/updateDemandOfCustomer", {
          is_save: e,
          id: this.selected.id,
          user_id: this.value08,
          customer_id: this.value09,
          province_id: this.value01,
          district_id: this.value02,
          ward_id: this.value03,
          real_estate_type: this.value04,
          house_type: this.value05,
          price_min: this.value06,
          price_max: this.value07,
          house_orientation: this.value10,
          floor_number_min: this.value12,
          bedroom_number_min: this.value11,
          land_area_min: this.value13,
          descriptions: this.value14,
          resolved: 0,
          purpose: this.checked01 ? 0 : 1,
        });
        this.loading = false;
        setTimeout(this.openNotificationSuccess(), 1000);
        this.$router.push("/demands");
      } catch {
        this.showErrorNotification();
        this.loading = false;
      }
    },
    chooseProvince() {
      this.value02 = "";
      this.value03 = "";
      this.$store.commit("global/setNoWardList");
      this.$store.dispatch("global/getDictrictList", this.value01);
    },
    chooseDistrict() {
      this.value03 = "";
      this.$store.dispatch("global/getWardList", this.value02);
    },
    async getDictionaryList() {
      await this.$store.dispatch("dictionaries/getDictionaryList", {
        limit: 10,
        page: 1,
      });
      await this.getDicOptions();
    },
    getDicOptions() {
      const directionList = this.dictionaryList.filter((u, i) => u.id == 6);
      this.directions = directionList[0].dictionaries.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
      const estateList = this.dictionaryList.filter((u, i) => u.id == 1);
      this.estates = estateList[0].dictionaries.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
      const houseList = this.dictionaryList.filter((u, i) => u.id == 2);
      this.houses = houseList[0].dictionaries.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
    },
    showErrorNotification() {
      this.$notify.error({
        title: "Error",
        message: "Unsuccess require!!!",
      });
    },
    openNotificationSuccess() {
      this.$notify({
        title: "Success",
        message: "Update demand of customers successfull!!!",
        type: "success",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.create_demand {
  .demand_title {
    margin-top: -60px;
    font-weight: bold;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.5px;
    color: #606060;
    margin-bottom: 6px;
  }
  .note {
    font-size: 14px;
    margin-bottom: 5px;
  }
  .address,
  .estate,
  .direction,
  .tool {
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    padding: 10px 20px 15px;
    background-color: #fff;
    border: 1px solid #dfdfdf;
    box-sizing: border-box;
    border-radius: 4px;
    margin-bottom: 15px;
  }
  .addres_items {
    width: 32%;
    .el-select {
      width: 100%;
    }
  }
  .estate_items {
    width: 49%;
    .el-select {
      width: 100%;
    }
  }
  .label {
    font-weight: 500;
    font-size: 14px;
  }
  .price_staff {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    .label {
      margin-top: 10px;
    }
    .price {
      width: 33%;
      background: #ffffff;
      border: 1px solid #dfdfdf;
      box-sizing: border-box;
      border-radius: 4px;
      padding: 0px 20px 15px;
    }
    .staff {
      width: 66%;
      background: #ffffff;
      border: 1px solid #dfdfdf;
      box-sizing: border-box;
      border-radius: 4px;
      padding: 0px 20px 15px;
      .el-select {
        width: 100%;
      }
      .el-button {
        background-color: transparent;
        color: red;
        border: none;
        &:hover {
          background-color: #fff;
        }
        margin-left: 4px;
      }
    }
  }
  .direction,
  .discription,
  .save {
    display: block;
    background-color: #fff;
    padding: 10px 20px 15px;
    background-color: #fff;
    border: 1px solid #dfdfdf;
    box-sizing: border-box;
    border-radius: 4px;
    margin-bottom: 15px;
    .label {
      display: block;
      width: 100%;
    }
    .el-select {
      width: 100%;
    }
  }
  .tool {
    .tool_item {
      width: 32%;
    }
    .el-select {
      width: 100%;
    }
  }
  .save {
    display: flex;
    justify-content: space-between;
    width: 100%;
    #save.el-button {
      color: #fff;
      background: #fbad18;
      border-radius: 15px;
      margin: 0 auto;
      padding: 8px 20px;
      margin: 0 0 0 auto;
    }
    #soft_save.el-button {
      background: #ffffff;
      border: 1px solid #cdcdcd;
      box-sizing: border-box;
      border-radius: 15px;
      font-size: 14px;
      padding: 2px 20px;
    }
  }
}
.error_message {
  color: red;
  font-size: 12px;
  margin-bottom: 0px;
  margin-top: 0px;
}
@media screen and (max-width: 1250px) {
  .create_demand {
    .demand_title {
      margin-top: 0px;
    }
  }
}
@media screen and (max-width: 600px) {
  .address,
  .estate,
  .direction,
  .tool {
    display: block;
  }
  .addres_items,
  .tool_item {
    width: 100% !important;
    .label {
      margin-top: 4px;
    }
  }
  .estate_items {
    width: 100%;
    .label {
      margin-top: 4px;
    }
  }
  .price_staff {
    display: block;
    margin-bottom: 15px;
    .label {
      margin-top: 10px;
    }
    .price {
      width: 100%;
    }
    .staff {
      margin-top: 15px;
      width: 100%;
    }
  }
  .save {
    margin-bottom: 60px;
  }
}
</style>
