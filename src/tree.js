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

const minTraverse = ({ value, left, right }, acc=[]) => {

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
  constructor( value, left=null, right=null ){
    this.value = value
    this.left = left;
    this.right = right;
  }
}

class Treap {

  // O(n)
  get length() {
    return minTraverse(this.root).length;
  }

  constructor( value ) {
    this.root = new Node(value);
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
    let { left, value, right } = node;

    if ( value == null ) {
      throw new Error("Must at least have a root node");
    };

    if ( x < value ){
      // Keep searching for where to insert `x`
      if ( left ) this.insert( x, left );
      // `x` is smaller than current node val and we've reached a leaf so insert here
      return node.left = Object.assign(Object.create(Node.prototype), { value:x, left:null, right:null });
    } else {
      // Keep searching for where to insert `x`
      if ( right ) this.insert(x, right);
      // `x` is larger than current node val and we've reached a leaf so insert here
      return node.right = Object.assign(Object.create(Node.prototype), { value:x });
    }
  }
}

module.exports.Treap = Treap;
module.exports.minTraverse = minTraverse;