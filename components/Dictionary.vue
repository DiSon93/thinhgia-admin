<template>
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
          <td>{{ row.item.valid }}</td>
          <td>{{ row.item.create_date }}</td>
          <td>{{ row.item.update_date }}</td>
          <td>
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
          create_date: `${item.created_at.slice(0, 10)} ${item.created_at.slice(11, 19)}`,
          update_date: `${item.updated_at.slice(0, 10)} ${item.updated_at.slice(11, 19)}`,
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
</style>
