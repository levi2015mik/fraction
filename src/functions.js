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

/**
 * Правильное форматирование дробей на языке KaTeX
 * @param {Fraction} fraction
 * @returns {string}
 */
function fracKatexFmt(fraction){
  let out = "";
  if(fraction.sign)
    out ="-";
  if(typeof fraction.whole !== "undefined" && fraction.whole !== 0 && !isNaN(fraction.whole))
    out += fraction.whole;
  else if(typeof fraction.num === "undefined" || fraction.num === 0)
    out += "0";
  if(typeof fraction.num !== "undefined" && fraction.num !== 0 &&
     typeof fraction.denom !== "undefined" && fraction.denom !== 0)
    out +=`\\frac{${fraction.num}}{${fraction.denom}}`;

  return out
}

export {getIntRandom, fracKatexFmt};

