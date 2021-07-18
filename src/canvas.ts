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
          drawSegment(ctx,`hsla(0,100%,100%,.2)`,s)
          let [ st, e ] = s
          drawEndpoint( ctx, st );
          drawEndpoint( ctx, e )
        });

      points
        .filter(p => p)
        .forEach(p => {
          ctx.fillStyle = '#487C9A';
          ctx.strokeStyle = '#282433';
          ctx.lineWidth = 5;
          ctx.beginPath();
          ctx.arc(p.x,p.y,5,0,2 * Math.PI);
          ctx.fill();
          ctx.stroke();
        })
    }
  }

  _render();
}

function gradient(a:Point,b:Point){
  return (b.y - a.y) / (b.x - a.x);
}

export function drawSegment(ctx, colour, [ start, end ]:Segment){
  let { x:ax, y:ay } = start,
      { x:bx, y:by } = end;
  let grad = gradient( start, end );
  let theta = Math.atan( grad );
  let xEndcap = Math.cos(theta) * 15;
  let yEndcap = Math.sin(theta) * 15;

  ctx.beginPath();
  ctx.lineWidth = .5;
  ctx.strokeStyle = colour;
  ctx.moveTo( ax, ay );
  ctx.lineTo( bx, by );
  ctx.stroke();
  // draw the endpoints
  drawEndpoint( ctx, { x:ax - xEndcap, y:ay - yEndcap });
  drawEndpoint( ctx, { x:bx + xEndcap, y:by + yEndcap });
}

export function drawEndpoint(ctx, { x,y }:Point){
  ctx.beginPath();
  ctx.fillStyle = '#487C9A';
  ctx.strokeStyle = '#282433';
  ctx.arc( x, y, 3, 0, 2*Math.PI );
  ctx.fill();
  ctx.stroke();
}

export function drawIntersection(ctx, {x,y}:Point){
  ctx.beginPath();
  ctx.arc( x, y, 3, 0, 2*Math.PI );
  ctx.fillStyle = `hsla(0,0%,90%,.2)`;
  ctx.fill();
}