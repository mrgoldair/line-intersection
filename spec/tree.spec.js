const fc = require('fast-check') ;
const { Treap, minTraverse } = require('../src/tree');

describe('Treap - heap cross with tree', () => {
  it('Creating a treap should produce a root node', () => {
    let treap = new Treap( fc.string() )
    expect(treap.length).toEqual(1);
  });
})

describe('Satisfies heap invariants', () => {
  it('Child nodes must be of lesser priority than their parents', () => {

  })
})

describe('Satisfies binary search tree invariants', () => {
  it('Sibling nodes must be prioritised in ascending order', () => {
    fc.assert(
      fc.property(fc.array(fc.integer()), data => {
        let [ first, ...rest ] = data;

        let treap = new Treap( first );
        rest.forEach(data => {
          treap.insert( data );
        });

        expect(minTraverse(treap.root).length).toEqual(treap.length)
      })
    );
  });
})