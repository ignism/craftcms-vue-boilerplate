<template>
  <div class="scroll-trigger">
    <slot></slot>    
  </div>
</template>

<script>
import ScrollMagic from 'scrollmagic'
import AnimeFade from '@src/js/animations/anime-fade.js'
import { scrollController } from '@src/js/scroll-controller'
import { eventBus } from '@src/js/event-bus'

export default {
  data() {
    return {
      scene: null,
      animeFade: null
    }
  },
  props: {
    enter: null,
    leave: null
  },
  methods: {
    onEnter() {
      switch (this.enter) {
        case 'move':
          break;
        default:
          this.animeFade.play()
      }
    },
    onLeave() {
      switch (this.leave) {
        case 'move':
          break;
        default:
          this.animeFade.play(true)
      }
    }
  },
  mounted() {
    this.animeFade = new AnimeFade(this.$el)
    this.animeFade.init()

    this.scene = new ScrollMagic.Scene({
      triggerElement: this.$el,
      triggerHook: 0.75,
      offset: 0
    })
    this.scene.on('enter', this.onEnter)
    this.scene.on('leave', this.onLeave)

    scrollController.addScene(this.scene)

    eventBus.$on('swup:willReplaceContent', () => {
      scrollController.removeScene(this.scene)
      this.$destroy()
    })
  }
}
</script>

<style>

</style>