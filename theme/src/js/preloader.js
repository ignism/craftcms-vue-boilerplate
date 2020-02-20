import { eventBus } from "./event-bus"

window.onload = () => {
  eventBus.$emit('window:load')

  let preloader = document.querySelector('#preloader')
  console.log("TCL: window.onload -> preloader", preloader)
  let opacity = 1
  let duration = 0.2
  let step = 1 / (duration * 60) 

  requestAnimationFrame(animation)

  function animation() {
    opacity -= step
    preloader.style.opacity = opacity
    
    if (opacity <= 0) {
      preloader.style.display = 'none'
    } else {
      requestAnimationFrame(animation)
    }
  }
}
