import { randSegment } from '../src/two-d';
import { drawSegment,drawPoint } from '../src/canvas';

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

segments
  .forEach(s => {
    drawSegment( ctx,s );
  });

segments
  .flatMap(p => p)
  .forEach(p => drawPoint(ctx,p))