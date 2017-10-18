
function pslgToPaths(points, edges) {
  // TODO: This is really primitive. This should make longer chains out of the paths.
  // This is technically correct, but crap.
  const paths = edges.map(([a, b]) => [points[a], points[b]])
  return paths
}

module.exports = pslgToPaths

