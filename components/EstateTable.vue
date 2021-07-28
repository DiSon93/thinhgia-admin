<template>
  <div id="real_estate_table" v-loading="loading">
    <el-table
      :data="realEstateTable"
      style="width: 100%"
      ref="multipleTable"
      stripe
      highlight-current-row
      @row-click="handdle"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="35" fixed> </el-table-column>
      <el-table-column prop="amount" label="#" sortable width="60" fixed>
      </el-table-column>
      <el-table-column
        prop="side"
        label="Loại"
        width="80"
        :filters="[
          { text: 'Thuê', value: 'THUÊ' },
          { text: 'Bán', value: 'BÁN' },
        ]"
        :filter-method="filterHandler"
      >
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
        :filters="[
          { text: 'Có', value: 'Có' },
          { text: 'Không có', value: 'Không có' },
        ]"
        :filter-method="filterHandler"
      >
      </el-table-column>
      <el-table-column prop="address" label="Địa chỉ" width="200">
        <!-- <div class="d-flex">
          <v-btn depressed color="primary" id="social_network"> Cộng đồng </v-btn>
          <v-btn depressed color="success" id="web"> Web </v-btn>
        </div> -->
        <template slot-scope="scope">
          <div>{{ scope.row.address }}</div>
          <v-btn
            v-if="scope.row.share_public == 1"
            depressed
            color="primary"
            id="social_network"
          >
            Cộng đồng
          </v-btn>
          <v-btn v-if="scope.row.share_web == 1" depressed color="success" id="web">
            Web
          </v-btn>
        </template>
      </el-table-column>
      <el-table-column
        prop="area"
        label="Khu vực"
        width="180"
        :filters="[
          { text: 'Vũng Tàu', value: 'Vũng Tàu' },
          { text: 'Hồ Chí Minh', value: 'Hồ Chí Minh' },
        ]"
        :filter-method="filterHandler"
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
        :filters="[
          { text: 'Nhà cao tầng', value: 'Nhà cao tầng' },
          { text: 'Nhà câp 2', value: 'Nhà cấp 2' },
          { text: 'Nhà câp 4', value: 'Nhà cấp 4' },
        ]"
        :filter-method="filterHandler"
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
      size="418px"
    >
      <EstateDetail
        :estateId="selected_id"
        :estateItem="selectd_item"
        :key="childKey"
        v-on:cancel-modals="reloadPage"
      />
    </el-drawer>
  </div>
</template>

<script>
import EstateDetail from "@component/Form/EstateDetail";
import { mapState, mapActions } from "vuex";
export default {
  props: ["is_share", "is_sell"],
  components: {
    EstateDetail,
  },
  data() {
    return {
      drawer: false,
      loading: false,
      rowPerPage: 10,
      page: 1,
      selected_id: "",
      selectd_item: {},
      childKey: 0,
      realEstateTable: [],
      multipleSelection: [],
      currentPage: 1,
    };
  },
  created() {
    this.getRealEstateListPerPage();
  },
  computed: {
    ...mapState("realEstate", ["realEstateList", "total"]),
  },
  methods: {
    formatter(row, column) {
      return row.address;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    handdle(row, event, column) {
      console.log(row);
      this.drawer = true;
      this.selected_id = row.id;
      this.selectd_item = row;
      this.childKey += 1;
    },
    reloadPage() {
      this.drawer = false;
      this.getRealEstateListPerPage();
    },
    async getRealEstateListPerPage() {
      this.loading = true;
      if (!this.is_sell == null) {
        try {
          await this.$store.dispatch("realEstate/getRealEstateList", {
            limit: this.rowPerPage,
            page: this.page,
          });
          await this.showEstateList();
          this.loading = false;
        } catch {
          this.loading = false;
        }
      } else if (this.is_sell != null) {
        try {
          await this.$store.dispatch("realEstate/getEstateListIsSell", {
            limit: this.rowPerPage,
            page: this.page,
            is_sell: this.is_sell,
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
          viewer: 12,
          staff: item.staff?.name,
          avatar: item.staff?.image[0]?.main,
          customer: item.customer?.name,
          phone: item.customer?.phone,
          fee: item.brokerage_amount,
          brokerage_amount: item.brokerage_amount,
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
        };
      });
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
