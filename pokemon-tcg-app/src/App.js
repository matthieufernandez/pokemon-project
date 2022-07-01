import React, { useState, useEffect } from "react";

export default function App() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const randomPage = Math.floor(Math.random() * 60 + 1);

  function randomCard() {
    return Math.floor(Math.random() * 250 + 1);
  }

  // const [cards, setCards] = useState(null);

  const [cards, setCards] = useState();
  const [deck, setDeck] = useState([]);

  useEffect(() => {
    async function getCards() {
      try {
        await fetch(`https://api.pokemontcg.io/v2/cards/?page=${randomPage}`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
            "X-Api-Key": API_KEY,
          },
        })
          .then((res) => res.json())
          .then((data) => setCards(data.data));
      } catch (err) {
        console.error(err);
      }
    }
    getCards();
  }, []);

  useEffect(() => {
    if (cards) {
      while (deck.length < 60) {
        let check = false;
        let insertCardNum = randomCard();
        let insertCard = cards[insertCardNum];

        deck.map((card) => {
          if (card.id === insertCard.id) {
            check = true;
          }
        });

        if (!check) {
          deck.push(insertCard);
        }
      }

      console.log(deck);
    }
  }, [cards]);

  return (
    <div>
      <h1>App</h1>
    </div>
  );
}
