
export type Point = { x:number,y:number };

export type Segment = [ Point,Point ];

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

export function randPoint(bounds:Bounds): Point {
  return {
    x:lerp( bounds.xMin, bounds.xMax, Math.random() ),
    y:lerp( bounds.yMin, bounds.yMax, Math.random() )
  }
}

export function randSegment(bounds:Bounds): Segment {
  return [
    randPoint(bounds),
    randPoint(bounds)
  ]
}