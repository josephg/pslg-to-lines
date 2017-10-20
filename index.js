
const addEdge = (inEdges, from, to) => {
  if (inEdges[from] == null) inEdges[from] = new Set
  inEdges[from].add(to)
}

function pslgToPaths(points, edges) {
  // Step 1: aggregate by incoming edges. For each point we'll store a set of points we connect to.
  const inEdges = new Array(points.length)
  
  for (let i = 0; i < edges.length; i++) {
    const [a, b] = edges[i]
    addEdge(inEdges, a, b)
    addEdge(inEdges, b, a)
  }

  // 2: We'll divide the points into groups based on even / odd edge numbers
  // coming in. This ensures that we output the smallest number of paths
  // possible.
  const endpoints = new Set
  const midpoints = new Set

  for (let i = 0; i < inEdges.length; i++) {
    const ie = inEdges[i]
    if (ie == null || ie.size === 0) continue
    else if (ie.size % 2 === 1) endpoints.add(i)
    else midpoints.add(i)
  }

  const delEdge = (from, to) => {
    const fromEdge = inEdges[from]

    if (fromEdge.size === 1) endpoints.delete(from)
    else if (fromEdge.size % 2 === 0) {
      endpoints.add(from)
      midpoints.delete(from)
    } else {
      endpoints.delete(from)
      midpoints.add(from)
    }

    fromEdge.delete(to)
  }

  //console.log('ep', endpoints, 'mp', midpoints)

  // 3. Iteratively peel off a path from the set. We'll always prefer
  // to start from a 
  const paths = []
  while (endpoints.size > 0 || midpoints.size > 0) {

    //console.log('endpoints', endpoints)
    //console.log('midpoints', midpoints)
    //console.log('edg', inEdges)

    let from
    if (endpoints.size > 0) {
      const [p] = endpoints
      from = p
    } else {
      const [p] = midpoints
      from = p
    }

    const path = [points[from]]

    do {
      const [to] = inEdges[from] // Pick a destination arbitrarily from the set.
      delEdge(from, to)
      delEdge(to, from)

      path.push(points[to])
      from = to
    } while (inEdges[from].size)

    paths.push(path)

    //console.log('emitted path', path)
  }

  //console.log('result', paths)

  return paths
}

module.exports = pslgToPaths

