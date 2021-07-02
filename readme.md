# Line Intersection



##### TODO

- Use `pointSlope` to construct `newLineDesc` when handling `intersect` events
- Find and remove intersection duplicates (important to set the $mx$ correctly)
- Why does reloading the page sometimes result in an intersection and sometimes not?
  - Treap keys were not being properly compared. When treap keys were objects (or any non-number), equality was giving the wrong result. Referential equality operator (`==`) was being used with the intention to compare on value, hence returning incorrect values when non identical references were being used.
- Given the key of the sweep line status (an ordered dictionary implemented as a treap) is represented as data `{ mx,c }`, find a way of providing the current sweep line position to the sweep line status as inserts and comparisons are made.
  -  Instead of $y = mx + c$ , use  $y - y1 = m(x - x1)$ for the LineDesc type
- Structure the program so that rendering has no knowledge of how the data structures are updated – express a clear rendering/logic divide.



**How do we test for the intersection of two line segments?**

First we need to convert the coordinate forms ${x,y}$ into parametric form. Either this form, where the two vectors are our line segment endpoints

$$
p = (1-t)a + tb
$$
or this form
$$
p = a + tc
$$
where $c = a - b$ ; c is the relative distance between $a$ and $b$.



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

