<template>
  <div>
    <div class="shopCartContainer">
      <div class="leftContent">
        <div class="logoContainer" @click="foldShopCart">
          <div class="logoBgc" :class="{'highLight':totalCount>0}">
            <span class="iconfont shopCartIcon" v-show="totalCount==0"></span>
            <span class="iconfont highLightIcon" v-show="totalCount>0"></span>
            <span class="goodsNum" v-show="totalCount>0">{{totalCount}}</span>
          </div>
        </div>
        <div class="totalNum">
          <span class="totalSum" :class="{'highLight':totalPrice>0}">￥{{totalPrice}}</span>
          <span class="line"></span>
          <span class="tip">另需配送费￥{{deliverPrice}}元</span>
        </div>
      </div>
      <div class="submitBtn" :class="payClass" @click="pay">{{payDesc}}</div>
    </div>
    <div class="shopCartDetail" v-show="showDetail">
      <div class="head">
        <h3 class="title">购物车</h3>
        <span class="clear" @click="clearShopCart">清空</span>
      </div>
      <div class="listWrapper" ref="list">
        <ul>
          <li class="detailContent" v-for="(food,foodIndex) of selectFood" :key="foodIndex">
            <span clss="name">{{food.name}}</span>
            <div class="priceContainer">
              <span class="price">￥{{food.price}}</span>
              <cart-control :food="food" class="cartcontrol"></cart-control>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="shopCartBgc" v-show="showDetail" @click="foldShopCart"></div>
  </div>
</template>

<script>
import cartControl from "../cartcontrol/cartcontrol";
import Bscroll from "better-scroll";
export default {
  name: "shopCart",
  props: {
    selectFood: {
      type: Array,
      default() {
        return [];
      }
    },
    deliverPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    this.listScroll = new Bscroll(this.$refs.list);
  },
  watch: {
    selectFood(newVal) {
      console.log(newVal);
    }
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.selectFood.forEach(food => {
        total += food.price * food.count;
      });
      return total;
    },
    totalCount() {
      let totalCount = 0;
      this.selectFood.forEach(food => {
        totalCount += food.count;
      });
      return totalCount;
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}起送`;
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice;
        return `还差${diff}元起送`;
      } else {
        return "去结算";
      }
    },
    payClass() {
      if (this.totalPrice < this.minPrice) {
        return "no-enough";
      }
      return "enough";
    },
    showDetail() {
      // 如果总数没有了，说明要折叠起来，显示也要隐藏
      if (!this.totalCount) {
        this.fold = true;
        return false;
      }
      //下面的时常规操作，如果折叠为true则隐藏面板，如果折叠为false则显示面板
      let show = !this.fold;
      return show;
    }
  },
  components: {
    cartControl
  },
  data() {
    return {
      fold: true
    };
  },
  methods: {
    foldShopCart() {
      if (!this.totalCount) {
        return false;
      }
      this.fold = !this.fold;
    },
    clearShopCart() {
      this.selectFood.forEach(food => {
        food.count = 0;
      });
      this.fold = true;
    },
    pay() {
      if (this.totalPrice < this.minPrice) {
        return false;
      }
      window.alert(`支付${this.totalPrice}元`);
      this.clearShopCart();
    }
  }
};
</script>

<style scoped lang='stylus'>
.shopCartContainer
  background #141d27
  width 100%
  display flex
  height 92px
  color rgba(255, 255, 255, 0.4)
  line-height 92px
  align-items center
  position fixed
  bottom 0
  left 0
  right 0
  z-index 150
  .leftContent
    flex 1
    display flex
    .logoContainer
      margin 0 18px
      height 126px
      width 125px
      border-radius 50%
      background #141d27
      position relative
      top -10px
      .logoBgc
        background #2b343c
        margin 12px
        border-radius 50%
        &.highLight
          background rgb(0, 160, 220)
        .shopCartIcon:before
          content '\e63a'
          font-size 48px
          position relative
          left 25px
          color rbga(255, 255, 255, 0.4)
        .highLightIcon:before
          content '\e63a'
          font-size 48px
          position relative
          left 25px
          color #fff
        .goodsNum
          width 48px
          height 50px
          padding 0 12px
          background rgb(240, 20, 20)
          color #ffffff
          text-align center
          line-height 50px
          position absolute
          top -20px
          right -15px
          border-radius 50px
          font-weight 700
          font-size 18px
          box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
    .totalNum
      display flex
      align-items center
      .totalSum
        font-size 42px
        &.highLight
          color #fff
      .line
        border-left 2px rgba(255, 255, 255, 0.1) solid
        height 50px
        margin 0 24px
      .tip
        font-size 24px
        font-weight 700
  .submitBtn
    width 210px
    padding 0 16px
    text-align center
    background #2b333b
    font-size 32px
    font-weight 700
    line-height 92px
    &.not-enough
      background #2b333b
    &.enough
      background #048b41
      color #fff
.shopCartDetail
  position absolute
  padding-bottom 140px
  bottom 0
  background #fff
  z-index 130
  width 100%
  .head
    border-bottom 2px solid rgba(7, 17, 27, 0.1)
    background #f3f5f7
    height 80px
    line-height 80px
    padding 0 36px
    display flex
    justify-content space-between
    .title
      font-size 28px
      font-weight 200
    .clear
      font-size 24px
      color rgb(0, 160, 220)
  .listWrapper
    max-height 434px
    overflow hidden
    .detailContent
      line-height 96px
      margin 0 36px
      height 96px
      display flex
      justify-content space-between
      border-bottom 2px solid rgba(7, 17, 27, 0.1)
      .name
        font-size 28px
        color rgb(7, 17, 27)
      .priceContainer
        display flex
        align-items center
        .price
          font-size 28px
          font-weight 700
          color rgb(240, 20, 20)
          margin-right 24px
        .cartcontrol
          position relative
          top 2px
.shopCartBgc
  background rgba(7, 17, 27, 0.6)
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  filter blur(10px)
  z-index 100
</style>
