<template>
  <div class="create_blog">
    <div class="blog_title">Tạo blog</div>
    <div class="form">
      <div class="label">Tiêu đề</div>
      <el-input v-model="title"></el-input>
      <div class="label">Chọn Blog</div>
      <el-select v-model="blogType" placeholder="Chọn loại blog">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <div class="label">Nội dung</div>
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
      <div class="upload_img">
        <div class="upload_title">Hình ảnh và video</div>
        <i>Kéo và thả nhiều tệp để tải lên</i>
        <el-upload
          v-if="headers"
          action="https://thinhgiacore.demo.fit/api/admin/projects/image"
          list-type="picture-card"
          drag
          multiple
          name="file[]"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-change="handleChange"
          :headers="headers"
          :file-list="fileList"
          ref="upload"
          :auto-upload="false"
        >
          <i slot="default" class="el-icon-picture"></i>

          <!-- <div slot="tip" slot-scope="{ file }">
                  <img
                    class="el-upload-list__item-thumbnail"
                    :src="file.thumbnail"
                    alt=""
                  />
                </div> -->
        </el-upload>
      </div>
    </div>
    <div class="btn_submit">
      <el-button id="create_btn">Tạo bài viết</el-button>
    </div>
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    editor: Editor,
  },
  data() {
    return {
      title: "",
      blogType: "",
      options: [],
      content: "",
      token: "",
      headers: null,
      fileList: [],
    };
  },
  mounted() {
    this.token = `bearer ${this.currentUser.results.access_token}`;
    this.headers = { Authorization: `bearer ${this.currentUser.results.access_token}` };
  },
  computed: {
    ...mapState("auth", ["currentUser"]),
  },
  methods: {
    handleRemove(file, fileList) {
      // console.log("before", this.image_id);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    handleChange(list, fileList) {
      this.showAlert = false;
      this.btn_upload = true;
      this.fileList = fileList;
    },
  },
};
</script>

<style lang="scss" scoped>
.upload_img {
  background: #ffffff;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 10px;
  font-size: 14px;
  margin: 10px 0 30px;
  .title_upload {
    font-weight: 700;
    font-size: 16px;
  }
  .upload_title {
    font-weight: bold;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.5px;
    color: #606060;
  }
}

.create_blog {
  margin-top: -60px;
  .blog_title {
    font-weight: bold;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.5px;
    color: #606060;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    margin-bottom: 10px;
  }
  .label {
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    display: flex;
    align-items: center;
    color: #606060;
    margin: 5px 0;
  }
  .form {
    background: #ffffff;
    border: 1px solid #dfdfdf;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 12px;
    padding-top: 2px;
  }
  .btn_submit {
    background: #ffffff;
    border: 1px solid #dfdfdf;
    box-sizing: border-box;
    border-radius: 4px;
    margin-top: 12px;
    text-align: center;
    #create_btn {
      margin: 8px auto;
      background: #fbad18;
      border-radius: 15px;
      color: #fff;
      border: none;
      padding: 8px 12px;
    }
  }
}
</style>
