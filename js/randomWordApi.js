// ref: https://random-word-api.herokuapp.com/home
const RANDOM_WORD_API_HOST = 'https://random-word-api.herokuapp.com';

/**
 * ランダムな英単語を取得する
 * @param {number} maxLength 単語の最大文字数
 * @returns {Promise<string[]>} ランダムな英語単語
 */
export const getRandomWord = async (maxLength) => {
  try {
    const response = await fetch(
      `${RANDOM_WORD_API_HOST}/word?length=${maxLength}`,
    );
    if (!response.ok) {
      throw new Error('Failed to acquire word information.');
    }

    return await response.json();
  } catch (error) {
    console.error(error.message);
  }
};
