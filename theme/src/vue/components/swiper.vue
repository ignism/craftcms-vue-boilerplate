<template>
  <div class="swiper-container" ref="container" swiper-slides-per-view="auto" swiper-loop="loop">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>

    <slot name="pagination"></slot>
    <slot name="navigation"></slot>
  </div>
</template>

<script>
import Swiper from 'swiper'

export default {
  data() {
    return {
      swiper: false
    }
  }, 
  mounted() {
    this.swiper = new Swiper(this.$refs.container, {
      navigation: {
          prevEl: '.swiper-prev',
          nextEl: '.swiper-next'
      },
      pagination: {
        el: '.swiper-pagination'
      }
    })
  }
}
</script>

<style lang="css" scoped>
</style>
