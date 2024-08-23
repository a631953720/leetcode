/**
 * @param {number} num
 * @return {number}
 */
var findComplement = function(num) {
  if (num === 1) return 0;
  if (num === 0) return 1;

  const maskSquare = Math.floor(Math.log2(num)) + 1;
  const mask = (2 ** maskSquare) - 1;
  return mask ^ num;
};

console.log(findComplement(1));
console.log(findComplement(5));
console.log(findComplement(100));
