<template>
  <div id="item-circle">
    <div
      class="main-shape column flex flex-center"
      :style="{ 'background-color': bgColor }"
      :class="shape"
    >
      <span class="text-bold value">{{ value || '--' }}</span>
      <span class="text-small text-weight-medium">{{ unit }}</span>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    value: {
      type: [String, Number], // alterar
      required: false,
      default: null,
    },
    unit: {
      type: String,
      required: true,
    },
    bgColor: {
      type: String,
      required: true,
    },
    shape: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="stylus">
#item-circle
  .main-shape
    line-height 1
    color white
  .circle
    border-radius 50%
    width 50px
    height 50px
  .square
    border-radius 10%
    width 50px
    height 50px
  .drop
    border-radius 50% 30%
    width 50px
    height 50px
  .drop-reverse
    border-radius 30% 50%
    width 50px
    height 50px
  .value
    font-size 18px
    padding 0
  .text-small
    font-size 9px
    padding 0
</style>
