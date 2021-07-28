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
    headers: [
      { text: "#", value: "index", width: "58px" },
      {
        text: "GIÁ TRỊ",
        align: "start",
        sortable: false,
        value: "valid",
        width: "240px",
      },
      { text: "NGÀY TẠO", value: "create_date", sortable: false, width: "130px" },
      { text: "NGÀY CẬP NHẬT", value: "update_date", sortable: false, width: "140px" },
      ,
      { text: "SỬA/XÓA", value: "actions", sortable: false, width: "100px" },
    ],
    dictionaries: [],
  }),

  computed: {
    ...mapState("dictionaries", ["dictionaryList"]),
  },

  mounted() {
    this.initializeDicList();
  },

  methods: {
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
          create_date: item.created_at,
          update_date: item.updated_at,
          id: item.id,
          dictionary_type_id: item.dictionary_type_id,
        };
      });
      this.loading = false;
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
</style>
