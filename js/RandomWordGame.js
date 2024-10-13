import { getShuffledList } from './util';

export class RandomWordGame {
  /**
   * 正答英単語を分割した配列
   * @type {{word: string, isCorrect: boolean}[]}
   */
  #answerSplitWordList = [];

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
    this.#answerSplitWordList = randomWord.split('').map((word) => {
      return {
        word,
        isCorrect: false,
      };
    });
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
    return this.#answerSplitWordList[listIndex]['word'] === word;
  }

  isAllCorrect() {
    return this.#answerSplitWordList.every((wordInfo) => {
      return wordInfo.isCorrect;
    });
  }

  /**
   * 正解、不正解かを記録する
   * @param {boolean} isCorrect 正解か
   * @param {number} index 何文字目か
   */
  updateWordIsCorrect(isCorrect, index) {
    const listIndex = index - 1;
    this.#answerSplitWordList[listIndex]['isCorrect'] = isCorrect;
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

  allReset() {
    this.#answerSplitWordList = [];
    this.#quesitonWord = '';
    this.#wordLength = 0;
    this.#triesCount = 0;
    this.#mistakeWordList = [];
  }
}
