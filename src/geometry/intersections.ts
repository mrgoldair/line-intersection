/**
 * Intersections module.
 * @module geometry/intersections
 */
import { lineDesc, LineDesc, Point, Segment } from "../geometry";
import Heap from '@mrgoldair/heap';
import Treap from '@mrgoldair/treap';

/**
 * Events describe the end-points and intersections for the lines in our set
 * */
type Event = { type:EventType, desc:LineDesc, point:Point }
type EventType = "start" | "end" | "intersect";

/**
 * Compare two events
 * @function
 * @param {Event} a - The first event to compare 
 * @param {Event} b - The second event to compare
 * @returns {number} - The negation of one event location from another
 */
function eventComparer(a:Event,b:Event): number {
  if ( a.point.x == b.point.x )
    return a.point.y - b.point.y;
  
  return a.point.x - b.point.x;
}

/**
 * Event representations of a segment (one for each end-point)
 * @function
 * @param {Segment} s - The segment to project
 * @returns {[Event,Event]} - The tuple of events
 */
function toEvents(s:Segment): [Event,Event] {
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
 * Interesction locations for set of segments
 * @function
 * @param {Array<Segment>} segments - The set of segments to find intersections for
 * @returns {Array<Point>} - Intersection locations
 */
export default function intersections(segments:Array<Segment>): Array<Point> {

  // Set up our event queue
  let queue = new Heap<Event>(eventComparer);

  // Project our segments to events
  let events = segments
               .flatMap(toEvents);

  let intersections:Array<Point>;

  // Fill our queue
  events.forEach(e => queue.insert(e));

  /**
   * Given two events returns which line is higher given the `x` val of event `a`
   * @param a - the newly inserted event
   * @param b - event to compare to
   * @returns - ordinal of -1 | 0 | 1
   */
  const lineComparer = (a:Event,b:Event) => {
    let lineA = a.desc;
    let lineB = b.desc;
    // 
    let x = a.point.x
    return (lineA.mx * x + lineA.c) - (lineB.mx * x + lineB.c);
  }

  // Store events so we have access to the `x` coord of the event/sweepline pos
  let sweepline = new Treap<Event,Event>(lineComparer)

  // Event loop
  while( queue.peek() != undefined ){
    // Pull the next event off the queue
    let event:Event = queue.top();

    switch (event.type) {
      case "start": {
        console.log( event.type );
        sweepline.insert( event );
        // predecesor
        let predcessor = sweepline.predecessor( event );
        // doIntersect? add

        // successor
        let successor = sweepline.successor( event );
        // doIntersect? add
        break
      }
      case "end": {
        console.log( event.type );
        let predcessor = sweepline.predecessor( event );
        let successor = sweepline.successor( event );
        // sweepline.remove( event );
        // test predecessor,successor
        break
      }
      case "intersect": {
        console.log( event.type );
        // Find segments that contain `event.point`
        break
      }
    }
  }

  console.log(sweepline);

  return [];
}