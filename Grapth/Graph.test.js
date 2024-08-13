const { Graph, GraphNode } = require('./Graph.mjs'); // 修改為你的文件路徑

describe('Graph and GraphNode functionality', () => {
  test('should add nodes to the graph', () => {
    const graph = new Graph();
    expect(graph.addNode('A')).toBe(true);
    expect(graph.addNode('B')).toBe(true);
    expect(graph.addNode('A')).toBe(false); // 重複添加應該返回 false
  });

  test('should add edges between nodes', () => {
    const graph = new Graph();
    graph.addNode('A');
    graph.addNode('B');
    expect(graph.addEdge('A', 'B')).toBe(true);
    expect(graph.addEdge('A', 'C')).toBe(false); // C 不存在，所以應該返回 false
  });

  test('should remove nodes from the graph', () => {
    const graph = new Graph();
    graph.addNode('A');
    graph.addNode('B');
    graph.addEdge('A', 'B');
    expect(graph.removeNode('A')).toBe(true);
    expect(graph.removeNode('A')).toBe(false); // A 已經被刪除
    expect(graph.removeNode('B')).toBe(true);
  });

  test('should remove edges between nodes', () => {
    const graph = new Graph();
    graph.addNode('A');
    graph.addNode('B');
    graph.addEdge('A', 'B');
    expect(graph.removeEdge('A', 'B')).toBe(true);
  });

  test('should correctly perform depth-first traversal (DFT)', () => {
    const graph = new Graph();
    graph.addNode('A');
    graph.addNode('B');
    graph.addNode('C');
    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');

    expect(graph.dft('A')).toEqual(['A', 'B', 'C']);
  });

  test('should correctly perform breadth-first traversal (BFT)', () => {
    const graph = new Graph();
    graph.addNode('A');
    graph.addNode('B');
    graph.addNode('C');
    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');

    expect(graph.bft('A')).toEqual(['A', 'B', 'C']);
  });

  test('should correctly check if a path exists between two nodes', () => {
    const graph = new Graph();
    graph.addNode('A');
    graph.addNode('B');
    graph.addNode('C');
    graph.addEdge('A', 'B');

    expect(graph.hasPath('A', 'B')).toBe(true);
    expect(graph.hasPath('A', 'C')).toBe(false); // A 和 C 之間沒有邊
  });

  test('should not allow duplicate edges between nodes', () => {
    const graph = new Graph();
    graph.addNode('A');
    graph.addNode('B');

    expect(graph.addEdge('A', 'B')).toBe(true); // 第一次添加邊應該成功
    expect(graph.addEdge('A', 'B')).toBe(true); // 添加重複邊，因為是無向圖應該返回 true 但實際不會重複添加
    expect(graph.nodesMap.get('A').adjacencyMap.size).toBe(1); // 應該只有一條邊
    expect(graph.nodesMap.get('B').adjacencyMap.size).toBe(1); // 應該只有一條邊
  });

  test('should handle removing non-existent nodes and edges gracefully', () => {
    const graph = new Graph();
    graph.addNode('A');
    graph.addNode('B');

    expect(graph.removeNode('C')).toBe(false); // 節點 C 不存在，應該返回 false
    expect(graph.removeEdge('A', 'C')).toBe(false); // 邊 A-C 不存在，應該返回 false
  });

  test('should correctly handle isolated nodes', () => {
    const graph = new Graph();
    graph.addNode('A');
    graph.addNode('B');
    graph.addNode('C');
    graph.addEdge('A', 'B');

    const isolatedNode = graph.nodesMap.get('C');

    expect(isolatedNode.adjacencyMap.size).toBe(0); // C 應該沒有任何鄰接節點
    expect(graph.dft('C')).toEqual(['C']); // 深度優先遍歷孤立節點，應該只返回 C 自己
    expect(graph.bft('C')).toEqual(['C']); // 廣度優先遍歷孤立節點，應該只返回 C 自己
  });

  test('should handle self-loops correctly', () => {
    const graph = new Graph();
    graph.addNode('A');

    expect(graph.addEdge('A', 'A')).toBe(true); // 自循環邊應該被允許
    expect(graph.nodesMap.get('A').adjacencyMap.size).toBe(1); // A 應該有一個連接到自己的邊

    // 測試自循環的遍歷
    expect(graph.dft('A')).toEqual(['A']); // DFT 應該能夠正確處理自循環
    expect(graph.bft('A')).toEqual(['A']); // BFT 應該能夠正確處理自循環
  });

  test('should handle large graph efficiently', () => {
    const graph = new Graph();
    const nodes = Array.from({ length: 1000 }, (_, i) => `Node${i}`);

    // 添加大量節點
    nodes.forEach((node) => graph.addNode(node));

    // 添加一些邊
    for (let i = 0; i < 999; i++) {
      graph.addEdge(nodes[i], nodes[i + 1]);
    }

    expect(graph.nodesMap.size).toBe(1000);
    expect(graph.nodesMap.get('Node0').adjacencyMap.size).toBe(1);
    expect(graph.nodesMap.get('Node999').adjacencyMap.size).toBe(1);

    // 測試遍歷
    const dftResult = graph.dft('Node0');
    expect(dftResult.length).toBe(1000);
    expect(dftResult).toEqual(nodes);

    const bftResult = graph.bft('Node0');
    expect(bftResult.length).toBe(1000);
    expect(bftResult).toEqual(nodes);
  });

  test('should reset all nodes visited state', () => {
    const graph = new Graph();
    graph.addNode('A');
    graph.addNode('B');
    graph.addEdge('A', 'B');

    graph.dft('A');

    // 測試重置訪問狀態
    graph.nodesMap.forEach((node) => {
      expect(node.visted).toBe(false); // 遍歷後應該被重置為 false
    });
  });
});
