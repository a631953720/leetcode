/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
  const sorted = candidates.sort((a, b) => a - b);
  const result = [];
  backtrack(sorted, target, result);
  return result;
};

// backtrack 的核心概念：遞迴、走訪與退回、達到條件後結束遞迴
function backtrack(candidates = [], target, result = [], path = [], index = 0) {
  if (target === 0) {
    result.push([...path]);
    return;
  }

  for (let i = index; i < candidates.length; i++) {
    const current = candidates[i];
    // 當前的值大於尋找的值，可直接忽略
    if (current > target) return;

    // 因陣列排序過，假如跟前一個元素相等就是重複的元素
    // ex [1, 1, 2] 陣列，遞迴的第一個 callstack 衍伸出來的遞迴檢查完之後
    // 會回到第一個 callstack 的下一個迴圈， i=1, index=0
    // 前後元素相同，已經在第二層 callstack 完成的事情沒必要重新做，所以可忽略
    if (i > index && current === candidates[i -1]) {
      continue;
    }

    path.push(current);
    backtrack(
      candidates,
      target - current,
      result,
      path,
      i + 1,
    );
    path.pop();
  }
}

// console.log(combinationSum2(
//   [10,1,2,7,6,1,5],
//   8,
// ));

console.log(combinationSum2(
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  30,
));