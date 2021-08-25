<template>
  <div id="admin_table" v-loading="loading || loading2">
    <v-data-table
      :headers="headers"
      :items="users"
      sort-by="calories"
      class="elevation-1"
      :mobile-breakpoint="0"
      :items-per-page="100"
      hide-default-footer
    >
      <template v-slot:item="row">
        <tr>
          <td>{{ row.item.index }}</td>
          <td>
            <div class="d-flex">
              <img v-if="row.item.image" :src="row.item.image" alt="" id="user_img" />
              <img v-else src="@image/icons/user.svg" alt="" id="user_img" />
              <div class="user_detail">
                {{ row.item.name }}
                <div
                  v-if="
                    row.item.position == 'Admin' || row.item.position == 'Super Admin'
                  "
                  class="position"
                >
                  {{ row.item.position }}
                </div>
                <div v-else class="staff">
                  {{ row.item.position }}
                </div>
              </div>
            </div>
          </td>
          <td>{{ row.item.sdt }}</td>
          <td>{{ row.item.email }}</td>
          <td>{{ row.item.birthday }}</td>
          <td>{{ row.item.cmnd }}</td>
          <td>{{ row.item.cmnd_date }}</td>
          <td>{{ row.item.status }}</td>

          <td>
            <el-dropdown @command="handleCommand" trigger="click">
              <span class="el-dropdown-link btn_select" @click="user_info(row.item)">
                Chọn<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="edit">
                  <v-icon>mdi-pen-plus</v-icon> Sửa
                </el-dropdown-item>
                <el-dropdown-item command="delete">
                  <v-icon>mdi-trash-can</v-icon> Xóa
                </el-dropdown-item>
                <el-dropdown-item command="refresh">
                  <v-icon>mdi-account-convert</v-icon> Đặt lại mật khẩu
                </el-dropdown-item>
                <el-dropdown-item command="block">
                  <v-icon>mdi-account-cancel</v-icon>
                  {{ row.item.status == "Khóa" ? "Gỡ khóa" : "Khóa" }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
        </tr>
      </template>
    </v-data-table>
    <div class="block_pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage2"
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
      :width="modal"
      center
      destroy-on-close
    >
      <UpdateUser
        :userId="selectedUser.id"
        v-on:close-modals="centerDialogVisible = false"
        v-on:update-modals="getUserListPerPage()"
        :key="childKey"
      />
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import UpdateUser from "@component/Form/UpdateUser.vue";
export default {
  props: ["select_role"],
  components: {
    UpdateUser,
  },
  data: () => ({
    currentPage2: 1,
    loading2: false,
    dialog: false,
    dialogDelete: false,
    centerDialogVisible: false,
    rowsPerPageItems: 15,
    childKey: 0,
    page: 1,
    rowPerPage: 10,
    role_user: "",
    modal: window.innerWidth < 600 ? "96%" : window.innerWidth < 1200 ? "70%" : "40%",
    headers: [
      {
        text: "#",
        value: "index",
        width: "58px",
        sortable: false,
      },
      {
        text: "NHÂN VIÊN",
        align: "start",
        sortable: false,
        value: "name",
        width: "240px",
      },
      {
        text: "SĐT",
        value: "sdt",
        width: "130px",
        sortable: false,
      },
      {
        text: "EMAIL",
        value: "email",
        width: "140px",
        sortable: false,
      },
      {
        text: "NGÀY SINH",
        value: "birthday",
        width: "120px",
        sortable: false,
      },
      {
        text: "CMND",
        value: "cmnd",
        width: "140px",
        sortable: false,
      },
      {
        text: "NGÀY CẤP CMND",
        value: "cmnd_date",
        width: "160px",
        sortable: false,
      },
      {
        text: "TRẠNG THÁI",
        value: "status",
        sortable: false,
        width: "140px",
      },
      {
        text: "CHỈNH SỬA",
        value: "actions",
        sortable: false,
        width: "100px",
      },
    ],
    users: [],
    selectedUser: {},
  }),

  computed: {
    ...mapState("staffs", ["userList", "loading", "total"]),
    ...mapState("staffs", ["errorMessage"]),
    ...mapState("staffs", ["blockUser", "delete"]),
    ...mapState("auth", ["currentUser"]),
  },
  mounted() {
    this.role_user = this.currentUser ? this.currentUser.results.user.role_id : "";
    this.getUserListPerPage();
  },

  methods: {
    user_info(item) {
      this.selectedUser = item;
      this.childKey += 1;
    },
    async getUserListPerPage() {
      this.$store.commit("staffs/setLoading");
      await this.$store.dispatch("staffs/getUserListPerPage", {
        page: this.page,
        rowPerPage: this.rowPerPage,
        role_id: this.select_role,
      });
      await this.$emit("getTotal", this.total);
      await this.initializeUserList();
      this.$store.commit("staffs/setLoading");
    },
    initializeUserList() {
      this.users = this.userList.map((item, index) => {
        return {
          index: index + 1,
          id: item.id,
          name: item?.name,
          sdt: item.phone,
          email: item.email,
          birthday: item.birth_day,
          cmnd: item.identity_card,
          cmnd_date: item.issued_on,
          status: item.is_block == 0 ? "Đang hoạt động" : "Khóa",
          position: item.role.name,
          image: item.avatar_image?.thumbnail,
          province_id: item.province_id,
          district_id: item.district_id,
          ward_id: item.ward_id,
          gender: item.gender,
        };
      });
    },
    async handleCommand(command) {
      if (this.role_user == 4 || this.role_user == 3) {
        this.forbidden();
        return;
      }
      if (command == "edit") {
        this.updateUser();
      }
      if (command == "delete") {
        this.confirmDeleteUser();
      }
      if (command == "refresh") {
        this.confirmEesetPassword();
      }
      if (command == "block") {
        this.confirmBlock();
      }
    },
    updateUser() {
      this.centerDialogVisible = true;
    },
    confirmDeleteUser() {
      this.$confirm(`Are you sure to delete this user. Continue?`, "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(() => {
          this.loading2 = true;
          this.deleteUserInSystem();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled",
          });
        });
    },
    confirmEesetPassword() {
      this.$confirm(`Are you sure to reset password this user. Continue?`, "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(() => {
          this.$store.commit("staffs/setLoading");
          this.resetPassWordUser();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled",
          });
        });
    },
    confirmBlock() {
      const text = this.selectedUser.status == "Khóa" ? "unblock" : "block";
      this.$confirm(`Are you sure to ${text} this user. Continue?`, "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(() => {
          this.loading2 = true;
          this.blockUserInSystem();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Block canceled",
          });
        });
    },
    async blockUserInSystem() {
      try {
        await this.$store.dispatch("staffs/blockUser", {
          _id: this.selectedUser.id,
          is_block: this.selectedUser.status == "Khóa" ? 0 : 1,
        });
        if (!this.errorMessage) {
          await this.getUserListPerPage();
          setTimeout(this.openNotificationBlock(), 1000);
          this.loading2 = false;
        }
      } catch {
        this.showErrorNotification();
        this.loading2 = false;
      }
    },
    async deleteUserInSystem() {
      try {
        await this.$store.dispatch("staffs/deleteUser", this.selectedUser.id);
        if (!this.errorMessage) {
          await this.getUserListPerPage();
          setTimeout(this.openNotificationDelete(), 1000);
          this.loading2 = false;
        }
      } catch {
        this.showErrorNotification();
        this.loading2 = false;
      }
    },
    async resetPassWordUser() {
      try {
        await this.$store.dispatch("staffs/resetPassword", this.selectedUser.id);
        if (!this.errorMessage) {
          await this.getUserListPerPage();
          setTimeout(this.openNotificationReset(), 1000);
          this.$store.commit("staffs/setLoading");
        }
      } catch {
        this.showErrorNotification();
      }
    },
    forbidden() {
      this.$message.error(
        "403, Forbidden. Can not do this function due to lacking of permission."
      );
    },
    openNotificationBlock() {
      this.$notify({
        title: "Success",
        message:
          this.selectedUser.status == "Khóa"
            ? "Unblock User Successfull"
            : "Block User Successfull",
        type: "success",
      });
    },
    openNotificationDelete() {
      this.$notify({
        title: "Success",
        message: "Delete user successfull!!!",
        type: "success",
      });
    },
    openNotificationReset() {
      this.$notify({
        title: "Success",
        message: "Reset password user successfull!!!",
        type: "success",
      });
    },
    showErrorNotification() {
      let message = this.errorMessage;
      this.$notify.error({
        title: "Error",
        message,
      });
    },

    //PAGINATION

    getItemPerPage(val) {
      this.rowPerPage = val;
      this.getUserListPerPage();
    },

    async handleSizeChange(val) {
      this.loading2 = true;
      if (this.page > 1) {
        return (this.page = 1);
      }
      this.rowPerPage = val;
      await this.getUserListPerPage();
      this.loading2 = false;
    },
    async handleCurrentChange(val) {
      this.loading2 = true;
      this.page = val;
      await this.getUserListPerPage();
      this.loading2 = false;
    },
  },
};
</script>

<style lang="scss" scoped>
#admin_table {
  width: 100vw;

  .user_detail {
    text-align: left;
    margin-left: 10px;
    padding-top: 14px;
    font-size: 14px;
    color: #000;

    .position {
      color: orangered !important;
      margin-top: 3px;
      font-size: 13px;
    }

    .staff {
      color: gray !important;
      margin-top: 3px;
      font-size: 13px;
    }
  }

  #user_img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 10px 0;
  }

  .btn_select {
    text-transform: capitalize;
    font-size: 13px;
    color: red;
  }
}
.block_pagination {
  margin-top: 20px;
  text-align: center;
}
.v-application .elevation-1 {
  box-shadow: none !important;
}
</style>
