const graph: Map<string, Map<string, number>> = new Map();
graph.set('start', new Map());
graph.get('start')?.set('a', 6);
graph.get('start')?.set('b', 6);
graph.set('a', new Map());
graph.get('a')?.set('fin', 1);
graph.set('b', new Map());
graph.get('b')?.set('a', 3);
graph.get('b')?.set('fin', 5);
graph.set('fin', new Map());

const costs: Map<string, number> = new Map();
costs.set('a', 6);
costs.set('b', 2);
costs.set('fin', Infinity);

const parents: Map<string, string | null> = new Map();
parents.set('a', 'start');
parents.set('b', 'start');
parents.set('fin', null);

const processed: string[] = [];

function findLowestCostNode(costs: Map<string, number>): string | null {
    let lowestCost: number = Infinity;
    let lowestCostNode: string | null = null;

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
