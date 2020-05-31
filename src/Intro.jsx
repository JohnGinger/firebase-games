import React, { useState, useContext, useEffect } from "react";
import { FirebaseContext } from "./firebase";
import shuffle from "./shuffle";

import "firebase/database";

import oboe from "oboe";
const adjectives = require("./adjectives.data");
const nouns = require("./nouns.data");

require("./intro.scss");

export default ({
  playerName,
  setPlayerName,
  setGameId,
  onStart,
  gameIntro,
}) => (
  <intro-block>
    <h2>Welcome</h2>
    {gameIntro}
    <JoinGame
      playerName={playerName}
      setPlayerName={setPlayerName}
      setGameId={setGameId}
      onStart={onStart}
    />
  </intro-block>
);

const JoinGame = ({
  playerName,
  setPlayerName,
  setGameId: setGame,
  onStart,
}) => {
  const [gameId, setGameId] = useState("");
  const [loading, setLoading] = useState(false);
  const [adjectivesList, setAdjectivesList] = useState([]);
  const [nounList, setNounList] = useState([]);
  const [wordIndex, setWordIndex] = useState(0);

  const firebase = useContext(FirebaseContext);

  const addGame = () => {
    if (gameId === "" || playerName === "") {
      alert("You need both a name and gameId");
      return;
    }
    Promise.resolve()
      .then(() => {
        setLoading(true);
      })
      .then(() => {
        return firebase.database().ref(`/${gameId}/players`);
      })
      .then((gameRef) => gameRef.push({ name: playerName }))
      .then(() => {
        return setGame(gameId);
      });
  };

  useEffect(() => {
    oboe(adjectives)
      .done(function (words) {
        setAdjectivesList(shuffle(words));
      })
      .fail(function (e) {
        console.warn(e);
      });
    oboe(nouns)
      .done(function (words) {
        setNounList(shuffle(words));
      })
      .fail(function (e) {
        console.warn(e);
      });
  }, []);

  const getRandomCode = () => {
    const wordOne = adjectivesList[wordIndex];
    const wordTwo = nounList[wordIndex];
    setWordIndex(wordIndex + 1);
    setGameId(`${wordOne}-${wordTwo}`);
  };

  return (
    <>
      <h1>trivial</h1>
      <input
        type="text"
        placeholder="Your name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      ></input>
      <input
        type="text"
        placeholder="Enter the game code"
        value={gameId}
        onChange={(e) => setGameId(e.target.value)}
        onKeyPress={(e) => {
          if (e.key == "Enter") {
            addGame();
          }
        }}
      ></input>
      {!loading && (
        <>
          <button onClick={() => getRandomCode()}>
            Suggest random game code
          </button>
          <button onClick={() => addGame()}>Play!</button>
        </>
      )}
    </>
  );
};
