/**
 * Geometry module.
 * @module geometry
 */
export type Vec = { x:number,  y:number };
export type Point = { x:number, y:number };
export type Segment = [ Point, Point ] | [ Vec, Vec ];

export type YIntercet = { mx:number, c:number }
export type PointSlope = { mx:number, p:Point }
export type LineDesc = PointSlope | YIntercet;

/**
 * Returns the line description of two points in y-intercetp form
 * @function
 * @param a - First point
 * @param b - Second Point
 * @returns {LineDesc} - The description (y-intercept form) of the line between points a and b
 */
export function yIntercet( a:Point,b:Point ): LineDesc {
  let mx = (b.y - a.y) / (b.x - a.x);
  let c = a.y - (mx * a.x)
  return { mx,c };
}

/**
 * 
 * @param a 
 * @param b 
 * @returns 
 */
export function gradient(a:Point,b:Point){
  return (b.y - a.y) / (b.x - a.x);
}

/**
 * Returns the line description of two points in y-intercetp form
 * @function
 * @param a - First point
 * @param b - Second Point
 * @returns {LineDesc} - The description (y-intercept form) of the line between points a and b
 */
export function pointSlope( a:Point,b:Point ): LineDesc {
  let mx = (b.y - a.y) / (b.x - a.x);
  return { mx,p:a };
}

/**
 * Standard vector subtraction
 * @function
 * @param {Vec} a - First vector
 * @param {Vec} b - Second vector
 * @returns {Vec} - The vector subtraction of b from a
 */
function subtract(a:Vec,b:Vec): Vec {
  return { x:a.x - b.x, y:a.y - b.y }
}

/**
 * Standard vector addition
 * @function
 * @param {Vec} a - First vector
 * @param {Vec} b - Second vector
 * @returns {Vec} - The vector addition of a and a
 */
function add(a:Vec,b:Vec): Vec {
  return { x: a.x + b.x, y: a.y + b.y }
}

/**
 * Standard vector scaling
 * @function
 * @param {number} a - The factor to scale the vector b by
 * @param b - The vector to scale
 * @returns {Vec} - The vector b scaled by number a
 */
function scale(s:number, a:Vec): Vec {
  return { x: s * a.x, y: s * a.y }
}

/**
 * The summation of component-wise vector multiplication
 * @function
 * @param {Vec} a - The first vector
 * @param {Vec} b - The second vector
 * @returns {number}
 */
function dot(a:Vec,b:Vec): number {
  return a.x * b.x + a.y * b.y;
}

/**
 * 
 * @param {Vec} a - First vector
 * @param {Vec} b - Second vector
 * @returns 
 */
function cross<Vec extends { x:number, y:number, z:number }>(a:Vec, b:Vec): Vec {
  return 
}

/**
 * The point describing any intersection
 * @param {Segment} a - First segment
 * @param {Segment} b - Second segment
 * @returns {Point|undefined} - returns the point of intersection if one is found, otherwise undefined
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

  let location:Point = add(a, scale(t,b));

  return {
    x: location.x,
    y: location.y
  }
}