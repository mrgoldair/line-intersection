
export type Point = { x:number,y:number };

export type Segment = [ Point,Point ];

export type LineDesc = { mx:number,c:number }

/**
 * 
 * @param a 
 * @param b 
 * @returns 
 */
export function lineDesc( a:Point,b:Point ){
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
export function randPoint(bounds:Bounds): Point {
  return {
    x:lerp( bounds.xMin, bounds.xMax, Math.random() ),
    y:lerp( bounds.yMin, bounds.yMax, Math.random() )
  }
}

/**
 * 
 * @param bounds the min/max x/y values the segment should be within
 * @returns Segment
 */
export function randSegment(bounds:Bounds): Segment {
  return [
    randPoint(bounds),
    randPoint(bounds)
  ]
}

type Vec = { x:number, y:number }

function subtract(a:Point,b:Point): Vec {
  return { x:b.x - a.x, y:b.y - a.y }
}

function add(a:Vec,b:Vec): Vec {
  return { x: a.x + b.x, y: a.y + b.y }
}

function scale(s:number, a:Vec): Vec {
  return { x: s * a.x, y: s * a.y }
}

/**
 * If two segments intersect, returns `Point` describing where
 * @param a `Segment` to test
 * @param b `Segment` to test
 * @returns `Option<Point>` of intersection
 */
export function intersect([a,_b]:Segment, [c,_d]:Segment): Point | undefined {
  // Points `a` and `b` are considered tail-to-tail, not tip-to-tail, and we need the difference to be able to give the parametric representation `a + t.b`
  let b:Vec = subtract(a,_b);
  let d:Vec = subtract(c,_d);

  let u = (b.x * (c.y - a.x) - b.y * (c.x - a.x)) / (d.x * b.y - d.y * b.x)
  let t = (d.x * (a.y - c.y) + d.y * (c.x - a.x)) / (b.x * d.y - b.y * d.x)

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
function fastIntersect(a:Segment,b:Segment): boolean {
  return
}