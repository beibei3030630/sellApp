<template>
  <div class="counterContainer">
    <div class="minus" v-show="food.count>0" @click.stop.prevent="minusNum">
      <span class="iconfont minusIcon"></span>
    </div>
    <div class="num" v-show="food.count>0">{{food.count}}</div>
    <div class="add" @click.stop.prevent="addNum">
      <span class="iconfont addIcon"></span>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "cartcontrol",
  components: {},
  props: {
    food: {
      type: Object
    }
  },
  mounted() {},
  data() {
    return {};
  },
  methods: {
    addNum(e) {
      if (!this.food.count) {
        Vue.set(this.food, "count", 1);
      } else {
        this.food.count++;
      }
      this.$emit("add", e.target);
    },
    minusNum() {
      if (this.food.count) {
        this.food.count--;
      }
    }
  }
};
</script>

<style scoped lang='stylus'>
.counterContainer
  display flex
  align-items center
  .minus
    span
      &.minusIcon:before
        content '\e623'
        color rgb(0, 160, 220)
        font-size 48px
  .num
    font-size 20px
    color rgb(147, 153, 159)
    margin 0 20px
  .add
    span
      &.addIcon:before
        content '\e62b'
        color rgb(0, 160, 220)
        font-size 48px
</style>
