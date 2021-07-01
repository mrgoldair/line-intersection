import lerp from '../src/lerp';
import { Point, Segment } from '../src/geometry';

/**
 * 
 * @param bounds the min/max x/y values the point should be within
 * @returns Point
 */
 export function randPoint({ xMin = 0, xMax = Infinity, yMin = 0, yMax = Infinity } = {}): Point {
  return {
    x:Math.floor(lerp( xMin, xMax, Math.random() )),
    y:Math.floor(lerp( yMin, yMax, Math.random() ))
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