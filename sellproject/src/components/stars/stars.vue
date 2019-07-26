<template>
  <div class="star" :class="starType">
    <span
      v-for="(itemClass,index) in itemClasses"
      :class="itemClass"
      class="star-item"
      :key="index"
    ></span>
  </div>
</template>

<script type="text/ecmascript-6">
const starsLength = 5;
const CLS_ON = "on";
const CLS_HALF = "half";
const CLS_OFF = "off";

export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    starType() {
      return "star-" + this.size;
    },
    itemClasses() {
      let result = [];
      let score = this.score;
      for (let i = 0; i < starsLength; i++) {
        if (score >= 1) {
          result.push(CLS_ON);
          --score;
        } else if (score >= 0.5) {
          result.push(CLS_HALF);
          score = score - 0.5;
        } else {
          result.push(CLS_OFF);
        }
      }
      return result;
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '~style/stylus/index.styl'
.star
  font-size 0
  .star-item
    display inline-block
    background-repeat no-repeat
  &.star-48
    .star-item
      width 40px
      height 40px
      margin-right 44px
      background-size 40px 40px
      &:last-child
        margin-right 0
      &.on
        bg-image-noSize('star48_on')
      &.half
        bg-image-noSize('star48_half')
      &.off
        bg-image-noSize('star48_off')
  &.star-36
    .star-item
      width 30px
      height 30px
      margin-right 12px
      background-size 30px 30px
      &:last-child
        margin-right 0
      &.on
        bg-image-noSize('star36_on')
      &.half
        bg-image-noSize('star36_half')
      &.off
        bg-image-noSize('star36_off')
  &.star-24
    .star-item
      width 20px
      height 20px
      margin-right 6px
      background-size 20px 20px
      &:last-child
        margin-right 0
      &.on
        bg-image-noSize('star24_on')
      &.half
        bg-image-noSize('star24_half')
      &.off
        bg-image-noSize('star24_off')
</style>