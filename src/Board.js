// This file is a Backbone Model Don't worry about what that means,
// or the initialize method.  It's part of the Board Visualizer.
// 
// Look over the other methods and write the helper functions futher
// down in the file.

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyBoardMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    // Returns our current value of n
    n: function() {
      return this.get('n');
    },

    // Returns an array with values from 0 to (n-1)
    nRange: function() {
      return _.range(this.n());
    },

    // Returns true if passed row/column is in bounds, else false
    isInBounds: function(rowIndex, colIndex) {
      return (
        (0 <= rowIndex) && (rowIndex < this.n()) &&
        (0 <= colIndex) && (colIndex < this.n())
      );
    },

    // Returns 1 if there's a piece at the passed row/column
    // Returns 0 if there's no piece or if we're out of bounds
    getPiece: function(rowIndex, colIndex) {
      if (!this.isInBounds(rowIndex, colIndex)) {
        return 0;
      }
      return this.get(rowIndex)[colIndex];
    },

    setPiece: function(rowIndex, colIndex, val) {
      if (!this.isInBounds(rowIndex, colIndex)) {
        return;
      }
      this.get(rowIndex)[colIndex] = (val ? 1 : 0);
    },

    // Return an array of all row arrays
    allRows: function() {
      return _(this.nRange()).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },  
    
    //
    // The four method below are used by the visualizer.  You might check out how
    // togglePiece() works, but don't worry about the other method.
    //

    togglePiece: function(rowIndex, colIndex) {
      // Unary plus changes true/false to 0/1 here
      this.setPiece(rowIndex, colIndex, + (!this.getPiece(rowIndex, colIndex)));
      // Let Backbone know to update (if we have a handy visualizer)
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/


    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var rows = this.allRows();
      var row = rows[rowIndex];
      var total = 0;
      // var total = _.reduce(row, function(memo, value, index) {
      //   return memo += value;
      // }, 0)
      for (var i = 0; i < row.length; i++) {
        total += row[i];
        // change comparison operator to equals for optimization
        if (total > 1) {
          return true;
        }
      }
      // if (total > 1) {
      //   return true;
      // } 
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var rowsLength = this.n();
      console.log(rowsLength);
      for (var i = 0; i < rowsLength; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
    },


    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var rows = this.allRows();
      var col = [];
      var total = 0;
      for(var i=0; i<rows.length; i++){
        // pushing item in row (rows[i]) at colIndex to col
        col.push(rows[i][colIndex]);
      }
      for (var j = 0; j < col.length; j++) {
        total += col[j];
        // change comparison operator to equals for optimization
        if (total > 1) {
          return true;
        }
      }
      // if (total > 1) {
      //   return true;
      // } 
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var colLength = this.n();

      //iterate through first index at each row
      for(var i=0; i<colLength; i++){
        //somehow: call hasColConflictAt(every column index)      
        if(this.hasColConflictAt(i)){
          return true;
        }  
      }
      return false; // fixme
    },


    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // rows and columns increment at same rate
      // could create a diagonal array (making sure index is on board)
      // great place to refactor!
      var majorInd = majorDiagonalColumnIndexAtFirstRow;
      var rows = this.allRows();
      var diag = [];
      if(majorInd < 0){
        Math.abs(majorInd)
      }
      
      // if our majorInd is negative, we want to start down majorInd rows
      // add absolute value of major ind to our row increment
      for(var i=0; i<rows.length; i++){
        //check to see if defined
        this.isInBounds()

        diag.push(rows[majorInd+i][i]);
      }

      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      return false; // fixme
    },


    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });
}());


var makeEmptyBoardMatrix = function(n) {
  return _(_.range(n)).map(function() {
    return _(_.range(n)).map(function() {
      return 0;
    });
  });
};
