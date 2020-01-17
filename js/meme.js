preloadAssets()

// keys
const STOP_KEY = 83  // s key
const RESET_KEY = 82 // r key
const SOUND_KEY = 77 // m key
const UP_KEY = 38
const DOWN_KEY = 40
const SPACE_KEY = 32
const ENTER_KEY = 13

const SPEED_GRANULARITY = 0.25
const MODE_MAP = {
  "dark": "#242323",
  "light": "#FFFFFF",
}

let speed = 0
let interval = 0
let spinning = false
let secretMode = false
let mode = getStorageMode()
let hoveringClickable = false // lazy hack - stops santi from appearing when clicking clickable elements
let soundOn = getSound()

// setup
const modeContainer = document.querySelector(".dark-mode-container")
modeContainer.querySelector("#cb5").checked = mode === "dark"
modeContainer.classList.toggle("hidden")

const soundImage = document.querySelector("#soundImage")
soundImage.classList.toggle("hidden")

setBackgroundColour()
setSoundImage()

// event listeners
modeContainer.addEventListener("mouseover", () => hoveringClickable = true)
modeContainer.addEventListener("mouseout", () => hoveringClickable = false)
soundImage.addEventListener("mouseover", () => hoveringClickable = true)
soundImage.addEventListener("mouseout", () => hoveringClickable = false)
document.addEventListener("mousedown", ʕಠᴥಠʔ)
document.addEventListener("dragover", ʕಠᴥಠʔ)
document.addEventListener("keydown", handleKeyPress)

function ʕಠᴥಠʔ (ᕕ〳ಠل͜ಠ〵ᕗ) {
  if (hoveringClickable) return

  createSanti(ᕕ〳ಠل͜ಠ〵ᕗ.clientX, ᕕ〳ಠل͜ಠ〵ᕗ.clientY)
}

function handleKeyPress (e) {
  // key events that you want to run always
  if (e.keyCode == ENTER_KEY) {
    bulkSanti()
  } else if (e.keyCode == SOUND_KEY) {
    handleSoundToggle()
  }

  if (getImages().length === 0) return

  // key events you only want to run if there are images on the screen
  if (e.keyCode == UP_KEY) {
    speed += SPEED_GRANULARITY
    if (!spinning) spin()
  } else if (e.keyCode == DOWN_KEY) {
    speed -= SPEED_GRANULARITY
    if (!spinning) spin()
  } else if (e.keyCode == STOP_KEY) {
    stop()
  } else if (e.keyCode == RESET_KEY) {
    reset()
  } else if (e.keyCode == SPACE_KEY) {
    toggleSecretMode()
  }
}

function createSanti (x, y) {
  const ಠωಠ = document.createElement("img")
  let imagePath = null
  const randomNumber = Math.random()

  if (randomNumber <= 0.001) { // 0.1% chance - ultra rare bron
    imagePath = "./images/smol_bren.png"
  } else if (randomNumber <= 0.01) { // 1% chance - rare bron
    imagePath = "./images/bog_bren.png"
  } else {
    imagePath = "./images/degenerate.png"
  }

  ಠωಠ.setAttribute("src", imagePath)
  ಠωಠ.classList.add("santi")
  ಠωಠ.style.left = `${x - 60}px`
  ಠωಠ.style.top = `${y - 100}px`

  if (secretMode)
    ಠωಠ.style["transform-origin"] = randomTransformOrigin()

  if (soundOn) sayDegenerate()

  document.body.appendChild(ಠωಠ)
}

function sayDegenerate() {
  const 〳ಠʖಠ〵 = document.createElement("audio")
  〳ಠʖಠ〵.setAttribute("src", `./audio/degenerate${Math.floor(Math.random() * 4) + 1}.m4a`)
  〳ಠʖಠ〵.play()
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
  secretMode = false
  speed = 0
}

function handleSoundToggle() {
  soundOn = !soundOn
  setSound()
  setSoundImage()
}

function setSoundImage() {
  const soundImage = document.querySelector("#soundImage")
  const keyword = soundOn ? "on" : "off"
  soundImage.setAttribute("src", `./images/volume_${keyword}_${mode}.png`)
}

function eachImage (callback) {
  return Array.prototype.forEach.call(getImages(), callback)
}

function getImages () {
  return document.body.querySelectorAll(".santi")
}

function deleteImages () {
  eachImage(image => document.body.removeChild(image))
}

function reset () {
  stop()
  while (getImages().length > 0) deleteImages()
}

function randomTransformOrigin () {
  return `${Math.random() * 100}% ${Math.random() * 100}%`
}

function toggleSecretMode () {
  secretMode = !secretMode

  eachImage(image => {
    let transformValue = "0"

    if (secretMode)
      transformValue = randomTransformOrigin()

    image.style["transform-origin"] = transformValue
  })
}

function bulkSanti (numSantis = 100) {
  if (!secretMode) toggleSecretMode()

  if (!speed)
    speed = parseFloat(["-", "+"][Math.round(Math.random())] + (SPEED_GRANULARITY * 10))

  if (!spinning) spin()

  for (let i = 0; i < numSantis; i++) {
    const x = Math.random() * window.innerWidth
    const y = Math.random() * window.innerHeight

    createSanti(x, y)
  }
}

function setBackgroundColour () {
  document.body.style["background-color"] = MODE_MAP[mode] || MODE_MAP["light"]
}

function handleModeChange () {
  mode = mode === "dark" ? "light" : "dark"
  setBackgroundColour()
  setStorageMode()
  setSoundImage()
}

function getStorageMode () {
  return storageWrapper(() => localStorage.getItem("mode")) || "light"
}

function setStorageMode () {
  storageWrapper(() => localStorage.setItem("mode", mode))
}

function getSound() {
  const sound = storageWrapper(() => localStorage.getItem("soundOn"))
  return sound == null ? true : parseBool(sound)
}

function setSound() {
  storageWrapper(() => localStorage.setItem("soundOn", soundOn))
}

function storageWrapper (callback) {
  return typeof(localStorage) !== "undefined" ? callback() : null
}

function parseBool (value) {
  if (typeof value === "boolean") return value
  if (value === "false") return false

  return Boolean(value)
}

function preloadAssets () {
  // preloads required files to avoid jank when they aren't cached

  [
    "bog_bren",
    "degenerate",
    "smol_bren",
    "volume_off_dark",
    "volume_off_light",
    "volume_on_dark",
    "volume_on_light"
  ].forEach(image_name => (new Image()).src = `./images/${image_name}.png`)

  for (let i = 1; i <= 5; i++)
    (new Audio).src = `./audio/degenerate${i}.m4a`
}
