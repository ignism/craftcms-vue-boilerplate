<template>
  <div id="styleguide-app">
    <section class="section header-offset">
      <div class="container">
        <h1 class="text-6xl font-medium">styleguide</h1>
      </div>
    </section>

    {{ event }}

    <section class="section">
      <div class="container">
        <h2 class="text-gray-600 text-xl my-2">current screen size</h2>
        <div class="row">
          <div class="col w-full">
            <div class="bg-red-200 flex sm:hidden justify-center">
              <div class="bg-red-400 p-2 text-white">
                base
                <span class="font-bold">phone</span>
              </div>
            </div>
            <div class="bg-orange-200 hidden sm:flex md:hidden justify-center">
              <div class="bg-orange-400 p-2 text-white">
                sm
                <span class="font-bold">phablet</span>
              </div>
            </div>
            <div class="bg-yellow-200 hidden md:flex lg:hidden justify-center">
              <div class="bg-yellow-400 p-2 text-white">
                md
                <span class="font-bold">tablet</span>
              </div>
            </div>
            <div class="bg-green-200 hidden lg:flex xl:hidden justify-center">
              <div class="bg-green-400 p-2 text-white">
                lg
                <span class="font-bold">desktop</span>
              </div>
            </div>
            <div class="bg-teal-200 hidden xl:flex fw:hidden justify-center">
              <div class="bg-teal-400 p-2 text-white">
                xl
                <span class="font-bold">wide</span>
              </div>
            </div>
            <div class="bg-blue-200 hidden fw:flex justify-center">
              <div class="bg-blue-400 p-2 text-white">
                fw
                <span class="font-bold">full width</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" v-on:coreWindowResized="calcGrid">
      <h2 class="text-gray-600 text-xl my-2 container">grid size</h2>
      <div class="bg-teal-400">
        <div class="section container bg-blue-400" ref="section" style="padding-left: 0; padding-right: 0">
          <div class="container bg-purple-400" ref="container">
            <div class="row" style="margin: auto">
              <div class="col w-6/12 bg-red-400" ref="col" style="padding-left: 0">
                <div class="bg-gray-300 h-20"></div>
              </div>
              <div class="col w-6/12 bg-red-400" style="padding-right: 0">
                <div class="bg-gray-300 h-20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container flex my-2">
        <div class="text-red-400">
          {{ gutter }}
          <span class="font-bold">gutter width</span>
        </div>
      </div>
      <div class="container flex my-2">
        <div class="text-purple-400">
          {{ offset }}
          <span class="font-bold">offset</span>
        </div>
      </div>
      <div class="container flex my-2">
        <div class="text-blue-400">
          {{ section }}
          <span class="font-bold">section offset</span>
        </div>
      </div>
      <div class="container flex my-2">
        <div class="text-teal-400">
          {{ container }}
          <span class="font-bold">max-width</span>
        </div>
      </div>

      <div class="container mt-16">
        <div class="row h-screen">
          <div class="col w-1/12">
            <div class="bg-gray-300 w-full h-full"></div>
          </div>
          <div class="col w-1/12">
            <div class="bg-gray-300 w-full h-full"></div>
          </div>
          <div class="col w-1/12">
            <div class="bg-gray-300 w-full h-full"></div>
          </div>
          <div class="col w-1/12">
            <div class="bg-gray-300 w-full h-full"></div>
          </div>
          <div class="col w-1/12">
            <div class="bg-gray-300 w-full h-full"></div>
          </div>
          <div class="col w-1/12">
            <div class="bg-gray-300 w-full h-full"></div>
          </div>
          <div class="col w-1/12">
            <div class="bg-gray-300 w-full h-full"></div>
          </div>
          <div class="col w-1/12">
            <div class="bg-gray-300 w-full h-full"></div>
          </div>
          <div class="col w-1/12">
            <div class="bg-gray-300 w-full h-full"></div>
          </div>
          <div class="col w-1/12">
            <div class="bg-gray-300 w-full h-full"></div>
          </div>
          <div class="col w-1/12">
            <div class="bg-gray-300 w-full h-full"></div>
          </div>
          <div class="col w-1/12">
            <div class="bg-gray-300 w-full h-full"></div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <p class="text-gray-600 text-xl my-2">text size</p>
        <div class="row">
          <div class="col w-6/12">
            <table class="w-full">
              <tbody>
                <tr>
                  <td class="pr-4 text-gray-600">{{ text_xs }} / {{ text_xs|convertToRem }}</td>
                  <td class="text-xs pl-4" ref="text_xs">text-xs</td>
                </tr>
                <tr>
                  <td class="pr-4 text-gray-600">{{ text_sm }} / {{ text_sm|convertToRem }}</td>
                  <td class="text-sm pl-4" ref="text_sm">text-sm</td>
                </tr>
                <tr class="bg-gray-300 font-bold">
                  <td class="pr-4 text-gray-600">{{ text_base }} / {{ text_base|convertToRem }}</td>
                  <td class="text-base pl-4" ref="text_base">text-base</td>
                </tr>
                <tr>
                  <td class="pr-4 text-gray-600">{{ text_lg }} / {{ text_lg|convertToRem }}</td>
                  <td class="text-lg pl-4" ref="text_lg">text-lg</td>
                </tr>
                <tr>
                  <td class="pr-4 text-gray-600">{{ text_xl }} / {{ text_xl|convertToRem }}</td>
                  <td class="text-xl pl-4" ref="text_xl">text-xl</td>
                </tr>
                <tr>
                  <td class="pr-4 text-gray-600">{{ text_2xl }} / {{ text_2xl|convertToRem }}</td>
                  <td class="text-2xl pl-4" ref="text_2xl">text-2xl</td>
                </tr>
                <tr>
                  <td class="pr-4 text-gray-600">{{ text_3xl }} / {{ text_3xl|convertToRem }}</td>
                  <td class="text-3xl pl-4" ref="text_3xl">text-3xl</td>
                </tr>
                <tr>
                  <td class="pr-4 text-gray-600">{{ text_4xl }} / {{ text_4xl|convertToRem }}</td>
                  <td class="text-4xl pl-4" ref="text_4xl">text-4xl</td>
                </tr>
                <tr>
                  <td class="pr-4 text-gray-600">{{ text_5xl }} / {{ text_5xl|convertToRem }}</td>
                  <td class="text-5xl pl-4" ref="text_5xl">text-5xl</td>
                </tr>
                <tr>
                  <td class="pr-4 text-gray-600">{{ text_6xl }} / {{ text_6xl|convertToRem }}</td>
                  <td class="text-6xl pl-4" ref="text_6xl">text-6xl</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h2 class="text-gray-600 text-xl my-2">fonts</h2>
        <div class="row">
          <div class="col w-6/12">
            <p class="font-display text-6xl leading-none uppercase my-2">Lorem ipsum dolor</p>
            <p class="text-gray-600 mb-8">font-display</p>
            <p class="font-serif text-3xl leading-tight my-2">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
            <p class="text-gray-600 mb-8">font-serif</p>
            <p class="font-sans my-2">Ea nesciunt cumque doloremque veritatis officiis nobis laboriosam natus repudiandae quo veniam vel saepe, praesentium quibusdam? Beatae eveniet rem dolorem corrupti vitae.</p>
            <p class="text-gray-600">font-sans</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  data() {
    return {
      message: 'style',
      event: '',
      gutter: 0,
      offset: 0,
      container: 0,
      section: 0,
      text_xs: 0,
      text_sm: 0,
      text_base: 0,
      text_lg: 0,
      text_xl: 0,
      text_2xl: 0,
      text_3xl: 0,
      text_4xl: 0,
      text_5xl: 0,
      text_6xl: 0,
      slides: [1, 2, 3, 4],
    }
  },
  filters: {
    convertToRem(value) {
      value = value.toString().substring(0, value.length - 2)
      value = value / 16
      return value + 'rem'
    }
  },
  methods: {
    gotEvent() {
      console.log('got ee event')
    },
    calcGrid() {
      let colPaddingRight = window.getComputedStyle(this.$refs.col).getPropertyValue('padding-right')
      this.gutter = colPaddingRight.substring(0, colPaddingRight.length - 2) * 2 + 'px'

      let containerPaddingRight = window.getComputedStyle(this.$refs.container).getPropertyValue('padding-right')
      this.offset = containerPaddingRight

      let containerMaxWidth = window.getComputedStyle(this.$refs.container).getPropertyValue('max-width')
      this.container = containerMaxWidth

      let sectionPaddingTop = window.getComputedStyle(this.$refs.section).getPropertyValue('padding-top')
      this.section = sectionPaddingTop
    }
  },
  created() {

  },
  mounted() {

    this.calcGrid()

    this.text_xs = window.getComputedStyle(this.$refs.text_xs).getPropertyValue('font-size')
    this.text_sm = window.getComputedStyle(this.$refs.text_sm).getPropertyValue('font-size')
    this.text_base = window.getComputedStyle(this.$refs.text_base).getPropertyValue('font-size')
    this.text_lg = window.getComputedStyle(this.$refs.text_lg).getPropertyValue('font-size')
    this.text_xl = window.getComputedStyle(this.$refs.text_xl).getPropertyValue('font-size')
    this.text_2xl = window.getComputedStyle(this.$refs.text_2xl).getPropertyValue('font-size')
    this.text_3xl = window.getComputedStyle(this.$refs.text_3xl).getPropertyValue('font-size')
    this.text_4xl = window.getComputedStyle(this.$refs.text_4xl).getPropertyValue('font-size')
    this.text_5xl = window.getComputedStyle(this.$refs.text_5xl).getPropertyValue('font-size')
    this.text_6xl = window.getComputedStyle(this.$refs.text_6xl).getPropertyValue('font-size')
  }
}
</script>

<style lang="css" scoped>
</style>
