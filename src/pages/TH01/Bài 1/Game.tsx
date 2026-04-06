import { useState, useEffect } from 'react';
import { Button, Input, message } from 'antd';

const Game = () => {
  const [randomNumber, setRandomNumber] = useState<number>(0);
  const [guess, setGuess] = useState<string>('');
  const [guessesLeft, setGuessesLeft] = useState<number>(10);
  const [messageText, setMessageText] = useState<string>('');

  const generateNewNumber = () => {
    const num = Math.floor(Math.random() * 100) + 1;
    setRandomNumber(num);
    setGuessesLeft(10);
    setMessageText('');
    setGuess('');
  };

  useEffect(() => {
    generateNewNumber();
  }, []);

  const handleGuess = () => {
    const numGuess = parseInt(guess);
    if (isNaN(numGuess) || numGuess < 1 || numGuess > 100) {
      message.error('Vui lòng nhập số từ 1 đến 100!');
      return;
    }

    setGuessesLeft(guessesLeft - 1);

    if (numGuess === randomNumber) {
      setMessageText('Chúc mừng! Bạn đã đoán đúng!');
      message.success('Chúc mừng! Bạn đã đoán đúng!');
    } else if (numGuess < randomNumber) {
      setMessageText('Bạn đoán quá thấp!');
    } else {
      setMessageText('Bạn đoán quá cao!');
    }

    if (guessesLeft - 1 === 0 && numGuess !== randomNumber) {
      setMessageText(`Bạn đã hết lượt! Số đúng là ${randomNumber}.`);
      message.warning(`Bạn đã hết lượt! Số đúng là ${randomNumber}.`);
    }

    setGuess('');
  };

  const handleNewGame = () => {
    generateNewNumber();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Trò chơi đoán số</h2>
      <p>Số ngẫu nhiên từ 1 đến 100. Bạn có 10 lượt đoán.</p>
      <p>Lượt còn lại: {guessesLeft}</p>
      <Input
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Nhập số dự đoán"
        style={{ width: 200, marginRight: 10 }}
      />
      <Button type="primary" onClick={handleGuess} disabled={guessesLeft === 0 || messageText.includes('đúng')}>
        Đoán
      </Button>
      <Button onClick={handleNewGame} style={{ marginLeft: 10 }}>
        Chơi lại
      </Button>
      <p>{messageText}</p>
    </div>
  );
};

export default Game;
