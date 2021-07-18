/**
 * Intersections module.
 * @module geometry/intersections
 */
import { intersect, pointSlope, PointSlope, LineDesc, Point, Segment } from "../geometry";
import Heap from '@mrgoldair/heap';
import Treap from '@mrgoldair/treap';
import { roundTo } from '../math';

/**
 * Events describe the end-points and intersections for the lines in our set
 * */
type EventType = "start" | "end" | "intersect"
type Intersection = { type:EventType, position:Point, segments:[ Segment, Segment ] }
type Endpoint = { type:EventType, desc:LineDesc, segment:Segment, position:Point }
type Event = Endpoint | Intersection

function Intersection(position:Point, segments:[Segment,Segment]): Intersection {
  return {
    type: "intersect",
    position,
    segments
  }
}

/**
 * Compare two events
 * @function
 * @param {Event} a - The first event to compare 
 * @param {Event} b - The second event to compare
 * @returns {number} - The negation of one event location from another
 */
function eventComparer({position:aPosition}:Event,{position:bPosition}:Event): number {
  if ( aPosition.x == bPosition.x )
    return aPosition.y - bPosition.y;
  
  return aPosition.x - bPosition.x;
}

/**
 * Event representations of a segment (one for each end-point)
 * @function
 * @param {Segment} s - The segment to project
 * @returns {[Event,Event]} - The tuple of events
 */
function toEvents(s:Segment): [Event,Event] {
  let [ a, b ] = s.sort((a,b) => a.x - b.x);
  return [{
    type: "start",
    desc: pointSlope( a, b ),
    segment: s,
    position: a
  },{
    type: "end",
    desc: pointSlope( a, b ),
    segment: s,
    position: b
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

  let _intersections:Array<Point> = [];

  // Fill our queue
  events.forEach(e => queue.insert(e));

  /**
   * Given two events returns which line is higher given the `x` val of event `a`
   * @param a - the newly inserted event
   * @param b - event to compare to
   * @returns - ordinal of -1 | 0 | 1
   */
  const lineComparer = (a:LineDesc,b:LineDesc) => {
    // Grab the start point, ignore the second
    let lineA = a as PointSlope;
    let lineB = b as PointSlope;
    let sweepLinePos = lineA.p.x;

    if ( roundTo(3,((lineB.p.y - lineA.p.y) / (lineB.p.x - lineA.p.x))) == roundTo(3,lineA.mx) ){
      return 0;
    } else {
      return lineA.p.y - ((lineB.mx * (sweepLinePos - lineB.p.x)) + lineB.p.y);
    }
  }

  // Store events so we have access to the `x` coord of the event/sweepline pos
  let sweepline = new Treap<LineDesc,Segment>(lineComparer)

  // Event loop
  while( queue.peek() != undefined ){
    // Pull the next event off the queue
    let event:Event = queue.top();

    switch (event.type) {
      case "start": {

        let { desc, segment } = event as Endpoint
        sweepline.insert( desc, segment );

        // predecesor
        let predecessor:Segment = sweepline.predecessor( desc );
        if ( predecessor ){
          let point = intersect( segment, predecessor )
          let intersectEventA:Event = { type:"intersect", position:point, segments:[segment,predecessor] };
          if ( point && !queue.contains(intersectEventA) )
            queue.insert( intersectEventA );
        }

        // successor
        let successor:Segment = sweepline.successor( desc );
        if ( successor ){
          let intersection = intersect( segment, successor );
          let intersectEventB:Event = { type:"intersect", position:intersection, segments:[segment,successor] };
          if ( intersection && !queue.contains(intersectEventB))
            queue.insert( intersectEventB );
        }

        break
      }
      case "end": {
        // remove the segment from the status line
        let { desc,position } = event as Endpoint
        
        let predecessor = sweepline.predecessor( { ...desc, p: {...position } });
        let successor = sweepline.successor( { ...desc, p: { ...position } } );

        if ( predecessor && successor ){
          let intersection = intersect( predecessor, successor );
          if ( intersection )
            queue.insert( Intersection( intersection, [predecessor, successor] ) );
        }
        
        sweepline.remove( {...desc, p: { ...position }} );
        break
      }
      case "intersect": {
        // find segments that contain point of intersection
        // remove them, and re-insert them (swapping in effect)
        let { position, segments } = event as Intersection
        let [ [as,ae], [bs,be] ] = segments;
        let lineADesc = pointSlope( as, ae ) as PointSlope;
        let lineBDesc = pointSlope( bs, be ) as PointSlope;

        sweepline.remove( { ...lineADesc, p:{ ...position } });
        sweepline.remove( { ...lineBDesc, p:{ ...position } });

        let newLineADesc:PointSlope = { mx:lineADesc.mx, p:{ x:position.x + 1, y:position.y + lineADesc.mx}};
        let newLineBDesc:PointSlope = { mx:lineBDesc.mx, p:{ x:position.x + 1, y:position.y + lineBDesc.mx}};

        sweepline.insert( newLineADesc, segments[0] );
        sweepline.insert( newLineBDesc, segments[1] );
      
        let nap = sweepline.predecessor( newLineADesc );
        if ( nap ){
          let point = intersect( segments[0], nap );
          let intersectEventA:Event = { type:"intersect", position:point, segments:[segments[0],nap] };
          if ( point?.x > position.x && !queue.contains(intersectEventA) )
            queue.insert( intersectEventA );
        }
        
        let nas = sweepline.successor( newLineADesc );
        if ( nas ){
          let point = intersect( segments[0], nas )
          let intersectEventA:Event = { type:"intersect", position:point, segments:[segments[0],nas] };
          if ( point?.x > position.x && !queue.contains(intersectEventA) )
            queue.insert( intersectEventA );
        }

        let nbp = sweepline.predecessor( newLineBDesc );
        if ( nbp ){
          let point = intersect( segments[1], nbp )
          let intersectEventB:Event = { type:"intersect", position:point, segments:[segments[1],nbp] };
          if ( point?.x > position.x && !queue.contains(intersectEventB) )
            queue.insert( intersectEventB );
        }
        
        let nbs = sweepline.successor( newLineBDesc );
        if ( nbs ){
          let point = intersect( segments[1], nbs )
          let intersectEventB:Event = { type:"intersect", position:point, segments:[segments[1],nbs] };
          if ( point?.x > position.x && !queue.contains(intersectEventB) )
            queue.insert( intersectEventB );
        }

        _intersections.push( position );
        break
      }
    }
  }

  return _intersections;
}