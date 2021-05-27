import { randSegment, Bounds, lineDesc, LineDesc, Point, Segment } from "./two-d";
import { drawSegment,drawPoint } from './canvas';

type EventType = "start" | "end";
type Event = { type:EventType, desc:LineDesc, point:Point }

export function eventComparer(a:Event,b:Event){
  if ( a.point.x == b.point.x )
    return a.point.y - b.point.y;
  
  return a.point.x - b.point.x;
}

export function toEvents(s:Segment): Array<Event> {
  let [ start,end ] = s;
  return [{
    type: "start",
    desc: lineDesc( start,end ),
    point: start
  },{
    type: "end",
    desc: lineDesc( start,end ),
    point: end
  }];
}

/**
 * 
 */
export function run(ctx,bounds:Bounds): void {

  let segments = Array
                .from({length:10})
                .map(() => randSegment(bounds));

  // Draw segments
  segments
    .forEach(s => {
      drawSegment( ctx,s );
    });

  // Draw endpoints of segments
  // segments
  //   .flatMap(p => p)
  //   .sort((a,b) => a.x - b.x)
  //   .forEach(p => drawPoint(ctx,p))

  // Set up our event queue
  // Project our segments to events
  let events = segments
              .flatMap(toEvents);
}