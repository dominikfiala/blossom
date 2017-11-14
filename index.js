var leftPad = require('left-pad')
var playersData = require('./data.json')

// prepare matrix
var matrix = [];
for (var i = 0; i < playersData.length + 1; i++) {
  if (i === 0) {
    matrix[i] = [-1, ...playersData.map(item => item.playerIndex)]
  }
  else {
    matrix[i] = new Array(playersData.length + 1);
    matrix[i].fill(0)
    matrix[i][0] = playersData[i - 1].playerIndex
  }
}

// fill matrix
for (var y = 0; y < playersData.length; y++) {
  var posY = playersData.findIndex(item => {
    return item.playerIndex === y
  })

  for (var x = 0; x < playersData.length; x++) {
    var posX = playersData.findIndex(item => {
      return item.playerIndex === x
    })

    var posDiff
    if (x === y) {
      posDiff = -1
    }
    else if (playersData[y].opponents.indexOf(x) !== -1) {
      posDiff = -2
    }
    else {
      posDiff = Math.abs(posX - posY)
    }
    matrix[x+1][y+1] = posDiff
  }
}

matrix.forEach((row, y) => {
  console.log(row.join('\t') + '\n')
})
