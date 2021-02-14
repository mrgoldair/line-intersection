// type Tree = Nil | Node { value:T, left:Tree, right:Tree }
const min = ({ val, left, _ }) => {
  while ( left ) {
    return min( left );
  }

  return val;
}

const max = ({ val, _, right }) => {
  while ( right ) {
    return max( right );
  }

  return val;
}

// Get the largest point `p` which is smaller than `v`
const maxMin = ( p,v ) => {

}

// Get the smallest point `p` which is larger than `v`
const minMax = ( p,v ) => {

}

const minTraverse = ({ val, left, right }, acc) => {

  // Tree
  if ( left ){
    minTraverse(left,acc);
  }
  
  acc.push(val);

  if ( right ){
    minTraverse(right,acc);
  }

  return acc;
}

class Node {
  constructor( val, left=null, right=null ){
    this.left = left;
    this.right = right;
    this.val = val
  }

  get left() {}

  get right() {}

  get val() {}
}

class Treap {

  // O(n)
  get length() {
    return minTraverse(this.root, []).length;
  }

  constructor( node ) {
    this.root = node;
  }

  search( x, node = this.root ) {

    // Because we can delete all the nodes then search
    // this could always be null.
    if( node == null ) return;

    let { left, val, right } = node;

    if ( x == val ) return node;

    ( x < val ) ?
      this.search( x, left ):
      this.search( x, right );
  }

  insert( x, node = this.root ) {
    let { left, val, right } = node;

    if ( val == null ) {
      throw new Error("Must at least have a root node");
    };

    if ( x < val ){
      // Keep searching for where to insert `x`
      if ( left ) this.insert( x, left );
      // `x` is smaller than current node val and we've reached a leaf so insert here
      return node.left = Object.assign(Object.create(Node.prototype), { val:x, left:null, right:null });
    } else {
      // Keep searching for where to insert `x`
      if ( right ) this.insert(x, right);
      // `x` is larger than current node val and we've reached a leaf so insert here
      return node.right = Object.assign(Object.create(Node.prototype), { val:x });
    }
  }
}

module.exports.Treap = Treap;