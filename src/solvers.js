/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// Hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space.)
// Take a look at solversSpec.js to see what the tests are expecting




// Return a matrix (an array of arrays) representing a single nxn chessboard,
// with n rooks placed such that none of them can attack each other.
window.findNRooksSolution = function(num) {
  // create empty board
  var ourBoard = new Board({n:num});
  var rooksCount = 0;
  // for every row:
  for(var r=0; r<num; r++){
    //for every spaceinrow:
    for(var c=0; c<num; c++){
      //place a piece
      ourBoard.setPiece(r,c,1);
      rooksCount++;
      //check for horiz/vertical conflicts at space(r,c)
      if(ourBoard.hasAnyRooksConflicts()){
        ourBoard.setPiece(r,c,0);
        rooksCount--;
      }
      if (rooksCount === num) {
        break;
      }
    }
  }
  // return solution
  var solution = ourBoard.allRows(); //fixme

  console.log('Single solution for ' + num + ' rooks:', JSON.stringify(solution));
  return solution;
};


// Return the number of nxn chessboards that exist, with n rooks placed such that none
// of them can attack each other.
window.countNRooksSolutions = function(num) {
var solutionCount = 0;
var ourBoard = new Board({n: num});  

// define recurse function
  var recurse = function(row) {
    if (row === num) {
      solutionCount++;
      return;
    }
    // loop through columns until columns is less than num
      //for every spaceinrow:
    for(var j = 0; j<num; j++){
      //place a piece
      ourBoard.setPiece(row,j,1);
      //check for horiz/vertical conflicts at space(r,c)
      if(!ourBoard.hasAnyRooksConflicts()){
        recurse(row + 1);
      }
      ourBoard.setPiece(row,j,0);
    }
    return;
  }
  recurse(0);

  // var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + num + ' rooks:', solutionCount);
  return solutionCount;
};


// Return a matrix (an array of arrays) representing a single nxn chessboard,
// with n queens placed such that none of them can attack each other.

window.findSolution = function(board, currRow, n, conflictsChecker, validBoardCallback) {
  var keepGoing;

  if( currRow === n ) {
    keepGoing = validBoardCallback(board);
    return keepGoing;
  }

  for( var i = 0; i < n; i++ ) {
    board.setPiece(currRow, i, 1);
    if( !conflictsChecker() ) {
      keepGoing = findSolution(board, currRow+1, n, conflictsChecker, validBoardCallback);
      if( !keepGoing ) {
        return false; 
      }
    }
    board.setPiece(currRow, i, 0);
  }

  return true;    // keep going
};

window.findNQueensSolution = function(n) {
  // var ourBoard = new Board({n:n});
  // var solution = ourBoard.allRows();

  // findSolution(ourBoard, 0, ourBoard.hasAnyQueensConflicts.bind(ourBoard), function(ourBoard) {
  //   solution = ourBoard.allRows();
  //   return false
  // });

  // console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  // return solution;
  //Note: this does NOT WORK. we tried :/
  var temp = [];
  var solution;
  var ourBoard = new Board({n: n});  
  var found = false;  
  if(n===2||n===3){
    return board.allRows();
  }
  var recurse = function(row) {
    if (row === n) {
      found = true;
      solution = ourBoard.allRows();
      return;
    }

  //    return;
    // loop through columns until columns is less than n
      //for every spaceinrow:
    if(!found) {
    for(var j = 0; j<n; j++){
      ourBoard.setPiece(row,j,1);
      if(!ourBoard.hasAnyQueensConflicts()){
        recurse(row + 1);
      }
      if(found){
        return;
      }
      ourBoard.setPiece(row,j,0);
    }
  // return;
  }
}
  recurse(0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};
  //stores deep copies of EVERY SOLUTION EVER
  // var solutions = [];
  // var solutionCount = 0;
  // var temp;
  // if( n===2 || n===3 ){
  //   return 0;
  // }
  // var ourBoard = new Board({n: n});  
  // // define recurse function
  // var recurse = function(row) {
  //   if (row === n) {
  //     solutionCount++;
  //     temp = ourBoard.allRows().slice();
  //     //iterates through arrays of arrays, and slices them
  //     for(var i=0; i<temp.length; i++){
  //       temp[i] = temp[i].slice();
  //     }
  //     solutions.push(temp);
  //     return;
  //   }
  //   // loop through columns until columns is less than n
  //     //for every spaceinrow:
  //   for(var j = 0; j<n; j++){
  //     ourBoard.setPiece(row,j,1);
  //     if(!ourBoard.hasAnyQueensConflicts()){
  //       recurse(row + 1);
  //     }
  //     ourBoard.setPiece(row,j,0);
  //   }
  //   return;
  // }
  // recurse(0);

  // console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  // return temp[0];
  // };



// Return the number of nxn chessboards that exist, with n queens placed such that none
  // of them can attack each other.

window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var ourBoard = new Board({n: n});  
  // define recurse function
  var recurse = function(row) {
    if (row === n) {
      solutionCount++;
      return;
    }
    // loop through columns until columns is less than n
      //for every spaceinrow:
    for(var j = 0; j<n; j++){
      ourBoard.setPiece(row,j,1);
      if(!ourBoard.hasAnyQueensConflicts()){
        recurse(row + 1);
      }
      ourBoard.setPiece(row,j,0);
    }
    return;
  }
  recurse(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
