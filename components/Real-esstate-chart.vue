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
<<<<<<< HEAD

=======
import { mapState, mapActions } from "vuex";
import moment from "moment";
>>>>>>> main
export default {
  components: {
    LineChart,
  },
  data() {
    return {
      datacollection: {},
<<<<<<< HEAD
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
=======
      toggle_exclusive: 1,
    };
  },
  mounted() {
    // this.fillData();
    this.getTableData();
  },
  watch: {
    toggle_exclusive: function () {
      this.getTableData();
    },
  },
  computed: {
    ...mapState("homepage", ["dataTable"]),
  },
  methods: {
    renderDataTable() {
      if (this.toggle_exclusive == 2) {
        this.datacollection.labels = this.dataTable.map((u) => `T${u.month}`);
      } else if (this.toggle_exclusive == 1) {
        this.datacollection.labels = this.dataTable.map((u) => `Tuần${u.week}-${u.year}`);
      } else if (this.toggle_exclusive == 0) {
        this.datacollection.labels = this.dataTable.map((u) =>
          moment(u.date).format("DD-MM")
        );
      }
      this.datacollection = {
        ...this.datacollection,
>>>>>>> main
        datasets: [
          {
            label: "BĐS",
            borderColor: "#2DB7F5",
            pointBorderColor: "#2DB7F5",
<<<<<<< HEAD
            pointBorderWidth: 2,
            data: [34, 45, 34, 56, 35, 56, 54, 23, 43, 45, 34, 56],
=======
            pointBorderWidth: 1,
            data: this.dataTable.map((u) => u.count),
>>>>>>> main
            tension: 0.1,
            fill: false,
          },
        ],
        options: {
          legend: {
            display: false,
          },
<<<<<<< HEAD
        },
      };
=======
          // tooltips: {
          //   callbacks: {
          //     labelColor: function (context) {
          //       return {
          //         borderColor: "rgb(0, 0, 255)",
          //         backgroundColor: "rgb(255, 0, 0)",
          //         borderWidth: 2,
          //         borderDash: [2, 2],
          //         borderRadius: 2,
          //       };
          //     },
          //     labelTextColor: function (context) {
          //       return "#fffff";
          //     },
          //   },
          // },
        },
      };
      // };
    },
    async getTableData() {
      let min_times = "";
      let max_times;
      if (this.toggle_exclusive == 2) {
        min_times = moment().subtract(1, "years").format("YYYY-MM-DD");
        max_times = moment().format("YYYY-MM-DD");
      } else if (this.toggle_exclusive == 1) {
        min_times = moment().subtract(210, "days").format("YYYY-MM-DD");
        max_times = moment().format("YYYY-MM-DD");
      } else if (this.toggle_exclusive == 0) {
        min_times = moment().subtract(30, "days").format("YYYY-MM-DD");
        max_times = moment().format("YYYY-MM-DD");
      }
      try {
        await this.$store.dispatch("homepage/getTableDataList", {
          code:
            this.toggle_exclusive == 2
              ? "month"
              : this.toggle_exclusive == 1
              ? "week"
              : "day",
          min_times,
          max_times,
        });
        this.renderDataTable();
      } catch {}
>>>>>>> main
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
    right: 8%;
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
