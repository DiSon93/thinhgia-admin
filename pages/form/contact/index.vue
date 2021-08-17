<template>
  <div class="form_contact">
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
    <div class="form" v-loading="loading">
      <div class="label">Tiêu đề <span style="color: red">*</span></div>
      <el-input v-model="title"></el-input>
      <!-- <p class="error_message" v-if="errorMessage">
        {{ errorMessage.title ? errorMessage.title[0] : null }}
      </p> -->

      <div class="label">Nội dung <span style="color: red">*</span></div>
      <editor
        api-key="onivchqt2jlmk6u6jubfmjfzk2s33x828b1yq198t8fiv9aq"
        v-model="content"
        :init="{
          menubar: true,
          selector: 'textarea#local-upload',
          resize: true,
          fontsize_formats:
            '8pt 9pt 10pt 11pt 12pt 14pt 18pt 24pt 30pt 36pt 48pt 60pt 72pt 96pt',
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            ' autoresize',
            'insertdatetime media table paste code help wordcount',
          ],
          toolbar:
            'undo redo | formatselect | forecolor   | fontsizeselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | insertfile link image |  code | \
           bullist numlist outdent indent | removeformat | help',
          images_upload_url: 'postAcceptor.php',
          automatic_uploads: false,
          images_reuse_filename: true,
          file_picker_types: 'image',
          images_file_types: 'jpg,svg,webp,png,gif',
        }"
      />

      <div class="label">Chọn liên hệ <span style="color: red">*</span></div>
      <el-select v-model="contactType" placeholder="Chọn liên hệ">
        <el-option
          v-for="item in blogs"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <!-- <p class="error_message" v-if="errorMessage">
        {{ errorMessage.blog_type_id ? errorMessage.blog_type_id[0] : null }}
      </p> -->
      <!-- <p class="error_message" v-if="errorMessage">
        {{ errorMessage.content ? errorMessage.content[0] : null }}
      </p> -->
    </div>
    <div id="btn_submit">
      <el-button id="btn_contact">Lưu</el-button>
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
import Editor from "@tinymce/tinymce-vue";

export default {
  components: {
    UserDetail,
    ChangePassword,
    editor: Editor,
  },
  data() {
    return {
      loading: false,
      centerDialogVisible02: false,
      centerDialogVisible03: false,
      dialog: window.innerWidth < 600 ? "80%" : window.innerWidth < 1200 ? "50%" : "25%",
      title: "",
      content: "",
      contactType: "",
      blogs: [],
    };
  },
  mounted() {
    this.getDictionaryList();
  },
  computed: {
    ...mapState("dictionaries", ["dictionaryList"]),
  },
  methods: {
    handleChangePassword() {
      this.centerDialogVisible03 = true;
      setTimeout(() => {
        this.centerDialogVisible02 = false;
      }, 100);
    },
    async getDictionaryList() {
      await this.$store.dispatch("dictionaries/getDictionaryList", {
        limit: 10,
        page: 1,
      });
      await this.getDicOptions();
    },
    getDicOptions() {
      const blogType = this.dictionaryList.filter((u, i) => u.id == 9);
      this.blogs = blogType[0].dictionaries.map((item) => {
        return {
          id: item.id,
          name: item.name,
        };
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.header_box {
  left: 208px !important;
  background: #eff5f9 !important;
  margin: 20px 0 40px !important;
  padding-top: 10px;
  .homepage {
    width: 100px;
    height: 25px !important;
    margin-left: 30px;
    // margin-top: 35px;
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
.form_contact {
  .form {
    width: 700px;
    background: #ffffff;
    border: 1px solid #dfdfdf;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 20px;
    padding-top: 10px;
    margin: 0 auto;
    .label {
      font-size: 14px;
      margin: 6px 0;
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
  .homepage {
    margin-left: 15px !important;
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
  }
  .form_contact {
    .form {
      width: 94%;
    }
  }
}
</style>
