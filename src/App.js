import { useState, useEffect } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turn, setTurn] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  //TODO: Trộn bài
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    //TODO: Tránh trường hợp nếu chỉ chọn 1 lá bài mà nhấn new game, thì thông tin lựa vẫn sẽ được lưu
    setChoiceOne(null);
    setChoiceTwo(null);

    setCards(shuffledCards);
    setTurn(0);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //TODO: Reset Choice & Increase Turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurn((pre) => pre + 1);
    //TODO: Cho chọn lá bài kế tiếp
    setDisabled(false);
  };
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      //TODO: Khi đang xét giá trị của 2 lá bài, thì không được chọn lá bài khác
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards((pre) => {
          return pre.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        //TODO: Khi chọn 2 lá giống nhau, nếu có delay thì người dùng không thể lập tức chọn lá bài khác được
        resetTurn();
      } else {
        //TODO: Khi chọn 2 lá khác nhau, nếu không delay thì sẽ lập tức set null => Lá bài sẽ lập tức úp
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  //TODO: Tự động bắt đầu trò chơi ở lần đầu tiên
  useEffect(() => {
    shuffleCards();
  }, []);
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turn: {turn}</p>
    </div>
  );
}

export default App;
