var blossom = require('edmonds-blossom')

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

// for (var i = 0; i < playersData.length; i++) {
//   matrix[i] = new Array(playersData.length)
//   matrix[i].fill(0)
// }

// fill matrix
for (var y = 0; y < playersData.length; y++) {
  var playerY = playersData[y]

  for (var x = 0; x < playersData.length; x++) {
    var playerX = playersData[x]

    if (x === y) {
      matrix[x+1][y+1] = -1
    }
    else if (playerY.opponents.indexOf(x) !== -1) {
      matrix[x+1][y+1] = -2
      matrix[y+1][x+1] = -2
    }
    else {
      // cellValue = Math.abs(playerX.points - playerY.points) + ' '+ playerX.points + ' '+ playerY.points
      matrix[x+1][y+1] = Math.abs(playerX.points - playerY.points)
      matrix[y+1][x+1] = Math.abs(playerX.points - playerY.points)
    }
  }
}
// for (var y = 0; y < playersData.length; y++) {
//   var playerY = playersData[y]
//
//   for (var x = 0; x < playersData.length; x++) {
//     var playerX = playersData[x]
//
//     if (x === y) {
//       matrix[x][y] = 1024*516
//     }
//     else if (playerY.opponents.indexOf(x) !== -1) {
//       matrix[x][y] = 1024*1024
//       matrix[y][x] = 1024*1024
//     }
//     else {
//       // cellValue = Math.abs(playerX.points - playerY.points) + ' '+ playerX.points + ' '+ playerY.points
//       matrix[x][y] = Math.abs(playerX.points - playerY.points)
//       matrix[y][x] = Math.abs(playerX.points - playerY.points)
//     }
//   }
// }

matrix.forEach(row => console.log(row.join('\t') + '\n'))
// console.log(blossom(matrix))
