const fc = require('fast-check') ;
const { Treap } = require('../src/tree');

describe('Treap - heap cross with tree', () => {
  it('Creating a Treap should produce a root node', () => {
    let treap = new Treap( fc.string() )
    expect(treap.length).toEqual(1);
  })
})