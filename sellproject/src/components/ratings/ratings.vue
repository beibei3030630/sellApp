<template>
  <div ref="ratings" class="ratingsWrapper">
    <div>
      <div class="ratingsInfo">
        <div class="leftContent">
          <span class="score">{{seller.score}}</span>
          <span class="title">综合评分</span>
          <span class="compareScore">高于周边商家{{seller.rankRate}}%</span>
        </div>
        <div class="rightContent">
          <div class="serviceInfo">
            <span class="title">服务态度</span>
            <star :score="seller.serviceScore" :size="36"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="serviceInfo">
            <span class="title">食品分数</span>
            <star :score="seller.foodScore" :size="36"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="serviceInfo">
            <span class="title">送达时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <separate></separate>
      <rating-select
        :ratings="ratings"
        :selectType="selectType"
        :onlyContent="onlyContent"
        @chooseBtn="chooseBtn"
        @toggleSwitch="toggleSwitch"
      ></rating-select>
      <div class="ratingsList">
        <ul v-show="ratings&&ratings.length">
          <li
            class="ratingsContent"
            v-for="(rating,ratingIndex) of ratings"
            :key="ratingIndex"
            v-show="needShow(rating.rateType,rating.text)"
          >
            <div class="userInfoWrapper">
              <div class="avatar">
                <img :src="rating.avatar" />
              </div>
              <div class="detail">
                <span class="userName">{{rating.username}}</span>
                <div class="info">
                  <star :size="24" :score="rating.score"></star>
                  <span class="deliveryTime" v-if="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                </div>
                <span class="description">{{rating.text}}</span>
                <div class="recommendContainer">
                  <i class="iconfont goodIcon" :class="{'badIcon':rating.rateType==1}"></i>
                  <ul v-show="rating.recommend" class="menuContainer">
                    <li class="menu" v-for="(menu,menuIndex) of rating.recommend" :key="menuIndex">
                      <span>{{menu}}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="time">{{rating.rateTime|formatDate}}</div>
          </li>
        </ul>
        <div class="noRatings" v-show="!ratings||!ratings.length"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Bscroll from "better-scroll";
import star from "../stars/stars";
import separate from "../separate/separate";
import ratingSelect from "../ratingSelect/ratingSelect";
import axios from "axios";
import { formatDate } from "@/assets/utils/util";
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
export default {
  name: "ratings",
  components: {
    star,
    separate,
    ratingSelect
  },
  props: {
    seller: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  data() {
    return {
      ratings: [],
      selectType: ALL,
      onlyContent: true
    };
  },
  methods: {
    async getRatings() {
      const data = await axios("/api/data.json");
      if (String(data.status).startsWith("2") && data.data.ratings) {
        this.ratings = data.data.ratings;
      }
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
      } else if (this.selectType === ALL) {
        return true;
      } else {
        return type == this.selectType;
      }
    }
  },
  mounted() {
    this.scroll = new Bscroll(this.$refs.ratings);
    this.getRatings();
  }
};
</script>

<style scoped lang='stylus'>
.ratingsWrapper
  position fixed
  top 350px
  left 0
  right 0
  bottom 0
  overflow hidden
  .ratingsInfo
    display flex
    padding 36px 0
    align-items center
    .leftContent
      flex 0 0 275px
      display flex
      flex-direction column
      align-items center
      justify-content space-between
      border-right 1px solid #e9ebec
      @media only screen and (max-width: 360px)
        flex 0 0 240px
      .score
        font-size 48px
        color rgb(255, 153, 0)
        margin-bottom 12px
      .title
        font-size 24px
        color #2e343a
        margin-bottom 16px
      .compareScore
        font-size 20px
        color #b2b7bb
        margin-bottom 12px
    .rightContent
      flex 1
      margin 0 48px
      @media only screen and (max-width: 360px)
        margin 0 12px
      .serviceInfo
        display flex
        align-items center
        margin-bottom 16px
        &:last-child
          margin-bottom 0
        .title
          font-size 24px
          color rgb(7, 17, 27)
          margin-right 24px
        .score
          font-size 24px
          color rgb(255, 153, 0)
          margin-left 24px
        .time
          font-size 24px
          color rgb(147, 153, 159)
  .ratingsList
    .ratingsContent
      margin 0 36px
      padding 36px 0
      position relative
      border-top 2px solid #e9ebec
      &:first-child
        border-width 0
      .userInfoWrapper
        display flex
        align-items flex-start
        .avatar
          width 56px
          height 56px
          flex 0 0 56px
          img
            height 100%
            width 100%
            border-radius 50%
        .detail
          flex 1
          margin-left 24px
          display flex
          flex-direction column
          .userName
            font-size 20px
            color rgb(7, 17, 27)
            margin-bottom 8px
          .info
            display flex
            margin-bottom 12px
            align-items center
            .deliveryTime
              font-size 20px
              font-weight 200
              color rgb(147, 153, 159)
              margin-left 12px
              position relative
              top 2px
          .description
            font-size 24px
            color rgb(7, 17, 27)
            margin-bottom 16px
            line-height 36px
          .recommendContainer
            display flex
            align-items flex-start
            i
              &.goodIcon:before
                content '\e62c'
                color rgb(0, 160, 220)
              &.badIcon:before
                content '\e638'
                color rgb(183, 187, 191)
            .menuContainer
              display flex
              flex-wrap wrap
              margin-left 16px
              .menu
                font-size 18px
                padding 0 12px
                line-height 32px
                color rgb(147, 153, 159)
                margin-right 16px
                border 2px solid rgba(7, 17, 27, 0.1)
                margin-bottom 16px
      .time
        position absolute
        top 36px
        right 0
        font-size 20px
        font-weight 200
        color rgb(147, 153, 159)
</style>
