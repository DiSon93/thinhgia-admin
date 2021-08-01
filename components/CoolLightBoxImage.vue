<template>
  <div class="house-img">
    <CoolLightBox
      :items="items"
      :index="index"
      :fullScreen="true"
      :useZoomBar="true"
      @close="index = null"
      v-if="items.length > 0"
    >
    </CoolLightBox>

    <div class="images-wrapper">
      <a href="javascript:;">
        <img
          v-for="(image, imageIndex) in items"
          :key="imageIndex"
          @click="index = imageIndex"
          :src="image.src"
        />

        <div v-if="items.length > 4" class="overlay" @click="index = 3">
          +{{ items.length - 4 }}
        </div>
      </a>
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
    };
  },
};
</script>

<style lang="scss" scoped>
.house-img {
  // margin-bottom: 5px;
  // display: flex;
  // .images-wrapper {
  //   width: 50%;
  // }
  max-height: 238px;
  overflow: hidden;
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
      top: 120px;
      left: 52%;
      width: 48%;
      height: 100px;
      text-align: center;
      color: #fff;
      font-size: 24px;
      padding-top: 5%;
      background-color: rgba(0, 0, 0, 0.329);
    }
  }
}
</style>
