// quick and simple browser detection based on user agent
// it detects most used browsers

let instance = null;

const isSafari = (ua) => {
  return ua.indexOf('Safari') > -1
}

const isTouch = (ua) => {
  const regex = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/
  return testUserAgent(regex, ua)
}

const isIos = (ua) => {
  const regex = /iP(hone|od|ad)/
  return testUserAgent(regex, ua)
}

const isAndroid = (ua) => {
  const regex = /Android/
  return testUserAgent(regex, ua)
}

const isBot = (ua) => {
  const regex = /bot|curl|libwww|wget|yandexbot|scrapy|googlebot|crawler|spider|robot|crawling|bingbot|slurp/i
  return testUserAgent(regex, ua)
}

const testUserAgent = (regex, ua) => {
  return new RegExp(regex).test(ua)
}

class Device {

  constructor() {

    if(!instance) {
      instance = this
    }

    return instance
  }

  detect(ua) {
    this.ua = ua||''
    this.isAndroid = isAndroid(ua)
    this.isIOS = isIos(ua)
    this.isTouch = isTouch(ua)
    this.isBot = isBot(ua)
    this.isSafari = isSafari(ua)
  }

  getIsTouch() {
    return this.touch
  }

}

export default new Device()
