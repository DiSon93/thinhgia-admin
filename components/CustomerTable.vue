<template>
<<<<<<< HEAD
  <div id="data-customer">
    <v-data-table
      :headers="headers"
      :items="desserts"
      :items-per-page="5"
      class="elevation-1"
=======
  <div id="data-customer" v-loading="loading">
    <v-data-table
      :headers="headers"
      :items="customerList"
      :items-per-page="100"
      class="elevation-1"
      :mobile-breakpoint="0"
      hide-default-footer
      fixed-header
      :height="currentUser.results.user.role_id != 2 ? '80vh' : auto"
>>>>>>> main
    >
      <template v-slot:item="row">
        <tr>
          <td>{{ row.item.id }}</td>
<<<<<<< HEAD
          <td>{{ row.item.picture }}</td>
          <td>{{ row.item.name }}</td>
=======
          <td>
            <img
              v-if="row.item.picture"
              :src="row.item.picture"
              alt=""
              id="customer_img"
            />
            <img v-else src="@image/icons/user.svg" alt="" id="customer_img" />
          </td>
          <td>{{ row.item.name }}</td>
          <td>{{ row.item.phone }}</td>
>>>>>>> main
          <td>{{ row.item.birthday }}</td>
          <td>{{ row.item.fax }}</td>
          <td>{{ row.item.email }}</td>
          <td>{{ row.item.address }}</td>
          <td>{{ row.item.cmnd }}</td>
          <td>{{ row.item.note }}</td>
          <td>{{ row.item.staff }}</td>
<<<<<<< HEAD
        </tr>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
=======
          <td>
            <el-button plain id="select_btn" @click="selectThisCustomer(row.item)"
              >Chọn</el-button
            >
          </td>
        </tr>
      </template>
    </v-data-table>
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
    <el-dialog
      title="Update thông tin người dùng"
      :visible.sync="centerDialogVisible"
      :width="dialog"
      center
      destroy-on-close
      id="createCustomers"
    >
      <UpdateCustomer
        :customerDetail="selectedCustomer"
        v-on:close-modals="centerDialogVisible = false"
        v-on:update-modals="getCustomerListPerPage()"
        :key="childKey"
      />
    </el-dialog>
>>>>>>> main
  </div>
</template>

<script>
<<<<<<< HEAD
export default {
  data() {
    return {
      headers: [
        { text: "#", value: "id", width: "50px" },
=======
import { mapState, mapActions } from "vuex";
import UpdateCustomer from "@component/Form/UpdateCustomer";
export default {
  props: ["searchKey"],
  components: {
    UpdateCustomer,
  },
  data() {
    return {
      loading: false,
      rowPerPage: 10,
      page: 1,
      currentPage: 1,
      search: "",
      selectedCustomer: {},
      centerDialogVisible: false,
      childKey: 0,
      dialog: window.innerWidth < 600 ? "96%" : window.innerWidth < 1200 ? "70%" : "40%",
      headers: [
        { text: "#", value: "id", sortable: false, width: "58px" },
>>>>>>> main
        {
          text: "Ảnh",
          align: "start",
          sortable: false,
          value: "picture",
          width: "50px",
        },
<<<<<<< HEAD
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
=======
        { text: "Tên", value: "name", sortable: false, width: "160px" },
        { text: "Số điện thoại", value: "phone", sortable: false, width: "160px" },
        { text: "Ngày sinh", value: "birthday", sortable: false, width: "120px" },
        { text: "Fax", value: "fax", sortable: false, width: "100px" },
        { text: "Email", value: "email", sortable: false, width: "180px" },
        { text: "Địa chỉ", value: "address", sortable: false, width: "200px" },
        { text: "CMND", value: "cmnd", sortable: false, width: "100px" },
        { text: "Ghi chú", value: "note", sortable: false, width: "180px" },
        { text: "Nhân viên", value: "staff", sortable: false, width: "160px" },
        { text: "Cập nhật", value: "action", sortable: false, width: "160px" },
      ],
      customerList: [],
    };
  },
  created() {
    this.getCustomerListPerPage();
  },
  computed: {
    ...mapState("customers", ["customers", "total"]),
    ...mapState("auth", ["currentUser"]),
  },
  methods: {
    async getCustomerListPerPage() {
      this.loading = true;
      if (this.currentUser.results.user.role_id === 2) {
        this.loading = false;
        return;
      }
      try {
        await this.$store.dispatch("customers/getCustomerListPerPage", {
          limit: this.rowPerPage,
          page: this.page,
          search: this.searchKey,
        });
        await this.showCustomerList();
        this.loading = false;
      } catch {
        this.loading = false;
      }
    },
    showCustomerList() {
      this.customerList = this.customers.map((item, index) => {
        return {
          id: item.id,
          picture: item.avatar_image?.thumbnail,
          name: item.name,
          phone: item.phone,
          birthday: item.birth_day,
          fax: item.fax,
          email: item.email,
          address: item.address,
          cmnd: item.identity_card,
          note: item.note,
          staff: item.user?.name,
          user_id: item.user_id,
          avatar: item.avatar,
          gender: item.gender,
          province_id: item.province_id,
          district_id: item.district_id,
          ward_id: item.ward_id,
        };
      });
    },
    selectThisCustomer(e) {
      this.selectedCustomer = e;
      this.centerDialogVisible = true;
      this.childKey += 1;
    },
    async handleSizeChange(val) {
      this.loading = true;
      if (this.page > 1) {
        return (this.page = 1);
      }
      this.rowPerPage = val;
      await this.getCustomerListPerPage();
      this.loading = false;
    },
    async handleCurrentChange(val) {
      this.loading = true;
      this.page = val;
      await this.getCustomerListPerPage();
      this.loading = false;
    },
  },
>>>>>>> main
};
</script>

<style lang="scss" scoped>
#data-customer {
  width: 100vw;
}
<<<<<<< HEAD
=======
#customer_img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 10px 0;
}
#select_btn.el-button {
  border: none;
  font-size: 13px;
  color: red;
  padding: 8px 10px;
}
.block_pagination {
  margin-top: 20px;
  text-align: center;
}
.v-application .elevation-1 {
  box-shadow: none !important;
}
>>>>>>> main
</style>
