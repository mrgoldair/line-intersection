// type Tree = Nil | Node { value:T, left:Tree, right:Tree }
const min = ({ value, left, _ }) => {
  while ( left ) {
    return min( left );
  }

  return val;
}

const max = ({ value, _, right }) => {
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

// List.js
const minTraverse = ( node, acc = []) => {
  
  if ( !node )
    return acc;
  
  let { value, left, right } = node;

  // Tree
  if ( left ){
    minTraverse( left,acc );
  }
  
  acc.push(value);

  if ( right ){
    minTraverse( right,acc );
  }

  return acc;
}

class Node {
  constructor( value, left = null, right = null ){
    this.value = value
    this.left = left;
    this.right = right;
  }
}

class Treap {

  // O(n)
  get length() {
    if ( !this.root )
      return 0;

    return minTraverse(this.root).length;
  }

  search( x, node = this.root ) {

    // Because we can delete all the nodes then search
    // this could always be null.
    if( node == null ) return;

    let { left, value, right } = node;

    if ( x == val ) return node;

    ( x < val ) ?
      this.search( x, left ):
      this.search( x, right );
  }

  insert( x, node = this.root ) {

    if ( this.root == null ) {
      this.root = new Node( x );
      return;
    }

    if ( node == null )
      return new Node( x );

    let { left, value, right } = node;

    if ( value == null || value == undefined )
      throw new Error("Node must have a value");

    if ( x <= value ){
      // Keep searching for where to insert `x`
      node.left = this.insert( x, left );
      // `x` is smaller than current node val and we've reached a leaf so insert here
      //node.left = Object.assign(Object.create(Node.prototype), { value:x, left:null, right:null });
      return node;
    } else {
      // Keep searching for where to insert `x`
      node.right = this.insert( x, right );
      // `x` is larger than current node val and we've reached a leaf so insert here
      //node.right = Object.assign(Object.create(Node.prototype), { value:x });
      return node;
    }
  }
}

module.exports.Treap = Treap;
module.exports.minTraverse = minTraverse;