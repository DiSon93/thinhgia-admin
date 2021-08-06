import Vue from 'vue'
import * as io from "socket.io-client";
import VueSocketIO from 'vue-socket.io'

Vue.config.productionTip = false

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'https://thinhgiacore.demo.fit',
}))
