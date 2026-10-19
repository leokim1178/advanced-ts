interface MyNode {
  value: string | number;
  next: MyNode | null;
}
function push(currNode: MyNode, nextNode: MyNode) {
  currNode.next = nextNode;
}
const node: MyNode = { value: 1, next: null };
push(node, { value: 2, next: null });
console.log(node); // { value: 1, next: { value: 2, next: null } }
