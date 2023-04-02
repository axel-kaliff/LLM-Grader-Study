Create a Java class called `BoxProcessor`. This class will contain your methods
for sorting / searching collections of `Box` objects.

- Choose either the Selection sort or Insertion sort algorithm, as shown below
- In `BoxProcessor` class, implement two versions of the algorithm, using
  arrays and collections, e.g. No matter which algorithm you choose, the headers
  should be the following:
  - `public void sort(Box[] array)`
  - `public void sort(List<Box> list)`
- Expected behaviour: list of Box objects will be sorted by increasing volume
- You _must_ use `Box.compareTo(Box)` for _all_ comparison operations.

> **Assistant's note:** Notice how the return type is `void`? This gives away
> the fact that these methods sort _in place_. That is to say, they are
> supposed to _mutate_ the argument array/list, instead of returning a copy.

```python
Insertion Sort (A)
------------------
1   for i = 1 to A.length - 1
2       j = i
3       while j > 0 and A[j-1] > A[j]
4           temp = A[j]
5           A[j] = A[j-1]
6           A[j-1] = temp
7           j = j - 1
```

To help you understand how it works, here is a visualization of insertion sort:

![Insertion sort gif](https://upload.wikimedia.org/wikipedia/commons/0/0f/Insertion-sort-example-300px.gif)

> [Image by Swfung8](https://commons.wikimedia.org/wiki/File:Insertion-sort-example-300px.gif)

```python
Selection Sort (A)
------------------
1   for i = 0 to A.length - 1
2       min = i
3       for j = i + 1 to A.length - 1
4           if A[j] < A[min]
5               # minimum element found
6               min = j
7       temp = A[i]
8       A[i] = A[min]
9       A[min] = temp
```

To help you understand how it works, here is a visualization of selection sort:

![Selection sort gif](https://upload.wikimedia.org/wikipedia/commons/9/94/Selection-Sort-Animation.gif)

> [Image by Joestape89](https://commons.wikimedia.org/wiki/File:Selection-Sort-Animation.gif)
