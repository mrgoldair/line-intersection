import { randomSegment } from '../src/two-d';

let canvas = document.getElementsByTagName('canvas')[0];
let ctx = canvas.getContext('2d');
canvas.width = canvas.clientWidth * 2;
canvas.height = canvas.clientHeight * 2;

const lerp = (low,high,t) => {
  return low * (1 - t) + high * t
}

const randBetween = (low,high) => {
  return Math.floor(lerp(low,high,Math.random()))
}

function drawSegment(ctx,[{x:ax,y:ay},{x:bx,y:by}]){
  ctx.beginPath();
  ctx.moveTo(ax,ay);
  ctx.lineTo(bx,by);
  ctx.closePath();
  ctx.stroke();
}

const randSegment = () => [
  { x:randBetween(0,canvas.width), y:randBetween(0,canvas.height) },
  { x:randBetween(0,canvas.width), y:randBetween(0,canvas.height) }
];

const apply = fn => fn()

const segments = Array(20)
                  .fill(randSegment)
                  .map(apply);

segments.forEach(s => {
  drawSegment( ctx,s );
})