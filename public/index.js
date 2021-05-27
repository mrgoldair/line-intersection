import { run } from '../src/main';

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

run(ctx,bounds);
//  Queue
//    - Desc of line segment (y = mx + c)
//  Sweep Line Status

//  Each event `e`
//     handle `e`
//       - add/remove
//       - register intersection