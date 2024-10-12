import { getShuffledList } from './util';

export class RandomWordGame {
  /**
   * 正答英単語を分割した配列
   * @type {string[]}
   */
  #answerSplitWords;

  /**
   * 出題する文字列
   * @type {string}
   */
  #quesitonWord;

  /**
   * 英単語の文字数
   * @type {number}
   */
  #wordLength;

  /**
   * @param {string} randomWord 出題元の英単語
   */
  constructor(randomWord) {
    this.#wordLength = randomWord.length;
    this.#answerSplitWords = randomWord.split('');
    const shuffledWordList = getShuffledList(randomWord.split(''));
    this.#quesitonWord = shuffledWordList.join('');
  }

  getQuesitonWord() {
    return this.#quesitonWord;
  }

  getWordLength() {
    return this.#wordLength;
  }
}
