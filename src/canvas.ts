/**
 * Render particular geometry to canvas
 * @module canvas
 */
import { Segment, Point } from './geometry';

export type State = {
  bounds: {
    xMin:number,
    xMax:number,
    yMin:number,
    yMax:number
  }
  segments: Array<Segment>
  points: Array<Point>
}

export function render(ctx,update:(timestamp) => State): void {
  let frame;

  function _render(timestamp?){
   
   // Queue up our next frame
    requestAnimationFrame(_render);
 
    if ( frame == undefined )
      frame = timestamp
   
    const elapsed = timestamp - frame
 
    if (elapsed > 16) {
      // Reset our frame count
      frame = timestamp;

      // Call `update` to give us our new state to render
      let { bounds, segments, points } = update(timestamp);
     
      // Clear the viewport befor we render
      ctx.clearRect(0,0,bounds.xMax,bounds.yMax);
 
      // Thees don't care what the data is, they just draw
      segments
        .forEach(s => {
          drawSegment(ctx,s);
        });

      points
        .filter(p => p)
        .forEach(p => drawPoint(ctx,p));
    }
  }

  _render();
}

export function drawSegment(ctx,s:Segment){
  let [ { x:ax,y:ay },{ x:bx,y:by } ] = s;
  ctx.beginPath();
  ctx.strokeStyle = `hsl(0,0%,90%)`;
  ctx.moveTo(ax,ay);
  ctx.lineTo(bx,by);
  ctx.stroke();
}

function drawPoint(ctx,p:Point){
  ctx.beginPath();
  ctx.strokeStyle = `hsl(0,0%,90%)`;
  ctx.arc(p.x,p.y,10,0,2*Math.PI);
  ctx.stroke();
}