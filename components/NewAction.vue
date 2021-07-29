<template>
  <div v-loading="loading">
    <div class="action" v-for="item in actionList" :key="item.id">
      <div class="d-flex username">
        <div class="name_info d-flex">
          <img v-if="item.staff.image[0]" :src="item.staff.image[0].thumbnail" alt="" />
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
      <v-row no-gutters class="house-img">
        <CoolLightBox
          :items="item.image_private.slice(0, 4)"
          :index="index"
          @close="index = null"
          v-if="item.image_private.length > 0"
        >
        </CoolLightBox>

        <div class="images-wrapper">
          <a href="javascript:;">
            <img
              v-for="(image, imageIndex) in item.image_private.slice(0, 4)"
              :key="imageIndex"
              @click="index = imageIndex"
              :src="image.src"
            />

            <div v-if="item.image_private.length > 4" class="overlay">
              +{{ item.image_private.length - 4 }}
            </div>
          </a>
        </div>
      </v-row>
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
          <button>
            <img src="@image/icons/share.png" alt="" />
            <span>Chia sẻ</span>
          </button>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import CoolLightBox from "vue-cool-lightbox";
import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    CoolLightBox,
  },
  data: function () {
    return {
      read: false,
      limit: 10,
      page: 1,
      loading: false,
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
    ...mapState("realEstate", ["realEstateList"]),
  },
  methods: {
    readMore: function () {
      this.read = !this.read;
    },
    async getNewActionList() {
      this.loading = true;
      try {
        await this.$store.dispatch("realEstate/getRealEstateList", {
          limit: this.limit,
          page: this.page,
        });
        // await this.renderAcitonList();
        console.log("realEstate", this.realEstateList);
        this.actionList = this.realEstateList.map((item, index) => {
          return {
            ...item,
            read: true,
            image_private: item.image_private.map((u) => {
              return { ...u, title: "", description: "", src: u.thumbnail };
            }),
          };
        });

        this.loading = false;
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
    // renderAcitonList(){

    // }
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
    span {
      margin: 0 3px;
    }
  }
}
.big_img {
  width: 500px;
  height: auto;
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
</style>
