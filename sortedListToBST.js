
 // Definition for singly-linked list.
function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}

// Definition for a binary tree node.
 function TreeNode(val, left, right) {
     this.val = (val===undefined ? 0 : val)
     this.left = (left===undefined ? null : left)
     this.right = (right===undefined ? null : right)
 }

/**
 * @param {ListNode} head
 * @return {TreeNode}
 */
var sortedListToBST = function(head) {
  if (!head) return null;

  /**
   * @param {ListNode} start
   * @param {ListNode} end
   */
  function findMid(start, end) {
    let quick = start;
    let slow = start;
    let curr;

    while (quick !== end && quick.next !== end) {
      curr = slow;
      slow = slow.next;
      quick = slow.next;
    }

    return curr;
  }

  function findMiddle(start, end) {
    let slow = start;
    let fast = start;
    let prevSlow = null;  // To keep track of the node before the middle node

    while (fast !== end && fast.next !== end) {
      prevSlow = slow;
      slow = slow.next;
      fast = fast.next.next;
    }

    if (prevSlow) prevSlow.next = null;  // Break the link
    return slow;
  }

  console.log(findMiddle(head, null));
};

sortedListToBST(
  new ListNode(-10, new ListNode(-3), new ListNode(-32))
)
