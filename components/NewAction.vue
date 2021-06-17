<template>
  <div>
    <div class="action">
      <div class="d-flex username">
        <div class="name_info d-flex">
          <img src="@image/icons/username.png" alt="" />
          <div class="name">
            User Name
            <div class="seconds">a few seconds ago</div>
          </div>
        </div>
        <div>
          <img src="@image/icons/i.png" alt="" />
        </div>
      </div>
      <div class="sell-department">
        BÁN CĂN HỘ VINHOMES TẦNG CAO VIEW BIỂN FULL NỘI THẤT ĐẸP
      </div>
      <div class="d-flex address">
        <img src="@image/icons/nam.png" alt="" />
        <span>Nam</span>
        <img src="@image/icons/address.png" alt="" />
        <span>Nguyễn Hữu Cảnh, Bình Thạnh</span>
      </div>
      <div class="content" v-bind:class="{ adjust: read }">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
        Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
        is simply dummy text of the printing and typesetting industry. Lorem Ipsum is
        simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply
        dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy
        text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of
        the printing and typesetting industry.

        <br />
      </div>
      <button class="more-info" @click="readMore">
        {{ read ? "Rút gọn" : "Xem thêm" }}
      </button>
      <v-row no-gutters class="house-img">
        <CoolLightBox :items="items" :index="index" @close="index = null"> </CoolLightBox>

        <div class="images-wrapper">
          <img
            v-for="(image, imageIndex) in items"
            :key="imageIndex"
            @click="index = imageIndex"
            :src="image.src"
          />
          <div class="overlay">+8</div>
        </div>
      </v-row>
      <v-row no-gutters class="comment_like">
        <v-col cols="4" align="center">
          <button>
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
    <div class="action">
      <div class="d-flex username">
        <div class="name_info d-flex">
          <img src="@image/icons/username.png" alt="" />
          <div class="name">
            User Name
            <div class="seconds">a few seconds ago</div>
          </div>
        </div>
        <div>
          <img src="@image/icons/i.png" alt="" />
        </div>
      </div>
      <div class="sell-department">
        BÁN CĂN HỘ VINHOMES TẦNG CAO VIEW BIỂN FULL NỘI THẤT ĐẸP
      </div>
      <div class="d-flex address">
        <img src="@image/icons/nam.png" alt="" />
        <span>Nam</span>
        <img src="@image/icons/address.png" alt="" />
        <span>Nguyễn Hữu Cảnh, Bình Thạnh</span>
      </div>
      <div class="content" v-bind:class="{ adjust: read }">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
        Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
        is simply dummy text of the printing and typesetting industry. Lorem Ipsum is
        simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply
        dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy
        text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of
        the printing and typesetting industry.

        <br />
      </div>
      <button class="more-info" @click="readMore">
        {{ read ? "Rút gọn" : "Xem thêm" }}
      </button>
      <v-row no-gutters class="house-img">
        <CoolLightBox :items="items" :index="index" @close="index = null"> </CoolLightBox>

        <div class="images-wrapper">
          <img
            v-for="(image, imageIndex) in items"
            :key="imageIndex"
            @click="index = imageIndex"
            :src="image.src"
          />
          <div class="overlay">+8</div>
        </div>
      </v-row>
      <v-row no-gutters class="comment_like">
        <v-col cols="4" align="center">
          <button>
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
    <div class="action">
      <div class="d-flex username">
        <div class="name_info d-flex">
          <img src="@image/icons/username.png" alt="" />
          <div class="name">
            User Name
            <div class="seconds">a few seconds ago</div>
          </div>
        </div>
        <div>
          <img src="@image/icons/i.png" alt="" />
        </div>
      </div>
      <div class="sell-department">
        BÁN CĂN HỘ VINHOMES TẦNG CAO VIEW BIỂN FULL NỘI THẤT ĐẸP
      </div>
      <div class="d-flex address">
        <img src="@image/icons/nam.png" alt="" />
        <span>Nam</span>
        <img src="@image/icons/address.png" alt="" />
        <span>Nguyễn Hữu Cảnh, Bình Thạnh</span>
      </div>
      <div class="content" v-bind:class="{ adjust: read }">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
        Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
        is simply dummy text of the printing and typesetting industry. Lorem Ipsum is
        simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply
        dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy
        text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of
        the printing and typesetting industry.

        <br />
      </div>
      <button class="more-info" @click="readMore">
        {{ read ? "Rút gọn" : "Xem thêm" }}
      </button>
      <v-row no-gutters class="house-img">
        <CoolLightBox :items="items" :index="index" @close="index = null"> </CoolLightBox>

        <div class="images-wrapper">
          <img
            v-for="(image, imageIndex) in items"
            :key="imageIndex"
            @click="index = imageIndex"
            :src="image.src"
          />
          <div class="overlay">+8</div>
        </div>
      </v-row>
      <v-row no-gutters class="comment_like">
        <v-col cols="4" align="center">
          <button>
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
    <div class="action">
      <div class="d-flex username">
        <div class="name_info d-flex">
          <img src="@image/icons/username.png" alt="" />
          <div class="name">
            User Name
            <div class="seconds">a few seconds ago</div>
          </div>
        </div>
        <div>
          <img src="@image/icons/i.png" alt="" />
        </div>
      </div>
      <div class="sell-department">
        BÁN CĂN HỘ VINHOMES TẦNG CAO VIEW BIỂN FULL NỘI THẤT ĐẸP
      </div>
      <div class="address">
        <img src="@image/icons/nam.png" alt="" />
        <span>Nam</span>
        <img src="@image/icons/address.png" alt="" />
        <span>Nguyễn Hữu Cảnh, Bình Thạnh</span>
      </div>
      <div class="content" v-bind:class="{ adjust: read }">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
        Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
        is simply dummy text of the printing and typesetting industry. Lorem Ipsum is
        simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply
        dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy
        text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of
        the printing and typesetting industry.

        <br />
      </div>
      <button class="more-info" @click="readMore">
        {{ read ? "Rút gọn" : "Xem thêm" }}
      </button>
      <v-row no-gutters class="house-img">
        <CoolLightBox :items="items" :index="index" @close="index = null"> </CoolLightBox>

        <div class="images-wrapper">
          <img
            v-for="(image, imageIndex) in items"
            :key="imageIndex"
            @click="index = imageIndex"
            :src="image.src"
          />
          <div class="overlay">+8</div>
        </div>
      </v-row>
      <v-row no-gutters class="comment_like">
        <v-col cols="4" align="center">
          <button>
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
export default {
  components: {
    CoolLightBox,
  },
  data: function () {
    return {
      read: false,
      items: [
        {
          title: "In nature, nothing is perfect and everything is perfect",
          description: "Photo by Lucas",
          src: require(`@/assets/images/layouts/house1.png`),
        },
        {
          title: "A beautiful mountain view",
          description: "Photo by Facundo",
          src: require("@/assets/images/layouts/house2.png"),
        },
        {
          title: "In nature, nothing is perfect and everything is perfect",
          description: "Photo by Lucas",
          src: require(`@/assets/images/layouts/house3.png`),
        },
        {
          title: "A beautiful mountain view",
          description: "Photo by Facundo",
          src: require("@/assets/images/layouts/house4.png"),
        },
      ],
      index: null,
    };
  },
  methods: {
    readMore: function () {
      this.read = !this.read;
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
  .content {
    font-weight: 300;
    font-size: 13px;
    line-height: 24px;
    letter-spacing: 0.5px;
    height: 25px;
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
    img {
      width: 48%;
      margin-bottom: 3%;
    }
    img:nth-child(1),
    img:nth-child(3) {
      margin-right: 4%;
    }
    .images-wrapper {
      position: relative;
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
