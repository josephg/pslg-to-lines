const psglToPaths = require('.')
const assert = require('assert')

// These tests are really primitive, but better than nothing.
// They're fragile - dependant on arbitrary set ordering, so they might
// randomly fail with a new version of v8. I'll fix them if that happens - but
// for now they're better than nothing.

/*
{
  const paths = psglToPaths([
    [0,0], [100,0], [100,100], [0,100]
  ], [
    [0, 1], [1, 2], [2, 3]
  ])

  assert.strictEqual(paths.length, 1)
  assert.strictEqual(paths[0].length, 4)

  // Either this or the same points in the opposite order.
  assert.deepStrictEqual(paths, [ [ [ 0, 0 ], [ 100, 0 ], [ 100, 100 ], [ 0, 100 ] ] ])
}
*/
{
  const paths = psglToPaths([
    [0,0], [100,0], [100,100], [0,100]
  ], [
    [0, 1], [0, 2], [0, 3]
  ])

  // There's a few correct answers here, but in any case there should be
  // exactly 2 paths and the longer path should use [0,0] as its midpoint.
  // Also the way the algorithm is written the longer path should always be
  // returned first.
 
  assert.strictEqual(paths.length, 2)
  assert(paths[0].length === 3 || paths[1].length === 3)
  assert(paths[0].length === 2 || paths[1].length === 2)

  // This is brittle.
  assert.deepStrictEqual(paths, [
    [ [ 0, 0 ], [ 100, 0 ] ],
    [ [ 100, 100 ], [ 0, 0 ], [ 0, 100 ] ]
  ])
}
