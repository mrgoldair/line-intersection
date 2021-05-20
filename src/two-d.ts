
export type Point = { x:number,y:number };

export type Segment = [ Point,Point ];

export type LineDesc = { mx:number,c:number }

export function lineDesc( a:Point,b:Point ){
  return {
    mx: (b.y - a.y) / (b.x - a.x),
    c: a.y - (this.mx * a.x)
  }
}

type Bounds = {
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