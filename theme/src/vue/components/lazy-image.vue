<template>
<figure :class="[size, ratio]">
  <div ref="preload" class="preload" :style="style"></div>
  <img
    :src="preloadSrc"
    :data-src="lazySrc"
    :data-srcset="lazySrcset"
    :sizes="sizes"
    class="lazy-image"
    ref="lazy-image"
  />
</figure>
</template>

<script>
import lozad from 'lozad'
import FastAverageColor from 'fast-average-color'
import ColorThief from 'color-thief'

export default {
  name: 'lazy-image',
  props: {
    backgroundColor: {
      type: String,
      default: '#646464'
    },
    height: {
      type: Number,
      default: null
    },
    preloadSrc: {
      type: String,
      default: null
    },
    lazySrc: {
      type: String,
      default: null
    },
    lazySrcset: {
      type: String,
      default: null
    },
    sizes: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: 'landscape'
    },
    ratio: {
      type: String,
      default: 'original'
    }
  },
  data() {
    return {
      isLoading: true,
      color: 'rgb(0, 0, 0)'
    }
  },
  computed: {
    aspectRatio() {
      // Calculate the aspect ratio of the image
      // if the width and the height are given.
      if (!this.width || !this.height) return null

      return (this.height / this.width) * 100
    },
    style() {
      // The background color is used as a
      // placeholder while loading the image.
      // You can use the dominant color of the
      // image to improve perceived performance.
      // See: https://manu.ninja/dominant-colors-for-lazy-loading-images/
      const style = { backgroundColor: this.color }

      return style
    }
  },
  mounted() {
    const setLoadingState = () => {
      this.isLoading = false
    }
    // this.$refs['lazy-image'].addEventListener('load', setLoadingState)
    // this.$once('hook:destroyed', () => {
    //   this.$refs['lazy-image'].removeEventListener('load', setLoadingState)
    // })

    // const fac = new FastAverageColor()

    // fac
    //   .getColorAsync(this.$refs['lazy-image'])
    //   .then((color) => {
    //     console.log(color)
    //     this.color = color.rgb
    //   })
    //   .catch((e) => {
    //     console.log(e)
    //   })

    const observer = lozad(this.$refs['lazy-image'], {
      loaded: () => {
        this.$refs['preload'].classList.add('hidden')
      }
    })
    observer.observe()
  }
}
</script>

<style lang="pcss" scoped>
.preload {
  @apply absolute inset-0;
  content: '';
  z-index: +1;
  background-color: gray;
}

.lazy-image {
  opacity: 0;
}

.lazy-image.colored,
.lazy-image[data-loaded='true'] {
  opacity: 1;
}
</style>
