function TreeNode(val, left, right) {
  this.val = val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function(inorder, postorder) {
  if (!inorder.length || !postorder.length) return null;

  const r = postorder[postorder.length - 1];
  const n = inorder.findIndex((v) => v === r);

  return new TreeNode(
    r,
    buildTree(inorder.slice(0, n), postorder.slice(0, n)),
    buildTree(inorder.slice(n + 1), postorder.slice(n, postorder.length - 1)),
  )
};

const postorder = [9,15,7,20,3];
const inorder = [9,3,15,20,7];
console.log(buildTree(inorder, postorder));

// inorder = [10,9,3,11,15,20,7], postorder = [10,9,11,15,7,20,3]
// [3,9,20,10,null,15,7,null,null,11]
