var CANVAS_WIDTH = 800
var CANVAS_HEIGHT = 600

var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')
var boxSize = 20
var rowct = Math.floor(CANVAS_HEIGHT / boxSize)
var colct = Math.floor(CANVAS_WIDTH / boxSize)

var board = {
  arrBools: new Array(rowct),
  arrCounts: new Array(rowct),

  init: function () {
    for (var i = 0; i < rowct; i++) {
      this.arrBools[i] = new Array(colct)
      this.arrCounts[i] = new Array(colct)
      for (var j = 0; j < colct; j++) {
        this.arrBools[i][j] = false
        this.arrCounts[i][j] = 0
      }
    }
  },

  toggleBool: function (i, j) {
    this.arrBools[i][j] = !this.arrBools[i][j]
  },

  getBool: function (i, j) {
    return this.arrBools[i][j]
  },

  update: function () {
    for (var row = 0; row < rowct; row++) {
      for (var col = 0; col < colct; col++) {
        this.arrCounts[row][col] = this.arrBools[(row - 1 + rowct) % rowct][(col - 1 + colct) % colct] +
                            this.arrBools[(row - 1 + rowct) % rowct][col] +
                            this.arrBools[(row - 1 + rowct) % rowct][(col + 1) % colct] +
                            this.arrBools[row][(col - 1 + colct) % colct] +
                            this.arrBools[row][(col + 1) % colct] +
                            this.arrBools[(row + 1) % rowct][(col - 1 + colct) % colct] +
                            this.arrBools[(row + 1) % rowct][col] +
                            this.arrBools[(row + 1) % rowct][(col + 1) % colct]
      }
    }
    for (var i = 0; i < rowct; i++) {
      for (var j = 0; j < colct; j++) {
        var aliveCount = this.arrCounts[i][j]
        if (this.arrBools[i][j]) {
          if (aliveCount === 2 || aliveCount === 3) {
            this.arrBools[i][j] = true
          } else {
            this.arrBools[i][j] = false
          }
        } else {
          if (aliveCount === 3) {
            this.arrBools[i][j] = true
          } else {
            this.arrBools[i][j] = false
          }
        }
      }
    }
  }
}

document.addEventListener('keydown', function (event) {
  board.update()
  draw()
}, false)

function draw () {
  context.beginPath()
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

  for (var row = 0; row < rowct; row++) {
    for (var col = 0; col < colct; col++) {
      if (board.getBool(row, col)) {
        context.fillStyle = '#fff'
        context.fillRect(row * boxSize, col * boxSize, boxSize, boxSize)
      }
    }
  }
}

function handleClick (e) {
  board.toggleBool(Math.floor(e.offsetX / boxSize), Math.floor(e.offsetY / boxSize))
  draw()
}


board.init()
canvas.addEventListener('click', handleClick)
