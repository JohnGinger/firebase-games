import React, {
  useState,
  useContext,
  useEffect,
  Children,
  cloneElement,
} from "react";
import { FirebaseContext } from "./firebase";
import "firebase/database";
import Lobby from "./Lobby";

export default ({ gameId, playerName, children, onStart }) => {
  const firebase = useContext(FirebaseContext);
  const [gameState, setGameState] = useState({});
  const [gameRef, setGameRef] = useState();

  useEffect(() => {
    var gameRef = firebase.database().ref(`/${gameId}/`);
    setGameRef(gameRef);
    gameRef.on("value", function (snapshot) {
      setGameState(snapshot.val());
    });
  }, []);

  return (
    <game-container>
      <game-title>
        Game Id - {gameId} - playing as {playerName} <a href="/">New Game</a>
      </game-title>
      {gameState.active ? (
        Children.map(children, (child) =>
          cloneElement(child, { gameState, gameRef, playerName })
        )
      ) : (
        <Lobby
          gameState={gameState}
          gameRef={gameRef}
          playerName={playerName}
          onStart={onStart}
        />
      )}
    </game-container>
  );
};
