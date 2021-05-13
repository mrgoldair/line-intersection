# Line Intersection

- a queue for events
- a balanced binary search tree for the status

**How do we test for the intersection of two line segments? Comparing overlaps of $x$ and $y$ values of line segment end points?**

First we need to convert the coordinate forms ${x,y}$ into parametric form
$$
p = (1-s)a + sb
$$
**Method**

------

The event queue ($Q$) is not merely a FIFO queue, but its prioritised on $y$, then $x$ value in first max, then min order – e.g. we sweep the line from the top and encounter those segment end points with the maximum $y$ values. When two segment end points have the same $y$ value, that with the smallest $x$ value has priority. Thus the event queue pulls out segment end points from top-bottom, left-right.

Adding segments to the status structure ($T$) this way means we add segments from top-bottom, left-right.

Testing adjacent segments (leaf nodes that are side-by-side) within $T$ for intersection may yield an intersection below the sweep line. This is the third type of event point (the first two being start and end points of a segment). The intersection point is added to the queue ($Q$). When the sweep line dequeues an intersection point we know to record that point in the output and also swap the relevant segments (as segments swap order after an intersection) and test against their new adjacents in $T$

**Line (Segment) Intersection**

------

We can break this into two questions (and resulting functions) – *do* two segments intersect? and subsequently, *where* do two intersecting segments intersect? We'll break it up like this not only because calculating the former is less intensive than the latter, but for event points other than intersection, we only need to know *if* they intersect because of the nature for the sweep line, all detected intersections should be beneath the sweep line.

	-	When a new segment is added by definition the event is the top-most point of the segment so it's neighbours could not have intersected any earlier

- When a segment is removed and it's adjacents intersect, the intersection must be beneath the sweep line, as any earlier and the intersection would have been *on* the removed segment or if the intersection was on either side of the removed segment, either of the adjacent segments would have crossed the removed segments, hence reversing the order and becoming adjacent.

https://gamedev.stackexchange.com/questions/44720/line-intersection-from-parametric-equation

