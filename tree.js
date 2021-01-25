
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

const line45 = ( [u,v] ) => {
  let [ dx,dy ] = subtract( u,v );
  let heading = Math.atan(dy/dx);
}

// List / Array
// [a] -> (a -> f b) -> f([b])
const traverse = (of,fn) => {
  return this.reduce((acc, a) => {
    //     f b       f (bs -> bs)               f([b])
    return fn(a).map(b => bs => bs.concat(b)).ap(acc)
  },
    // f([b]) but empty to begin with
    of([])
  );
}

// [ Some a ] -> Some [ a ]
const sequence = (of, ap) => {
  return this.$value.map(of);
}