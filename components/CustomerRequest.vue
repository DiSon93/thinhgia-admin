<template>
  <div id="contact_customer" v-loading="loading">
    <v-data-table
      :headers="headers"
      :items="customerContactList"
      class="elevation-1"
      :mobile-breakpoint="0"
      :items-per-page="100"
      hide-default-footer
    >
      <template v-slot:item="row">
        <tr>
          <td>{{ row.item.id }}</td>
          <td>
            {{ row.item.contact_type ? row.item.contact_type.title.toUpperCase() : null }}
          </td>
          <td>
            {{ row.item.username }}
          </td>
          <td>
            {{ row.item.address }}
          </td>
          <td>
            {{ row.item.phone }}
          </td>
          <td>
            {{ row.item.email }}
          </td>
          <td>
            {{ row.item.title }}
          </td>
          <td>
            <div class="content" v-html="row.item.content"></div>
            <!-- <a href="javascript:;" class="readMore">Xem thêm</a> -->
          </td>
          <td>
            {{ row.item.file }}
          </td>
          <td>
            {{ row.item.created_at }}
            <div>{{ row.item.created_time }}</div>
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
  </div>
</template>

<script>
import moment from "moment";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      loading: true,
      customerContactList: [],
      toggle_exclusive: [],
      dialog: window.innerWidth < 600 ? "80%" : window.innerWidth < 1200 ? "50%" : "25%",
      currentPage: 1,
      rowPerPage: 10,
      page: 1,
      headers: [
        { text: "#", value: "id", width: "50px", sortable: false },
        {
          text: "Loại liên hệ",
          align: "start",
          sortable: false,
          value: "contact_type",
          width: "200px",
        },
        { text: "Khách hàng", value: "username", sortable: false, width: "150px" },

        { text: "Địa chỉ", value: "address", sortable: false, width: "200px" },
        { text: "SĐT", value: "phone", sortable: false, width: "150px" },

        { text: "Email", value: "email", sortable: false, width: "150px" },
        { text: "Tiêu đề", value: "title", sortable: false, width: "150px" },
        { text: "Nội dung", value: "content", sortable: false, width: "450px" },
        { text: "File", value: "file", sortable: false, width: "150px" },
        { text: "Ngày tạo", value: "created_at", sortable: false, width: "150px" },
      ],
      contacts: [
        { id: 1, name: "a", type: "Thông tin liên lạc" },
        { id: 2, name: "b", type: "Ý kiến" },
        { id: 3, name: "b", type: "Tuyển dụng" },
        { id: 4, name: "b", type: "Ký gửi bất động sản" },
      ],
    };
  },
  mounted() {
    this.getCustomerContactList();
  },
  computed: {
    ...mapState("contact", ["customerContact", "total"]),
  },
  methods: {
    // ...mapActions("contact", ["getCustomerContactList"]),
    async getCustomerContactList() {
      this.loading = true;
      try {
        await this.$store.dispatch("contact/getCustomerContactList", {
          limit: this.rowPerPage,
          page: this.page,
        });
        this.customerContactList = this.customerContact.map((item) => {
          return {
            ...item,
            created_at: moment(item.created_at).format("L"),
            created_time: moment(item.created_at).format("LTS"),
          };
        });
        this.loading = false;
      } catch {}
    },

    editItem() {},
    overview: function () {
      this.isOverview = true;
      this.isResquest = false;
    },
    request: function () {
      this.isOverview = false;
      this.isResquest = true;
    },
    async handleSizeChange(val) {
      this.loading = true;
      if (this.page > 1) {
        return (this.page = 1);
      }
      this.rowPerPage = val;
      await this.getProjectListPerPage();
      this.loading = false;
    },
    async handleCurrentChange(val) {
      this.loading = true;
      this.page = val;
      await this.getProjectListPerPage();
      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
#contact_customer {
  // width: 630px;
  margin: 20px;
  margin-top: 40px;
  tr td:nth-child(8) {
    .content {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      margin: 10px 0;
    }

    // height: 67px;
  }
}
.block_pagination {
  margin-top: 20px;
  text-align: center;
}
</style>
