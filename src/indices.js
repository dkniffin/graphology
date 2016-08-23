/**
 * Graphology Indexes Functions
 * =============================
 *
 * Bunch of functions used to compute or clear indexes.
 */
import {BasicSet} from './utils';

export const INDICES = new BasicSet(['structure', 'neighbors']);

/**
 * Structure.
 */
export function updateStructureIndex(graph, edge, data) {
  const map = graph.map,
        CSet = map ? Set : BasicSet;

  // Retrieving edge information
  const {
    undirected,
    source,
    target
  } = data;

  // Retrieving source & target data
  const sourceData = map ? graph._nodes.get(source) : graph._nodes[source],
        targetData = map ? graph._nodes.get(target) : graph._nodes[target];

  const outKey = undirected ? 'undirectedOut' : 'out',
        inKey = undirected ? 'undirectedIn': 'in';

  // Handling source
  sourceData[outKey] = sourceData[outKey] || (map ? new Map() : {});

  if (map) {
    if (!sourceData[outKey].has(target))
      sourceData[outKey].set(target, new CSet());
    sourceData[outKey].get(target).add(edge);
  }
  else {
    if (!(target in sourceData[outKey]))
      sourceData[outKey][target] = new CSet();
    sourceData[outKey][target].add(edge);
  }

  // Handling target
  targetData[inKey] = targetData[inKey] || (map ? new Map() : {});

  if (map) {
    if (!targetData[inKey].has(source))
      targetData[inKey].set(source, new CSet());
    targetData[inKey].get(source).add(edge);
  }
  else {
    if (!(source in targetData[inKey]))
      targetData[inKey][source] = new CSet();
    targetData[inKey][source].add(edge);
  }
}

export function clearEdgeFromStructureIndex(graph, edge, data) {
  const {source, target, undirected} = data,
        map = graph.map;

  const sourceData = map ? graph._nodes.get(source) : graph._nodes[source],
        targetData = map ? graph._nodes.get(target) : graph._nodes[target];

  const outKey = undirected ? 'undirectedOut' : 'out',
        inKey = undirected ? 'undirectedIn': 'in';

  const sourceIndex = sourceData[outKey],
        targetIndex = targetData[inKey];

  if (map) {
    if (sourceIndex.has(target))
      sourceIndex.get(target).delete(edge);
    if (targetIndex.has(source))
      targetIndex.get(source).delete(edge);
  }
  else {
    if (target in sourceIndex)
      sourceIndex[target].delete(edge);
    if (source in targetIndex)
      targetIndex[source].delete(edge);
  }
}

export function clearStructureIndex(graph) {
  if (this.map) {
    graph._nodes.forEach(data => {

      // Clearing properties
      delete data.in;
      delete data.out;
      delete data.undirectedIn;
      delete data.undirectedOut;
    });
  }
  else {
    for (const node in graph._nodes) {
      const data = graph._nodes[node];

      // Clearing properties
      delete data.in;
      delete data.out;
      delete data.undirectedIn;
      delete data.undirectedOut;
    }
  }
}

/**
 * Neighbors.
 */