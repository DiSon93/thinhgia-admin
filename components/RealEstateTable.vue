<template>
  <div id="estate_table">
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="desserts"
      item-key="amount"
      show-select
      :mobile-breakpoint="0"
      class="elevation-1"
    >
      <template v-slot:item="row">
        <tr>
          <td>
            <!-- v-model="selected" -->
            <!-- :value="row.item" -->
            <!-- hide-details -->
            <!-- style="margin: 0px; padding: 0px" -->
            <v-checkbox
              v-model="row.item.selected"
              hide-details
              style="margin: 0px; padding: 0px"
            ></v-checkbox>
          </td>
          <td>{{ row.item.amount }}</td>
          <td>{{ row.item.side }}</td>
          <td>{{ row.item.price }}</td>
          <td>
            {{ row.item.project }}
          </td>
          <td>
            {{ row.item.address }}

            <div class="d-flex">
              <v-btn depressed color="primary" id="social_network"> Cộng đồng </v-btn>
              <v-btn
                v-if="row.item.web ? true : false"
                depressed
                color="success"
                id="web"
              >
                Web
              </v-btn>
            </div>
          </td>
          <td>
            {{ row.item.area }}
            <div class="district">{{ row.item.district }}</div>
          </td>
          <td>{{ row.item.estate_type }}</td>
          <td>{{ row.item.home_type }}</td>
          <td>
            {{ row.item.square }}
            <div class="s_detail">{{ row.item.s_detail }}</div>
          </td>
          <td>{{ row.item.law }}</td>
          <td>{{ row.item.floor }}</td>
          <td>
            <button class="direction" disabled>{{ row.item.direction }}</button>
          </td>
          <td>{{ row.item.loby }}</td>
          <td>{{ row.item.iron }}</td>
          <td>{{ row.item.viewer }}</td>
          <td>{{ row.item.staff }}</td>
          <td>{{ row.item.customer }}</td>
          <td>{{ row.item.fee }}</td>
          <td>{{ row.item.bedroom }}</td>
          <td>{{ row.item.road_type }}</td>
          <td>{{ row.item.road }}</td>
          <td>{{ row.item.large }}</td>
          <td>{{ row.item.register }}</td>
          <td>{{ row.item.update }}</td>
        </tr>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  data: () => ({
    cb: {},
    fullscreenLoading: true,
    singleSelect: false,
    selected: [],
    checkbox: true,
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "#", value: "amount", width: "50px", fixed: true },
      {
        text: "Loại",
        align: "start",
        sortable: false,
        value: "side",
        width: "50px",
      },
      { text: "Giá", value: "price", width: "80px", fixed: true },
      { text: "Dự án", value: "project", width: "100px" },
      { text: "Địa chỉ", value: "address", width: "180px" },
      { text: "Khu vực", value: "area", width: "180px" },
      { text: "Loại BĐS", value: "estate_type", width: "140px" },
      { text: "Loại nhà", value: "home_type", width: "140px" },
      { text: "Diện tích", value: "square", width: "140px" },
      { text: "Pháp lý", value: "law", width: "120px" },
      { text: "Số lầu", value: "floor", width: "100px" },
      { text: "Hướng", value: "direction", width: "140px" },
      { text: "Hướng ban công", value: "loby", width: "140px" },
      { text: "Nở hậu", value: "iron", width: "100px" },
      { text: "Lượt xem", value: "viewer", width: "120px" },
      { text: "Nhân viên", value: "staff", width: "140px" },
      { text: "Khách hàng", value: "customer", width: "140px" },
      { text: "Phí môi giới", value: "fee", width: "120px" },
      { text: "Số phòng ngủ", value: "bedroom", width: "140px" },
      { text: "Loại đường", value: "road_type", width: "120px" },
      { text: "Đường rộng (m)", value: "road", width: "140px" },
      { text: "Diện tích sàn", value: "large", width: "120px" },
      { text: "Đăng ký ngày", value: "register", width: "150px" },
      { text: "Ngày cập nhật", value: "update", width: "150px" },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    checked() {
      return Object.entries(this.cb)
        .filter((o) => o[1])
        .map((o) => o[0]);
    },
    checkedAll() {
      console.log("checkedAll");
    },
    headers2() {
      return [{ text: "", fixed: true, width: "100px", sortable: false }].concat(
        this.headers
      );
    },
  },

  mounted() {
    this.fullscreenLoading = false;
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.desserts = [
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
          side: "BÁN",
          price: "6.5 tỷ",
          project: "Không có",
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
          area: "Vũng Tàu",
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
      ];
    },
  },
};
</script>
<style lang="scss" scoped>
#estate_table {
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
  padding: 4px 6px;
  color: #52c41a !important;
  background: #f6ffed;
  border: 1px solid #52c41a !important;
  border-radius: 5px;
  font-size: 12px;
}
</style>
