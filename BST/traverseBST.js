import { TreeNode } from './TreeNode';

/**
 * @param {TreeNode} root
 * @param {any[]} result
 * @return {void}
 */
function preorderTraverse(root, result) {
  if (root === null) return;

  result.push(root);
  if (root.left !== null) preorderTraverse(root.left, result);
  if (root.right !== null) preorderTraverse(root.right, result);
}

/**
 * @param {TreeNode} root
 * @param {any[]} result
 * @return {void}
 */
function inorderTraverse(root, result) {
  if (root === null) return;

  if (root.left !== null) inorderTraverse(root.left, result);
  result.push(root);
  if (root.right !== null) inorderTraverse(root.right, result);
}

/**
 * @param {TreeNode} root
 * @param {any[]} result
 * @return {void}
 */
function postorderTraverse(root, result) {
  if (root === null) return;

  if (root.left !== null) postorderTraverse(root.left, result);
  if (root.right !== null) postorderTraverse(root.right, result);
  result.push(root);
}
