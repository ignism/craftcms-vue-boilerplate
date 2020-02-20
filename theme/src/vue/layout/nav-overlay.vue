<template>
    <div class="nav-overlay" :class="{'is-active':isActive}" ref="navoverlay">
      <slot></slot>
    </div>
</template>

<script>
import { eventBus } from '@src/js/event-bus'

export default {
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    toggle() {
      this.isActive ? this.hide() : this.show()
    },
    show() {
      this.$root.$refs.burger.classList.add('is-active')
      this.isActive = true
    },
    hide() {
      this.$root.$refs.burger.classList.remove('is-active')
      this.isActive = false
    }
  },
  mounted() {
    eventBus.$on('nav-toggle', this.toggle)
    eventBus.$on('nav-hide', this.hide)
  }
}
</script>

<style lang="css" scoped>
</style>
