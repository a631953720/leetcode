import { TreeNode } from './TreeNode.js';

class BinarySearchTree {
  constructor() {
    /**
     * @type {TreeNode|null}
     */
    this.root = null;
  }

  /**
   * @param {any} value
   * @return {BinarySearchTree}
   */
  insert(value) {
    if (this.root === null) {
      this.root = new TreeNode(value);
      return this;
    }

    const stack = [this.root];
    while (stack.length > 0) {
      const currentNode = stack.pop();
      if (currentNode.val === value) return this;

      // 插入節點 > 當前節點，則會在右樹
      if (value > currentNode.val) {
        if (currentNode.right !== null) {
          stack.push(currentNode.right);
        } else {
          currentNode.right = new TreeNode(value);
          break;
        }
      } else {
        if (currentNode.left !== null) {
          stack.push(currentNode.left);
        } else {
          currentNode.left = new TreeNode(value);
          break;
        }
      }
    }

    return this;
  }

  /**
   * @param {any} value
   * @return {TreeNode|null}
   */
  search(value) {
    if (this.root === null) return null;

    let currentNode = this.root;
    while (currentNode !== null) {
      if (currentNode.val === value) return currentNode;

      // 查找的值 > 當前節點則往右找
      if (value > currentNode.val) {
        currentNode = currentNode.right;
      } else {
        currentNode = currentNode.left;
      }
    }

    return null;
  }

  /**
   * @param {any} value
   * @return {boolean}
   */
  remove(value) {
    if (this.root === null) return false;

    /**
     * @type {TreeNode|null}
     * */
    let parentNode = null;
    /**
     * @type {TreeNode|null}
     * */
    let currentNode = this.root;

    // 有找到節點的話，current node 就會是目標節點，
    while (currentNode !== null && currentNode.val !== value) {
      parentNode = currentNode;
      if (value > currentNode.val) {
        currentNode = currentNode.right;
      } else {
        currentNode = currentNode.left;
      }
    }

    if (currentNode === null) return false;

    // 沒有任何子樹，直接移除
    if (currentNode.left === null && currentNode.right === null) {
      if (currentNode === this.root) {
        this.root = null;
      } else if (currentNode === parentNode.right) {
        parentNode.right = null;
      } else {
        parentNode.left = null;
      }
      return true;
    }

    // 有其中一個子樹則要接回去
    if (currentNode.left !== null && currentNode.right === null) {
      if (currentNode === this.root) {
        this.root = currentNode.left;
      } else if (currentNode === parentNode.right) {
        parentNode.right = currentNode.left;
      } else {
        parentNode.left = currentNode.left;
      }
      return true;
    }

    if (currentNode.left === null && currentNode.right !== null) {
      if (currentNode === this.root) {
        this.root = currentNode.right;
      } else if (currentNode === parentNode.right) {
        parentNode.right = currentNode.right;
      } else {
        parentNode.left = currentNode.right;
      }
      return true;
    }

    if (currentNode.left !== null && currentNode.right !== null) {
      // 從要刪除的目標右子樹中找到最小的值來取代原先要刪除的位置
      // 取代後則要將原本的節點移除，並將剩下的右子樹接回去母樹
      let minLargerParentNode = currentNode;
      let minLargerNode = currentNode.right;
      while (minLargerNode.left !== null) {
        minLargerParentNode = minLargerNode;
        minLargerNode = minLargerNode.left;
      }

      currentNode.val = minLargerNode.val;

      // 這邊因為是找到左子樹最底部，所以只需接回右子樹到刪除目標的母樹
      if (minLargerParentNode.left === minLargerNode) {
        minLargerParentNode.left = minLargerNode.right;
      } else {
        minLargerParentNode.right = minLargerNode.right;
      }

      return true;
    }

    return false;
  }
}

const bst = new BinarySearchTree();
bst.insert((10))
  .insert((5))
  .insert((15))
  .insert((3))
  .insert((7))
  .insert((12))
  .insert((18))
  .insert((1))
  .insert((4))
  .insert((6))
  .insert((8))
  .insert((11))
  .insert((13))
  .insert((20))
  .insert((0))
  .insert((2));

console.log(bst.search(5)); // 应该返回 TreeNode { val: 5, ... }
console.log(bst.remove(5)); // 应该返回 true
console.log(bst.search(5)); // 应该返回 null

