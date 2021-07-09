<template>
  <div class="createBDS">
    <div class="header_form">
      <div class="header_left d-flex">
        <div class="create_title">Tạo bất động sản</div>
        <v-btn-toggle v-model="text" tile group>
          <v-btn value="left" @click="isSell = true"> Bán </v-btn>
          <v-btn value="center" @click="isSell = false"> Cho thuê </v-btn>
        </v-btn-toggle>
      </div>
      <el-button type="danger" icon="el-icon-close" circle size="mini"></el-button>
    </div>
    <div class="ban" v-if="isSell">
      <CreateBDS />
    </div>
    <div class="chothue" v-else>
      <CreateBDSThue />
    </div>
  </div>
</template>

<script>
import CreateBDS from "@component/Form/CreateBDS";
import CreateBDSThue from "@component/Form/CreateBDSThue";
export default {
  components: {
    CreateBDS,
    CreateBDSThue,
  },
  data() {
    return {
      isSell: true,
      text: "left",
      shownmore: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.createBDS {
  margin-top: -60px;
  .header_form {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
    .header_left {
      align-items: center;
    }
    .create_title {
      font-weight: bold;
      font-size: 12px;
      line-height: 24px;
      letter-spacing: 0.5px;
    }
    .el-button--mini.is-circle {
      width: 28px;
      height: 28px;
    }
    .v-btn-toggle {
      margin-left: 5px;
    }
    .v-btn.v-btn.v-size--default {
      text-transform: capitalize;
      width: 90px;
      height: 25px;
      background: #fff !important;
      box-sizing: border-box;
      border-radius: 15px;
      box-shadow: none;
      border: 1px solid #dfdfdf;
      font-size: 12px;
      font-weight: 400;
      &:hover {
        background-color: #fdd27f !important;
        color: #fff;
      }
    }
    .v-item--active.v-btn--active.v-btn--is-elevated {
      background: #fbad18 !important;
      color: #fff;
    }
  }
}
</style>
