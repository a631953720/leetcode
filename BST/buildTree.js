function TreeNode(val, left, right) {
  this.val = val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
  if (!preorder.length && !inorder.length) return null;

  // preorder 第一個節點一定是 root
  const r = preorder[0];
  const n = inorder.findIndex((v) => v === r);
  // inorder root元素左邊的是左子樹，右邊是右子樹

  return new TreeNode(
    preorder[0],
    buildTree(preorder.slice(1, n + 1), inorder.slice(0, n)),
    buildTree(preorder.slice(n + 1), inorder.slice(n + 1)),
  );
};

const preorder = [3,9,20,15,7];
const inorder = [9,3,15,20,7];
console.log(buildTree(preorder, inorder));
// preorder = [3,9,10,20,15,11,7], inorder = [10,9,3,11,15,20,7]
// [3,9,20,10,null,15,7,null,null,11]...

// preorder = [1,2,4,6,5,3,7,8,9,10], inorder = [4,2,5,6,1,3,8,9,7,10]
