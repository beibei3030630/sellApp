<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tabContainer border-bottom">
      <div class="tab">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller" />
    </keep-alive>
  </div>
</template>

<script>
import Header from "components/header/header";
import axios from "axios";
export default {
  components: {
    "v-header": Header
  },
  name: "App",
  mounted() {
    this.getSellerData();
  },
  methods: {
    async getSellerData() {
      const res = await axios({
        url: "/api/data.json",
        method: "get"
      });
      if (String(res.status).startsWith("2") && res.data) {
        this.seller = res.data.seller;
      }
    }
  },
  data() {
    return {
      seller: {}
    };
  }
};
</script>

<style lang="stylus" scoped>
.tabContainer
  line-height 80px
  height 80px
  display flex
  justify-content space-between
  align-items center
  .tab
    flex 1
    text-align center
    &>a
      display block
      font-size 28px
      color rgb(77, 86, 93)
      &.active
        color rgb(240, 20, 20)
</style>
