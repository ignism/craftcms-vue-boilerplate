import { CoreModule, CoreScrollScene } from '../core'
import AnimeFade from './anime-fade'
import AnimeMove from './anime-move'

class ScrollTriggerManager extends CoreModule {
  constructor(reinit = false) {
    super(reinit)
  }

  init(options = {}) {
    this.elements = document.querySelectorAll('[scroll-trigger]')
    console.log("TCL: ScrollTriggerManager -> init -> elements", this.elements)

    this.initElements()
    this.initScenes()

    return super.init(name, options)
  }

  destroy() {
    return super.destroy()
  }

  initElements() {
    this.elements.forEach((element) => {
      element.options = {
        offset: element.getAttribute('scroll-offset') != null ? parseInt(element.getAttribute('scroll-offset')) : 0,
        hook: element.getAttribute('scroll-hook') > 0 ? parseInt(element.getAttribute('scroll-hook')) / 100 : 0.75,
        once: element.getAttribute('scroll-once') != 'false' ? true : false
      }
    })
  }

  initScenes() {
    let scenes = []

    this.elements.forEach((element) => {
      let animations = []
      let trigger = element.getAttribute('scroll-trigger')

      if (trigger.match(/\[(.*?)\]/)) {
        animations = trigger
          .match(/\[(.*?)\]/)[1]
          .replace(' ', '')
          .split(',')
      } else {
        animations.push(trigger)
      }

      element.animations = []

      animations.forEach((animation) => {
        let currAnime
        switch (animation) {
          case 'fade':
            currAnime = new AnimeFade(element)
            currAnime.init()
            element.animations.push(currAnime)
            break
          case 'move':
            currAnime = new AnimeMove(element)
            currAnime.init()
            element.animations.push(currAnime)
            break
          default:
            currAnime = new AnimeFade(element)
            currAnime.init()
            element.animations.push(currAnime)
        }
      })

      scenes.push(
        new CoreScrollScene({
          triggerElement: element,
          triggerHook: element.options.hook,
          offset: element.options.offset,
          once: element.options.once,
          enter: () => {
            if (element.animations.length > 0) {
              element.animations.forEach((animation) => {
                animation.play()
              })
            }
          },
          leave: () => {
            if (element.animations.length > 0) {
              element.animations.forEach((animation) => {
                animation.play(true)
              })
            }
          }
        })
      )
    })

    super.scrollScenes = scenes
  }
}

export default ScrollTriggerManager
