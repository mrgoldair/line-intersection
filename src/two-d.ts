
export type Point = [ number,number ];

export type Segment = [ Point,Point ]

export function randomPoint(xBound:number,yBound:number):Point {
  return [
    Math.random() * xBound,
    Math.random() * yBound
  ]
}

export function randomSegment(xBounds:number,yBounds:number):Segment {
  return [
    randomPoint(xBounds,yBounds),
    randomPoint(xBounds,yBounds)
  ];
}