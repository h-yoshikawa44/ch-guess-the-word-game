/**
 * 1～指定した数までのランダムな数値を取得する
 * @param {number} max
 * @returns {number}
 */
export const getRandomNumber = (max) => {
  return Math.floor(Math.random() * max) + 1;
};

/**
 * 配列をシャッフルしたものを取得する（ダステンフェルドの手法）
 * @param {any[]} list
 * @returns {any[]}
 */
export const getShuffledList = (list) => {
  const cList = list.concat();
  for (let i = cList.length; i > 1; i--) {
    const k = Math.floor(Math.random() * i);
    [cList[k], cList[i - 1]] = [cList[i - 1], cList[k]];
  }

  return cList;
};
