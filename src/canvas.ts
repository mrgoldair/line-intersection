import { Segment,Point } from './two-d';

export function drawSegment(ctx,s:Segment){
  let [ { x:ax,y:ay },{ x:bx,y:by } ] = s;
  ctx.beginPath();
  ctx.moveTo(ax,ay);
  ctx.lineTo(bx,by);
  ctx.stroke();
}

export function drawPoint(ctx,p:Point){
  ctx.beginPath();
  let alpha = 1 - (p.x/3320);
  ctx.strokeStyle = `rgba(0,0,0,${alpha})`;
  ctx.arc(p.x,p.y,10,0,2*Math.PI);
  ctx.stroke();
}