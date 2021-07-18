
import intersections from '../src/geometry/generators/intersections';
import { drawSegment, render } from '../src/canvas';
import { randSegment } from '../src/random';

let canvas = document.getElementsByTagName('canvas')[0];
canvas.width = canvas.clientWidth * 2;
canvas.height = canvas.clientHeight * 2;

let ctx = canvas.getContext('2d');

let bounds = {
  xMin: 0,
  xMax: canvas.width / 4,
  yMin: 0,
  yMax: canvas.height / 4
}

let segs = Array(10)
                .fill(0)
                .map(_ => randSegment({ xMax:canvas.width, yMax:canvas.height}));

// now returns a generator, not the list of segments
let gen = intersections(segs);

setInterval(() => {
  let v = gen.next().value;
  if ( v ) {
    let { xPosition, segments } = v;
    // clear our rect before we draw again
    ctx.clearRect(0,0,canvas.width,canvas.height);
    // draw the sweep line
    drawSegment( ctx, [{x:xPosition,y:0},{x:xPosition,y:canvas.height}] )
    // draw status of the sweep-line
    segs.forEach(s => drawSegment( ctx, s ));
    // draw all segments from the input set
    segments.forEach(s => drawSegment( ctx, s ));
  }
}, 500)

/*function update(timestamp){

  for (let index = 0; index < segments.length; index++) {
    const [a,b] = segments[index];
    let axdisp = Math.cos( timestamp /1000) * 2;
    let aydisp = -Math.sin( timestamp /1000) * 8;
    let bxdisp = -Math.cos( timestamp /1000) * 4;
    let bydisp = Math.sin( timestamp /1000) * 6;
    a.x += axdisp;
    a.y += aydisp;
    b.x += bxdisp;
    b.y += bydisp;
  }

  return {
    bounds: bounds,
    segments: segments,
    points: intersections(segments)
  }
}

render(ctx, update); */