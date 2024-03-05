class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    if (vertex instanceof Node) {
      this.nodes.add(vertex);
    } else {
      throw new Error("Vertex should be an instance of Node");
    }
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let node of vertexArray) {
      if (node instanceof Node) {
        this.nodes.add(node);
      } else {
        throw new Error("All vertices should be instances of Node");
      }
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    if (v1 instanceof Node && v2 instanceof Node) {
      v1.adjacent.add(v2);
      v2.adjacent.add(v1);
    } else {
      throw new Error("Both vertices should be instances of Node");
    }
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    if (v1 instanceof Node && v2 instanceof Node) {
      v1.adjacent.delete(v2);
      v2.adjacent.delete(v1);
    } else {
      throw new Error("Both vertices should be instances of Node");
    }
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    if (vertex instanceof Node && this.nodes.has(vertex)) {
      for (let node of this.nodes) {
        node.adjacent.delete(vertex);
      }
      this.nodes.delete(vertex);
    } else {
      throw new Error(
        "Vertex should be an instance of Node and exist in the graph"
      );
    }
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    if (start instanceof Node && this.nodes.has(start)) {
      let visited = new Set();
      let result = [];

      function DFS(node) {
        if (!node) return null;
        visited.add(node);
        result.push(node.value);
        node.adjacent.forEach((neighbor) => {
          if (!visited.has(neighbor)) {
            return DFS(neighbor);
          }
        });
      }

      DFS(start);
      return result;
    } else {
      throw new Error(
        "Start should be an instance of Node and exist in the graph"
      );
    }
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    if (start instanceof Node && this.nodes.has(start)) {
      let visited = new Set();
      let result = [];
      let queue = [start];

      while (queue.length) {
        let node = queue.shift();
        if (!visited.has(node)) {
          visited.add(node);
          result.push(node.value);
          node.adjacent.forEach((neighbor) => {
            if (!visited.has(neighbor)) {
              queue.push(neighbor);
            }
          });
        }
      }

      return result;
    } else {
      throw new Error(
        "Start should be an instance of Node and exist in the graph"
      );
    }
  }
}

module.exports = { Graph, Node };
