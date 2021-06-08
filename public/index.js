import { intersections } from '../src/main';
import { drawSegment, drawPoint } from '../src/canvas';
import { intersect } from '../src/two-d';

let canvas = document.getElementsByTagName('canvas')[0];
canvas.width = canvas.clientWidth * 2;
canvas.height = canvas.clientHeight * 2;

let ctx = canvas.getContext('2d');

let bounds = {
  xMin: 0,
  xMax: canvas.width,
  yMin: 0,
  yMax: canvas.height
}

ctx.fillStyle = "white";
ctx.font = '48px sans-serif';
ctx.strokeStyle = "white";

let segments = [
  [ { x:canvas.width / 2,y:canvas.height / 2 }, { x:canvas.width / 3,y:canvas.height / 4 } ],
  [ { x:canvas.width / 3,y:canvas.height / 4 }, { x:canvas.width / 2,y:canvas.height / 3 } ],
]

// Draw segments
function drawSegments(segments){
  segments
    .forEach(s => {
      drawSegment( ctx,s );
    });

  // Draw endpoints of segments
  segments
    .flatMap(p => p)
    .sort((a,b) => a.x - b.x)
    .forEach(p => drawPoint(ctx,p))
}

drawSegments(segments);

//let points = intersections(segments);
let intersection = intersect(segments[0], segments[1]);
if ( intersection )
  drawPoint( ctx,intersection );

let frame;
function animate(timestamp){
  if ( frame == undefined )
    frame = timestamp
  
  const elapsed = timestamp - frame

  if (elapsed > 16) {
    frame = timestamp;

    // Move
    for (let index = 0; index < segments.length; index++) {
      const [a,b] = segments[index];
      let axdisp = Math.cos( timestamp / 800 ) * 14;
      let aydisp = Math.sin( timestamp / 500 ) * 3;
      let bxdisp = Math.cos( timestamp / 200 ) * 7;
      let bydisp = Math.sin( timestamp / 444 ) * 12;
      a.x += axdisp;
      a.y += aydisp;
      b.x += bxdisp;
      b.y += bydisp;
    }

    // Clear
    ctx.clearRect(0,0,bounds.xMax,bounds.yMax);

    // Draw
    drawSegments(segments);

    let intersection = intersect(segments[0], segments[1]);
    if ( intersection )
      drawPoint( ctx,intersection );

    ctx.fillText( `${(1000 / elapsed).toFixed(2)}`, 50, bounds.yMax - 50 )
  }
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);