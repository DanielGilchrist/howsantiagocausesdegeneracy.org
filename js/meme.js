document.addEventListener("mousedown", ʕಠᴥಠʔ)
document.addEventListener("dragover", ʕಠᴥಠʔ)
document.addEventListener("keydown", handleKeyPress)

const STOP_KEY = 83 // s key
const RESET_KEY = 82 // r key
const UP_KEY = 38
const DOWN_KEY = 40
const SPACE_KEY = 32
const SPEED_GRANULARITY = 0.25

let speed = 0
let interval = 0
let spinning = false
let secretMode = false

function ʕಠᴥಠʔ (ᕕ〳ಠل͜ಠ〵ᕗ) {
  const ಠωಠ = document.createElement("img")
  ಠωಠ.setAttribute("src", "./images/degenerate.png")
  ಠωಠ.style.left = `${ᕕ〳ಠل͜ಠ〵ᕗ.clientX - 60}px`
  ಠωಠ.style.top = `${ᕕ〳ಠل͜ಠ〵ᕗ.clientY - 100}px`
  if (secretMode) {
    ಠωಠ.style["transform-origin"] = generateTransformOrigin()
  }

  const 〳ಠʖಠ〵 = document.createElement("audio")
  〳ಠʖಠ〵.setAttribute("src", `./audio/degenerate${Math.floor(Math.random() * 4) + 1}.m4a`)
  〳ಠʖಠ〵.play()

  document.body.appendChild(ಠωಠ)
}

function handleKeyPress (e) {
  if (getImages().length === 0) { return }

  if (e.keyCode == UP_KEY) {
    speed += SPEED_GRANULARITY
    if (!spinning) { spin() }
  } else if (e.keyCode == DOWN_KEY) {
    speed -= SPEED_GRANULARITY
    if (!spinning) { spin() }
  } else if (e.keyCode == STOP_KEY) {
    stop()
  } else if (e.keyCode == RESET_KEY) {
    reset()
  } else if (e.keyCode == SPACE_KEY) {
    secretMode = !secretMode

    eachImage(image => {
      let transformValue = "0"

      if (secretMode) {
        transformValue = generateTransformOrigin()
      }

      image.style["transform-origin"] = transformValue
    })
  }
}

function spin () {
  let rot = 0
  interval = setInterval(() => {
    rot += speed
    eachImage(image => image.style.transform = `rotate(${rot}deg)`)
  }, 1)
  spinning = true
}

function stop () {
  clearInterval(interval)
  eachImage(image => image.style.transform = "rotate(0deg)")
  spinning = false
  speed = 0
}

function generateTransformOrigin () {
  return `${Math.random() * 100}% ${Math.random() * 100}%`
}

function eachImage (callback) {
  const images = getImages()
  return Array.prototype.forEach.call(images, callback)
}

function getImages () {
  return document.body.getElementsByTagName("img")
}

function deleteImages () {
  eachImage(image => document.body.removeChild(image))
}

function reset () {
  stop()
  let numImages = getImages().length
  while (numImages > 0) {
    deleteImages()
    numImages = getImages().length
  }
}
