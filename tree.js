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

}

export class Treap {

  get root() {
    return this.root;
  }

  constructor() {
    this.root = null;
  }

  search(x, node = this.root) {
    let { left, val, right } = node;

    if ( x == val) return node;

    ( x < val ) ?
      this.search(x, left) :
      this.search(x, right);
  }

  insert(x, node = this.root) {
    let { left, val, right } = node;

    if ( x < val ){
      if ( left ) this.insert(x, left)
      return node.left = Object.assign(Object.create(Node.prototype), {val:x})
    } else {
      if ( right ) this.insert(x, right);
      return node.right = Object.assign(Object.create(Node.prototype), {val:x})
    }
  }
}