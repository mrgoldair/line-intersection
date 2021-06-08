
export type Point = { x:number,y:number };

export type Segment = [ Point,Point ];

export type LineDesc = { mx:number,c:number }

type Vec = { x:number, y:number }

/**
 * Returns the line description of two points in y-intercetp form
 * @param a - Point
 * @param b - Point
 * @returns - LineDesc
 */
export function lineDesc( a:Point,b:Point ): LineDesc {
  let mx = (b.y - a.y) / (b.x - a.x);
  let c = a.y - (mx * a.x)
  return { mx,c };
}

export type Bounds = {
  xMin:number,
  xMax:number,
  yMin:number,
  yMax:number
};

/**
 * 
 * @param low the lower bound -> when t = 0
 * @param high the upper bound -> when t = 1
 * @param t should be in the range 0 < t < 1
 * @returns value between low <= value <= high
 */
const lerp = (low:number,high:number,t:number) => {
  return low * (1 - t) + high * t
}

/**
 * 
 * @param bounds the min/max x/y values the point should be within
 * @returns Point
 */
export function randPoint({ xMin = 0, xMax = Infinity, yMin = 0, yMax = Infinity } = {}): Point {
  return {
    x:lerp( xMin, xMax, Math.random() ),
    y:lerp( yMin, yMax, Math.random() )
  }
}

/**
 * 
 * @param bounds the min/max x/y values the segment should be within
 * @returns Segment
 */
export function randSegment({ xMin = 0, xMax = Infinity, yMin = 0, yMax = Infinity } = {}): Segment {
  return [
    randPoint({ xMin,xMax,yMin,yMax }),
    randPoint({ xMin,xMax,yMin,yMax })
  ]
}

function subtract(a:Point,b:Point): Vec {
  return { x:a.x - b.x, y:a.y - b.y }
}

function add(a:Vec,b:Vec): Vec {
  return { x: a.x + b.x, y: a.y + b.y }
}

function scale(s:number, a:Vec): Vec {
  return { x: s * a.x, y: s * a.y }
}

function dot(a:Vec,b:Vec): number {
  return a.x * b.x + a.y * b.y;
}

/**
 * If two segments intersect, returns `Point` describing where
 * @param a `Segment` to test
 * @param b `Segment` to test
 * @returns `Option<Point>` of intersection
 */
export function intersect([a,_b]:Segment, [c,_d]:Segment): Point | undefined {
  // Points `a` and `b` are considered tail-to-tail, not tip-to-tail, and we need the difference to be able to give the parametric representation `a + t.b`
  let b:Vec = subtract(_b,a);
  let d:Vec = subtract(_d,c);

  let ud = d.x * b.y - d.y * b.x;
  let td = b.x * d.y - b.y * d.x;

  // Lines are parallel
  if ( ud == 0 || td == 0 )
    return

  let u = (b.x * (c.y - a.y) + b.y * (a.x - c.x)) / ud
  let t = (d.x * (a.y - c.y) + d.y * (c.x - a.x)) / td

  // Intersection point doesn't lie within our segments
  if ( u < 0 || u > 1 || t < 0 || t > 1 )
    return

  return add(a, scale(t,b));
}

/**
 * Whether or not two segments intersect. Use this function
 * if you only want to know _if_ two segments interesct, not where
 * @param a 
 * @param b 
 */
function doIntersect(a:Segment,b:Segment): boolean {
  return
}