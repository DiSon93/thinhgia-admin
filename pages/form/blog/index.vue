<template>
  <div class="create_blog" v-loading="loading">
    <div class="blog_title">Tạo blog</div>
    <div class="form">
      <div class="label">Tiêu đề <span style="color: red">*</span></div>
      <el-input v-model="title"></el-input>
      <p class="error_message" v-if="errorMessage">
        {{ errorMessage.title ? errorMessage.title[0] : null }}
      </p>
      <div class="label">Chọn Blog <span style="color: red">*</span></div>
      <el-select v-model="blogType" placeholder="Chọn loại blog">
        <el-option
          v-for="item in blogs"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <p class="error_message" v-if="errorMessage">
        {{ errorMessage.blog_type_id ? errorMessage.blog_type_id[0] : null }}
      </p>
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
          content_style: 'p { margin: 0; }',
        }"
      />
      <p class="error_message" v-if="errorMessage">
        {{ errorMessage.content ? errorMessage.content[0] : null }}
      </p>
      <div class="upload_img">
        <div class="upload_title">
          Hình ảnh và video <span style="color: red">*</span>
        </div>
        <i>Kéo và thả nhiều tệp để tải lên</i>
        <el-upload
          v-if="headers"
          action="https://thinhgiacore.demo.fit/api/admin/blogs/image"
          list-type="picture-card"
          drag
          multiple
          name="file[]"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-change="handleChange"
          :on-success="handleAvatarSuccess"
          :headers="headers"
          :file-list="fileList"
          ref="upload"
        >
          <i slot="default" class="el-icon-picture"></i>
          <!-- <div slot="tip" slot-scope="{ file }">
            <video class="el-upload-list__item-thumbnail" controls>
              <source :src="file.thumbnail" type="video/mp4" />
            </video>
          </div> -->
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
        <p class="error_message" v-if="errorMessage">
          {{ errorMessage.image_id ? errorMessage.image_id[0] : null }}
        </p>
        <!-- <el-upload
          v-if="headers"
          action="https://thinhgiacore.demo.fit/api/admin/blogs/image"
          list-type="picture-card"
          drag
          name="file[]"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemoveVideo"
          :on-change="handleChangeVideo"
          :on-success="handleVideoSuccess"
          :headers="headers"
        >
          <i slot="default" class="el-icon-picture"></i>
      
          <video
            v-if="video"
            class="el-upload-list__item-thumbnail"
            controls
            width="130"
            height="150"
          >
            <source :src="video" type="video/mp4" />
          </video>
        </el-upload> -->
      </div>
    </div>
    <div class="btn_submit">
      <el-button id="create_btn" @click="createBlog">Tạo bài viết</el-button>
    </div>
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import { mapState, mapActions } from "vuex";
import EleUploadVideo from "vue-ele-upload-video";
export default {
  components: {
    editor: Editor,
    EleUploadVideo,
  },
  data() {
    return {
      title: "",
      blogType: "",
      blogs: [],
      content: "",
      token: "",
      headers: null,
      fileList: [],
      image_id: [],
      img_val: "",
      loading: false,
      video: "",
      dialogVisible: false,
      dialogImageUrl: "",
    };
  },
  mounted() {
    this.token = `bearer ${this.currentUser.results.access_token}`;
    this.headers = { Authorization: `bearer ${this.currentUser.results.access_token}` };
    this.getDictionaryList();
  },
  computed: {
    ...mapState("auth", ["currentUser"]),
    ...mapState("dictionaries", ["dictionaryList"]),
    ...mapState("blog", ["errorMessage"]),
  },
  methods: {
    handleRemoveVideo() {},
    handleChangeVideo() {},
    handleVideoSuccess(res, file) {
      console.log("video", file);
      this.video = file.response.results[0].thumbnail;
    },

    handleRemove(file, fileList) {
      if (file.response) {
        this.$store.dispatch("blog/deleteBlogPhoto", file.response.results[0].id);
        this.image_id = this.image_id.filter((u) => {
          return u != file.response.results[0].id;
        });
        this.img_val = this.image_id.map((item) => `${item}`).join(",");
        console.log("img_val", this.img_val);
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    handleChange(list, fileList) {
      this.fileList = fileList;
    },
    handleAvatarSuccess(res, file) {
      this.image_id.push(res.results[0].id);
      this.img_val = this.image_id.map((item) => `${item}`).join(",");
      console.log("image_val", this.img_val);
    },
    // handleVideoSuccess(res, file) {
    //   console.log("video", file);
    // },
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
    async createBlog() {
      this.loading = true;
      try {
        await this.$store.dispatch("blog/createBlogList", {
          title: this.title,
          content: this.content,
          blog_type_id: this.blogType,
          image_id: this.img_val,
        });
        setTimeout(this.openNotificationSuccess(), 500);
        this.loading = false;
        this.$router.push("/news");
      } catch {
        this.showErrorNotification();
        this.loading = false;
      }
    },
    openNotificationSuccess() {
      this.$notify({
        title: "Success",
        message: "Create new blog successfull!!!",
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
.error_message {
  color: red;
  font-size: 12px;
  margin-bottom: 0px;
  margin-top: 0px;
}
</style>
