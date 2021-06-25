<template>
  <v-lazy
    v-model="isActive"
    :options="{
      threshold: 0.5,
    }"
    min-height="200"
    transition="fade-transition"
    max-height="300"
  >
    <v-container fluid id="homepage">
      <v-row no-gutters>
        <v-col cols="7" class="action">
          <div class="pt-0 new-action">Hoạt động mới cập nhật</div>
          <NewAction />
        </v-col>
        <v-col cols="5" class="detail_data">
          <div class="pt-0 time-action" tile>Bất động sản theo thời gian</div>
          <div class="chart">
            <RealEstateChart />
          </div>
          <Overview />
          <Notification />
          <Special />
        </v-col>
      </v-row>
    </v-container>
  </v-lazy>
</template>

<script>
import RealEstateChart from "@component/Real-esstate-chart.vue";
import NewAction from "@component/NewAction.vue";
import Overview from "@component/Overview.vue";
import Notification from "@component/Notification.vue";
import Special from "@component/Special.vue";

export default {
  components: {
    RealEstateChart,
    NewAction,
    Overview,
    Notification,
    Special,
  },
  data() {
    return {
      isActive: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();

      setTimeout(() => this.$nuxt.$loading.finish(), 500);
    });
  },
};
</script>

<style lang="scss" scoped>
#homepage {
  padding: 8px 24px;
}
.new-action {
  font-weight: 400;
  font-size: 14px;
}
.time-action {
  font-weight: 500;
  font-size: 15px;
  color: #fbad18;
  letter-spacing: 0.5px;
}
.detail_data {
  overflow-y: auto;
  height: 700px;
  .chart {
    height: 300px;
    background: #ffffff;
    border-radius: 15px;
    margin-top: 15px;
    padding-top: 5px;
  }
}
.action {
  overflow-y: auto;
  height: 700px;
}
div::-webkit-scrollbar {
  width: 3px !important;
  opacity: 0.1 !important;
}
</style>
