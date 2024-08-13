// Definition for a binary tree node.
function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}
/**
 * @param {TreeNode} root
 * @return {string[]}
 */
var binaryTreePaths = function(root) {
  const result = [];
  if (root) backtrack([root], result);
  return result;
};

/**
 * @param {TreeNode[]} paths
 * @param {string[]} result
 * @return {string[]}
 */
function backtrack(paths, result) {
  const current = paths[paths.length - 1];

  if (!current) return;

  if (current.left === null && current.right === null) {
    result.push(paths.map((n) => n.val).join('->'));
    return;
  }

  const options = [];
  if (current.left) options.push(current.left);
  if (current.right) options.push(current.right);

  for (let i = 0; i < options.length; i++) {
    paths.push(options[i]);
    backtrack(paths, result);
    paths.pop();
  }
}
