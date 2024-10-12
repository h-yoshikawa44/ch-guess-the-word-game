import { getRandomWord } from './randomWordApi';
import { RandomWordGame } from './RandomWordGame';
import { getRandomNumber } from './util';

const question = document.getElementById('question');
const answerGroup = document.getElementById('answer-group');

window.addEventListener('DOMContentLoaded', async () => {
  /**
   * 回答欄1つあたりを生成する
   * @param {number} index インデックス
   * @returns {HTMLInputElement} 回答欄要素
   */
  const createInputElement = (index) => {
    const input = document.createElement('input');
    input.classList.add('question-card__form-input');
    input.name = `answer-${index}`;
    input.type = 'text';
    input.maxLength = '1';
    input.ariaLabel = `Answer input field - ${index}`;
    return input;
  };

  const initialGame = async () => {
    const randomWordNumber = getRandomNumber(10);
    const randomWord = (await getRandomWord(randomWordNumber))[0];
    const randomWordGame = new RandomWordGame(randomWord);

    answerGroup.innerHTML = '';
    Array.from(
      { length: randomWordGame.getWordLength() },
      (_v, i) => i,
    ).forEach((_, index) => {
      console.log(createInputElement(index));
      answerGroup.insertAdjacentElement(
        'beforeend',
        createInputElement(index + 1),
      );
    });
    question.textContent = randomWordGame.getQuesitonWord();
  };

  await initialGame();
});
