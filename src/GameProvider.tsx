import React, { useState } from "react";
import { FirebaseProvider } from "./firebase";
import { useSearchParam } from "react-use";
import Intro from "./Intro";
import GameAndLobby from "./GameAndLobby";
import "./GameContainer.scss";
import "./body.scss";
import shuffle from "./shuffle";
import repeatTile from "./repeatTile";

export default ({
  children,
  onStart = () => {},
  gameIntro,
  adjectivesList,
  nounsList,
  firebaseConfig,
}) => {
  const [gameId, setGameId] = useState(useSearchParam("game") || "");
  const [playerName, setPlayerName] = useState(useSearchParam("name") || "");

  return (
    <FirebaseProvider firebaseConfig={firebaseConfig}>
      {gameId ? (
        <GameAndLobby gameId={gameId} playerName={playerName} onStart={onStart}>
          {children}
        </GameAndLobby>
      ) : (
        <Intro
          playerName={playerName}
          setPlayerName={setPlayerName}
          setGameId={setGameId}
          gameIntro={gameIntro}
          adjectivesPath={adjectivesList}
          nounsPath={nounsList}
        />
      )}
    </FirebaseProvider>
  );
};

export { shuffle, repeatTile };
