"use strict";
var _a, _b, _c, _d, _e;
const graph = new Map();
graph.set('start', new Map());
(_a = graph.get('start')) === null || _a === void 0 ? void 0 : _a.set('a', 6);
(_b = graph.get('start')) === null || _b === void 0 ? void 0 : _b.set('b', 6);
graph.set('a', new Map());
(_c = graph.get('a')) === null || _c === void 0 ? void 0 : _c.set('fin', 1);
graph.set('b', new Map());
(_d = graph.get('b')) === null || _d === void 0 ? void 0 : _d.set('a', 3);
(_e = graph.get('b')) === null || _e === void 0 ? void 0 : _e.set('fin', 5);
graph.set('fin', new Map());
const costs = new Map();
costs.set('a', 6);
costs.set('b', 2);
costs.set('fin', Infinity);
const parents = new Map();
parents.set('a', 'start');
parents.set('b', 'start');
parents.set('fin', null);
const processed = [];
function findLowestCostNode(costs) {
    let lowestCost = Infinity;
    let lowestCostNode = null;
    for (let [node, cost] of costs.entries()) {
        if (cost < lowestCost && !processed.includes(node)) {
            lowestCost = cost;
            lowestCostNode = node;
        }
    }
    return lowestCostNode;
}
let node = findLowestCostNode(costs);
while (node !== null) {
    let cost = costs.get(node);
    let neighbors = graph.get(node);
    if (cost === undefined || neighbors === undefined) {
        continue;
    }
    for (let n of neighbors.keys()) {
        let neighbor = neighbors.get(n);
        if (neighbor === undefined) {
            continue;
        }
        let newCost = cost + neighbor;
        let nCost = costs.get(n);
        if (nCost !== undefined && nCost > newCost) {
            costs.set(n, newCost);
            parents.set(n, node);
        }
    }
    processed.push(node);
    node = findLowestCostNode(costs);
}
console.log(costs, parents);
//# sourceMappingURL=dijkstra.js.map