import { randSegment } from '../src/two-d';
import { drawSegment,drawPoint } from '../src/canvas';
import { toEvents } from '../src/main';

let canvas = document.getElementsByTagName('canvas')[0];
let ctx = canvas.getContext('2d');
canvas.width = canvas.clientWidth * 2;
canvas.height = canvas.clientHeight * 2;

let bounds = {
  xMin: 0,
  xMax: canvas.width,
  yMin: 0,
  yMax: canvas.height
}

let segments = Array
                .from({length:10})
                .map(() => randSegment(bounds));

// Draw segments
segments
  .forEach(s => {
    drawSegment( ctx,s );
  });

// Draw endpoints of segments
segments
  .flatMap(p => p)
  .sort((a,b) => a - b)
  .forEach(p => drawPoint(ctx,p))

// Add to queue
let events = segments
              .map(toEvents);

//  Queue
//    - Desc of line segment (y = mx + c)
//  Sweep Line Status

//  Each event `e`
//     handle `e`
//       - add/remove
//       - register intersection