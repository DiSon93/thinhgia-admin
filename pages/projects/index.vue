<template>
  <v-lazy
    v-model="isActive"
    :options="{
      threshold: 0.5,
    }"
    min-height="200"
    transition="fade-transition"
  >
    <div class="header_box">
      <v-row align="center" d-flex>
<<<<<<< HEAD
        <v-col cols="4" class="app_bar">
          <button class="homepage" disabled>Dự án</button>
          <v-btn depressed color="primary" id="social_network"> 16 </v-btn>
        </v-col>
        <v-col cols="4" align="center" class="app_bar"> 1 / 1 </v-col>
        <v-col cols="4" class="app_bar">
          <div class="option_button">
            <v-btn class="mx-2 add_btn" fab dark small color="warning">
              <v-icon dark small> mdi-plus </v-icon>
            </v-btn>
            <v-btn class="account" fab><v-icon dark small>mdi-account</v-icon></v-btn>
=======
        <v-col cols="8" sm="4" class="app_bar">
          <button class="homepage" disabled>Dự án</button>
          <v-btn depressed color="primary" id="social_network"> {{ total }} </v-btn>
        </v-col>
        <v-col cols="4" sm="4" align="center" class="app_bar"> 1 / 1 </v-col>
        <v-col cols="12" sm="4" class="app_bar">
          <div class="option_button">
            <v-btn
              class="mx-2 add_btn"
              fab
              dark
              small
              color="warning"
              @click="$router.push('/form/projects')"
            >
              <v-icon dark small> mdi-plus </v-icon>
            </v-btn>
            <v-btn class="account" fab
              ><v-icon dark small @click="centerDialogVisible02 = true"
                >mdi-account</v-icon
              ></v-btn
            >
>>>>>>> main
          </div>
        </v-col>
      </v-row>
      <v-row class="data_table">
        <ProjectTable />
      </v-row>
<<<<<<< HEAD
=======
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
>>>>>>> main
    </div>
  </v-lazy>
</template>

<script>
<<<<<<< HEAD
import ProjectTable from "@component/ProjectTable";
export default {
  components: {
    ProjectTable,
=======
import { mapState } from "vuex";
import ProjectTable from "@component/ProjectTable";
import UserDetail from "@component/Form/UserDetail";
import ChangePassword from "@component/Form/ChangePassword";

export default {
  components: {
    ProjectTable,
    UserDetail,
    ChangePassword,
>>>>>>> main
  },
  data() {
    return {
      isActive: false,
<<<<<<< HEAD
    };
  },
=======
      centerDialogVisible02: false,
      centerDialogVisible03: false,
      dialog: window.innerWidth < 600 ? "80%" : window.innerWidth < 1200 ? "50%" : "25%",
    };
  },
  computed: {
    ...mapState("projects", ["total"]),
  },
  methods: {
    handleChangePassword() {
      this.centerDialogVisible03 = true;
      setTimeout(() => {
        this.centerDialogVisible02 = false;
      }, 100);
    },
  },
>>>>>>> main
};
</script>

<style lang="scss" scoped>
.header_box {
  left: 208px !important;
  background: #eff5f9 !important;
  margin-top: 20px !important;
  #social_network {
    width: 25px !important;
    height: 15px;
    background: #2db7f5;
    border: 1px solid rgba(96, 96, 96, 0.2);
    border-radius: 15px;
    font-weight: 400;
    font-size: 11px;
    letter-spacing: 0.5px;
    margin-left: 8px;
  }
  .homepage {
    width: 90px;
    height: 25px !important;
    margin-left: 30px;
    background: #ffffff;
    border: 1px solid rgba(96, 96, 96, 0.2);
    border-radius: 15px;
    font-size: 12px;
    letter-spacing: 0.5px;
    color: #606060;
  }

  .option_button {
    text-align: right;
    margin-right: 30px;
    .add_btn {
      width: 24px;
      height: 24px;
      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.15);
    }
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
.app_bar {
  padding: 0;
  font-size: 13px;
}
.data_table {
  margin-top: 60px;
  padding: 0 30px;
}
@media screen and (min-width: 1265px) {
  .header_box {
    margin-top: -50px !important;
  }
}
<<<<<<< HEAD
=======
@media screen and (max-width: 600px) {
  .data_table {
    padding: 0px 15px 80px;
    margin-top: 40px;
  }
  .homepage {
    margin-left: 15px !important;
  }
  .option_button {
    margin-top: 20px;
  }
}
>>>>>>> main
</style>
