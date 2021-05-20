import { lineDesc, LineDesc, Point, Segment } from "./two-d";

type EventType = "start" | "end";
type Event = { type:EventType, desc:LineDesc, point:Point }

export function sortEvents(a:Event,b:Event){
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
export function run(): void {

}