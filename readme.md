# Line Intersection





Given a set of line segments in general position (neither horizontal nor vertical), return the set of points, if any, of the intersections among the segments.

## Method



This module is implemented as a "sweep line" algorithm. That is, the two-dimensional problem is reduced to a one-dimensional problem by considering only those segments which are intersecting our sweep line at any given moment – a series of points on our "sweep line". The sweep line doesn't have to move in 1px increments because the status (the segments and their neighbours that intersect the sweep line) does not change between event points (start, end, intersect). Instead we can simply move the sweep line to the location of the next event and perform our tests there. Those of which are

1. Start event
   1. When a start event in is encountered we add it's associated line description to the status structure
   2. Find any neighbours and test for intersection. Add these to the event queue.
2. End Event
   1. A line has stopped intersecting the sweep line so we need to remove it. Search for it's desc in the status structure, keeping in mind that line desc used as the key will have a different location to the one associated with the end event so these cannot be simply tested for equality but must be calculated for collinearity.
   2. Before the line is removed, find it's neighbours and test for intersection, adding any new intersections to the queue.
3. Intersection Event
   1. We've found an intersection to add to our output. But before we do that we also need to process the event because intersection events are another significant time that the status structure changes – namely the lines associated swap as they cross at the intersection so now we have a reordering and we also have to test the swapped lines for any new intersections with their new neighbours.

## Implementation

An event queue ($Q$) will hold our events. In this case our initial set of input events are the end-points of the segments. The event queue is not merely a FIFO queue. Events are prioritised on $x$ then $y$ values; when two events with the same $x$ value are encountered, the one with the minimum $y$ value is taken. Thus the event queue pulls out segment end points from left-to-right, bottom-to-top.

At any given time the sweep line status ($T$) contains a subset of segments that are intersecting it. Testing adjacent segments within $T$ for intersection may yield an intersection below the sweep line. This is the third type of event point (the first two being start and end points of a segment). The intersection point is added to the queue ($Q$). When the sweep line dequeues an intersection point we know to record that point in the output and also swap the relevant segments (as segments swap order after an intersection) and test against the swapped lines against their new adjacents in $T$

###### - todo pic -



###### How do we test whether two line segments intersect?

We can test whether two lines are intersecting by the combination of clockwise (*CW)* and counter-clockwise (*CCW*) turns made by three vertices/points of the segments. Given two segments with end points $a,b,c,d$  two segments intersect if
$$
a,b,c = CCW
$$

$$
a,b,d = CW
$$

$$
c,d,a = CCW
$$

$$
c,d,b = CW
$$

If just one of those triplets doesn't alternate from it's pair, the segments do not intersect.

In order to determine $CW$ and $CCW$ turns we can use the cross product of the two vectors formed from the four points.
$$
\mathbf{A} = a - b \\
\mathbf{B} = b - c \\
\mathbf{A} \times \mathbf{B}
$$
Note: Care must be taken to use vectors and not points. Although points and vectors share $x,y$ (and maybe even $z$ ) in their notation, they mean different things and the interpretation of using points instead of vectors would be the cross product of two "vectors" 

###### How do we find the intersection point of two line segments that intersect?

First we need to convert the coordinate forms ${x,y}$ into parametric form. Either this form, where the two vectors are our line segment endpoints

$$
p = (1-t)a + tb
$$
or this form
$$
p = a + tc
$$
where $c = a - b$ ; c is the relative distance between $a$ and $b$. The first form works where we're treating $a$ and $b$ as vectors from the origin (as points rather than vectors).

We can find the actual $x,y$ intersection point from the parametric equation as follows

Our lines in parametric form
$$
y = a + t.b \\
y = c + u.d \\
$$
Both give a y value so we can equate
$$
a + t.b = c + u.d \\
$$
We have two unknowns $t$ and $u$, so ideally we'd like two equations. To get our two equations, knowing that our parametric equations represent vectors/points which have two dimensions, we can split our single equations (one for each component $x$ and $y$)
$$
a_x + tb_x = c_x + ud_x \\
a_y + tb_y = c_y + ud_y \\
$$
... rearrange and equate to $t$
$$
t = \frac{c_x - a_x + ud_x}{b_x} \\
t = \frac{c_y - a_y + ud_y}{b_y} \\
$$
... equate to each other
$$
\frac{c_x - a_x + ud_x}{b_x} = \frac{c_y - a_y + ud_y}{b_y}
$$
... and multiply out
$$
(c_x - a_x + ud_x)b_y = (c_y - a_y + ud_y)b_x \\
$$
...expand
$$
c_xb_y - a_xb_y + ud_xb_y = c_yb_x - a_yb_x + ud_yb_x \\
$$
... rearrange to get the $u$ term on one side
$$
ud_xb_y - ud_yb_x = c_yb_x - a_yb_x - c_xb_y + a_xb_y \\
$$
...factor the left-hand side
$$
u(d_xb_y - d_yb_x) = c_yb_x - a_yb_x - c_xb_y + a_xb_y \\
$$
and finally, isolate $u$ and (optioanlly) factor the numerator for clarity
$$
u = \frac{c_yb_x - a_yb_x - c_xb_y + a_xb_y}{(d_xb_y - d_yb_x)} \\

u = \frac{b_x(c_y - a_y) - b_y(a_x - c_x)}{(d_xb_y - d_yb_x)} \\
$$


Then we do the same for $u$ but making the alternate substitutions.





## Learnings

- (using incorrect line desc - not updating `position` property of `lineDesc` with the event position but using default/start event position) Not updating the description of the line for the end-event, that means using the desc that's given with the event which is the essentially the start-event data means we're essentially comparing with the y value of the line when the sweep line was at it's $x$ position - giving us inorrect results, and more importantly the incorrect directions when we traverse the status structure, for instance to find the predecessor/successor lines.
- Why does reloading the page sometimes result in an intersection and sometimes not?
  - Treap keys were not being properly compared. When treap keys were objects (or any non-number), equality was giving the wrong result. Referential equality operator (`==`) was being used with the intention to compare on value, hence returning incorrect values when non identical references were being used.
- Given the key of the sweep line status (an ordered dictionary implemented as a treap) is represented as data `{ mx,c }`, find a way of providing the current sweep line position to the sweep line status as inserts and comparisons are made.
  -  Instead of $y = mx + c$ , use  $y - y1 = m(x - x1)$ for the LineDesc type
- Structure the program so that rendering has no knowledge of how the data structures are updated – express a clear rendering/logic divide.
