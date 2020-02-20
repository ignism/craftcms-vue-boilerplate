import { CoreAnime } from '../core'
import anime from 'animejs'

class AnimeMove extends CoreAnime {
  init() {
    super.init(this.element)

    this.element.style.transform = 'translateY(100px)'
  }

  play(reverse = false) {
    let properties = {
      translateY: [100, 0]
    }

    if (reverse) {
      Object.keys(properties).forEach(key => {
        properties[key].reverse()
      })
    }

    anime({
      targets: this.element,
      easing: this.options.easing,
      duration: this.options.duration,
      delay: this.options.delay,
      translateY: properties.translateY,
      complete: () => {
        this.element.classList.add('anime-complete')
      }
    })
  }
}

export default AnimeMove
