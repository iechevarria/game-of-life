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
canvas.addEventListener('space', play)


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

  for (var row = 0; row < rowct; row++) {
    for (var column = 0; column < colct; column++) {
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
  return (arr[(row - 1) % rowct][(col - 1) % colct] +
          arr[(row - 1) % rowct][col % colct] +
          arr[(row - 1) % rowct][(col + 1) % colct] +
          arr[row % rowct][(col - 1) % colct] +
          arr[row % rowct][(col + 1) % colct] +
          arr[(row + 1) % rowct][(col - 1) % colct] +
          arr[(row + 1) % rowct][col % colct] +
          arr[(row + 1) % rowct][(col + 1) % colct])
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

function play () {
  context.fillStyle = '#f00'
  context.fillRect(0, 0, boxSize, boxSize)
}
