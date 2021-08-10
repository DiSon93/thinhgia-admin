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
      <v-row align="center" d-flex class="header_option">
        <v-col cols="8" sm="6" class="app_bar new_titles">
          <button class="homepage" disabled>Tin tức</button>
          <v-btn depressed color="primary" id="social_network"> {{ total }} </v-btn>
        </v-col>
        <v-col cols="4" sm="6" class="app_bar">
          <div class="option_button">
            <v-btn
              class="mx-2 add_btn"
              fab
              dark
              small
              color="warning"
              @click="$router.push('/form/blog')"
            >
              <v-icon dark small> mdi-plus </v-icon>
            </v-btn>
            <v-btn class="account" fab @click="centerDialogVisible02 = true"
              ><v-icon dark small>mdi-account</v-icon></v-btn
            >
          </div>
        </v-col>
      </v-row>
      <div class="content_loading" v-loading="loading">
        <!-- <video width="320" height="240" controls>
          <source
            src="https://thinhgiacore.demo.fit/upload/blogs/1627465801989.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video> -->
        <div class="infinite-list-wrapper" style="overflow: auto">
          <ul
            class="list"
            v-infinite-scroll="load"
            infinite-scroll-disabled="disabled"
            infinite-scroll-delay="1000"
          >
            <!-- <div v-for="i in count" :key="i" class="list-item">{{ i }}</div> -->
            <li class="content_items" v-for="item in blogListDetail" :key="item.id">
              <div class="content">
                <div class="d-flex img_fix">
                  <!-- <div v-for="img in item.image.slice(0, 4)" :key="img.id">
                    <img :src="img.thumbnail" alt="" class="project_picture" />
                  </div> -->

                  <div>
                    <CoolLightBoxNew :items="item ? item.image : []" />
                  </div>

                  <div>
                    <el-dropdown @command="handleCommand" trigger="click">
                      <el-button
                        type="primary"
                        icon="el-icon-edit"
                        circle
                        class="el-dropdown-link btn_select"
                        @click="user_info(item)"
                      >
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
                  </div>
                </div>
                <div class="create">
                  Tạo bởi
                  <span class="username">{{ item.user ? item.user.name : null }}</span>
                  lúc
                  {{ item.created_at.slice(0, 10) }}
                  {{ item.created_at.slice(11, 19) }}
                </div>
                <div class="blog">
                  Loại blog: {{ item.blog_type ? item.blog_type.name : null }}
                </div>
                <h5>{{ item.title }}</h5>
                <div class="introduce">GIỚI THIỆU</div>
                <div class="detail" v-bind:class="{ estate_content: item.read }">
                  <div v-html="item.content"></div>
                  <!-- <span> <a href="#">...Xem thêm</a> </span> -->
                </div>
                <a href="javascript:;" @click="item.read = !item.read">
                  {{ item.read ? "Xem thêm" : "Rút gọn" }}
                </a>
              </div>
            </li>
          </ul>
          <p v-if="loadingMore">Loading...</p>
          <p v-if="noMore">No more</p>
        </div>
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
  </v-lazy>
</template>

<script>
import UserDetail from "@component/Form/UserDetail";
import ChangePassword from "@component/Form/ChangePassword";
import { mapState, mapActions } from "vuex";
import CoolLightBoxNew from "@component/CoolLightBoxNew.vue";

export default {
  components: {
    UserDetail,
    ChangePassword,
    CoolLightBoxNew,
  },
  data() {
    return {
      isActive: false,
      centerDialogVisible02: false,
      centerDialogVisible03: false,
      limit: 3,
      page: 1,
      loading: false,
      selectedItem: {},
      blogListDetail: [],
      loadingMore: false,
      count: 10,
      dialog: window.innerWidth < 600 ? "80%" : window.innerWidth < 1200 ? "50%" : "25%",
    };
  },
  created() {
    this.getBlogList();
  },
  computed: {
    ...mapState("blog", ["total", "blogList", "lastPage"]),
    noMore() {
      return this.page > this.lastPage;
    },
    disabled() {
      return this.loadingMore || this.noMore;
    },
  },
  methods: {
    user_info(item) {
      this.selectedItem = item;
    },
    async load() {
      this.loadingMore = true;
      this.page += 1;
      if (this.page > this.lastPage) {
        this.loadingMore = false;
        this.noMore = true;
        return;
      }
      try {
        this.getBlogList();
      } catch {
        this.loadingMore = false;
      }
    },
    handleCommand(command) {
      if (command == "edit") {
        this.$router.push(`/form/blog/update/${this.selectedItem.id}`);
      }
      if (command == "delete") {
        this.deleteBlogConfirm();
      }
    },
    async getBlogList() {
      if (this.page == 1) {
        this.loading = true;
      }
      try {
        await this.$store.dispatch("blog/getBlogList", {
          limit: this.limit,
          page: this.page,
        });
        let scrollBlogList = this.blogList.map((u) => {
          return {
            ...u,
            read: true,
            image: u.image.map((v) => {
              return v.main.slice(-3) == "mp4"
                ? { ...v, type: "video" }
                : { ...v, type: "photo" };
            }),
          };
        });
        this.blogListDetail = this.blogListDetail
          .concat(scrollBlogList)
          .map((item, index) => {
            return {
              ...item,
              image: item.image.map((u) => {
                return { ...u, src: u.main };
              }),
            };
          });
        this.loading = false;
        this.loadingMore = false;
      } catch {
        this.loading = false;
        this.loadingMore = false;
      }
    },
    deleteBlogConfirm() {
      this.$confirm(`Are you sure to delete this blog. Continue?`, "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(() => {
          this.loading = true;
          this.deleteBlogInSystem();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled",
          });
        });
    },
    handleChangePassword() {
      this.centerDialogVisible03 = true;
      setTimeout(() => {
        this.centerDialogVisible02 = false;
      }, 100);
    },
    async deleteBlogInSystem() {
      try {
        await this.$store.dispatch("blog/deleteBlog", this.selectedItem.id);
        await this.getBlogList();
        setTimeout(this.openNotificationSuccess(), 1000);
        this.loading = false;
      } catch {
        this.showErrorNotification();
        this.loading = false;
      }
    },
    openNotificationSuccess() {
      this.$notify({
        title: "Success",
        message: "Delete blog successfull!!!",
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
    margin-left: 25px;
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

    .setting {
      padding: 0;
      width: 24px !important;
      height: 24px !important;
      border-radius: 50%;
      background-color: #fff !important;
      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.15);
      margin-left: 10px;
      &:hover {
        border: 1px solid blue;
        transition: 0.5s;
      }
    }
  }
}
.news_table {
  padding: 20px 20px;
}
.content_loading {
  margin-top: 40px;
  min-height: 300px;
}
.content_items {
  padding: 2px 12px;
  h5 {
    font-size: 16px;
  }
  .content {
    border-radius: 10px;
    background-color: #fff;
    padding: 20px 34px;
    box-shadow: 0 0 20px 1px hsl(0deg 0% 65% / 20%);
    margin: 0 10px 15px;

    .create {
      color: rgb(253, 86, 86);
      font-size: 13px;
      font-weight: 500;
      margin-top: 5px;
      .username {
        font-weight: 700;
      }
    }
    .blog {
      color: rgb(78, 78, 245);
      font-size: 13px;
      font-weight: 500;
      margin-bottom: 5px;
    }
    .img_fix {
      justify-content: space-between;
      img {
        width: 200px;
        height: 200px;
      }
    }
    a {
      font-size: 14px;
    }
    .estate_content {
      // font-size: 14px;
      // height: 70px;
      // overflow: hidden;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }

    .detail {
      font-size: 15px;
      color: gray;
      line-height: 25px;
      height: auto !important;
    }
    .introduce {
      font-weight: 500;
      color: gray;
      font-size: 15px;
      margin-bottom: 3px;
    }
  }
}
.header_option {
  position: sticky;
  top: 0;
  z-index: 99;
  background: #eff5f9 !important;
}
div::-webkit-scrollbar {
  width: 3px !important;
  opacity: 0.1 !important;
}
@media screen and (min-width: 1265px) {
  .header_box {
    margin-top: -60px !important;
  }
}
@media screen and (max-width: 600px) {
  .content_items {
    .content {
      padding: 20px 15px;
      .v-btn {
        background-color: #dafff4 !important;
      }
      .create {
        font-size: 11px;
      }
      .blog {
        font-size: 11px;
      }
      .introduce {
        font-size: 12px !important;
      }
    }
    h5 {
      font-size: 14px !important;
    }

    .detail {
      font-size: 12px !important;
      line-height: 20px !important;
    }
    img {
      width: 80%;
    }
  }
  .news_table {
    padding: 0px 0px 40px;
  }
  .new_titles {
    padding-top: 0 !important;
  }
  .homepage {
    margin: 0 0 0 15px !important;
  }
  .option_button {
    margin-right: 15px !important;
  }
  .app_bar {
    padding: 0 !important;
    margin-bottom: 30px;
  }
}
.infinite-list-wrapper {
  height: 800px;
}
</style>
