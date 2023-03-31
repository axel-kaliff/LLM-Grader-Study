A `Box` class has been provided for you in [`src/Box.java`](src/Box.java). Make
yourself familiar with the source code, then expand upon this class so that it
implements the
[`Comparable<Box>`](http://docs.oracle.com/javase/8/docs/api/java/lang/Comparable.html)
interface. You must override the `compareTo` method so that instances of `Box`
can be compared by their `volume`. Information on Object Ordering and
Comparable can be found
[here](https://docs.oracle.com/javase/tutorial/collections/interfaces/order.html).

You have been provided with a test class for `Box` at [`src/BoxTest.java`] that
asserts that `Comparable` is correctly implemented. Make sure that it passes
before moving on to other tasks.

> **Assistant's note:** The motivation for using the `Comparable<Box>`
> interface here is simple but perhaps not obvious. The benefit of using it is
> that we can implement generic comparison based algorithms (such as serach and
> sort) that don't actually know what they are comparing by. For the sake of
> keeping complexity down, you will only be implementing algorithms
> specifically for the `Box` class here, but with a small change to the method
> signatures, one could make the algorithms work for _any_ class `T` that
> implements `Comparable<T>` (ask your assistant if you are curious). An
> implication, and huge benefit, of the search/sort not having anything to do
> with the comparison is that if we decide that we want to compare by for
> example height alone, we only need to change `compareTo`!
