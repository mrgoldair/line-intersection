import { intersections } from '../src/main';
import { drawSegment, drawPoint } from '../src/canvas';
import { intersect } from '../src/two-d';

let canvas = document.getElementsByTagName('canvas')[0];
let ctx = canvas.getContext('2d');
canvas.width = canvas.clientWidth * 2;
canvas.height = canvas.clientHeight * 2;
ctx.strokeStyle = "white";

let bounds = {
  xMin: 0,
  xMax: canvas.width,
  yMin: 0,
  yMax: canvas.height
}

// An `x`
let an_x = [
  [ { x:bounds.xMin + 50,y:bounds.yMin + 50 }, { x:bounds.xMax - 50,y:bounds.yMax - 50} ],
  [ { x:bounds.xMin + 50,y:bounds.yMax - 50 }, { x:bounds.xMax - 50,y:bounds.yMin + 50}]
];

let segments = [
  [ { x:bounds.xMin + 50,y:bounds.yMin + 50 }, { x:bounds.xMin + 50,y:bounds.yMax - 50 } ],
  [ { x:bounds.xMin + 50,y:bounds.yMax - 50 }, { x:bounds.xMax - 50,y:bounds.yMax - 50 } ]
]

// Draw segments
segments
  .forEach(s => {
    drawSegment( ctx,s );
  });

// Draw endpoints of segments
segments
  .flatMap(p => p)
  .sort((a,b) => a.x - b.x)
  .forEach(p => drawPoint(ctx,p))

//let points = intersections(segments);
let intersection = intersect(segments[0], segments[1]);
drawPoint( ctx,intersection );
console.log( intersection );