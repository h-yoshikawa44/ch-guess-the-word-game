// ref: https://random-word-api.herokuapp.com/home
const RANDOM_WORD_API_HOST = 'https://random-word-api.herokuapp.com';

/**
 * ランダムな英語単語を取得する
 * @returns {Promise<string[]>}
 */
export const getRandomWord = async () => {
  try {
    const response = await fetch(`${RANDOM_WORD_API_HOST}/word`);
    if (!response.ok) {
      throw new Error('Failed to acquire word information.');
    }

    return await response.json();
  } catch (error) {
    console.error(error.message);
  }
};
