<template>
  <transition name="move">
    <div v-show="clicked" ref="foodWrapper" class="foodWrapper">
      <div class="foodContainer">
        <div class="foodImage">
          <i class="iconfont backIcon" @click="_backHome"></i>
          <img :src="food.image" />
        </div>
        <div class="foodInfo">
          <h2 class="title">{{food.name}}</h2>
          <div class="desc">
            <span>月销{{food.sellCount}}份</span>
            <span>好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="newPrice">￥{{food.price}}</span>
            <span class="oldPrice" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <transition name="fade">
            <div
              class="addContainer"
              v-show="!food.count||food.count===0"
              @click="addShopCart"
            >加入购物车</div>
          </transition>
          <cartcontrol :food="food" class="cartcontrol"></cartcontrol>
        </div>
        <separate></separate>
        <div class="foodIntro">
          <h3 class="title">商品介绍</h3>
          <div class="content">{{food.info}}</div>
        </div>
        <separate></separate>
        <div class="foodComment">
          <h3 class="title">商品评价</h3>
          <rating-select
            :ratings="food.ratings"
            :selectType="selectType"
            :onlyContent="onlyContent"
            :desc="desc"
            @chooseBtn="chooseBtn"
            @toggleSwitch="toggleSwitch"
          ></rating-select>
          <div class="commentContainer">
            <ul v-show="food.ratings&&food.ratings.length">
              <li v-for="rating of food.ratings" v-show="needShow(rating.rateType,rating.text)">
                <div class="commentDetail">
                  <span class="date">{{rating.rateTime | formatDate}}</span>
                  <div class="commentContent">
                    <i class="iconfont goodIcon" :class="{'badIcon':rating.rateType===1}"></i>
                    <span>{{rating.text}}</span>
                  </div>
                  <div class="userInfo">
                    <span class="name">{{rating.username}}</span>
                    <img class="avatar" :src="rating.avatar" />
                  </div>
                </div>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings||!food.ratings.length">暂无评论</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import cartcontrol from "../cartcontrol/cartcontrol";
import separate from "../separate/separate";
import ratingSelect from "../ratingSelect/ratingSelect";
import Bscorll from "better-scroll";
import Vue from "vue";
import { formatDate } from "@/assets/utils/util";
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
export default {
  name: "food",
  components: {
    cartcontrol,
    separate,
    ratingSelect
  },
  mounted() {
    this.scroll = new Bscorll(this.$refs.foodWrapper);
  },
  props: {
    food: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      clicked: false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: "全部",
        positive: "推荐",
        negative: "吐槽"
      }
      //   tagClass: ["allTag", "goodTag", "badTag"]
    };
  },
  computed: {},
  filters: {
    formatDate(time){ 
       let date=new Date(time);
       return formatDate(date,'yyyy-MM-dd hh:mm')
    }
  },
  methods: {
    _backHome() {
      this.clicked = false;
    },
    show() {
      this.clicked = true;
      this.selectType = ALL;
      this.onlyContent = true;
    },
    addShopCart() {
      Vue.set(this.food, "count", 1);
    },
    chooseBtn(selectType) {
      this.selectType = selectType;
    },
    toggleSwitch() {
      this.onlyContent = !this.onlyContent;
    },
    needShow(type, text) {
      if (this.onlyContent && !text) {
        return false;
      }
      if (this.selectType === ALL) {
        return true;
      } else {
        return type === this.selectType;
      }
    }
  }
};
</script>

<style scoped lang='stylus'>
.foodWrapper
  position fixed
  top 0
  left 0
  right 0
  bottom 92px
  background #fff
  z-index 99
  overflow hidden
  transform translate3d(0, 0, 0)
  &.move-enter-active, &.move-leave-active
    transition all 0.2s linear
  &.move-enter, &.move-leave-active
    transform translate3d(100%, 0, 0)
  .foodContainer
    width 100%
    .foodImage
      width 100%
      position relative
      height 0
      padding-bottom 100%
      overflow hidden
      .backIcon:before
        content '\e609'
        color #fff
        position absolute
        top 30px
        left 30px
        font-size 52px
        z-index 50
      img
        position absolute
        top 0
        left 0
        height 100%
        width 100%
    .foodInfo
      position relative
      margin 36px
      .title
        font-size 28px
        font-weight 700
        color rgb(7, 17, 27)
      .desc
        font-size 20px
        color rgb(147, 153, 159)
        margin 16px 0 36px 0
        &:first-child
          margin-right 24px
      .price
        .newPrice
          font-size 28px
          font-weight 700
          color rgb(240, 20, 20)
        .oldPrice
          font-size 20px
          font-weight 700
          color rgb(147, 153, 159)
          text-decoration line-through
      .addContainer
        position absolute
        bottom 0
        right 0
        font-size 20px
        padding 0 24px
        box-sizing border-box
        color #ffffff
        background rgb(0, 160, 220)
        border-radius 24px
        height 50px
        line-height 50px
        z-index 10
        opacity 1
        &.fade-enter-active, &.fade-leave-active
          transition all 0.2s
        &.fade-enter, &.fade-leave-active
          opacity 0
      .cartcontrol
        position absolute
        bottom 0
        right 0
    .foodIntro
      margin 36px
      .title
        font-size 28px
        color rgb(7, 17, 27)
      .content
        font-size 24px
        font-weight 200
        color #777d83
        margin 12px 16px 0 16px
        line-height 48px
    .foodComment
       padding 36px
      .title
        font-size 28px
        color rgb(7, 17, 27)
      .tagList
        display flex
        align-items center
        padding-bottom 36px
        border-bottom 1px solid rgba(7, 17, 27, 0.1)
        .commentTag
          border-radius 2px
          margin-right 16px
          padding 16px 24px
          &.allTag
            background #00a0dc
            span
              color #fff
              &.desc
                font-size 24px
              &.num
                font-size 16px
          &.goodTag
            background #ccecf8
            span
              color #647079
                &.desc
                  font-size 24px
                &.num
                  font-size 16px
        &.badTag
          background #e9ebec
            span
              color #757c82
              &.desc
                font-size 24px
              &.num
                font-size 16px
        .filterCommnet
          padding 24px 0
          display flex
          align-items center
          border-bottom 4px solid #e6e7e8
          .chooseIcon:before
            content '\e62a'
            color #b7bbbf
            position relative
            top -4px
            font-size 48px
            span
              font-size 24px
              color rgb(147, 153, 159)
              margin-left 8px
      .commentContainer
        .commentDetail
          padding 32px 0
          position relative
          border-bottom 1px solid rgba(7, 17, 27, 0.1)
          .date
            font-size 20px
            color rgb(147, 153, 159)
          .commentContent
            display flex
            align-items center
            margin-top 12px
            i
              margin-right 8px
              &.goodIcon:before
                content '\e62c'
                color #00a0dc
              &.badIcon:before
                content '\e638'
                color #b7bbbf
            .text
              font-size 24px
              color rgb(7, 17, 27)
          .userInfo
            position absolute
            top 32px
            right 0
            .name
              font-size 20px
              color rgb(147, 153, 159)
              margin-right 12px
            .avatar
              height 48px
              width 48px
              border-radius 50%
        .no-rating
          padding 32px 0 32px 40px
          font-size 24px
          color rgb(147, 153, 159)
</style>
