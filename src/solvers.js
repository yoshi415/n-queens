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
      if(ourBoard.hasAnyColConflicts() || ourBoard.hasAnyRowConflicts()){
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
  // make solutions array
  var solutionCount = 0;
  var ourBoard = new Board({n: num});
  var maxIndex = num - 1;

  // define recurse function
  var recurse = function(r,c) {
    var rooksCount = 0;
    for(var i=r; i<num; i++){
      //for every spaceinrow:
      for(var j = c; j<num; j++){
        //place a piece
        ourBoard.setPiece(i,j,1);
        rooksCount++;
        //check for horiz/vertical conflicts at space(r,c)
        if(ourBoard.hasAnyColConflicts() || ourBoard.hasAnyRowConflicts()){
          ourBoard.setPiece(i,j,0);
          rooksCount--;
        }
        if (rooksCount === num) {
          solutionCount++;
          if ((c === maxIndex) && (r === maxIndex)) {
            return solutionCount;
          }
          // if rows has reached length of num elements
          if (c < maxIndex) {
            // increment column
            c++;
            recurse(r,c);
          }
          // if 
          if (c === maxIndex) {
            c = 0;
            r++;
          }
          // recurse and re-initialize board at incremented coords
          recurse(r, c);
        }
      }
    }
  }
  recurse(0,0)

  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};


// Return a matrix (an array of arrays) representing a single nxn chessboard,
// with n queens placed such that none of them can attack each other.
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// Return the number of nxn chessboards that exist, with n queens placed such that none
// of them can attack each other.
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
