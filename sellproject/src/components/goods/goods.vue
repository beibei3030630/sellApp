<template>
  <div>
    <div class="wrapper">
      <div class="goodsList">
        <div ref="navBar" class="navBarSize">
          <div class="navbarContainer">
            <div
              class="navbar"
              v-for="(categoryItem,categoryIndex) of goodsData"
              :key="categoryIndex"
              @click="watchCategoryItem(categoryItem.name);selectedNavbar(categoryIndex)"
              :class="{active:selectedIndex==categoryIndex}"
            >
              <div class="naviTitle">
                <span
                  class="icon"
                  v-show="categoryItem.type>0"
                  :class="classMap[categoryItem.type]"
                ></span>
                {{categoryItem.name}}
              </div>
            </div>
          </div>
        </div>
        <div ref="scrollContent" class="scrollContentSize">
          <div class="mainContent">
            <div
              class="category"
              v-for="(categoryItem,categoryIndex) of goodsData"
              :key="categoryIndex"
              :ref="categoryItem.name"
            >
              <div class="categoryTitle">{{categoryItem.name}}</div>
              <div
                class="goodsContainer border-top"
                v-for="(goodsItem,goodsIndex) of categoryItem.foods"
                :key="goodsIndex"
                @click="clickFood(goodsItem)"
              >
                <div class="goodsImg">
                  <img :src="goodsItem.image" />
                </div>
                <div class="goodsContent">
                  <div class="title">{{goodsItem.name}}</div>
                  <div class="info">
                    <span>月销{{goodsItem.sellCount}}份</span>
                    <span>好评率{{goodsItem.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="symbol">￥</span>
                    <span class="newPrice">{{goodsItem.price}}</span>
                    <span class="oldPrice" v-if="goodsItem.oldPrice">￥{{goodsItem.oldPrice}}</span>
                  </div>
                </div>
                <cartcontrol class="cartControl" :food="goodsItem"></cartcontrol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <shop-cart
      :selectFood="selectFood"
      :deliverPrice="seller.deliveryPrice"
      :minPrice="seller.minPrice"
    ></shop-cart>
    <food :food="foodDetail" ref="food" @backHome="backHome"></food>
  </div>
</template>

<script>
import axios from "axios";
import Bscroll from "better-scroll";
import shopCart from "../shopcart/shopcart";
import cartcontrol from "../cartcontrol/cartcontrol";
import food from "../food/food";
export default {
  name: "goods",
  components: {
    shopCart,
    cartcontrol,
    food
  },
  props: {
    seller: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  mounted() {
    this.getGoodsData();
    this.navBarScroll = new Bscroll(this.$refs.navBar);
    this.scrollContent = new Bscroll(this.$refs.scrollContent);
  },
  data() {
    return {
      classMap: ["decrease", "discount", "special", "invoice", "guarantee"],
      goodsData: [],
      categoryTitle: "",
      selectedIndex: 0,
      foodDetail: {},
      clickedFood: false
    };
  },
  methods: {
    async getGoodsData() {
      const resData = await axios("/api/data.json");
      if (String(resData.status).startsWith("2") && resData.data) {
        this.goodsData = resData.data.goods;
      }
    },
    watchCategoryItem(e) {
      this.categoryTitle = e;
    },
    selectedNavbar(index) {
      this.selectedIndex = index;
    },
    clickFood(goodsItem) {
      this.foodDetail = goodsItem;
      this.clickedFood = true;
      this.$refs.food.show();
    },
    backHome() {
      this.clickedFood = false;
    }
  },
  watch: {
    categoryTitle() {
      if (this.categoryTitle) {
        this.scrollContent.scrollToElement(this.$refs[this.categoryTitle][0]);
      }
    }
  },
  computed: {
    selectFood() {
      let foods = [];
      this.goodsData.forEach(good => {
        let foodsArr = good.foods;
        foodsArr.forEach(food => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  }
};
</script>

<style scoped lang='stylus'>
@import '~style/stylus/index.styl'
.wrapper
  position fixed
  top 348px
  left 0
  right 0
  bottom 92px
  overflow hidden
  .goodsList
    width 100%
    display flex
    .navBarSize
      position fixed
      top 348px
      left 0
      width 160px
      bottom 92px
      overflow hidden
      .navbarContainer
        width 160px
        display flex
        flex-direction column
        box-sizing border-box
        .navbar
          display flex
          flex-flow column wrap
          justify-content center
          align-items center
          height 108px
          width 100%
          border-bottom 1px solid rgba(7, 17, 27, 0.1)
          background #f3f5f7
          &.active
            background #fff
          .naviTitle
            padding 0 24px
            font-size 24px
            color rgb(7, 17, 27)
            line-height 28px
            span
              &.icon
                vertical-align top
                margin-right 4px
                margin-bottom 8px
                &.decrease
                  bg-image(24px, 24px, 'decrease_3')
                &.discount
                  bg-image(24px, 24px, 'discount_3')
                &.special
                  bg-image(24px, 24px, 'special_3')
                &.invoice
                  bg-image(24px, 24px, 'invoice_3')
                &.guarantee
                  bg-image(24px, 24px, 'guarantee_3')
    .scrollContentSize
      position fixed
      top 348px
      left 160px
      right 0
      bottom 92px
      overflow hidden
      .mainContent
        flex 1
        .category
          width 100%
          .categoryTitle
            padding-left 28px
            background #f3f5f7
            border-left 8px #d9dde1 solid
            font-size 24px
            color rgb(147, 153, 159)
            line-height 52px
          .goodsContainer
            display flex
            padding 36px
            box-sizing border-box
            &.border-top
              border-1px(rgb(7, 17, 27, 0.1))
            .goodsImg
              width 128px
              height 128px
              img
                width 100%
                height 100%
            .goodsContent
              flex 1
              display flex
              flex-direction column
              justify-content space-between
              margin-left 20px
              .title
                font-size 28px
                color rgb(7, 17, 27)
              .info
                font-size 20px
                color rgb(147, 153, 159)
                span
                  &:firstChild
                    margin-right 24px
              .price
                span
                  &.symbol
                    font-size 20px
                    color rgb(240, 20, 20)
                    font-weight normal
                  &.newPrice
                    font-size 32px
                    color rgb(240, 20, 20)
                    margin-left -10px
                    font-weight 700
                  &.oldPrice
                    font-size 20px
                    color rgb(147, 153, 159)
                    font-weight 700
                    margin-left 16px
                    text-decoration line-through
            .cartControl
              position absolute
              bottom 25px
              right 36px
</style>
