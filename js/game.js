import { getRandomWord } from './randomWordApi';
import { RandomWordGame } from './RandomWordGame';
import { getRandomNumber } from './util';

const questionElement = document.getElementById('question');
const triesCountElement = document.getElementById('tries-count');
const triesElementList = [
  document.getElementById('tries-1'),
  document.getElementById('tries-2'),
  document.getElementById('tries-3'),
  document.getElementById('tries-4'),
  document.getElementById('tries-5'),
];
const mistakeWordsElement = document.getElementById('mistake-words');
const answerGroupElement = document.getElementById('answer-group');
const randomButtonElement = document.getElementById('random-button');
const resetButtonElement = document.getElementById('reset-button');

window.addEventListener('DOMContentLoaded', async () => {
  /** @type {RandomWordGame} */
  let randomWordGame;

  /**
   * 入力された1文字の回答確認～記録
   * @param {number} index 何文字目か
   */
  const handleAnswerCheck = (index) => {
    return (e) => {
      const answerWord = e.target.value;
      // 何も入力されてないときは何もしない
      if (answerWord === '') return;

      const currentInputElement = document.getElementById(
        `answer-input-${index}`,
      );
      // 次の入力欄がある時だけ、次の入力欄を自動フォーカスする
      const nextInputElement = document.getElementById(
        `answer-input-${index + 1}`,
      );
      if (nextInputElement !== null) {
        document.getElementById(`answer-input-${index + 1}`).focus();
      }

      const isCorrect = randomWordGame.isAnswerCheckWord(answerWord, index);
      if (isCorrect) {
        currentInputElement.classList.add('question-card__form-input--correct');
      } else {
        currentInputElement.classList.remove(
          'question-card__form-input--correct',
        );
        // ミスした文字記録とミス回数の更新
        randomWordGame.addMistakeWord(answerWord);
        mistakeWordsElement.textContent = randomWordGame
          .getMistakeWordList()
          .join(', ');
        randomWordGame.countUpTries();

        // 更新したミス回数をステップ表示に反映
        const triesCount = randomWordGame.getTriesCount();
        if (triesCount >= 6) {
          alert('Game Over');
          resetGame();
        } else {
          triesCountElement.textContent = triesCount;
          triesElementList[triesCount - 1].classList.add(
            'question-card__tries-info-step--active',
          );
        }
      }

      // 正解・不正解の記録
      randomWordGame.updateWordIsCorrect(isCorrect, index);
      // 全文字正解時は、正解メッセージを出す
      if (randomWordGame.isAllCorrect()) {
        alert('🎉 Success');
        initialGame();
      }
    };
  };

  /**
   * フォーカスされた時、テキストを全選択状態にする
   * @param {FocusEvent} e フォーカスイベント
   */
  const handleFocusSelect = (e) => {
    e.target.select();
  };

  /**
   * 回答欄1つあたりを生成する
   * @param {number} index インデックス
   * @returns {HTMLInputElement} 回答欄要素
   */
  const createInputElement = (index) => {
    const inputElement = document.createElement('input');
    inputElement.id = `answer-input-${index}`;
    inputElement.classList.add('question-card__form-input');
    inputElement.name = `answer-${index}`;
    inputElement.type = 'text';
    inputElement.maxLength = '1';
    inputElement.ariaLabel = `Answer input field - ${index}`;
    inputElement.autocomplete = 'off';
    inputElement.oninput = handleAnswerCheck(index);
    inputElement.onfocus = handleFocusSelect;
    return inputElement;
  };

  /**
   * 出題内容の初期セットアップ
   */
  const initialGame = async () => {
    const randomWordNumber = getRandomNumber(10);
    const randomWord = (await getRandomWord(randomWordNumber))[0];
    randomWordGame = new RandomWordGame(randomWord);

    answerGroupElement.innerHTML = '';
    [...Array(randomWordGame.getWordLength())].forEach((_, index) => {
      answerGroupElement.insertAdjacentElement(
        'beforeend',
        createInputElement(index + 1),
      );
    });
    questionElement.textContent = randomWordGame.getQuesitonWord();

    // 1文字目にフォーカスした状態で開始
    document.getElementById('answer-input-1').focus();
  };

  /**
   * ゲーム状態をオールリセット
   */
  const resetGame = () => {
    randomWordGame.allReset();
    triesCountElement.textContent = randomWordGame.getTriesCount();
    triesElementList.forEach((ele) => {
      ele.classList.remove('question-card__tries-info-step--active');
    });
    mistakeWordsElement.textContent = '';
    initialGame();
  };

  randomButtonElement.addEventListener('click', initialGame);
  resetButtonElement.addEventListener('click', resetGame);
  await initialGame();
});
