import { intersections } from '../src/main';
import { drawSegment, drawPoint } from '../src/canvas';
import { intersect } from '../src/two-d';

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

ctx.fillStyle = "white";
ctx.font = '48px sans-serif';
ctx.strokeStyle = "white";

canvas.addEventListener('click', e => { console.log("x: %s, y: %s", e.x,e.y) })

let segments = [
  [ { x:150,y:300 }, { x:150,y:0 } ],
  [ { x:0,y:150 }, { x:300,y:150 } ],
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
      let axdisp = Math.random() * 10;
      let aydisp = Math.random() * 2;
      let bxdisp = Math.random() * 8;
      let bydisp = Math.random() * 7;
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