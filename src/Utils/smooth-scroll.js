
let currentScroll = window.pageYOffset
let initialScroll = currentScroll
let scrollY = 0;
let count = 0;

const easingTypes = {
  
  easeOutCubic(c, s, a, t) {
    return a * (Math.pow(c / t - 1, 3) + 1) + s;
  },

  easeInOutQuad(c, s, a, t) {
    if ((c /= t / 2) < 1) {
      return a / 2 * c * c + s;
    }
    return -a / 2 * ((--c) * (c - 2) - 1) + s;
  }  
}

export default function smoothScroll(target, easingType='easeOutCubic', iterations=200) {
  
  if(!easing.easingType) {
    easingType='easeOutCubic'
  }

  function scrollTo() {

    if(scrollY<target) {
      scrollY = easing[easingType](count, 0, target, iterations)  
      window.scrollTo(0, scrollY+1)
      count+=1
      requestAnimationFrame(scrollTo)
    }
    
  }

  scrollTo()
}
