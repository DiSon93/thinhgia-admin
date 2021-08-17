<template>
  <div class="contact">
    <div class="header_box d-flex">
      <v-row align="center" d-flex>
        <button class="homepage" disabled>Liên hệ</button>
        <div class="option_button">
          <v-btn class="account" fab @click="centerDialogVisible02 = true"
            ><v-icon dark small>mdi-account</v-icon></v-btn
          >
        </div>
      </v-row>
    </div>
    <div id="contact" v-loading="loading">
      <v-data-table
        :headers="headers"
        :items="contacts"
        class="elevation-1"
        :mobile-breakpoint="0"
        :items-per-page="100"
        hide-default-footer
      >
        <template v-slot:item="row">
          <tr>
            <td>{{ row.item.id }}</td>
            <td>{{ row.item.name.toUpperCase() }}</td>
            <td>
              {{ row.item.type }}
            </td>
            <td>
              <v-icon small class="mr-2" @click="editItem(row.item)"> mdi-pencil </v-icon>
            </td>
          </tr>
        </template>
      </v-data-table>
    </div>
    <el-dialog
      :visible.sync="centerDialogVisible02"
      :width="dialog"
      center
      id="user_detail_dialog"
    >
      <UserDetail v-on:close-modals="handleChangePassword" />
    </el-dialog>
    <el-dialog
      :visible.sync="centerDialogVisible03"
      :width="dialog"
      center
      id="user_changePass_dialog"
      title="Đổi mật khẩu"
      destroy-on-close
    >
      <ChangePassword v-on:close-modals="centerDialogVisible03 = false" />
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import UserDetail from "@component/Form/UserDetail";
import ChangePassword from "@component/Form/ChangePassword";
export default {
  components: {
    UserDetail,
    ChangePassword,
  },
  data() {
    return {
      loading: false,
      centerDialogVisible02: false,
      centerDialogVisible03: false,
      dialog: window.innerWidth < 600 ? "80%" : window.innerWidth < 1200 ? "50%" : "25%",
      headers: [
        { text: "#", value: "id", width: "50px", sortable: false },
        {
          text: "Tiêu đề",
          align: "start",
          sortable: false,
          value: "name",
          width: "150px",
        },
        { text: "Loại liên hệ", value: "type", sortable: false, width: "250px" },
        { text: "Chỉnh sửa", value: "actions", sortable: false, width: "100px" },
      ],
      contacts: [
        { id: 1, name: "a", type: "Thông tin liên lạc" },
        { id: 2, name: "b", type: "Ý kiến" },
        { id: 3, name: "b", type: "Tuyển dụng" },
        { id: 4, name: "b", type: "Ký gửi bất động sản" },
      ],
    };
  },
  methods: {
    editItem() {},
    handleChangePassword() {
      this.centerDialogVisible03 = true;
      setTimeout(() => {
        this.centerDialogVisible02 = false;
      }, 100);
    },
  },
};
</script>

<style lang="scss" scoped>
#contact {
  width: 630px;
  margin: 0 auto;
}
.header_box {
  left: 208px !important;
  background: #eff5f9 !important;
  margin: 20px 0 40px !important;
  padding-top: 10px;
  .homepage {
    width: 100px;
    height: 25px !important;
    margin-left: 30px;
    // margin-top: 55px;
    background: #ffffff;
    border: 1px solid rgba(96, 96, 96, 0.2);
    border-radius: 15px;
    font-size: 12px;
    letter-spacing: 0.5px;
    color: #606060;
  }
  .option_button {
    position: absolute;
    right: 30px;
    .account {
      margin-left: 2px;
      padding: 0;
      width: 24px !important;
      height: 24px !important;
      border-radius: 50%;
      background-color: #fff !important;
      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.15);
      &:hover {
        border: 1px solid blue;
        transition: 0.5s;
      }
    }
  }
}
@media screen and (min-width: 1265px) {
  .header_box {
    margin-top: -50px !important;
  }
}
@media screen and (max-width: 600px) {
  .data_table {
    padding: 30px 15px 80px;
  }
  .user_noti {
    span {
      font-size: 11px !important;
    }
  }
  .header_box {
    .option_button {
      width: 30px;
      top: 30px;
      right: 30px;
    }
    .homepage {
      position: fixed;
      top: 30px;
      left: 5px;
    }
  }
}
</style>
