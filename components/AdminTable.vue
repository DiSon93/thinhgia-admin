<template>
<<<<<<< HEAD
  <div id="admin_table">
    <v-data-table
      :headers="headers"
      :items="desserts"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>My CRUD</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                New Item
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.id"
                        label="Dessert name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.customer"
                        label="Calories"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.area"
                        label="Fat (g)"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.price" label="Carbs (g)">
                        <button type="">Thêm giá</button>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.floor"
                        label="Protein (g)"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <!-- <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template> -->
      <template v-slot:item="row">
        <tr>
          <td>{{ row.item.id }}</td>
          <td>
            <div class="d-flex">
              <img :src="row.item.image" alt="" id="user_img" />
              <div class="user_detail">
                {{ row.item.name }}
                <div v-if="row.item.position == 'Admin'" class="position">
=======
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
>>>>>>> main
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
<<<<<<< HEAD
            <v-btn text color="error" class="btn_select"> Chọn </v-btn>
          </td>
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
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "#", value: "id", width: "58px" },
=======
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
>>>>>>> main
      {
        text: "NHÂN VIÊN",
        align: "start",
        sortable: false,
        value: "name",
        width: "240px",
      },
<<<<<<< HEAD
      { text: "SĐT", value: "sdt", width: "130px" },
      { text: "EMAIL", value: "email", width: "140px" },
      { text: "NGÀY SINH", value: "birthday", width: "140px" },
      { text: "CMND", value: "cmnd", width: "140px" },
      { text: "NGÀY CẤP CMND", value: "cmnd_date", width: "160px" },
      { text: "TRẠNG THÁI", value: "status", sortable: false, width: "140px" },
      { text: "CHỈNH SỬA", value: "actions", sortable: false, width: "100px" },
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
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          id: 23,
          name: "Nguyễn Văn Linh",
          sdt: "09123124",
          email: "linh123@gmail.com",
          birthday: "16/12/2020",
          cmnd: "13123214",
          cmnd_date: "21/5/2021",
          status: "Đang hoạt động",
          position: "Admin",
          image: require("@/assets/images/layouts/house2.png"),
        },
        {
          id: 45,
          name: "Nguyễn Tiến Mạnh",
          sdt: "0124235423",
          email: "manh23124@gmail.com",
          birthday: "02/12/1991",
          cmnd: "2424325",
          cmnd_date: "11/5/2021",
          status: "Đang hoạt động",
          position: "Techical",
          image: require("@/assets/images/layouts/house3.png"),
        },
        {
          id: 87,
          name: "Đinh Thị Phượng Hằng",
          sdt: "012435346",
          email: "son38124@gmail.com",
          birthday: "22/09/1993",
          cmnd: "1324325",
          cmnd_date: "11/5/2021",
          status: "Đang hoạt động",
          position: "Sale",
          image: require("@/assets/images/layouts/house4.png"),
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
=======
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
>>>>>>> main
    },
  },
};
</script>
<<<<<<< HEAD
<style lang="scss" scoped>
#admin_table {
  width: 100vw;
=======

<style lang="scss" scoped>
#admin_table {
  width: 100vw;

>>>>>>> main
  .user_detail {
    text-align: left;
    margin-left: 10px;
    padding-top: 14px;
    font-size: 14px;
    color: #000;
<<<<<<< HEAD
=======

>>>>>>> main
    .position {
      color: orangered !important;
      margin-top: 3px;
      font-size: 13px;
    }
<<<<<<< HEAD
=======

>>>>>>> main
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
<<<<<<< HEAD
  .btn_select {
    text-transform: capitalize;
    font-size: 13px;
  }
}
=======

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
>>>>>>> main
</style>
