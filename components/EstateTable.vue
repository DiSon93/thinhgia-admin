<template>
  <div id="real_estate_table">
    <el-table
      :data="tableData"
      style="width: 100%"
      ref="multipleTable"
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
          { text: 'Mua', value: 'MUA' },
          { text: 'Bán', value: 'BÁN' },
        ]"
        :filter-method="filterHandler"
      >
      </el-table-column>
      <el-table-column prop="price" label="Giá" width="80" sortable> </el-table-column>
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
          <v-btn depressed color="primary" id="social_network"> Cộng đồng </v-btn>
          <v-btn v-if="scope.row.web ? true : false" depressed color="success" id="web">
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
      <el-table-column prop="estate_type" label="Loại BĐS" width="140"></el-table-column>
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
          {{ scope.row.square }}
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          amount: 3243,
          side: "BÁN",
          price: "7.5 tỷ",
          project: "Không có",
          address: "75/11 Phạm Hồng Thái",
          area: "Vũng Tàu",
          district: "Phường 7",
          estate_type: "Nhà ở riêng lẻ",
          home_type: "Nhà cao tầng",
          square: "96 m2",
          s_detail: "6.1m x 15.4",
          law: "Sổ hồng",
          floor: 12,
          direction: "Đông Nam",
          loby: "Tây Bắc",
          iron: 12,
          viewer: 12,
          staff: "Cao Thông Nhất",
          customer: "Trình Minh Tuấn",
          fee: 7200,
          bedroom: 3,
          road_type: 12,
          road: 12,
          large: 234,
          register: "12/4/2021 09:12:21",
          update: "8/6/2020 12:09:33",
        },
        {
          id: 2,
          amount: 3456,
          side: "MUA",
          price: "6.5 tỷ",
          project: "Có",
          address: "212 D9 Nguyễn Hữu Cảnh",
          area: "Vũng Tàu",
          district: "Phường Thống Nhất",
          estate_type: "Nhà ở riếng lẻ",
          home_type: "Nhà cấp 4",
          square: "98 m2",
          s_detail: "6.7m x 14.7m",
          law: "No",
          floor: 12,
          direction: "Đông Nam",
          loby: "Đông Bắc",
          iron: 12,
          viewer: 12,
          staff: "Võ Hoàng Yến",
          customer: "Sơn Tùng MTP",
          fee: 90,
          bedroom: 2,
          road_type: 12,
          road: 12,
          large: 634,
          register: "23/4/2021",
          update: "1/6/2020",
          web: true,
        },
        {
          id: 3,
          amount: 3086,
          side: "BÁN",
          price: "10.5 tỷ",
          project: "Không có",
          address: "212 D9 Lê Văn Việt",
          area: "Hồ Chí Minh",
          district: "Phường 6",
          estate_type: "Nhà ở riếng lẻ",
          home_type: "Nhà cấp 2",
          square: "98 m2",
          s_detail: "6.7m x 14.7m",
          law: "Sổ hồng",
          floor: 9,
          direction: "Tây Nam",
          loby: "Đông Bắc",
          iron: 12,
          viewer: 12,
          staff: "Hà Anh Tuấn",
          customer: "Cao Thái Sơn",
          fee: 90,
          bedroom: 2,
          road_type: 12,
          road: 12,
          large: 634,
          register: "23/4/2021",
          update: "1/6/2020",
        },
      ],
      multipleSelection: [],
    };
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
</style>
