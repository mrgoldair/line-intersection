const fc = require('fast-check') ;
const { Treap, minTraverse } = require('../src/tree');

describe('Treap - heap cross with tree', () => {
  it('New Treap is empty', () => {
    let treap = new Treap()
    expect(treap.length).toEqual(0);
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

        let treap = new Treap();
        
        data.forEach(n => {
          treap.insert( n );
        });

        expect(minTraverse(treap.root)).toEqual(data.sort((a,b) => a - b));
      })
    );
  });
})