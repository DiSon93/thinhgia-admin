<template>
  <div id="real_estate_table" v-loading="loading">
    <el-table
      :data="realEstateTable"
      style="width: 100%"
      ref="multipleTable"
      stripe
      empty-text
      highlight-current-row
      @row-click="handdle"
      @selection-change="handleSelectionChange"
      @sort-change="sortChangePrice"
      height="80vh"
      @filter-change="filterHandlerChange"
    >
      <div slot="empty">NO DATA CAN SHOW</div>
      <el-table-column type="selection" width="35" fixed> </el-table-column>
      <el-table-column prop="amount" label="#" width="56" fixed> </el-table-column>
      <el-table-column
        prop="side"
        label="Loại"
        width="80"
        column-key="side"
        :filters="[
          { text: 'Thuê', value: 'THUÊ' },
          { text: 'Bán', value: 'BÁN' },
        ]"
        fixed
      >
        <template slot-scope="scope">
          <div>{{ scope.row.side }}</div>
          <el-tag v-if="scope.row.is_sell">Mở</el-tag>
          <el-tag type="danger" v-else>Ngưng</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="Giá" width="80" sortable>
        <template slot-scope="scope">
          {{ scope.row.price }} {{ scope.row.unit_price }}
        </template>
      </el-table-column>
      <el-table-column
        prop="project"
        label="Dự án"
        width="100"
        column-key="project"
        :filters="[
          { text: 'Có', value: '1' },
          { text: 'Không có', value: '0' },
        ]"
      >
      </el-table-column>
      <el-table-column prop="address" label="Địa chỉ" width="200">
        <template slot="header">
          Địa chỉ
          <!-- <i class="el-icon-shopping-cart-2" style="margin-left: 6px"></i> -->
          <el-popover placement="bottom" width="200" v-model="visible">
            <!-- <el-input
              placeholder="Tìm kiếm tất cả thông tin"
              prefix-icon="el-icon-search"
              v-model="search_address"
            >
            </el-input> -->
            <!-- <el-input placeholder="Please input"></el-input> -->

            <div id="search_estate">
              <input
                type="text"
                v-model="search_address"
                class="input"
                placeholder="Tìm kiếm địa chỉ"
                v-on:keyup.enter="searchAddress"
              />
              <i class="el-icon-search"></i>
              <div>
                <el-button type="primary" round id="confirm" @click="searchAddress"
                  >Search</el-button
                >
                <el-button round type="danger" id="reset" @click="resetAddress">
                  Reset</el-button
                >
              </div>
            </div>
            <a href="javascript:;" slot="reference" style="margin-left: 6px"
              ><i class="el-icon-shopping-cart-2"></i
            ></a>
          </el-popover>
        </template>
        <!-- <div class="d-flex">
          <v-btn depressed color="primary" id="social_network"> Cộng đồng </v-btn>
          <v-btn depressed color="success" id="web"> Web </v-btn>
        </div> -->
        <template slot-scope="scope">
          <div>{{ scope.row.address }}</div>
          <v-btn
            v-if="scope.row.share_public == 1 && scope.row.approve_public == 2"
            depressed
            color="primary"
            id="social_network"
          >
            Cộng đồng
          </v-btn>
          <v-btn
            v-if="scope.row.share_web == 1 && scope.row.approve_web == 2"
            depressed
            color="success"
            id="web"
          >
            Web
          </v-btn>
          <el-tag
            type="danger"
            v-if="
              (scope.row.share_public == 1 && scope.row.approve_public == 1) ||
              (scope.row.share_web == 1 && scope.row.approve_web == 1)
            "
            >Chờ duyệt</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="area"
        label="Khu vực"
        width="180"
        :filters="province_list"
        column-key="district"
      >
        <template slot-scope="scope">
          {{ scope.row.area }}
          <div class="district">{{ scope.row.district }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="estate_type" label="Loại BĐS" width="160"></el-table-column>
      <el-table-column
        prop="home_type"
        label="Loại nhà"
        width="140"
        column-key="home_type"
        :filters="houses"
      ></el-table-column>
      <el-table-column prop="square" label="Diện tích" width="140">
        <template slot-scope="scope">
          {{ scope.row.square }} m2
          <div class="s_detail">{{ scope.row.s_detail }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="law" label="Pháp lý" width="140"></el-table-column>
      <el-table-column prop="floor" label="Số lầu" width="120"></el-table-column>
      <el-table-column prop="direction" label="Hướng" width="140">
        <template slot-scope="scope">
          <button class="direction" disabled>{{ scope.row.direction }}</button>
        </template>
      </el-table-column>
      <el-table-column prop="loby" label="Hướng ban công" width="140"></el-table-column>
      <el-table-column prop="iron" label="Nở hậu" width="120"></el-table-column>
      <el-table-column prop="viewer" label="Lượt xem" width="120"></el-table-column>
      <el-table-column prop="staff" label="Nhân viên" width="180"></el-table-column>
      <el-table-column prop="customer" label="Khách hàng" width="180"></el-table-column>
      <el-table-column prop="fee" label="Phí môi giới" width="120"></el-table-column>
      <el-table-column prop="bedroom" label="Số phòng ngủ" width="120"></el-table-column>
      <el-table-column prop="road_type" label="Loại đường" width="120"></el-table-column>
      <el-table-column prop="road" label="Đường rộng" width="120"></el-table-column>
      <el-table-column prop="large" label="Diện tích sàn" width="120"></el-table-column>
      <el-table-column prop="register" label="Đăng ký ngày" width="180"></el-table-column>
      <el-table-column prop="update" label="Ngày cập nhật" width="180"></el-table-column>
    </el-table>
    <div class="block_pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[10, 15, 20, 25]"
        :page-size="10"
        layout="sizes, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
    <el-drawer
      title="I am the title"
      :visible.sync="drawer"
      :with-header="false"
      :size="drawer_size"
    >
      <EstateDetail
        :estateId="selected_id"
        :estateItem="selectd_item"
        :key="childKey"
        v-on:cancel-modals="reloadPage"
      />
    </el-drawer>
    <!-- <div
      class="zalo-share-button"
      data-href="https://khobatdongsanviet.demo.fit/"
      data-oaid="4442939145961016330"
      data-layout="3"
      data-color="blue"
      data-customize="false"
    ></div>
    <script src="https://sp.zalo.me/plugins/sdk.js"></script> -->
  </div>
</template>

<script>
import EstateDetail from "@component/Form/EstateDetail";
import { mapState, mapActions } from "vuex";

export default {
  props: ["is_public", "is_sell", "searchKey", "min_price", "max_price"],
  components: {
    EstateDetail,
  },
  data() {
    return {
      drawer: false,
      loading: false,
      rowPerPage: 10,
      page: 1,
      index: 0,
      selected_id: "",
      selectd_item: {},
      purpose: null,
      childKey: 0,
      province_list: [],
      realEstateTable: [],
      houses: [],
      house_type: "",
      projects: "",
      search_address: "",
      districts: "",
      multipleSelection: [],
      currentPage: 1,
      beforeSelectArr: [],
      sort_price: "",
      visible: false,
      drawer_size: window.innerWidth < 600 ? "318px" : "418px",
    };
  },
  created() {
    this.getRealEstateListPerPage();
  },
  computed: {
    ...mapState("realEstate", ["realEstateList", "total", "listProvince"]),
    ...mapState("dictionaries", ["dictionaryList"]),
  },
  mounted() {
    this.getDictionaryList();
    this.listEstateProvince();
  },
  methods: {
    async listEstateProvince() {
      try {
        await this.$store.dispatch("realEstate/listEstateProvince");
        this.province_list = this.listProvince.map((u) => {
          return { text: u.name, value: u.id };
        });
      } catch {}
    },
    formatter(row, column) {
      return row.address;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.$emit("display-select");
    },
    handleSelectedChange() {
      this.realEstateTable = this.multipleSelection;
    },
    removeSelected() {
      this.$refs.multipleTable.clearSelection();
      this.realEstateTable = this.beforeSelectArr;
      this.$emit("display-nonselect");
    },
    filterHandler(value, row, column) {
      console.log("property", value);
      const property = column["property"];
      return row[property] === value;
    },
    filterHandlerChange(value, row, column) {
      console.log("Purpose", value);
      if (value.side?.length == 0 || value.side?.length == 2) {
        this.purpose = null;
        this.getRealEstateListPerPage();
      } else if (value.side) {
        if (value.side[0] == "THUÊ") {
          this.purpose = 1;
          console.log("p", this.purpose);
        } else {
          this.purpose = 0;
        }
        this.getRealEstateListPerPage();
      }
      if (value.home_type?.length == 0) {
        this.house_type = "";
        this.getRealEstateListPerPage();
      } else if (value.home_type && value.home_type.length != 0) {
        this.house_type = value.home_type.join(",");
        this.getRealEstateListPerPage();
      }

      if (value.project && value.project.length == 0) {
        this.projects = "";
        this.getRealEstateListPerPage();
      } else if (value.project && value.project.length != 0) {
        this.projects = value.project[0];
        this.getRealEstateListPerPage();
      }
      if (value.district && value.district.length == 0) {
        this.districts = "";
        this.getRealEstateListPerPage();
      } else if (value.district && value.district.length != 0) {
        this.districts = value.district.join(",");
        this.getRealEstateListPerPage();
      }
      // this.index += 1;
      // if (this.index == 1 && value == "THUÊ") {
      //   this.purpose = 1;
      //   this.getRealEstateListPerPage();
      // } else if (this.index == 1 && value == "BÁN") {
      //   this.purpose = 0;
      //   this.getRealEstateListPerPage();
      // }

      // const property = column["property"];
      // return (this.index = 0);
    },
    searchAddress() {
      this.visible = false;
      this.getRealEstateListPerPage();
    },
    resetAddress() {
      this.visible = false;
      this.search_address = "";
      this.getRealEstateListPerPage();
    },
    sortChangePrice(val) {
      console.log("price", val);
      if (val.column.label == "Giá") {
        this.sort_price =
          val.order == "descending" ? "desc" : val.order == "ascending" ? "asc" : "";
        this.getRealEstateListPerPage();
      }
    },

    handdle(row, event, column) {
      this.drawer = true;
      this.selected_id = row.id;
      this.selectd_item = row;
      this.childKey += 1;
    },
    reloadPage() {
      this.drawer = false;
      this.getRealEstateListPerPage();
    },
    async getDictionaryList() {
      await this.$store.dispatch("dictionaries/getDictionaryList", {
        limit: 10,
        page: 1,
      });
      await this.getDicOptions();
    },
    getDicOptions() {
      const houseList = this.dictionaryList.filter((u, i) => u.id == 2);
      this.houses = houseList[0].dictionaries.map((item) => {
        return {
          value: item.id,
          text: item.name,
        };
      });
    },
    async getRealEstateListPerPage() {
      this.loading = true;
      if (this.is_sell == null && this.is_public == null) {
        try {
          await this.$store.dispatch("realEstate/getRealEstateList", {
            limit: this.rowPerPage,
            page: this.page,
            search: this.searchKey,
            sort_price: this.sort_price,
            min_price: this.min_price,
            max_price: this.max_price,
            purpose: this.purpose == null ? "" : this.purpose,
            house_type: this.house_type,
            projects: this.projects,
            province: this.districts,
            search_address: this.search_address,
          });
          await this.showEstateList();
          this.loading = false;
        } catch {
          this.loading = false;
        }
      } else {
        try {
          await this.$store.dispatch("realEstate/getEstateListIsSell", {
            limit: this.rowPerPage,
            page: this.page,
            is_sell: this.is_sell,
            is_public: this.is_public,
          });
          await this.showEstateList();
          this.loading = false;
        } catch {
          this.loading = false;
        }
      }
    },
    showEstateList() {
      this.realEstateTable = this.realEstateList.map((item, index) => {
        return {
          id: item.id,
          amount: item.id,
          side: item.purpose == 0 ? "BÁN" : "THUÊ",
          price: item.price,
          project: item.project == null ? "Không có" : "Có",
          projectName: item.project?.name,
          address: `${item.street_name} ${item.ward.name}`,
          area: item.province.name,
          district: item.district.name,
          estate_type: item.real_estate_type_dict?.name,
          home_type: item.house_type_dict?.name,
          square: item.length * item.width,
          length: item.length,
          width: item.width,
          s_detail: `${item.length}m x ${item.width}`,
          law: item.ownership_dict?.name,
          floor: item.floor_number,
          direction: item.house_orientation_dict?.name,
          loby: item.directions_dict?.name,
          iron: item.end_open == 0 ? "Không có" : "Có",
          viewer: item.viewed,
          staff: item.staff?.name,
          avatar: item.staff?.image[0]?.main,
          customer: item.customer?.name,
          phone: item.customer?.phone,
          fee: item.brokerage_amount,
          brokerage_amount: item.brokerage_rate,
          bedroom: item.bedroom_number,
          road_type: item.street_type_dict?.name,
          road: item.width_street,
          large: item.land_area,
          register: item.created_at.slice(0, 10),
          update: item.updated_at.slice(0, 10),
          web: item.share_web == 0 ? true : false,
          image_private: item.image_private,
          unit_price: item.unit_price == "ty" ? "tỷ" : "triệu",
          descriptions: item.descriptions,
          share_public: item.share_public,
          share_web: item.share_web,
          is_sell: item.is_sell,
          approve_public: item.approve_public,
          approve_web: item.approve_web,
        };
      });
      this.beforeSelectArr = this.realEstateTable;
    },

    async handleSizeChange(val) {
      this.loading = true;
      if (this.page > 1) {
        return (this.page = 1);
      }
      this.rowPerPage = val;
      await this.getRealEstateListPerPage();
      this.loading = false;
    },
    async handleCurrentChange(val) {
      this.loading = true;
      this.page = val;
      await this.getRealEstateListPerPage();
      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
#real_estate_table {
  #social_network {
    text-transform: capitalize !important;
    padding: 0 8px;
    font-size: 10px;
    font-weight: 300;
    letter-spacing: 0.5px;
    height: 22px;
    background-color: #2db7f5 !important;
    margin-bottom: 4px;
  }
  #web {
    text-transform: capitalize !important;
    padding: 0 8px;
    font-size: 10px;
    font-weight: 300;
    letter-spacing: 0.5px;
    height: 22px;
    background-color: #87d068 !important;
    margin-left: 4px;
  }
  tr:hover {
    background: #ffdf9f41;
  }
}
.direction {
  padding: 0px 6px;
  color: #52c41a !important;
  background: #f6ffed;
  border: 1px solid #52c41a !important;
  border-radius: 5px;
  font-size: 12px;
}
.block_pagination {
  margin-top: 20px;
  text-align: center;
}
.v-application .elevation-1 {
  box-shadow: none !important;
}
</style>
