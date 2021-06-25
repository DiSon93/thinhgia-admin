<template>
  <div id="data-customer">
    <v-data-table
      :headers="headers"
      :items="desserts"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:item="row">
        <tr>
          <td>{{ row.item.id }}</td>
          <td>{{ row.item.picture }}</td>
          <td>{{ row.item.name }}</td>
          <td>{{ row.item.birthday }}</td>
          <td>{{ row.item.fax }}</td>
          <td>{{ row.item.email }}</td>
          <td>{{ row.item.address }}</td>
          <td>{{ row.item.cmnd }}</td>
          <td>{{ row.item.note }}</td>
          <td>{{ row.item.staff }}</td>
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
  data() {
    return {
      headers: [
        { text: "#", value: "id", width: "50px" },
        {
          text: "Ảnh",
          align: "start",
          sortable: false,
          value: "picture",
          width: "50px",
        },
        { text: "Tên", value: "name", width: "160px" },
        { text: "Ngày sinh", value: "birthday", width: "120px" },
        { text: "Fax", value: "fax", width: "100px" },
        { text: "Email", value: "email", width: "180px" },
        { text: "Địa chỉ", value: "address", width: "280px" },
        { text: "CMND", value: "cmnd", width: "100px" },
        { text: "Ghi chú", value: "note", width: "100px" },
        { text: "Nhân viên", value: "staff", width: "160px" },
      ],
      desserts: [
        {
          id: 3243,
          picture: "",
          name: "Minh Trung",
          birthday: "12/5/2021",
          fax: "",
          email: "minhtrung@gmail.com",
          address: "123, Nguyễn Thiện Thuật, phường 3",
          cmnd: "96764653",
          note: "Sổ hồng",
          staff: "Lê Văn Tâm",
        },
        {
          id: 3230,
          picture: "",
          name: "Anh Dũng",
          birthday: "17/9/1994",
          address: "75/11 Phạm Hồng Thái",
          fax: "",
          email: "anhdung123@gmail.com",
          cmnd: "087986465",
          note: "Sổ hồng",
          staff: "Mai Thị Trúc",
        },
        {
          id: 7138,
          picture: "",
          name: "Cường Đặng",
          birthday: "17/11/1989",
          address: "23/34 Lê Thánh Tôn, quận 1",
          fax: "",
          email: "cuongdang2344@gmail.com",
          cmnd: "0097489325",
          note: "Sổ hồng",
          staff: "Văn Mai Hương",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
#data-customer {
  width: 100vw;
}
</style>
