<template>
  <div class="three-container absolute inset-0"></div>
</template>

<script>
import * as THREE from 'three'
import helper from '@src/js/helpers/three-container'
import { eventBus } from '@src/js/event-bus'

export default {
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      geometry: null,
      controls: null,
      stats: null,
      knobSelected: null,
      interactive: [],
      mouse: new THREE.Vector2(),
      prevMouse: new THREE.Vector2()
    }
  },
  methods: {
    initScene() {
      this.scene = new THREE.Scene()
      this.scene.background = new THREE.Color(0xf0f0f0)

      this.camera = new THREE.PerspectiveCamera(70, this.$el.clientWidth / this.$el.clientHeight, 1, 10000)
      this.camera.position.set(100, 100, 100)
      this.camera.lookAt(this.scene.position)

      this.renderer = helper.createRenderer(this.$el)
      this.controls = helper.createControls(this.camera, this.renderer)
    },
    initLighting() {
      let directionalLight = new THREE.DirectionalLight('#ffffff', 0.5)
      directionalLight.position.set(0.5, 1, 0.25)

      this.scene.add(directionalLight)
    },
    initGeometry() {
      this.geometry = helper.createGeometry(this.interactive)

      this.scene.add(this.geometry)
    },
    animate() {
      requestAnimationFrame(this.animate)

      if (this.controls) {
        this.controls.update()
      }

      if (this.stats) {
        this.stats.update()
      }

      this.render()
    },
    render() {
      this.renderer.render(this.scene, this.camera)
    },
    onMouseDown(event) {
      let raycaster = new THREE.Raycaster()
      raycaster.setFromCamera(this.mouse, this.camera)

      let intersects = raycaster.intersectObjects(this.interactive)

      if (intersects.length > 0) {
        this.controls.enabled = false
        this.knobSelected = intersects[0].object
      }
    },
    onMouseUp(event) {
      this.controls.enabled = true
      this.knobSelected = null
    },
    onMouseMove(event) {
      let rect = this.renderer.domElement.getBoundingClientRect()

      this.mouse.x = ((event.clientX - rect.left) / (rect.width - rect.left)) * 2 - 1
      this.mouse.y = -((event.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1

      if (this.knobSelected) {
        let direction = new THREE.Vector2()
        direction.subVectors(this.mouse, this.prevMouse)

        this.knobSelected.rotateY(direction.x * Math.PI * 2)
        let rotation = this.knobSelected.rotation.x
        rotation = rotation < 0 ? rotation + Math.PI * 2 : rotation
        let color = parseInt((rotation / (Math.PI * 2)) * 255)

        eventBus.$emit('header:color', { color: color })
      }

      this.prevMouse.copy(this.mouse)
    },
    onResize(event) {
      this.camera.aspect = this.$el.clientWidth / this.$el.clientHeight
      this.camera.updateProjectionMatrix()

      this.renderer.setSize(this.$el.clientWidth, this.$el.clientHeight)
    }
  },
  mounted() {
    this.initScene()
    this.initLighting()
    this.initGeometry()

    this.$el.addEventListener('mousedown', this.onMouseDown)
    this.$el.addEventListener('mouseup', this.onMouseUp)
    this.$el.addEventListener('mousemove', this.onMouseMove)

    window.addEventListener('resize', this.onResize, false)
    this.stats = helper.createStats(this.$el)

    this.animate()
  }
}
</script>

<style>
canvas {
  outline: none;
}
</style>