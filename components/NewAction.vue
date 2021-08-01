<template>
  <div v-loading="loading">
    <div class="infinite-list-wrapper" style="overflow: auto">
      <ul
        class="list"
        v-infinite-scroll="load"
        infinite-scroll-disabled="disabled"
        infinite-scroll-delay="1000"
      >
        <li class="action" v-for="item in actionList" :key="item.id">
          <div class="d-flex username">
            <div class="name_info d-flex">
              <img
                v-if="item.staff.image[0]"
                :src="item.staff.image[0].thumbnail"
                alt=""
              />
              <img v-else src="@image/icons/username.png" alt="" />
              <div class="name">
                {{ item.staff.name }}
                <div class="seconds">a few seconds ago</div>
              </div>
            </div>
            <div>
              <img src="@image/icons/i.png" alt="" />
            </div>
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
              <button @click="updateLikeStatus(item.id)">
                <img src="@image/icons/heart.png" alt="" />
                <span class="touch">Thích</span>
                <span>1</span>
              </button>
            </v-col>
            <v-col cols="4" align="center">
              <button>
                <img src="@image/icons/comment.png" alt="" />
                <span class="touch">Bình luận</span>
                <span>2</span>
              </button>
            </v-col>
            <v-col cols="4" align="center">
              <el-dropdown class="account" @command="handleCommand" trigger="click">
                <button class="share">
                  <img src="@image/icons/share.png" alt="" />
                  <span>Chia sẻ</span>
                </button>
                <el-dropdown-menu slot="dropdown" id="dropdown_social">
                  <el-dropdown-item>
                    <div
                      class="zalo-share-button"
                      data-href="https://khobatdongsanviet.demo.fit/"
                      data-oaid="579745863508352884"
                      data-layout="1"
                      data-color="blue"
                      data-customize="false"
                    ></div>
                  </el-dropdown-item>
                  <el-dropdown-item divided>
                    <ShareNetwork
                      network="facebook"
                      url="https://khobatdongsanviet.demo.fit/"
                      title="Say hi to Vite! A brand new, extremely fast development setup for Vue."
                      description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You."
                      quote=""
                      hashtags="BĐSViet,BĐS"
                      class="share_facebook"
                    >
                      <img src="@image/icons/facebook.png" alt="" /> Chia sẻ
                    </ShareNetwork>
                  </el-dropdown-item>
                  <el-dropdown-item command="URL" divided> Copy URL </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </v-col>
          </v-row>
        </li>
      </ul>
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
export default {
  components: {
    CoolLightBox,
    CoolLightBoxImage,
  },
  data: function () {
    return {
      read: false,
      limit: 3,
      page: 1,
      loading: false,
      loadingMore: false,
      actionList: [],
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
    async getNewActionList() {
      if (this.page == 1) {
        this.loading = true;
      }
      try {
        await this.$store.dispatch("realEstate/getRealEstateList", {
          limit: this.limit,
          page: this.page,
        });
        // await this.renderAcitonList();
        console.log("realEstate", this.realEstateList);
        let actionListSroll = this.realEstateList.map((item, index) => {
          return {
            ...item,
            read: true,
            image_private: item.image_private.map((u) => {
              return { ...u, title: "", description: "", src: u.thumbnail };
            }),
          };
        });
        this.actionList = this.actionList.concat(actionListSroll);
        this.loading = false;
        this.loadingMore = false;
      } catch {
        this.loading = false;
      }
    },
    async updateLikeStatus(_id) {
      try {
        await this.$store.dispatch("homepage/updateLikeStatus", {
          real_estate_id: _id,
          status: 1,
        });
      } catch {}
    },
    async setCountRealEstateLike() {
      // try{
      //   await this.$store.dispatch("realEstate/getCountLikeRealEstate", {
      //     real_estate_id:
      //   })
      // }
    },
    handleCommand(command) {
      if (command == "URL") {
        this.copyURLNotification();
      }
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
          font-weight: 300;
          font-size: 10px;
          letter-spacing: 0.5px;
        }
      }
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
