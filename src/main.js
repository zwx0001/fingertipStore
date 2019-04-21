import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/js/flexible.js";
//swiper
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
Vue.use(VueAwesomeSwiper);

import http from "./utils/http";
import loading from "./components/loading";
import createMessage from "./components/message/index";
import createAlert from "./components/alert/index";
import createConfirm from "./components/confirm/index";

Vue.config.productionTip = false;
Vue.use(http); //axios
Vue.use(loading); //loging组件
Vue.use(createMessage); //消息提示框
Vue.use(createAlert); //alert提示框
Vue.use(createConfirm); //confirm 确认框

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
