<template>
  <div class="house-img">
    <CoolLightBox
      :items="imageList"
      :index="index"
      :fullScreen="true"
      :useZoomBar="true"
      @close="index = null"
      v-if="imageList.length > 0"
    >
    </CoolLightBox>

    <div class="images-wrapper">
      <a href="javascript:;">
        <img
          v-for="(image, imageIndex) in imageList.slice(0, 4)"
          :key="imageIndex"
          @click="index = imageIndex"
          :src="image.src"
        />

        <div v-if="imageList.length > 4" class="overlay" @click="index = 3">
          +{{ imageList.length - 4 }}
        </div>
      </a>
      <video width="320" height="240" controls v-for="video in videoList" :key="video.id">
        <source :src="video.src" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
</template>

<script>
import CoolLightBox from "vue-cool-lightbox";
import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css";
export default {
  props: ["items"],
  components: {
    CoolLightBox,
  },
  data() {
    return {
      index: null,
      imageList: [],
      videoList: [],
    };
  },
  mounted() {
    this.imageList = this.items.filter((u, i) => u.type != "video");
    this.videoList = this.items.filter((u, i) => u.type == "video");
  },
};
</script>

<style lang="scss" scoped>
.house-img {
  .images-wrapper {
    position: relative;
    display: flex;
    justify-content: space-between;
    a img {
      width: 200px !important;
      height: 200px !important;
      margin-right: 30px !important;
    }
    .overlay {
      position: absolute;
      top: 0px;
      left: 690px;
      width: 200px;
      height: 200px;
      text-align: center;
      color: #fff;
      font-size: 24px;
      padding-top: 9%;
      background-color: rgba(0, 0, 0, 0.329);
    }
  }
}
</style>
