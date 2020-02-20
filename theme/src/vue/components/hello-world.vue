<template>
  <div id="hello-world">
    {{ message }}    
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello World'
    }
  },
  methods: {
    emit() {
      this.$emit('hello world')
    }
  }
}
</script>

<style lang="css" scoped>
</style>
