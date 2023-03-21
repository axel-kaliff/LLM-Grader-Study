import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;

/**
 * Write a description of class please here.
 *
 * @author Douglas Bengtsson
 * @version 2019-11-19
 */
public class ListProcessor {
  /**
   * Populates an array with values from lower to upper limit
   *
   * @param from lower limit
   * @param to   upper limit
   * @return the sequence from lower to upper limit
   */
  public int[] arraySequence(int from, int to) {
    if (to < from) {
      throw new IllegalArgumentException("Can't populate list with lower limit being higher than upper limit.");
    }
    int[] sequence = new int[to - from];
    for (int i = from; i < to; i++) {
      sequence[i - from] = i;
    }
    return sequence;
  }

  /**
   * Populates a list with values from lower to upper limit
   *
   * @param from lower limit
   * @param to   upper limit
   * @return the sequence from lower to upper limit
   */
  public List<Integer> listSequence(int from, int to) {
    if (to < from) {
      throw new IllegalArgumentException("Can't populate list with lower limit being higher than upper limit.");
    }
    List<Integer> sequence = new ArrayList<Integer>();
    for (int i = from; i < to; i++) {
      sequence.add(i);
    }
    return sequence;
  }

  /**
   * Shuffles an array
   *
   * @param numbers array to be shuffled
   * @return the shuffled array
   */
  public int[] shuffled(int[] numbers) {
    int length = numbers.length;
    // copy values to new array since parameter shouldn't be mutated
    int[] newNumbers = Arrays.copyOf(numbers, length);

    for (int i = 0; i < length; i++) {
      int randomIndex = (int) Math.floor(Math.random() * length);
      // store temp value of random index
      int temp = newNumbers[i];
      // swap values
      newNumbers[i] = newNumbers[randomIndex];
      newNumbers[randomIndex] = temp;
    }
    return newNumbers;
  }

  /**
   * Shuffles a list
   *
   * @param numbers list to be shuffled
   * @return the shuffled list
   */
  public List<Integer> shuffled(List<Integer> numbers) {
    int length = numbers.size();
    // copy values to new list since parameter shouldn't be mutated
    List<Integer> newNumbers = new ArrayList<Integer>(numbers);

    for (int i = 0; i < length; i++) {
      int randomIndex = (int) Math.floor(Math.random() * length);
      // store temp value of random index
      int temp = newNumbers.get(i);
      // swap values
      newNumbers.set(i, newNumbers.get(randomIndex));
      newNumbers.set(randomIndex, temp);
    }
    return newNumbers;
  }

  /**
   * Sums integers in an array - by iteration
   *
   * @param numbers array to be summed
   * @return the summed value of the array
   */
  public int sumIterative(int[] numbers) {
    int sum = 0;
    int length = numbers.length;
    for (int i = 0; i < length; i++) {
      sum += numbers[i];
    }
    return sum;
  }

  /**
   * Sums integers in a a list - by iteration
   *
   * @param numbers list to be summed
   * @return the summed value of the list
   */
  public int sumIterative(List<Integer> numbers) {
    int sum = 0;
    int length = numbers.size();
    for (int i = 0; i < length; i++) {
      sum += numbers.get(i);
    }
    return sum;
  }

  /**
   * Sums integers in an array - by recursion
   *
   * @param numbers array to be summed
   * @return the summed value of the array
   */
  public int sumRecursive(int[] numbers) {
    return recursive(numbers, 0, numbers.length);
  }

  /**
   * Helper function to sum recursively sum integers in an array
   *
   * @param numbers array to be summed
   * @param index   current index to sum
   * @param length  length of the array
   * @return the summed value of the array
   */
  private int recursive(int[] numbers, int index, int length) {
    if (index == length) {
      return 0;
    } else {
      return numbers[index] + recursive(numbers, index + 1, length);
    }
  }

  /**
   * Sums integers in an array - by recursion
   *
   * @param numbers array to be summed
   * @return the summed value of the array
   */
  public int sumRecursive(List<Integer> numbers) {
    return recursive(numbers, 0, numbers.size());
  }

  /**
   * Helper function to sum recursively sum integers in a list
   *
   * @param numbers list to be summed
   * @param index   current index to sum
   * @param length  length of the list
   * @return the summed value of the list
   */
  private int recursive(List<Integer> numbers, int index, int length) {
    if (index == length) {
      return 0;
    } else {
      return numbers.get(index) + recursive(numbers, index + 1, length);
    }
  }

}
