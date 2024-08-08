/**
 * @param {number} rows
 * @param {number} cols
 * @param {number} rStart
 * @param {number} cStart
 * @return {number[][]}
 */
var spiralMatrixIII = function(rows, cols, rStart, cStart) {
  const result = [];
  // Use coordinates to locate, and invert the y-axis.
  const vector = {
    x: cStart,
    y: rStart,
  };
  let radius = 1;
  let changeDirectionCount = 0;

  function isInTheMatrix(cCurrent, rCurrent) {
    // A two-dimensional array will only have positive integer index values.
    if (cCurrent < 0 || rCurrent < 0) return false;
    return rCurrent < rows && cCurrent < cols;
  }
  
  function checkIsOverBoundary(p) {
    if (Math.abs(p) >= radius) {
      changeDirectionCount += 1;

      // When a full cycle is completed, changeDirectionCount +1
      if (changeDirectionCount % 4 === 0) radius += 1;
    }
  }

  function walk() {
    if (changeDirectionCount % 4 === 0) {
      // right
      vector.x += 1;
      checkIsOverBoundary(vector.x - cStart);
    } else if (changeDirectionCount % 4 === 1) {
      // down
      vector.y += 1;
      checkIsOverBoundary(vector.y - rStart);
    } else if (changeDirectionCount % 4 === 2) {
      // left
      vector.x -= 1;
      checkIsOverBoundary(vector.x - cStart);
    } else if (changeDirectionCount % 4 === 3) {
      // up
      vector.y -= 1;
      checkIsOverBoundary(vector.y - rStart);
    }
  }

  while (result.length < rows * cols) {
    if (isInTheMatrix(vector.x, vector.y)) {
      result.push([vector.y, vector.x]);
    }

    // walk spirally to access all points in the matrix
    walk();
  }

  return result;
};
