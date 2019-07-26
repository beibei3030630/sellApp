<template>
  <div class="sellerContainer" ref="seller">
    <div>
      <div class="sellerDetail">
        <div class="overview-top">
          <div class="mainContent">
            <div class="subTitle">{{seller.name}}</div>
            <div class="rank">
              <star :size="36" :score="seller.score"></star>
              <span class="ratingCount">({{seller.ratingCount}})</span>
              <span class="sellCount">月销{{seller.sellCount}}单</span>
            </div>
          </div>
          <div class="collect">
            <i
              class="iconfont"
              :class="{'lightHeart':isCollect,'darkHeart':!isCollect}"
              @click="toggleCollect"
            ></i>
            <span>{{collectStatus}}</span>
          </div>
        </div>
        <div class="overview-bottom">
          <div>
            <span class="title">起送价</span>
            <span class="largeFont">
              {{seller.minPrice}}
              <span class="minFont">元</span>
            </span>
          </div>
          <div>
            <span class="title">商家配送</span>
            <span class="largeFont">
              {{seller.deliveryPrice}}
              <span class="minFont">元</span>
            </span>
          </div>
          <div>
            <span class="title">平均配送时间</span>
            <span class="largeFont">
              {{seller.deliveryTime}}
              <span class="minFont">分钟</span>
            </span>
          </div>
        </div>
      </div>
      <separate></separate>
      <div class="bulletin">
        <div class="detailContainer">
          <div class="subTitle">公告与活动</div>
          <div class="content">{{seller.bulletin}}</div>
        </div>
        <ul>
          <li
            class="bulletinList"
            v-for="(supportItem,supportIndex) of seller.supports"
            :key="supportIndex"
          >
            <span class="icon" :class="iconType[supportIndex]"></span>
            <span class="title">{{supportItem.description}}</span>
          </li>
        </ul>
      </div>
      <separate></separate>
      <div class="sellerImg">
        <div class="subtitle">商家实景</div>
        <div class="gallery" ref="gallery">
          <ul class="picList" ref="picList">
            <li v-for="(pic,picIndex) of seller.pics" :key="picIndex" class="picItem">
              <img :src="pic" />
            </li>
          </ul>
        </div>
      </div>
      <separate></separate>
      <div class="sellerInfo">
        <div class="subtitle">商家信息</div>
        <ul class="infoList">
          <li v-for="infoItem of seller.infos" class="infoContainer">{{infoItem}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import star from "../stars/stars";
import separate from "../separate/separate";
import { saveToLocal, loadFromLocal } from "@/assets/utils/util";
export default {
  props: {
    seller: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    collectStatus() {
      return this.isCollect ? "已收藏" : "收藏";
    }
  },
  name: "seller",
  components: {
    star,
    separate
  },
  data() {
    return {
      iconType: [
        "decreaseIcon",
        "discountIcon",
        "specialIcon",
        "invoiceIcon",
        "guaranteeIcon"
      ],
      isCollect: (() => {
        return loadFromLocal(this.seller.id, "collect", false);
      })()
    };
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.seller);
    this._initPics();
  },
  watch: {
    seller() {
      this._initPics();
    }
  },
  methods: {
    toggleCollect() {
      this.isCollect = !this.isCollect;
      saveToLocal(this.seller.id, "collect", this.collect);
    },
    _initPics() {
      if (this.seller.pics) {
        let picWidth = 120;
        let margin = 6;
        let width = (picWidth + margin) * this.seller.pics.length - margin;
        this.$refs.picList.style.width = width + "px";
        this.picScroll = new BScroll(this.$refs.gallery, {
          scrollX: true,
          eventPassthrough: "vertical"
        });
      }
    }
  }
};
</script>

<style scoped lang='stylus'>
@import '~style/stylus/index.styl'
.sellerContainer
  position fixed
  top 350px
  left 0
  right 0
  bottom 0
  overflow hidden
  .sellerDetail, .bulletin, .sellerImg, .sellerInfo
    .subTitle
      font-size 28px
      color rgb(7, 17, 27)
      margin-bottom 16px
  .sellerDetail
    margin 36px
    .overview-top
      display flex
      align-items center
      justify-content space-between
      padding 36px
      border-bottom 1px solid rgba(7, 17, 27, 0.1)
      .mainContent
        .rank
          display flex
          align-items center
          font-size 20px
          color rgb(77, 85, 93)
          .ratingCount
            margin-left 16px
          .sellCount
            margin-left 24px
      .collect
        display flex
        flex-direction column
        align-items center
        min-width 100px
        .iconfont
          margin-bottom 8px
          &.lightHeart:before
            content '\f013'
            color rgb(240, 20, 20)
            font-size 48px
          &.darkHeart:before
            content '\f013'
            color #d4d6d9
            font-size 48px
        span
          margin-top 8px
          font-size 20px
          color rgb(77, 85, 93)
    .overview-bottom
      padding-top 36px
      display flex
      align-items center
      justify-content space-between
      div
        flex 0 0 33.333%
        display flex
        flex-direction column
        align-items center
        border-right 2px solid rgba(7, 17, 27, 0.1)
        &:last-child
          border-right none
        .title
          font-size 20px
          color rgb(147, 153, 159)
          margin-bottom 8px
        .largeFont
          font-size 48px
          font-weight 200
          color rgb(7, 17, 27)
          .minFont
            font-size 20px
  .bulletin
    padding 36px 36px 0 36px
    .detailContainer
      .content
        font-size 24px
        color rgb(240, 20, 20)
        font-weight 200
        line-height 48px
        padding 0 24px 32px 24px
        border-bottom 1px solid rgba(7, 17, 27, 0.1)
    .bulletinList
      padding 32px 24px
      border-bottom 2px solid rgba(7, 17, 27, 0.1)
      .icon
        vertical-align top
        &.discountIcon
          bg-image(32px, 32px, 'discount_4')
        &.guaranteeIcon
          bg-image(32px, 32px, 'guarantee_4')
        &.invoiceIcon
          bg-image(32px, 32px, 'invoice_4')
        &.specialIcon
          bg-image(32px, 32px, 'special_4')
        &.decreaseIcon
          bg-image(32px, 32px, 'decrease_4')
      .title
        margin-left 12px
        font-size 24px
        font-weight 200
        color rgb(7, 17, 27)
  .sellerImg
    padding 36px 0 36px 36px
    .gallery
      margin-top 24px
      width 100%
      overflow hidden
      white-space nowrap
      .picList
        font-size 0
        .picItem
          display inline-block
          margin-right 12px
          width 240px
          height 180px
          &:last-child
            margin-right 0
          img
            width 100%
            height 100%
  .sellerInfo
    padding 36px
    .infoList
      margin-top 24px
      .infoContainer
        padding 32px 24px
        border-top 2px solid rgba(7, 17, 27, 0.1)
        font-size 24px
        font-weight 200
        color rgb(7, 17, 27)
</style>
