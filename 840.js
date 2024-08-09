/**
 * @param {number[][]} grid
 * @return {number}
 */
var numMagicSquaresInside = function(grid) {
  const colSize = grid[0].length;
  const rolSize = grid.length;
  let result = 0;

  if (colSize < 3 || rolSize < 3) return 0;

  let startX = 0;
  let startY = 0;

  function nextStep() {
    startX += 1;

    if (startX + 3 > colSize) {
      startX = 0;
      startY += 1;
    }
  }

  while (startX + 3 <= colSize && startY + 3 <= rolSize) {
    const square = cutSquare(grid, startX, startY);

    if (checkHasDuplicatedOrOverRange(square)) {
      nextStep();
      continue;
    }

    let hasAnyFailed = false;
    let index = 1;
    let base = calcRowSum(square, 0);

    for (let i = 1; i < square.length; i++) {
      const tmp = calcRowSum(square, index);
      if (tmp !== base) hasAnyFailed = true;
    }

    if (hasAnyFailed) {
      nextStep();
      continue;
    }

    index = 0;
    for (let i = 0; i < square[0].length; i++) {
      const tmp = calcColSum(square, index);
      if (tmp !== base) hasAnyFailed = true;
    }

    if (hasAnyFailed) {
      nextStep();
      continue;
    }

    for (let i = 0; i < 2; i++) {
      const tmp = calcDiagonalSum(square, i % 2 === 0 ? 'right' : 'left');
      if (tmp !== base) hasAnyFailed = true;
    }

    if (!hasAnyFailed) result += 1;
    nextStep();
  }

  return result;
};

/**
 * @param {number[][]} square
 * @param {number} index
 * @return {number}
 */
function calcRowSum(square = [], index = 0) {
  return square.reduce((acc, curr) => acc + curr[index], 0);
}

/**
 * @param {number[][]} square
 * @param {number} index
 * @return {number}
 */
function calcColSum(square = [], index = 0) {
  return square[index].reduce((acc, curr) => acc + curr, 0);
}

/**
 * @param {number[][]} square
 * @param {'left'|'right'} direction
 * @return {number}
 */
function calcDiagonalSum(square = [], direction) {
  if (direction === 'left') {
    return square[0][0] + square[1][1] + square[2][2];
  } else {
    return square[0][2] + square[1][1] + square[2][0];
  }
}

/**
 * @param {number[][]} grid
 * @param {number} startX
 * @param {number} startY
 * @return {number[][]}
 */
function cutSquare(grid = [], startX = 0, startY = 0) {
  const square = [];

  for (let i = startY; i < startY + 3; i++) {
    square.push(grid[i].slice(startX, startX + 3));
  }

  return square;
}

function checkHasDuplicatedOrOverRange(square = []) {
  const nums = square.flatMap((v) => v);
  return (
    nums.some((v) => v > 9 || v < 1)
    || new Set(nums).size !== nums.length
  );
}

// edge cases
console.log(numMagicSquaresInside([[10,3,5],[1,6,11],[7,9,2]])) //0

console.log(numMagicSquaresInside([
  [5,5,5],
  [5,5,5],
  [5,5,5]
])); // 0