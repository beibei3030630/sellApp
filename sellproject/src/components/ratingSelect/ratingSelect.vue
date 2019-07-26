<template>
  <div class="ratingselect">
    <div class="rating-type">
      <div class="positive" :class="{'active':selectType==2}" @click="chooseBtn(2)">
        {{desc.all}}
        <span class="count">{{ratings.length}}</span>
      </div>
      <div class="positive" :class="{'active':selectType==0}" @click="chooseBtn(0)">
        {{desc.positive}}
        <span class="count">{{positive.length}}</span>
      </div>
      <div class="negative" :class="{'active':selectType==1}" @click="chooseBtn(1)">
        {{desc.negative}}
        <span class="count">{{negative.length}}</span>
      </div>
    </div>
    <div class="switch">
      <i class="iconfont chooseIcon" :class="{'clicked':onlyContent}" @click="toggleSwitch"></i>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
export default {
  name: "ratingSelect",
  props: {
    ratings: {
      type: Array,
      default() {
        return [];
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default() {
        return {
          all: "全部",
          positive: "满意",
          negative: "不满意"
        };
      }
    }
  },
  computed: {
    positive() {
      return this.ratings.filter(rating => {
        return rating.rateType == POSITIVE;
      });
    },
    negative() {
      return this.ratings.filter(rating => {
        return rating.rateType == NEGATIVE;
      });
    }
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    chooseBtn(selectType) {
      this.$emit("chooseBtn", selectType);
    },
    toggleSwitch() {
      this.$emit("toggleSwitch");
    }
  }
};
</script>

<style scoped lang='stylus'>
.ratingselect
  padding 36px 36px 0 36px
  box-sizing border-box
  width 100%
  .rating-type
    display flex
    align-items center
    padding-bottom 36px
    border-bottom 1px solid rgba(7, 17, 27, 0.1)
    div
      border-radius 2px
      margin-right 16px
      padding 16px 24px
      background #00a0dc
      color rgb(77, 85, 93)
      font-size 24px
      .count
        font-size 16px
      &.active
        color #ffffff
      &.positive
        background rgba(0, 160, 220, 0.2)
        &.active
          background rgb(0, 160, 220)
      &.negative
        background rgba(77, 85, 93, 0.2)
        &.active
          background rgb(77, 85, 93)
  .switch
    padding 24px 0
    display flex
    align-items center
    border-bottom 4px solid #e6e7e8
    i
      &.chooseIcon:before
        content '\e62a'
        color #b7bbbf
        position relative
        top -4px
        font-size 48px
      &.clicked:before
        content '\e62a'
        color #00c850
        position relative
        top -4px
        font-size 48px
    .text
      font-size 24px
      color rgb(147, 153, 159)
      margin-left 8px
</style>
