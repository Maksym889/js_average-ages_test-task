"use strict";

// Function to calculate the average age
const getAverageAge = (arr) => {
  const result = arr.reduce((sum, current) => {
    return sum + (current.died - current.born);
  }, 0);

  return result / arr.length;
};

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const filteredPeople = people.filter((person) => {
    return !century
      ? person.sex === "m"
      : person.sex === "m" && Math.ceil(person.died / 100) === century;
  });

  return getAverageAge(filteredPeople);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  // write code here

  const filteredWomen = people.filter((person) => person.sex === "f");
  const filteredWomenWithChildren = [];

  withChildren &&
    filteredWomen.forEach((woman) => {
      const result = people.find((person) => person.mother === woman.name);

      result && filteredWomenWithChildren.push(woman);
    });

  if (withChildren) {
    return getAverageAge(filteredWomenWithChildren);
  }

  return getAverageAge(filteredWomen);
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  // write code here
  let numberOfMothers = 0;
  let sumAgeDiff = 0;

  people.forEach((person) => {
    const mother = people.find((woman) => woman.name === person.mother);

    if (mother && (!onlyWithSon || person.sex === "m")) {
      const ageDiff = person.born - mother.born;

      sumAgeDiff += ageDiff;
      numberOfMothers++;
    }
  });

  if (!numberOfMothers) {
    return 0;
  }

  return sumAgeDiff / numberOfMothers;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
