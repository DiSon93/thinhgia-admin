<template>
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
    >
      <template v-slot:item="row">
        <tr>
          <td>{{ row.item.id }}</td>
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
          <td>{{ row.item.birthday }}</td>
          <td>{{ row.item.fax }}</td>
          <td>{{ row.item.email }}</td>
          <td>{{ row.item.address }}</td>
          <td>{{ row.item.cmnd }}</td>
          <td>{{ row.item.note }}</td>
          <td>{{ row.item.staff }}</td>
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
  </div>
</template>

<script>
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
        {
          text: "Ảnh",
          align: "start",
          sortable: false,
          value: "picture",
          width: "50px",
        },
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
};
</script>

<style lang="scss" scoped>
#data-customer {
  width: 100vw;
}
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
</style>
