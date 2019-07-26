// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import fastClick from "fastclick";
import Cube from "cube-ui";
import "babel-polyfill";
import "style/border.css";
import "style/reset.css";
import "style/iconfont.css";

Vue.use(Cube);
Vue.config.productionTip = false;
fastClick.attach(document.body);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
