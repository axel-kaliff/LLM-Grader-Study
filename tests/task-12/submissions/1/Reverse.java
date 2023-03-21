import java.util.List;
import java.util.ArrayList;

/**
 * A class for reversing List and array types.
 *
 * @author Douglas Bengtsson
 * @version 2019-12-04
 */
public class Reverse {

  /**
   * Return a reversed copy of the argument array.
   * The passed array is NOT mutated.
   *
   * Inspiration has been taken from the course literature:
   * https://yourbasic.org/algorithms/time-complexity-explained/
   *
   * @param array An array.
   * @return A reversed copy of array.
   */
  public int[] reversed(int[] array) {
    int a[] = array.clone();
    int n = a.length;
    for (int i = 0; i < Math.floor(n / 2); i++) {
      int tmp = a[i];
      a[i] = a[n - i - 1];
      a[n - i - 1] = tmp;
    }
    return a;
  }

  /**
   * Return a reversed copy of the argument List.
   * The passed List is NOT mutated.
   *
   * @param list A List.
   * @return A reversed copy of list.
   */
  public List<Integer> reversed(List<Integer> list) {
    ArrayList<Integer> a = new ArrayList<Integer>(list);
    int n = a.size();
    for (int i = 0; i < Math.floor(n / 2); i++) {
      int tmp = a.get(i);
      a.set(i, a.get(n - i - 1));
      a.set(n - i - 1, tmp);
    }
    return a;
  }
}