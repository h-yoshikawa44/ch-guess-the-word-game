import { getRandomWord } from './randomWordApi';
import { RandomWordGame } from './RandomWordGame';
import { getRandomNumber } from './util';

const question = document.getElementById('question');
const triesCountElement = document.getElementById('tries-count');
const tries = [
  document.getElementById('tries-1'),
  document.getElementById('tries-2'),
  document.getElementById('tries-3'),
  document.getElementById('tries-4'),
  document.getElementById('tries-5'),
];
const mistakeWords = document.getElementById('mistake-words');
const answerGroup = document.getElementById('answer-group');

window.addEventListener('DOMContentLoaded', async () => {
  /**
   * @param {RandomWordGame} randomWordGame ゲーム管理クラスのインスタンス
   * @param {number} index 何文字目か
   */
  const handleAnswerCheck = (randomWordGame, index) => (e) => {
    const answerWord = e.target.value;
    // 何も入力されてないときは何もしない
    if (answerWord === '') return;

    const currentInput = document.getElementById(`answer-input-${index}`);
    document.getElementById(`answer-input-${index + 1}`).focus();

    if (randomWordGame.isAnswerCheckWord(answerWord, index)) {
      currentInput.classList.add('question-card__form-input--correct');
    } else {
      currentInput.classList.remove('question-card__form-input--correct');
      randomWordGame.addMistakeWord(answerWord);
      mistakeWords.textContent = randomWordGame.getMistakeWordList().join(', ');
      randomWordGame.countUpTries();
    }

    const triesCount = randomWordGame.getTriesCount();
    if (triesCount >= 6) {
      console.log('out');
    } else {
      triesCountElement.textContent = triesCount;
      tries[triesCount - 1].classList.add(
        'question-card__tries-info-step--active',
      );
    }
  };

  /**
   * 回答欄1つあたりを生成する
   * @param {RandomWordGame} randomWordGame ゲーム管理クラスのインスタンス
   * @param {number} index インデックス
   * @returns {HTMLInputElement} 回答欄要素
   */
  const createInputElement = (randomWordGame, index) => {
    const input = document.createElement('input');
    input.id = `answer-input-${index}`;
    input.classList.add('question-card__form-input');
    input.name = `answer-${index}`;
    input.type = 'text';
    input.maxLength = '1';
    input.ariaLabel = `Answer input field - ${index}`;
    input.oninput = handleAnswerCheck(randomWordGame, index);
    return input;
  };

  const initialGame = async () => {
    const randomWordNumber = getRandomNumber(10);
    const randomWord = (await getRandomWord(randomWordNumber))[0];
    const randomWordGame = new RandomWordGame(randomWord);

    answerGroup.innerHTML = '';
    [...Array(randomWordGame.getWordLength())].forEach((_, index) => {
      answerGroup.insertAdjacentElement(
        'beforeend',
        createInputElement(randomWordGame, index + 1),
      );
    });
    question.textContent = randomWordGame.getQuesitonWord();

    // 1文字目にフォーカスした状態で開始
    document.getElementById('answer-input-1').focus();
  };

  await initialGame();
});
