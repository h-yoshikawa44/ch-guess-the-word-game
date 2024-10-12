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
   * 間違えた英字の配列
   * @type {string[]}
   */
  #mistakeWordList = [];

  /**
   * 再挑戦回数
   * @type {number}
   */
  #triesCount = 0;

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

  getMistakeWordList() {
    return this.#mistakeWordList;
  }

  getTriesCount() {
    return this.#triesCount;
  }

  /**
   * 1文字あたりの回答チェック判定
   * @param {string} word 回答した英字
   * @param {number} index 何文字目か
   */
  isAnswerCheckWord(word, index) {
    const listIndex = index - 1;
    return this.#answerSplitWords[listIndex] === word;
  }

  /**
   * @param {string} word 間違えた英字
   */
  addMistakeWord(word) {
    this.#mistakeWordList = [...this.#mistakeWordList, word];
  }

  countUpTries() {
    this.#triesCount += 1;
  }
}
