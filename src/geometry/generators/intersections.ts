import { Segment } from '..';

type SweepStatus = {
  position: number,
  status: Array<Segment>
}

/**
 * 
 * @param segments 
 */
export function* intersections(segments:Array<Segment>): Generator<SweepStatus,any,any> {
  yield { position:2, status: [] }
}