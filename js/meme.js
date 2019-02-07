document.addEventListener("mousedown", ʕಠᴥಠʔ)
document.addEventListener("dragover", ʕಠᴥಠʔ)
document.addEventListener("keydown", handleKeyPress)

const spinKey = 83 // s
let interval = 0
let spinning = false
let speed = 1

function ʕಠᴥಠʔ (ᕕ〳ಠل͜ಠ〵ᕗ) {
  const ಠωಠ = document.createElement("img")
  ಠωಠ.setAttribute("src", "./images/degenerate.png")
  ಠωಠ.style.left = `${ᕕ〳ಠل͜ಠ〵ᕗ.clientX - 60}px`
  ಠωಠ.style.top = `${ᕕ〳ಠل͜ಠ〵ᕗ.clientY - 100}px`

  const 〳ಠʖಠ〵 = document.createElement("audio")
  〳ಠʖಠ〵.setAttribute("src", `./audio/degenerate${Math.floor(Math.random() * 4) + 1}.m4a`)
  〳ಠʖಠ〵.play()

  document.body.appendChild(ಠωಠ)
}

function handleKeyPress (e) {
  if (e.keyCode == spinKey) {
    spinning ? stop() : spin()
  } else if (e.keyCode == 38) {
    speed++
  } else if (e.keyCode == 40) {
    speed--
  }
}

function spin () {
  var images = document.body.getElementsByTagName("img")
  let rot = 0
  interval = setInterval(() => {
    rot += speed
    Array.prototype.forEach.call(images, el => {
      el.style.transform = `rotate(${rot}deg)`
    })
  }, 1)
  spinning = true
}

function stop () {
  clearInterval(interval)
  var els = document.body.getElementsByTagName("img")
  Array.prototype.forEach.call(els, el => {
    el.style.transform = "rotate(0deg)"
  })
  spinning = false
  speed = 1
}
