import Swup from 'swup'
import Vue from 'vue'
import { eventBus } from '@src/js/event-bus'

const swup = new Swup({
  // animationSelector: '[class*="transition-"]',
  containers: ['#app'],
  plugins: []
})

const NavOverlay = () => import(/* webpackChunkName: "layout" */ '../vue/layout/nav-overlay.vue')
const PageHeader = () => import(/* webpackChunkName: "layout" */ '../vue/layout/page-header.vue')

const Swiper = () => import(/* webpackChunkName: "components/swiper" */ '../vue/components/swiper.vue')
const LazyImage = () => import(/* webpackChunkName: "components/lazy-image" */ '../vue/components/lazy-image.vue')
const ScrollTrigger = () => import(/* webpackChunkName: "animations/scroll-trigger" */ '../vue/animations/scroll-trigger.vue')
const ThreeContainer = () => import(/* webpackChunkName: "animations/scroll-trigger" */ '../vue/components/three-container.vue')

Vue.component('nav-overlay', NavOverlay)
Vue.component('page-header', PageHeader)

Vue.component('swiper', Swiper)
Vue.component('lazy-image', LazyImage)
Vue.component('scroll-trigger', ScrollTrigger)
Vue.component('three-container', ThreeContainer)

const layout = new Vue({
  el: '#layout',
  data: {
    eventBus: eventBus
  },
})

function initSwuppingApp() {
  swup.off()

  const app = new Vue({
    el: '#app',
    data: {
      eventBus: eventBus
    },
    mounted() {
      swup.on('willReplaceContent', () => {
        eventBus.$emit('swup:willReplaceContent')
        this.$destroy()
      })
    },
    methods: {
      log(msg) {
        console.log(msg)
      }
    },
    beforeDestroy() {
      // destroy all instance of other packages
    }
  })

  Vue.nextTick(() => {
    swup.on('contentReplaced', () => {
      eventBus.$emit('swup:contentReplaced')
      initSwuppingApp()
    })
  })
}

initSwuppingApp()
