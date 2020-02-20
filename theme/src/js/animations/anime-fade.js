import anime from 'animejs'
// import { CoreAnime } from '../core'

// class AnimeFade extends CoreAnime {
//   init() {
//     super.init(this.element)

//     this.element.style.opacity = 0
//   }

//   play(reverse = false) {
//     let properties = {
//       opacity: [0, 1]
//     }

//     if (reverse) {
//       Object.keys(properties).forEach(key => {
//         properties[key].reverse()
//       })
//     }

//     anime({
//       targets: this.element,
//       easing: this.options.easing,
//       duration: this.options.duration,
//       delay: this.options.delay,
//       opacity: properties.opacity,
//       complete: () => {
//         this.element.classList.add('anime-complete')
//       }
//     })
//   }
// }

// export default AnimeFade

class AnimeFade {
  constructor(element) {
    this.element = element
  }

  init() {
    this.element.style.opacity = 0
  }

  play(reverse = false) {
    let properties = {
      opacity: [0, 1]
    }

    if (reverse) {
      Object.keys(properties).forEach((key) => {
        properties[key].reverse()
      })
    }

    anime({
      targets: this.element,
      easing: 'easeOutSine',
      duration: 800,
      delay: 0,
      opacity: properties.opacity,
      complete: () => {
        this.element.classList.add('anime-complete')
      }
    })
  }
}

export default AnimeFade
