class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/**
 * @param {null} root
 * @param {*} val
 */
function insertIntoBST(root, val) {
  if (root === null) {
    return new TreeNode(val);
  }

  if (val < root.val) {
    root.left = insertIntoBST(root.left, val);
  } else {
    root.right = insertIntoBST(root.right, val);
  }

  return root;
}

/**
 * @param {any[]} arr
 * @return {TreeNode}
 */
function generateBST(arr) {
  let root = null;
  for (let val of arr) {
    root = insertIntoBST(root, val);
  }
  return root;
}

// 使用给定的数组生成二叉树
// let root = generateBST([4, 2, 7, 1, 3]);
// console.log(JSON.stringify(root, null, 2));

module.exports = {
  generateBST,
};
