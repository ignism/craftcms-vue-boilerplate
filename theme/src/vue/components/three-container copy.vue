<template>
  <div class="three-container absolute inset-0"></div>
</template>

<script>
import * as THREE from 'three'
import helper from '@src/js/helpers/three-container'

export default {
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      geometry: null,
      objects: [],
      controls: null,
      stats: null,
      light: null,
      mouse: new THREE.Vector2(),
      raycaster: new THREE.Raycaster()
    }
  },
  methods: {
    initScene() {
      this.scene = new THREE.Scene()

      this.camera = new THREE.PerspectiveCamera(75, this.$el.clientWidth / this.$el.clientHeight, 0.1, 1000)
      this.camera.position.z = 10

      this.renderer = helper.createRenderer(this.$el)
      this.controls = helper.createControls(this.camera, this.renderer)

      this.$el.appendChild(this.renderer.domElement)
    },
    initLighting() {
      let directionalLight = new THREE.DirectionalLight('#ffffff', 0.5)
      directionalLight.position.set(0.5, 1, 0.25)
      this.scene.add(directionalLight)

      this.light = directionalLight

      let ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
      // this.scene.add(ambientLight)
    },
    initGeometry() {
      this.geometry = new THREE.Object3D()

      let material = new THREE.MeshPhongMaterial({ color: '#ffffff' })
      let parent = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), material)
      let child = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material)

      child.position.set(0, 0, 1.5)
      parent.add(child)

      this.geometry.add(parent)
      this.scene.add(this.geometry)

      this.objects.push(parent)
      this.objects.push(child)
    },
    renderLoop() {
      requestAnimationFrame(this.renderLoop)

      if (this.controls) {
        this.controls.update()
        this.light.position.set(this.camera.position.x, this.camera.position.y, this.camera.position.z)
      }

      if (this.stats) {
        this.stats.update()
      }

      this.raycaster.setFromCamera( this.mouse, this.camera );

      let intersects = this.raycaster.intersectObjects( this.scene.children );
      if ( intersects.length > 0 ) {
      console.log("TCL: renderLoop -> intersects", intersects)
      }
      this.renderer.render(this.scene, this.camera)
    },
    onMouseDown(event) {
      // this.controls.enabled = false
      let mouse = new THREE.Vector2();
      mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
      console.log(mouse)

      let raycaster = new THREE.Raycaster()
      raycaster.setFromCamera(mouse, this.camera)
      let intersects = raycaster.intersectObjects(this.scene.children)

      console.log(intersects)
      console.log(intersects.length)

      if (intersects.length > 0) {
        intersects[0].object.material.color.setHex(Math.random() * 0xffffff)
      }
    },
    onMouseMove( event ) {

				event.preventDefault();

				this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
				this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

		},
    onResize() {
      this.camera.aspect = this.$el.clientWidth / this.$el.clientHeight
      this.camera.updateProjectionMatrix()

      this.renderer.setSize(this.$el.clientWidth, this.$el.clientHeight)
    }
  },
  mounted() {
    this.initScene()
    this.initLighting()
    this.initGeometry()

    this.stats = helper.createStats(this.$el)
    window.addEventListener('resize', this.onResize, false)
    document.addEventListener('mousemove', this.onMouseMove)

    this.renderLoop()
  }
}
</script>

<style>
canvas {
  outline: none;
}
</style>