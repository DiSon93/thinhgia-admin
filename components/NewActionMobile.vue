<template>
  <div v-loading="loading">
    <div class="newAction">
      <div class="action" v-for="item in actionList" :key="item.id">
        <div class="d-flex username">
          <div class="name_info d-flex">
            <img v-if="item.staff.image[0]" :src="item.staff.image[0].thumbnail" alt="" />
            <img v-else src="@image/icons/username.png" alt="" />
            <div class="name">
              {{ item.staff.name }}
              <div class="seconds">
                {{ item.fromNow }}
              </div>
            </div>
          </div>
          <!-- <div>
              <img src="@image/icons/i.png" alt="" @click=""/>
            </div> -->
          <el-popover placement="bottom" title="Chi tiết" width="280" trigger="click">
            <el-divider></el-divider>
            <div class="dimention">
              <div class="detail_small">
                <div>Loại BĐS</div>
                <div class="hightlight">{{ item.real_estate_type_dict.name }}</div>
              </div>
              <div class="detail_small">
                <div>Pháp Lý</div>
                <div class="hightlight">{{ item.ownership_dict.name }}</div>
              </div>
              <div class="detail_small">
                <div>Loại Nhà</div>
                <div class="hightlight">{{ item.house_type_dict.name }}</div>
              </div>
              <div class="detail_small">
                <div>Ngang</div>
                <div class="hightlight">{{ item.width }}</div>
              </div>
              <div class="detail_small">
                <div>Dài</div>
                <div class="hightlight">{{ item.length }}</div>
              </div>
              <div class="detail_small">
                <div>Nở hậu</div>
                <div class="hightlight">{{ item.end_open == 0 ? "Không" : "Có" }}</div>
              </div>
              <div class="detail_small">
                <div>Hướng</div>
                <div class="hightlight">{{ item.house_orientation_dict.name }}</div>
              </div>
              <div class="detail_small">
                <div>Hướng ban công</div>
                <div class="hightlight">{{ item.directions_dict.name }}</div>
              </div>
              <div class="detail_small">
                <div>Mục đích</div>
                <div class="hightlight">{{ item.purpose == 1 ? "Thuê" : "Bán" }}</div>
              </div>
              <div class="detail_small">
                <div>SĐT</div>
                <div class="hightlight">{{ item.customer.phone }}</div>
              </div>
              <div class="detail_small">
                <div>Dự án</div>
                <div class="hightlight">{{ item.project.name }}</div>
              </div>
              <div class="detail_small">
                <div>Phí môi giới</div>
                <div class="hightlight">{{ item.brokerage_amount }}</div>
              </div>
              <div class="detail_small">
                <div>Tỷ lệ môi giới</div>
                <div class="hightlight">{{ item.brokerage_rate }}</div>
              </div>
              <div class="detail_small">
                <div>Loại đường</div>
                <div class="hightlight">{{ item.street_type_dict.name }}</div>
              </div>
              <div class="detail_small">
                <div>Diện tích sàn</div>
                <div class="hightlight">{{ item.land_area }}m2</div>
              </div>
              <div class="detail_small">
                <div>Đăng ký ngày</div>
                <div class="hightlight">{{ item.created_at.slice(0, 10) }}</div>
              </div>
              <div class="detail_small">
                <div>NGÀY CẬP NHẬT</div>
                <div class="hightlight">{{ item.updated_at.slice(0, 10) }}</div>
              </div>
            </div>
            <el-button slot="reference"
              ><img src="@image/icons/i.png" alt=""
            /></el-button>
          </el-popover>
        </div>
        <div class="sell-department">
          {{ item.title ? item.title.toUpperCase() : null }}
        </div>
        <div class="d-flex address">
          <img src="@image/icons/nam.png" alt="" />
          <span>{{ item.house_orientation_dict.name }}</span>
          <img src="@image/icons/address.png" alt="" />
          <span
            >{{ item.street_name }}, {{ item.ward.name }}, {{ item.district.name }},
            {{ item.province.name }}</span
          >
        </div>
        <div class="adjust" v-bind:class="{ estate_content: item.read }">
          <div v-html="item.descriptions"></div>
          <br />
        </div>
        <button class="more-info" @click="item.read = !item.read">
          {{ item.read ? "Xem thêm" : "Rút gọn" }}
        </button>
        <CoolLightBoxImage :items="item ? item.image_private : []" />
        <v-row no-gutters class="comment_like">
          <v-col cols="4" align="center">
            <button
              @click="updateLikeStatus(item.id, item.user_like_status.status)"
              v-bind:class="{ highlight: item.user_like_status.status == 1 }"
            >
              <img src="@image/icons/heart.png" alt="" />
              <span class="touch">Thích</span>
              <span>{{ item.likes.length }}</span>
            </button>
          </v-col>
          <v-col cols="4" align="center">
            <button @click="item.isComment = !item.isComment">
              <img src="@image/icons/comment.png" alt="" />
              <span class="touch">Bình luận</span>
              <span>{{ item.comments.length }}</span>
            </button>
          </v-col>
          <v-col cols="4" align="center">
            <ShareSocialNetwork />
          </v-col>
        </v-row>
        <el-collapse-transition>
          <div v-if="item.isComment" class="connect" v-loading="loadingComment">
            <div
              class="d-flex comment_status"
              v-for="slot in item.comments"
              :key="slot.id"
            >
              <div class="d-flex">
                <div class="avatar_user" v-if="slot.user_avatar">
                  <img :src="slot.user_avatar" alt="" />
                </div>
                <div class="avatar_user" v-else>
                  <img src="@image/icons/username.png" alt="" />
                </div>
                <div class="users">
                  <div class="name">
                    {{ slot.user_name }}
                    <span class="time_comment">{{ slot.fromNowComment }}</span>
                  </div>
                  <div class="comment">{{ slot.content }}</div>
                </div>
              </div>

              <div class="d-flex">
                <el-tag type="info" v-if="slot.is_display == 0">Đã ẩn</el-tag>
                <el-dropdown trigger="click" @command="handleCommand">
                  <el-button
                    class="btn_hide"
                    icon="el-icon-more"
                    circle
                    @click="selectCommen(slot.id, slot.is_display, item.id)"
                  ></el-button>
                  <el-dropdown-menu slot="dropdown" placement="left">
                    <el-dropdown-item icon="el-icon-circle-plus" command="hide">
                      {{ slot.is_display == 0 ? "Bỏ Ẩn" : "Ẩn" }}</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>

            <div class="d-flex">
              <el-input
                v-model="comment"
                @keyup.enter.native="createNewComment(item.id)"
                id="myInput"
              >
                <i
                  slot="suffix"
                  class="el-input__icon el-icon-date"
                  @click="uploadPhoto"
                ></i>
              </el-input>
              <el-button
                class="btn_send"
                type="primary"
                @click="createNewComment(item.id)"
                >Gửi</el-button
              >
            </div>
          </div>
        </el-collapse-transition>
      </div>
      <el-button type="warning" round @click="readMoreActions" v-if="readMore"
        >Xem thêm</el-button
      >
      <script src="https://sp.zalo.me/plugins/sdk.js"></script>
      <p v-if="loadingMore">Loading...</p>
      <p v-if="noMore">No more</p>
    </div>
  </div>
</template>

<script>
import CoolLightBox from "vue-cool-lightbox";
import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css";
import { mapState, mapActions } from "vuex";
import CoolLightBoxImage from "@component/CoolLightBoxImage.vue";
import ShareSocialNetwork from "@component/ShareSocialNetwork";
import moment from "moment";
export default {
  components: {
    CoolLightBox,
    CoolLightBoxImage,
    ShareSocialNetwork,
  },
  data: function () {
    return {
      read: false,
      limit: 3,
      page: 1,
      loading: false,
      loadingMore: false,
      actionList: [],
      status: 0,
      like: 1,
      highlight: false,
      isComment: false,
      comment: "",
      select_commentID: null,
      file: null,
      loadingComment: false,
      is_display: 0,
      realID: 0,
      readMore: true,
      items: [
        {
          title: "In nature, nothing is perfect and everything is perfect",
          description: "Photo by Lucas",
          src: require(`@/assets/images/layouts/house1.png`),
        },
        {
          title: "In nature, nothing is perfect and everything is perfect",
          description: "Photo by Lucas",
          src: require("@/assets/images/layouts/house2.png"),
        },
        {
          title: "In nature, nothing is perfect and everything is perfect",
          description: "Photo by Lucas",
          src: require(`@/assets/images/layouts/house3.png`),
        },
        {
          title: "In nature, nothing is perfect and everything is perfect",
          description: "Photo by Lucas",
          src: require("@/assets/images/layouts/house4.png"),
        },
      ],
      index: null,
    };
  },
  created() {
    this.getNewActionList();
  },
  computed: {
    ...mapState("realEstate", ["realEstateList", "lastPage"]),
    ...mapState("homepage", ["updateLike", "newComment"]),
    ...mapState("auth", ["currentUser"]),

    noMore() {
      return this.page >= this.lastPage;
    },
    disabled() {
      return this.loadingMore || this.noMore;
    },
  },
  methods: {
    readMore: function () {
      this.read = !this.read;
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
        this.getNewActionList();
      } catch {
        this.loadingMore = false;
      }
    },
    async readMoreActions() {
      this.page += 1;
      if (this.page == this.lastPage) {
        this.readMore = false;
      }
      try {
        this.getNewActionList();
      } catch {}
    },
    selectCommen(_id, is_display, realID) {
      this.select_commentID = _id;
      this.is_display = is_display;
      this.realID = realID;
    },
    uploadPhoto() {
      console.log("TEXT");
    },
    async getNewActionList() {
      if (this.page == 1) {
        this.loading = true;
      }
      try {
        await this.$store.dispatch("realEstate/getRealEstateList", {
          limit: this.limit,
          page: this.page,
          search: "",
          sort_price: "",
          min_price: "",
          max_price: "",
          approve_public: 2,
        });
        // await this.renderAcitonList();
        console.log("realEstate", this.realEstateList);
        let actionListSroll = this.realEstateList.map((item, index) => {
          // console.log("update_at", moment(item.updated_at).startOf("day").fromNow());
          return {
            ...item,
            read: true,
            likes: item.likes.filter((u) => u.status == 1),
            fromNow: moment(item.updated_at).startOf("hour").fromNow(),
            image_private: item.image_private.map((u) => {
              return { ...u, title: "", description: "", src: u.main };
            }),
            comments: item.comments.map((u) => {
              return {
                ...u,
                fromNowComment: moment(u.updated_at).startOf("minute").fromNow(),
              };
            }),
            isComment: false,
          };
        });
        this.actionList = this.actionList.concat(actionListSroll);
        this.loading = false;
        this.loadingMore = false;
      } catch {
        this.loading = false;
      }
    },
    async updateLikeStatus(_id, status) {
      if (status == 1) {
        this.actionList = this.actionList.map((item) =>
          item.id == _id
            ? {
                ...item,
                likes: item.likes.filter(
                  (u) => u.user_id != this.currentUser.results.user.id
                ),
                user_like_status: { ...item.user_like_status, status: 0 },
              }
            : item
        );
      }
      try {
        await this.$store.dispatch("homepage/updateLikeStatus", {
          real_estate_id: _id,
          status: status == 1 ? 0 : 1,
        });
        // this.getNewActionList();
        if (status == 0) {
          this.actionList = this.actionList.map((item) =>
            item.id == _id
              ? {
                  ...item,
                  likes: [...item.likes, this.updateLike],
                  user_like_status: { ...item.user_like_status, status: 1 },
                }
              : item
          );
        }
      } catch {}
    },

    async createNewComment(_id) {
      this.loadingComment = true;
      try {
        await this.$store.dispatch("homepage/createNewComment", {
          title: this.comment,
          content: this.comment,
          real_estate_id: _id,
          // file: null,
        });
        let newCommentAdded = {
          ...this.newComment,
          user_name: this.currentUser.results.user.name,
          user_avatar: this.currentUser.results.user.avatar_image?.thumbnail,
          fromNowComment: moment(this.newComment.updated_at).startOf("minute").fromNow(),
        };
        this.loadingComment = false;
        this.comment = "";
        this.actionList = this.actionList.map((item) =>
          item.id == _id
            ? {
                ...item,
                comments: [...item.comments, newCommentAdded],
              }
            : item
        );
      } catch {}
    },
    handleCommand(command) {
      if (command == "URL") {
        this.copyURLNotification();
      }
      if (command == "hide") {
        this.hideThisComment();
      }
    },
    async hideThisComment() {
      this.loadingComment = true;
      try {
        this.$store.dispatch("homepage/hideCommentDisplay", {
          id: this.select_commentID,
          is_display: this.is_display == 0 ? 1 : 0,
        });

        this.actionList = this.actionList.map((item) =>
          item.id == this.realID
            ? {
                ...item,
                comments: item.comments.map((u) =>
                  u.id == this.select_commentID ? { ...u, is_display: !u.is_display } : u
                ),
              }
            : item
        );
        this.loadingComment = false;
      } catch {}
    },
    copyURLNotification() {
      // var copyText = document.getElementById("myInput");
      // copyText.select();
      // copyText.setSelectionRange(0, 99999); /* For mobile devices */
      // document.execCommand("copy");
      navigator.clipboard.writeText("https://khobatdongsanviet.demo.fit/");
      this.$notify({
        title: "Success",
        message: "Copy URL successfull!!!",
        type: "success",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.action {
  width: 95%;
  // height: 418px;
  left: 244px;
  top: 120px;
  background: #ffffff;
  border-radius: 15px;
  padding: 16px 30px;
  margin-top: 10px;
  margin-bottom: 30px;
  .username {
    justify-content: space-between;
    .name_info {
      img {
        width: 25px;
        height: 25px;
        margin-right: 15px;
        border-radius: 50%;
      }
      .name {
        font-size: 13px;
        line-height: 15px;
        font-weight: 500;
        /* identical to box height, or 200% */
        letter-spacing: 0.5px;
        .seconds {
          font-weight: 500;
          color: grey;
          font-size: 10px;
          letter-spacing: 0.5px;
        }
      }
    }
    .el-button {
      padding: 2px 3px;
    }
  }
  .estate_content {
    // font-size: 14px;
    // height: 70px;
    // overflow: hidden;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .adjust {
    height: auto !important;
  }
  .sell-department {
    font-weight: bold;
    font-size: 12px;
    line-height: 24px;
    /* identical to box height, or 200% */
    letter-spacing: 0.5px;
    color: #fbad18;
    margin-top: 10px;
  }
  .address {
    vertical-align: bottom;
    margin: 3px 0;
    img {
      width: 10px;
      height: 10px;
      margin: auto 0;
    }
    span {
      font-weight: 400;
      font-size: 11px;
      margin: 0 8px;
    }
  }
  .adjust {
    font-weight: 300;
    font-size: 13px;
    line-height: 24px;
    letter-spacing: 0.5px;
    // height: 25px;
    overflow: hidden;
  }
  .more-info {
    font-weight: 300;
    font-size: 10px;
    line-height: 24px;
    letter-spacing: 0.5px;
    color: #fbad18;
  }
  .adjust {
    height: auto !important;
  }
  .house-img {
    // margin-bottom: 5px;
    // display: flex;
    // .images-wrapper {
    //   width: 50%;
    // }
    img {
      width: 48%;
      margin-bottom: 3%;
      height: 100px;
    }
    img:nth-child(1),
    img:nth-child(3) {
      margin-right: 4%;
    }
    .images-wrapper {
      width: 100%;
      position: relative;
      .image {
        height: 100px;
      }
      .overlay {
        position: absolute;
        top: 50%;
        left: 52%;
        width: 48%;
        height: 44.3%;
        text-align: center;
        color: #fff;
        font-size: 24px;
        padding-top: 9%;
        background-color: rgba(0, 0, 0, 0.329);
      }
    }
  }
  .connect {
    margin-top: 10px;
  }
  .comment_status {
    margin-top: 10px;
    justify-content: space-between;
    .avatar_user {
      img {
        border-radius: 50%;
        width: 25px;
        height: 25px;
      }
    }
    .users {
      margin-left: 10px;
      .name {
        font-size: 12px;
        font-weight: 500;
      }
      .comment {
        font-size: 12px;
      }
      .time_comment {
        font-size: 10px;
        font-weight: 500;
        color: grey;
      }
    }
    &:hover {
      background-color: rgba(199, 196, 196, 0.377);
      transition: 0.5s;
      .btn_hide {
        background: rgba(199, 196, 196, 0.377);
      }
    }
    &:focus {
      background-color: rgba(199, 196, 196, 0.377);
    }
    margin: 0 -30px;
    padding: 5px 30px;
    .btn_hide {
      margin-left: 10px;
    }
  }
  .comment_like {
    font-style: normal;
    font-weight: 300;
    font-size: 11px;
    .share {
      font-size: 11px;
    }
    span {
      margin: 0 3px;
    }
    .highlight {
      color: blue;
    }
  }
  .el-tag {
    margin-top: 3px;
  }
}
.big_img {
  width: 500px;
  height: auto;
}
.share_facebook {
  text-decoration: none;
  img {
    height: 20px;
    width: 20px;
    border-radius: 50%;
  }
}
@media screen and (max-width: 600px) {
  .action {
    width: 100%;
    padding: 12px 15px;
    .sell-department {
      font-size: 11px;
    }
    .content {
      font-size: 11px;
    }
    .address {
      img {
        margin-top: 2px;
      }
    }
    .overlay {
      padding-top: 5% !important;
    }
    .comment_like {
      margin-top: 5px;
      .touch {
        display: none;
      }
    }
  }
}
.infinite-list-wrapper {
  height: 800px;
}
div::-webkit-scrollbar {
  width: 3px !important;
  opacity: 0.1 !important;
}
</style>
