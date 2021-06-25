<template>
  <div id="select_box">
    <v-select :options="options" label="title" placeholder="Tất cả">
      <template slot="option" slot-scope="option">
        <img :src="option.cardImage" />
        <!-- <span class="number">{{ option.number }}</span> -->
        {{ option.title }}
      </template>
    </v-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          title: "Tất cả",
          cardImage: require("@image/layouts/house1.png"),
          number: 0,
        },
        {
          title: "1 tỷ",
          cardImage: require("@image/layouts/house2.png"),
          number: 0,
        },
        {
          title: "5 tỷ",
          cardImage: require("@image/layouts/house3.png"),
          number: 1,
        },
        {
          title: "2-3 tỷ",
          cardImage: require("@image/layouts/house4.png"),
          number: 2,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
