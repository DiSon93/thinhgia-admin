<template>
  <div id="modal_dic" v-loading="loading">
    <div class="titles">Thêm {{ select_dic.name }}</div>
    <el-input placeholder="Vui lòng nhập tên" v-model="input"></el-input>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose" class="cancel_mmodal">Hủy</el-button>
      <el-button type="primary" @click="addDictionary" class="confirm_modal"
        >Thêm</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  props: ["select_dic"],
  data() {
    return {
      input: "",
      loading: false,
    };
  },
  methods: {
    async addDictionary() {
      this.loading = true;
      try {
        await this.$store.dispatch("dictionaries/createNewDictinary", {
          dictionary_type_id: this.select_dic.id,
          name: this.input,
        });
        this.loading = false;
        this.$emit("close-add-modals");
        this.showSuccessNoti();
      } catch {
        this.showErrorMess();
        this.loading = false;
      }
    },
    showSuccessNoti() {
      this.$notify({
        title: "Success",
        message: "Update dictionary successfull!!!",
        type: "success",
      });
    },
    showErrorMess() {
      this.$notify.error({
        title: "Error",
        message: "The name field is required.",
        type: "error",
      });
    },
    handleClose() {
      this.$emit("close-modals");
    },
  },
};
</script>

<style lang="scss" scoped>
#modal_dic {
  .titles {
    font-size: 20px;
    font-weight: 700;
    margin-top: -40px;
    margin-bottom: 30px;
  }
  .dialog-footer {
    margin-top: 30px !important;
    text-align: right;
  }
  .cancel_mmodal.el-button {
    border: 1px solid #fbad18;
    box-sizing: border-box;
    border-radius: 15px;
    color: #fbad18;
  }
  .confirm_modal.el-button {
    background: #fbad18;
    border: 1px solid #fbad18;
    box-sizing: border-box;
    color: #fff;
    border-radius: 15px;
  }
}
</style>
