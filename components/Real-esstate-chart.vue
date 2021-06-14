<template>
  <div class="small estate_chart">
    <line-chart
      :chart-data="datacollection"
      :height="160"
      :options="datacollection.options"
    ></line-chart>
    <v-btn-toggle v-model="toggle_exclusive" mandatory id="date_option">
      <v-btn class="btn_date"> Ngày </v-btn>
      <v-btn class="btn_date"> Tuần </v-btn>
      <v-btn class="btn_date"> Tháng </v-btn>
    </v-btn-toggle>
  </div>
</template>

<script>
// Chart.defaults.global.legend.display = false;
import LineChart from "@lib/LineChart.js";

export default {
  components: {
    LineChart,
  },
  data() {
    return {
      datacollection: {},
      toggle_exclusive: undefined,
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: [
          "T1",
          "T2",
          "T3",
          "T4",
          "T5",
          "T6",
          "T7",
          "T8",
          "T9",
          "T10",
          "T11",
          "T12",
        ],
        datasets: [
          {
            label: "BĐS",
            borderColor: "#2DB7F5",
            pointBorderColor: "#2DB7F5",
            pointBorderWidth: 2,
            data: [34, 45, 34, 56, 35, 56, 54, 23, 43, 45, 34, 56],
            tension: 0.1,
            fill: false,
          },
        ],
        options: {
          legend: {
            display: false,
          },
        },
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.small {
  max-width: 600px;
  margin: 150px auto;
}
.estate_chart {
  margin-top: 55px;
  position: relative;
  #date_option {
    position: absolute;
    top: -35px;
    left: 65%;
    border-radius: 2px;
    border: 1px solid rgb(182, 182, 182);
    .btn_date {
      text-transform: capitalize;
      background-color: #fff;
      font-size: 11px;
      height: 28px !important;
      font-weight: 500 !important;
      border: none;
      padding: 0 8px;
    }
    .v-btn--active {
      background-color: #fbad18;
      color: #ffff;
    }
  }
}
</style>
