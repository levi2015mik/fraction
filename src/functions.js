/**
 * Created by 1111 on 10.05.2018.
 */

/**
 * Generator integer random numbers in addad interval
 * @param min {number}
 * @param max {number}
 * @returns {number}
 */
function getIntRandom(min,max){
  return Math.floor(Math.random() * (max - min) + min);
}

export {getIntRandom};
