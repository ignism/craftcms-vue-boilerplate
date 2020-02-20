import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

class ThreeContainerHelper {
  createRenderer(container) {
    let renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor('#000000', 0)
    renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(renderer.domElement)
    return renderer
  }

  createStats(container) {
    let stats = Stats()
    container.appendChild(stats.dom)
    
    return stats
  }

  createControls(camera, renderer) {
    let controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.screenSpacePanning = false
    controls.enableZoom = true
    
    return controls
  }

  createGeometry(interactive) {
    let geometry = new THREE.Object3D()
    
    let object = new THREE.Mesh(new THREE.BoxGeometry(20, 40, 40), new THREE.MeshLambertMaterial())
    let knob = new THREE.Mesh(new THREE.CylinderGeometry(10, 10, 10, 32, 1), new THREE.MeshLambertMaterial())
    let indicator = new THREE.Mesh(new THREE.BoxGeometry(10, 2, 2))

    knob.add(indicator)
    indicator.position.set(5, -5, 0)

    object.add(knob)
    knob.position.set(15, 0, 0)
    knob.rotation.set(0, 0, Math.PI * 0.5)

    geometry.add(object)

    interactive.push(knob)
    
    return geometry
  }
}

export default new ThreeContainerHelper()