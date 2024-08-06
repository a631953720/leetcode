/**
 * @param {any} val
 * @param {TreeNode | undefined} left
 * @param {TreeNode | undefined} right
 */
function TreeNode(val, left, right) {
  this.val = val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

module.exports = {
  TreeNode,
}
