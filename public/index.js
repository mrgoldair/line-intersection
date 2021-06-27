
import { intersect } from '../src/geometry';
import intersections from '../src/geometry/intersections';
import { render } from '../src/canvas';

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

// Array<Segment>
let segments = [
  [ { x:canvas.width / 2,y:canvas.height / 2 }, { x:canvas.width / 3,y:canvas.height / 4 } ],
  [ { x:canvas.width / 3,y:canvas.height / 4 }, { x:canvas.width / 2,y:canvas.height / 3 } ],
]

function update(timestamp){
  
  // Modify our state – the `segments`
  // Logic – update our RenderList
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

  return {
    bounds: bounds,
    segments: segments,
    points: [ intersect(segments[0], segments[1]) ]
  }
}

render(ctx, update);