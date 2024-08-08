/**
 * @param {string[]} arr
 * @param {number} k
 * @return {string}
 */
var kthDistinct = function(arr, k) {
  const distinct = [];
  const countMap = {};

  arr.forEach((v) => {
    if (countMap[v]) {
      countMap[v] += 1;
    } else {
      countMap[v] = 1;
    }
  });

  Object.entries(countMap).forEach(([key, value]) => {
    if (value < 2) {
      distinct.push(key);
    }
  });

  return distinct[k - 1] ?? '';
};

console.log(kthDistinct(["d","b","c","b","c","a"], 2)); // a
console.log(kthDistinct(['aaa', 'aa', 'a'], 1)); // aaa
console.log(kthDistinct(["a","b","a"], 3)); // aaa