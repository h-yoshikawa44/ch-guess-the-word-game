/**
 * 1～指定した数までのランダムな数値を取得する
 * @param {number} max
 * @returns {number}
 */
export const getRandomNumber = (max) => {
  return Math.floor(Math.random() * max) + 1;
};
