export class GraphNode {
  constructor(val = null) {
    this.val = val;
    this.adjacencyMap = new Map();
    this.visted = false;
  }

  addEdge(node) {
    this.adjacencyMap.set(node.val, node);
  }

  getUnVisitedAdjacencyNodes() {
    return Array.from(this.adjacencyMap.values()).filter((node) => !node.visted);
  }

  removeEdge(node) {
    this.adjacencyMap.delete(node.val);
  }

  removeAllEdges() {
    this.adjacencyMap.forEach((node) => {
      node.removeEdge(this);
    });
    this.adjacencyMap.clear();
  }

  setVisited(v) {
    this.visted = v === true;
  }
}

export class Graph {
  constructor() {
    this.nodesMap = new Map();
    // this.edges = [];
  }

  addNode(val) {
    if (this.nodesMap.has(val)) return false;
    this.nodesMap.set(val, new GraphNode(val));
    return true;
  }

  addEdge(val1, val2) {
    const node1 = this.nodesMap.get(val1);
    const node2 = this.nodesMap.get(val2);
    if (!node1 || !node2) return false;

    node1.addEdge(node2);
    node2.addEdge(node1);
    return true;
  }

  removeNode(val) {
    const node = this.nodesMap.get(val);
    if (!node) return false;

    node.removeAllEdges();
    this.nodesMap.delete(val);
    return true;
  }

  removeEdge(val1, val2) {
    const node1 = this.nodesMap.get(val1);
    const node2 = this.nodesMap.get(val2);

    if (!node1 || !node2) return false;

    node1.removeEdge(node2);
    node2.removeEdge(node1);
    return true;
  }

  dft(val) {
    const node = this.nodesMap.get(val);
    if (!node) return [];

    const result = [];

    function traverse(started) {
      started.setVisited(true);
      result.push(started);
      started.getUnVisitedAdjacencyNodes().forEach((n) => {
        if (!n.visted) traverse(n);
      });
    }

    traverse(node);
    this.resetAllNodesVisited();
    return result.map((n) => n.val);
  }

  bft(val) {
    const node = this.nodesMap.get(val);
    if (!node) return [];

    const result = [node];
    let point = 0;

    while (point < result.length) {
      const currentNode = result[point];
      currentNode.setVisited(true);
      const nodes = currentNode.getUnVisitedAdjacencyNodes();
      result.push(...nodes);
      nodes.forEach((n) => n.setVisited(true));
      point += 1;
    }

    this.resetAllNodesVisited();
    return result.map((n) => n.val);
  }

  hasPath(val1, val2) {
    const node1 = this.nodesMap.get(val1);
    const node2 = this.nodesMap.get(val2);

    if (!node1 || !node2) return false;

    const allValues = this.bft(val1);
    return allValues.includes(val2);
  }

  resetAllNodesVisited() {
    this.nodesMap.forEach((node) => {
      node.setVisited(false);
    });
  }
}
