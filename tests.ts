// Exercice 1 - @TODO : write unit tests
/**
 * Returns the maximum value in an array of numbers.
 *
 * @param {number[]} numbers - The array of numbers to search.
 * @returns {number} The maximum value in the array.
 *
 * @example
 *
 * const numbers = [1, 2, 3, 4, 5];
 * const max = getMaxNumber(numbers);
 * console.log(max); // Output: 5
 */
const getMaxNumber = (numbers: number[]): number => {
  let max = numbers[0];
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] > max) {
      max = numbers[i];
    }
  }

  return max;
};

const numbers = [0, 1, 2, 10];
const max = getMaxNumber(numbers);
console.log(max);
