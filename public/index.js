
import intersections from '../src/geometry/intersections';
import { drawSegment, render } from '../src/canvas';
import { randSegment } from '../src/random';

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


// let segments = Array(5)
//                 .fill(0)
//                 .map(_ => randSegment({ xMax:canvas.width, yMax:canvas.height }));

let segments = [
  [
    {
      "x": 905,
      "y": 1323
    },
    {
      "x": 2417,
      "y": 711
    }
  ],
  [
    {
      "x": 1197,
      "y": 448
    },
    {
      "x": 1780,
      "y": 1054
    }
  ],
  [
    {
      "x": 1279,
      "y": 1149
    },
    {
      "x": 2020,
      "y": 848
    }
  ],
  [
    {
      "x": 1232,
      "y": 46
    },
    {
      "x": 1280,
      "y": 952
    }
  ]
]

console.log(segments);

let points = intersections(segments);

console.log(points);
segments.forEach(s => drawSegment(ctx,s));

points.forEach(p => {
  ctx.beginPath();
  ctx.strokeStyle = `hsl(0,0%,90%)`;
  ctx.arc(p.x,p.y, 10, 0, 2 * Math.PI);
  ctx.stroke();
})

/*
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
*/