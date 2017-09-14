var CANVAS_WIDTH = 800
var CANVAS_HEIGHT = 600
var FPS = 1

var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')
var boxSize = 20
var rowct = Math.floor(CANVAS_HEIGHT / boxSize)
var colct = Math.floor(CANVAS_WIDTH / boxSize)
var paused = true

var arr = new Array(rowct)
for (var i = 0; i < rowct; i++) {
  arr[i] = new Array(colct)
  for (var j = 0; j < colct; j++) {
    arr[i][j] = false
  }
}

document.addEventListener('keydown', function (event) {
  toggle()
}, false)

function toggle () {
  paused = !paused
}

function draw () {
  for (var row = 0; row < rowct; row++) {
    for (var column = 0; column < colct; column++) {
      if (arr[i][j]) {
        context.fillStyle = '#fff'
        context.fillRect(i * boxSize, j * boxSize - 1, boxSize, boxSize)
      }
    }
  }
}

function update () {
  var tmp = arr.slice(0)

  for (var i = 0; i < rowct; i++) {
    for (var j = 0; j < colct; j++) {
      console.log(arr.length)
      var aliveCount = sumNeighbors(arr, i, j)
      // alive
      if (arr[i][j]) {
        if (aliveCount === 2 || aliveCount === 3) {
          tmp[i][j] = true
        } else {
          tmp[i][j] = false
        }
      // dead
      } else {
        if (aliveCount === 3) {
          tmp[i][j] = true
        } else {
          tmp[i][j] = false
        }
      }
    }
  }
  arr = tmp.slice(0)
}

function sumNeighbors (arr, row, col) {
  console.log(rowct)
  console.log(colct)
  console.log(row)
  console.log(col)
  return arr[(row - 1 + rowct) % rowct][(col - 1 + colct) % colct] +
          arr[(row - 1 + rowct) % rowct][col] +
          arr[(row - 1 + rowct) % rowct][(col + 1) % colct] +
          arr[row][(col - 1 + colct) % colct] +
          arr[row][(col + 1) % colct] +
          arr[(row + 1) % rowct][(col - 1 + colct) % colct] +
          arr[(row + 1) % rowct][col] +
          arr[(row + 1) % rowct][(col + 1) % colct]
}

function handleClick (e) {
  arr[e.offsetX % boxSize][e.offsetY % boxSize] = !arr[e.offsetX % boxSize][e.offsetY % boxSize]

  if (arr[e.offsetX % boxSize][e.offsetY % boxSize]) {
    context.fillStyle = '#fff'
    context.fillRect(Math.floor(e.offsetX / boxSize) * boxSize,
                    Math.floor(e.offsetY / boxSize) * boxSize - 1,
                    boxSize, boxSize)
  } else {
    context.clearRect(Math.floor(e.offsetX / boxSize) * boxSize,
                    Math.floor(e.offsetY / boxSize) * boxSize - 1,
                    boxSize, boxSize)
  }
}

setInterval(function () {
  if (paused) {
    canvas.addEventListener('click', handleClick)
  } else {
    update()
    draw()
  }
}, 1000 / FPS)
