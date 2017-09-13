var CANVAS_WIDTH = 800
var CANVAS_HEIGHT = 600

var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')
var boxSize = 20
var rowct = Math.floor(CANVAS_HEIGHT / boxSize)
var colct = Math.floor(CANVAS_WIDTH / boxSize)

var arr = new Array(rowct)
for (var i = 0; i < rowct; i++) {
  arr[i] = new Array(colct)
  for (var j = 0; j < colct; j++) {
    arr[i][j] = false
  }
}

canvas.addEventListener('click', handleClick)

function draw () {
  for (var row = 0; row < rowct; row++) {
    for (var column = 0; column < colct; column++) {
    }
  }
}

function handleClick (e) {
  arr[e.offsetX % boxSize][e.offsetY % boxSize] = !arr[e.offsetX % boxSize][e.offsetY % boxSize]

  if (arr[e.offsetX % boxSize][e.offsetY % boxSize]) {
    context.fillStyle = '#fff'
    context.fillRect(Math.floor(e.offsetX / boxSize) * boxSize,
                    Math.floor(e.offsetY / boxSize) * boxSize - 1,
                    boxSize, boxSize)
  } else {
    context.fillStyle = '#000'
  }
}

draw()
