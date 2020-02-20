<template>
  <header class="section page-header z-40" :class="{ 'is-pinned': isPinned }" :style="style">
    <slot></slot>
  </header>
</template>

<script>
import { eventBus } from '@src/js/event-bus'

export default {
  data() {
    return {
      isPinned: false,
      translateY: '-100vh',
      background: 255
    }
  },
  computed: {
    style() {
      return 'background: rgb(' + this.background + ','+ this.background + ','+ this.background + '); opacity: ' + this.opacity + '; transform: translateY(' + this.translateY + ')'
    }
  },
  methods: {
    emit(event) {
      eventBus.$emit('nav-toggle')
    },
    pin() {
      this.isPinned = true
    },
    unpin() {
      this.isPinned = false
    }
  },
  mounted() {
    this.translateY = -1 * this.$el.clientHeight + 'px'
    this.opacity = 0

    eventBus.$on('window:load', () => {
      setTimeout(() => {
        this.translateY = 0
        this.opacity = 1
      }, 800)
    })

    eventBus.$on('header:color', (event) => {
      this.background = event.color
    })
  }
}
</script>

<style lang="pcss" scoped>
</style>
