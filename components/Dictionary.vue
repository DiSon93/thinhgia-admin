<template>
<<<<<<< HEAD
  <div id="dictionary_table">
    <!-- <v-card> -->
    <v-data-table
      :headers="headers"
      :items="desserts"
      sort-by="calories"
      class="elevation-1"
      width="100vw"
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
=======
  <div id="dictionary_table" v-loading="loading">
    <!-- <v-card> -->
    <v-data-table
      :headers="headers"
      :items="dictionaries"
      sort-by="calories"
      class="elevation-1"
      width="100vw"
      :mobile-breakpoint="0"
    >
      <template v-slot:header.valid="{ header }">
        {{ header.text }}
        <v-menu offset-y :close-on-content-click="false">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon small :color="dessertName ? 'primary' : ''"> mdi-filter </v-icon>
            </v-btn>
          </template>
          <div style="background-color: white; width: 280px">
            <v-text-field
              v-model="dessertName"
              class="pa-4"
              type="text"
              label="Enter the search term"
              @change="filterDessertName()"
            ></v-text-field>
            <v-btn @click="clearText" small text class="ml-2 mb-2 btn_search"
              >Clean</v-btn
            >
            <v-btn
              @click="filterDessertName"
              color="primary"
              small
              text
              class="ml-2 mb-2 btn_search"
              >Search</v-btn
            >
          </div>
        </v-menu>
      </template>
      <template v-slot:item="row">
        <tr>
          <td>{{ row.item.index }}</td>
>>>>>>> main
          <td>{{ row.item.valid }}</td>
          <td>{{ row.item.create_date }}</td>
          <td>{{ row.item.update_date }}</td>
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
    <!-- </v-card> -->
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
              <el-button
                type="danger"
                plain
                class="el-dropdown-link btn_select"
                @click="user_info(row.item)"
                :disabled="role_user == 4"
              >
                Chọn
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="edit">
                  <v-icon>mdi-pen-plus</v-icon> Sửa
                </el-dropdown-item>
                <el-dropdown-item command="delete">
                  <v-icon>mdi-trash-can</v-icon> Xóa
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
        </tr>
      </template>
    </v-data-table>
    <!-- </v-card> -->
    <el-dialog :visible.sync="dialogVisible" width="30%" destroy-on-close>
      <UpdateDictionaries
        :key="keyChild"
        :select_dic="selectedItem"
        v-on:close-modals="dialogVisible = false"
        v-on:close-update-modals="reloadDic"
      />
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
import UpdateDictionaries from "@component/Form/UpdateDictionaries";
import moment from "moment";

export default {
  props: ["select_dic"],
  components: {
    UpdateDictionaries,
  },
  data: () => ({
    dialog: false,
    loading: false,
    dialogDelete: false,
    keyChild: 1,
    selectedDictionary: "",
    dialogVisible: false,
    selectedItem: {},
    dessertName: "",
    firstDic: [],
    role_user: "",
    headers: [
      { text: "#", value: "index", width: "58px" },
>>>>>>> main
      {
        text: "GIÁ TRỊ",
        align: "start",
        sortable: false,
        value: "valid",
        width: "240px",
      },
      { text: "NGÀY TẠO", value: "create_date", width: "130px" },
      { text: "NGÀY CẬP NHẬT", value: "update_date", width: "140px" },
      ,
      { text: "SỬA/XÓA", value: "actions", sortable: false, width: "100px" },
    ],
<<<<<<< HEAD
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
          valid: "Căn hộ- Chung cư",
          create_date: "10/09/2021",
          update_date: "02/01/2022",
        },
        {
          id: 13,
          valid: "Nhà ở riêng lẻ",
          create_date: "12/01/2020",
          update_date: "29/01/2022",
        },
        {
          id: 87,
          valid: "Nhà mặt tiền",
          create_date: "24/08/2020",
          update_date: "29/09/2022",
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
    dictionaries: [],
  }),

  computed: {
    ...mapState("dictionaries", ["dictionaryList"]),
    ...mapState("auth", ["currentUser"]),
  },

  mounted() {
    this.role_user = this.currentUser ? this.currentUser.results.user.role_id : "";
    this.initializeDicList();
  },

  methods: {
    clearText() {
      this.dessertName = "";
      this.filterDessertName();
    },
    filterDessertName() {
      // return item.name.toLowerCase().includes(this.dessertName.toLowerCase());
      if (this.dessertName == "") {
        return (this.dictionaries = this.firstDic);
      }
      let content = [];
      this.dessertName = this.dessertName.toLowerCase();
      this.firstDic.map((item, index) => {
        var tenChuThuong = item.valid.toLowerCase();
        if (tenChuThuong.indexOf(this.dessertName) > -1) {
          //tìm thấy từ khóa trong tên nhân viên (tenChuThuong)
          //thêm nhân viên tìm thấy vào mảng kết quả
          content.push(item);
        }
      });
      return (this.dictionaries = content);
    },
    user_info(item) {
      this.selectedItem = item;
    },
    reloadDic() {
      this.loading = true;
      this.$emit("close-update");
      this.dialogVisible = false;
    },
    initializeDicList() {
      this.loading = true;
      if (!this.select_dic) {
        this.selectedDictionary = this.dictionaryList[0];
      } else {
        this.selectedDictionary = this.select_dic;
      }
      this.dictionaries = this.selectedDictionary.dictionaries?.map((item, index) => {
        return {
          index: index + 1,
          valid: item.name,
          create_date: `${moment(item.created_at).format("L")} ${moment(
            item.created_at
          ).format("LTS")}`,
          update_date: `${moment(item.updated_at).format("L")} ${moment(
            item.updated_at
          ).format("LTS")}`,
          id: item.id,
          dictionary_type_id: item.dictionary_type_id,
        };
      });
      this.loading = false;
      this.firstDic = this.dictionaries;
    },
    async handleCommand(command) {
      if (command == "edit") {
        this.keyChild += 1;
        this.dialogVisible = true;
      }
      if (command == "delete") {
        this.confirmDeleteDictionary();
      }
    },

    confirmDeleteDictionary() {
      this.$confirm(`Are you sure to delete this dictionary. Continue?`, "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(() => {
          this.loading = true;
          this.deleteDictionaryInSystem();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled",
          });
        });
    },
    async deleteDictionaryInSystem() {
      try {
        await this.$store.dispatch(
          "dictionaries/deleteDictionaries",
          this.selectedItem.id
        );
        // if (!this.errorMessage) {
        this.$emit("close-update");
        setTimeout(this.openNotificationDelete(), 1000);
        this.loading = false;
        // }
      } catch {
        this.showErrorNotification();
        this.loading = false;
      }
    },

    openNotificationDelete() {
      this.$notify({
        title: "Success",
        message: "Delete dictionary successfull!!!",
        type: "success",
      });
    },
    showErrorNotification() {
      this.$notify.error({
        title: "Error",
        message: "Unsuccess require!!!",
      });
>>>>>>> main
    },
  },
};
</script>
<style lang="scss" scoped>
#dictionary_table {
  width: 100vw;
  .user_detail {
    text-align: left;
    margin-left: 10px;
    padding-top: 14px;
    font-size: 14px;
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
<<<<<<< HEAD
  .btn_select {
    text-transform: capitalize;
    font-size: 13px;
  }
}
=======
  .btn_select.el-button {
    text-transform: capitalize;
    font-size: 13px;
    // color: red;
    font-weight: 500;
    padding: 8px 10px;
    border: none;
  }
}
.v-btn.btn_search {
  margin-top: -20px;
}
>>>>>>> main
</style>
