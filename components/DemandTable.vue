<template>
  <div id="data-customer">
    <v-data-table
      :headers="headers"
      :items="desserts"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: "#", value: "id", width: "50px" },
        {
          text: "KHÁCH HÀNG",
          align: "start",
          sortable: false,
          value: "customer",
          width: "50px",
        },
        { text: "KHU VỰC", value: "area", width: "160px" },
        { text: "KHOẢNG GIÁ", value: "price", width: "120px" },
        { text: "SỐ LẦU", value: "floor", width: "100px" },
        { text: "SỐ PN", value: "bedroom", width: "180px" },
        { text: "HƯỚNG", value: "direction", width: "280px" },
        { text: "NHÂN VIÊN", value: "staff", width: "100px" },
        { text: "LOẠI BĐS", value: "type_estate" },
        { text: "LOẠI NHÀ", value: "type_house", width: "160px" },
        { text: "DIỆN TÍCH", value: "square", width: "160px" },
        { text: "BĐS PHÙ HỢP", value: "proble", width: "160px" },
      ],
      desserts: [
        {
          id: 3243,
          customer: "Anh An",
          area: "Phường 2, Nguyễn An Ninh, Vũng Tàu",
          price: "1 tỷ - 5 tỷ",
          floor: "4",
          bedroom: "2",
          direction: "Nam",
          staff: "Đào Duy Anh",
          type_estate: "Nhà mặt tiền",
          type_house: "Nhà cấp 4",
          square: "120m2",
          proble: "1BĐS",
        },
        {
          id: 1234,
          customer: "Anh Vân",
          area: "Phường 2, Nguyễn Lý Thông, Vũng Tàu",
          price: "2 tỷ - 9 tỷ",
          floor: "9",
          bedroom: "2",
          direction: "Bắc",
          staff: "Đào Duy Từ",
          type_estate: "Nhà mặt tiền",
          type_house: "Nhà cấp 3",
          square: "178m2",
          proble: "0BĐS",
        },
        {
          id: 3435,
          customer: "Anh Tân",
          area: "Phường 1, Nguyễn Trung Trực, Vũng Tàu",
          price: "4 tỷ - 5 tỷ",
          floor: "7",
          bedroom: "2",
          direction: "Tây",
          staff: "Đào Thiên Lâm",
          type_estate: "Nhà mặt tiền",
          type_house: "Nhà cấp 4",
          square: "120m2",
          proble: "1BĐS",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
