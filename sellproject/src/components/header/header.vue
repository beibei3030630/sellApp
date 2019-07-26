<template>
  <div class="headerContainer">
    <div class="content">
      <div class="avatar">
        <img :src="seller.avatar" />
      </div>
      <div class="brandInfo">
        <div class="brandTitle">
          <span class="brandIcon"></span>
          {{seller.name}}
        </div>
        <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div class="discountInfo" v-if="seller.supports">
          <span class="supportIcon" :class="iconArr[0]"></span>
          {{discountInfo}}
        </div>
      </div>
      <div class="tipInfo" v-if="seller.supports" @click="toggleMask">
        <span>{{seller.supports.length}}个</span>
        <i class="iconfont arrowIcon"></i>
      </div>
    </div>
    <div class="bulletin">
      <span class="bulletinIcon"></span>
      <div class="bullentinInfo">{{seller.bulletin}}</div>
      <i class="iconfont arrowIcon"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%" />
    </div>
    <transition name="fade">
      <div class="maskContainer" v-show="showMask">
        <div class="contentWrapper">
          <div class="mainContent">
            <div class="ratings">
              <div class="brandName">{{seller.name}}</div>
              <mask-stars :size="48" :score="seller.score" class="maskStars" />
            </div>
            <div class="discountContainer">
              <div class="separateTitle">
                <span class="line"></span>
                <span class="title">优惠信息</span>
                <span class="line"></span>
              </div>
              <div class="discountInfo">
                <div v-for="(item,index) of seller.supports" :key="item.type">
                  <span :class="iconArr[index]" class="supportIcon"></span>
                  {{item.description}}
                </div>
              </div>
            </div>
            <div class="sellerBulletin">
              <div class="separateTitle">
                <span class="line"></span>
                <span class="title">商家公告</span>
                <span class="line"></span>
              </div>
              <div class="bulletinContent">{{seller.bulletin}}</div>
            </div>
          </div>
        </div>
        <!-- stickty footer -->
        <div class="closeWrapper" @click="toggleMask">
          <i class="iconfont cancelIcon"></i>
        </div>
      </div>
    </transition>
  </div>
</template>
<style scoped lang='stylus'>
@import '~style/stylus/index.styl'
.headerContainer
  width 100%
  background rgba(7, 17, 27, 0.5)
  color rgb(255, 255, 255)
  overflow hidden
  position relative
  span
    &.brandIcon
      bg-image(60px, 36px, 'brand')
      vertical-align top
    &.bulletinIcon
      bg-image(44px, 24px, 'bulletin')
      flex 0 0 44px
      margin-right 8px
    &.supportIcon
      margin-right 8px
      position relative
      top 5px
      &.minusIcon
        bg-image(32px, 32px, "decrease_1")
      &.discountIcon
        bg-image(32px, 32px, "discount_1")
      &.specialIcon
        bg-image(32px, 32px, "special_1")
      &.guaranteeIcon
        bg-image(32px, 32px, "guarantee_1")
      &.invoiceIcon
        bg-image(32px, 32px, "invoice_1")
  .content
    display flex
    height 212px
    padding-left 48px
    padding-top 48px
    box-sizing border-box
    position relative
    .avatar
      height 128px
      width 128px
      &>img
        height 100%
        width 100%
    .brandInfo
      height 128px
      display flex
      flex-direction column
      justify-content space-between
      margin-left 32px
      .brandTitle
        font-size 32px
        font-size bold
      .description
        font-size 24px
        font-weight 200
      .discountInfo
        font-size 20px
        font-weight 200
    .tipInfo
      position absolute
      right 24px
      bottom 24px
      font-size 20px
      font-weight 200
      background rgba(0, 0, 0, 0.2)
      padding 14px 20px
      box-sizing border-box
      border-radius 50px
      display flex
      align-items center
      .arrowIcon:before
        content '\e75c'
        margin-left 4px
        font-size 20px
        position relative
        bottom 4px
        left 3px
  .bulletin
    background-color rgba(7, 17, 27, 0.2)
    height 56px
    display flex
    align-items center
    padding 0 24px
    .bullentinInfo
      font-size 20px
      color rgb(255, 255, 255)
      font-weight 200
      ellipsis()
      min-width 0
      margin 0 8px
    .arrowIcon:before
      content '\e75c'
      margin-left 4px
      font-size 20px
      position relative
      bottom 4px
      left 3px
  .background
    position absolute
    top 0
    left 0
    right 0
    filter blur(10px)
    z-index -1
  .maskContainer
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    overflow auto
    z-index 99
    background rgba(7, 17, 27, 0.8)
    opacity 1
    padding 128px 72px 64px 72px
    color #fff
    box-sizing border-box
    &.fade-enter-active, &.fade-leave-active
      transition all 1s
    &.fade-enter, &.fade-leave-active
      opacity 0
      background rgba(7, 17, 27, 0)
    .contentWrapper
      clearfix()
      min-height 100%
      .mainContent
        padding-bottom 100px
        .ratings
          display flex
          flex-direction column
          align-items center
          .brandName
            font-size 32px
            font-weight 700
          .maskStars
            margin 32px 0 56px
        .discountContainer, .sellerBulletin
          .separateTitle
            display flex
            align-items center
            width 90%
            .line
              flex 1
              border-bottom 2px solid rgba(255, 255, 255, 0.2)
            .title
              margin 0 24px
              font-size 28px
              font-weight 700
        .discountContainer
          display flex
          flex-direction column
          align-items center
          .discountInfo
            align-self flex-start
            padding 48px 0 56px 64px
            div
              font-size 24px
              font-weight 200
              margin-top 24px
              &:first-child
                margin-top 0
        .sellerBulletin
          display flex
          flex-direction column
          align-items center
        .bulletinContent
          margin 40px 24px 0 24px
          font-size 24px
          font-weight 200
          line-height 48px
    .closeWrapper
      position relative
      clear both
      margin -64px auto 0 auto
      width 32px
      height 32px
      .cancelIcon:before
        content '\e68f'
        font-size 32px
        color rgba(255, 255, 255, 0.5)
</style>

<script>
import maskStars from "../stars/stars";
export default {
  name: "Header",
  components: {
    maskStars
  },
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      showMask: false
    };
  },
  mounted() {
    this.iconArr = [
      "minusIcon",
      "discountIcon",
      "discountIcon",
      "specialIcon",
      "specialIcon"
    ];
  },
  computed: {
    discountInfo() {
      return this.seller.supports[0].description;
    }
  },
  methods: {
    toggleMask() {
      this.showMask = !this.showMask;
    }
  }
};
</script>

