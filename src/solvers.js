/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

  */

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

// Helper functions
// Given a position where a piece is inserted, mark all positions that become 'dangerous' to subsequent pieces
// mark column as taken by inserted piece
window.markCol = function (board, n, row, col) {
  for (var i = 0; i < n; i++) {
    if (i !== row) {
      board[i][col]--;
    }
  }
  return board;
}
// mark row as taken by inserted piece
window.markRow = function (board, n, row, col) {
  for (var j = 0; j < n; j++) {
    if (j !== col) {
      board[row][j]--;
    }
  }
  return board;
}
// mark diagonals as taken by piece
window.markMajorDiags = function (board, n, row, col) {
  var i = 1;
  while ((col + i < n) && (row + i < n)) {
    board[row + i][col + i]--;
    i++;
  }
  i = 1;
  while ((col - i >= 0) && (row - i >= 0)) {
    board[row - i][col - i]--;
    i++;
  }
  return board;
}

window.markMinorDiags = function (board, n, row, col) {
  var i = 1;
  while ((col + i < n) && (row - i >= 0)) {
    board[row - i][col + i]--;
    i++;
  }
  i = 1;
  while ((col - i >= 0) && (row + i < n)) {
    board[row + i][col - i]--;
    i++;
  }
  return board;
}

window.markDiags = function (board, n, row, col) {
  board = window.markMajorDiags(board, n, row, col);
  board = window.markMinorDiags(board, n, row, col);
  return board;
}

window.markDangerous = function(board, n, insertedPieceRowInd, insertedPieceColInd, insertedPiece = null) {
  // inserttedPiece : if passed 'Q', it will mark diagonals, else, mark only row and column
  board = window.markRow(board, n, insertedPieceRowInd, insertedPieceColInd);
  board = window.markCol(board, n, insertedPieceRowInd, insertedPieceColInd);
  if (insertedPiece == 'Q') {
    board = window.markDiags(board, n, insertedPieceRowInd, insertedPieceColInd);
  }
  return board;
}

// Adding a piece to the board
window.placePiece = function(board, n, pieceRow, pieceCol, insertedPiece = null) {
  board[pieceRow][pieceCol] = 1;
  board = window.markDangerous(board, n, pieceRow, pieceCol, insertedPiece);
  return board;
}


window.findNRooksSolution = function(n, node, col = 0) {
  var solution = undefined; //fixme 
  if (!node) {
    var emptyMatrix = _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
    node = new BoardTree(emptyMatrix);
  }
  
  if (col < n) {
    for (var i = 0; i < n; i++) {
      if (node.board[i][col] === 0) {
        newBoard = placePiece(node.board, n, i, col);
        newNode = new BoardTree(newBoard);
        node.addNode(newNode, col === n-1)
        if (newNode.isSolution) {
          return newNode.board;
        } else {
          findNRooksSolution(n, newNode, col + 1);
        }
      }
    }
  }  

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

class BoardTree  {
  constructor (board, isSolution = false) {
    this.board = board;
    this.children = [];
    this.isSolution = isSolution;
  }
  addNode (node) {
    this.children.push(node);
  }
}