import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { gradient } from './geometry';
import intersections from './geometry/intersections';

const LineRenderer = props => {

  const canvasRef = useRef(null);
  const { segments, points } = props;

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvas.clientWidth * 2;
    canvas.height = canvas.clientHeight * 2;
    const ctx = canvas.getContext('2d');

    segments.forEach(s => {
      drawSegment( ctx, s )
    })

    points.forEach(p => {
      drawEndpoint( ctx, p );
    })
  }, [])

  const drawSegment = ( ctx, [ start, end ] ) => {
    let { x:ax, y:ay } = start,
        { x:bx, y:by } = end;

    let grad = gradient( start, end );
    let theta = Math.atan( grad );
    let xEndcap = Math.cos(theta) * 15;
    let yEndcap = Math.sin(theta) * 15;

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "red";
    ctx.moveTo( ax, ay );
    ctx.lineTo( bx, by );
    ctx.stroke();
  }

  const drawEndpoint = ( ctx, p ) => {
    ctx.beginPath();
    ctx.fillStyle = '#A93ED4';
    ctx.arc( x, y, 3, 0, 2*Math.PI );
    ctx.fill()
  }

  return (
    <canvas className="line-renderer" ref={canvasRef}></canvas>
  )
}

export default LineRenderer;