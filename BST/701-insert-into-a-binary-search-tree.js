const { generateBST } = require('./buildBST');
const { TreeNode } = require('./TreeNode');

/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var insertIntoBST = function(root, val) {
  if (root.val === null) {
    root.val = val;
    return root;
  }

  let parentNode = null;
  let currentNode = root;

  while (currentNode !== null) {
    parentNode = currentNode;
    if (val > currentNode.val) {
      currentNode = currentNode.right;
    } else {
      currentNode = currentNode.left;
    }
  }

  if (val > parentNode.val) {
    parentNode.right = new TreeNode(val);
  } else {
    parentNode.left = new TreeNode(val);
  }
};

function testing() {
  let root = generateBST([4, 2, 7, 1, 3]);
  insertIntoBST(root, 5);

  let root2 = generateBST([40, 20, 60, 10, 30, 50 ,70]);
  insertIntoBST(root2, 25);

  let root3 = generateBST([4, 2, 7, 1, 3, null, null, null, null, null, null]);
  insertIntoBST(root3, 5);
}

testing()
