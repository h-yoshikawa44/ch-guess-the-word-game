/**
 * 配列をシャッフルしたものを取得する（ダステンフェルドの手法）
 * @param {any[]} list シャッフルしたい配列
 * @returns {any[]} シャッフルされた配列
 */
export const getShuffledList = (list) => {
  const cList = list.concat();
  for (let i = cList.length; i > 1; i--) {
    const k = Math.floor(Math.random() * i);
    [cList[k], cList[i - 1]] = [cList[i - 1], cList[k]];
  }

  return cList;
};
