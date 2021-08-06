<template>
  <v-lazy
    v-model="isActive"
    :options="{
      threshold: 0.5,
    }"
    min-height="200"
    transition="fade-transition"
  >
    <v-container fluid id="homepage">
      <v-row align="center" class="res_homapage">
        <v-col cols="12" sm="4">
          <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="app-bar-icon" />
          <button class="homepage" disabled>Trang chủ</button>
        </v-col>
        <v-col cols="12" sm="4" class="col_search">
          <b-input-group class="search">
            <b-input-group-prepend is-text>
              <b-icon icon="search"></b-icon>
            </b-input-group-prepend>
            <b-form-input
              placeholder="Tìm kiếm tất cả thông tin"
              type="search"
            ></b-form-input>
          </b-input-group>
        </v-col>
        <v-col cols="12" sm="4">
          <v-btn color="warning" dark id="createBDS"
            ><img src="@image/icons/Vector.svg" />Tạo BĐS
          </v-btn>

          <v-btn class="account" fab><v-icon dark small>mdi-account</v-icon></v-btn>
          <v-btn class="notifiaction" fab
            ><img src="@image/icons/bell-badge-noti.jpg" alt=""
          /></v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters v-if="isWidth">
        <v-col cols="12" md="7" class="action" v-bind:style="{ height: height1 + 'px' }">
          <div class="pt-0 new-action">Hoạt động mới cập nhật</div>
          <NewAction />
        </v-col>
        <v-col
          cols="12"
          md="5"
          class="detail_data"
          v-bind:style="{ height: height2 + 'px' }"
        >
          <div class="pt-0 time-action" tile>Bất động sản theo thời gian</div>
          <!-- <div id="app">
            <div v-for="(message, index) in messages" :key="index">
              {{ message.type }} : {{ message.message }}
            </div>
            <input type="text" v-model="text" />
            <button @click="sendMessage">Send</button>
          </div> -->

          <div class="chart">
            <RealEstateChart />
          </div>
          <Overview />
          <Notification />
          <Special />
        </v-col>
      </v-row>
      <v-row no-gutters v-else>
        <v-col cols="12" md="7" class="action">
          <div class="pt-0 new-action">Hoạt động mới cập nhật</div>
          <NewAction />
        </v-col>
        <v-col cols="12" md="5" class="detail_data">
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
import io from "socket.io-client";
// var socket = io.connect("https://thinhgiacore.demo.fit/socket.io");
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
      isWidth: window.innerWidth > 1263 ? true : false,
      height1: window.innerHeight - 130,
      height2: window.innerHeight - 110,
      text: "",
      // messages: [],
    };
  },
  // created() {
  //   let vm = this;
  //   this.$socket.on("bds", (data) => {
  //     console.log(data);
  //   });
  // },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 500);
    });

    // use "main" socket defined in nuxt.config.js
    // this.socket = this.$nuxtSocket({
    //   name: "main", // select "main" socket from nuxt.config.js - we could also skip this because "main" is the default socket
    // });

    // this.socket.on("bds", (tickId) => {
    //   console.log(tickId);
    //   console.log("TTTT");
    // });

    // this.$socket.emit("bds");
    // socket.on(
    //   "bds",
    //   function (data) {
    //     console.log("bds", data);
    //   }.bind(this)
    // );
    // this.sockets.listener.subscribe("bds", (data) => {
    //   debugger;
    //   console.log(data);
    //   this.$socket.emit("dbs");
    // });
    // this.$socket.emit("bds");
    // this.sockets.listener.subscribe("bds", (data) => {
    //   console.log("bds", data);
    // });
  },
  // sockets: {
  //   // initRoom: function (message) {
  //   //   // Đây là nơi nhận cái even initRoom với param là message mà server emit về
  //   //   this.messages.push({
  //   //     message,
  //   //     type: "status",
  //   //   });
  //   // },
  //   // statusRoom: function (message) {
  //   //   this.messages.push({
  //   //     message,
  //   //     type: "status",
  //   //   });
  //   // },
  //   // receiveMessage: function (message) {
  //   //   console.log("GGGG");
  //   //   this.messages.push({
  //   //     message,
  //   //     type: "receive",
  //   //   });
  //   // },
  //   // connect: function (data) {
  //   //   console.log(data);
  //   // },
  //   // customEmit: function (data) {
  //   //   console.log(data);
  //   // },
  //   message: function (data) {
  //     console.log("message", data);
  //   },
  //   notifications: function (data) {
  //     console.log("notifications", data);
  //   },
  // },
  methods: {
    // sendMessage() {
    //   if (this.text !== "") {
    //     this.$socket.emit("sendMessage", this.text); // emit lên server
    //     this.messages.push({
    //       message: this.text,
    //       type: "send",
    //     });
    //   }
    //   this.text = "";
    // },
    // getMessage() {
    //   return new Promise((resolve) => {
    //     this.socket.on("bds", (resp) => {
    //       this.text = resp;
    //       console.log(this.text);
    //       resolve();
    //     });
    //   });
    // },
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
  // height: 700px;
  .chart {
    // height: 300px;
    background: #ffffff;
    border-radius: 15px;
    margin-top: 15px;
    padding-top: 5px;
  }
}
.action {
  overflow-y: auto;
  // height: 700px;
}
div::-webkit-scrollbar {
  width: 3px !important;
  opacity: 0.1 !important;
}
.homepage {
  width: 77px;
  height: 25px;
  margin-left: 36px;
  // margin-top: 35px;
  background: #ffffff;
  border: 1px solid rgba(96, 96, 96, 0.2);
  border-radius: 15px;
  font-size: 12px;
  letter-spacing: 0.5px;
  color: #606060;
}
.search {
  // margin-left: 378px;
  position: relative;
  top: 12px !important;
  .bi-search {
    position: absolute;
    top: 5px;
    left: 16px;
    font-weight: 700;
    z-index: 9999;
    font-size: 16px;
  }
  .form-control {
    position: absolute;
    font-size: 12px;
    top: -26px;
    padding-left: 45px;
    height: 26px;
    letter-spacing: 0.5px;
    width: 295px;
    border-radius: 15px;
    border: 1px solid rgba(96, 96, 96, 0.2);
    border-left: none;
    &:hover {
      border: 1px solid blue;
      transition: 0.5s;
    }
  }
  .input-group-text {
    position: absolute;
    top: -26px;
    border: none;
    background-color: transparent;
  }
}
#createBDS {
  position: absolute;
  right: 40%;
  bottom: 0px;
  border-radius: 15px;
  width: 109px;
  height: 26px;
  border-radius: 15px;
  font-weight: 500;
  font-size: 12px;
  text-transform: capitalize;
  img {
    margin-top: -4px;
    margin-right: 4px;
    width: 17px;
    height: 15px;
  }
}
.account {
  position: absolute;
  right: 70px;
  padding: 0;
  bottom: 0px;
  width: 24px !important;
  height: 24px !important;
  border-radius: 50%;
  background-color: #fff !important;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.15);
  &:hover {
    border: 1px solid blue;
    transition: 0.5s;
  }
}
.notifiaction {
  position: absolute;
  right: 30px;
  bottom: 0px;
  border: none;
  box-shadow: none;
  background-color: #eff5f9 !important;
  width: 24px !important;
  height: 24px !important;
  img {
    width: 18px;
    height: 20.57px;
    border-radius: 50%;
  }
  &:hover {
    border: 1px solid blue;
    transition: 0.5s;
  }
}

@media screen and (max-width: 1263px) {
  .chart {
    height: 260px;
  }
}
@media screen and (min-width: 763px) {
  .res_homapage {
    display: none;
  }
}
@media screen and (max-width: 763px) {
  .chart {
    height: auto;
  }
  .v-sheet.v-toolbar:not(.v-sheet--outlined) {
    box-shadow: none;
  }
  .header_box {
    height: 140px !important;
    padding-top: -20px;
    display: none;
    margin-top: -30px;
  }
  .main_content {
    margin-top: 65px;
  }
  .app-bar-icon {
    display: none !important;
  }
  .col_search {
    padding: 15px 20px;
    .search {
      // margin-left: 30px;
      .form-control {
        width: 100% !important;
      }
      // margin-right: 30px;
    }
  }
  .res_homapage {
    margin-bottom: 35px;
  }
  .homepage {
    margin-left: 10px !important;
  }
  #homepage {
    padding: 8px 12px;
  }
  #createBDS {
    left: 20px;
    top: 10px;
  }
  .account {
    top: 10px;
  }
  .notifiaction {
    top: 10px;
  }
}
@media screen and (min-width: 1263px) {
  .chart {
    height: 300px;
  }
}
</style>
