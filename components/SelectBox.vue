<template>
  <div id="select_box">
    <v-select :options="options" label="title" placeholder="Tất cả">
      <template slot="option" slot-scope="option">
        <img :src="option.cardImage" />
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
        },
        {
          title: "1 tỷ",
          cardImage: require("@image/layouts/house2.png"),
        },
        {
          title: "5 tỷ",
          cardImage: require("@image/layouts/house2.png"),
        },
        {
          title: "2-3 tỷ",
          cardImage: require("@image/layouts/house2.png"),
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
