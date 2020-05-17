import React from "react";

const Lobby = ({ gameState, gameRef, playerName, onStart }) => {
  const startGame = () => {
    if (Object.values(gameState.players).some((x) => !x.ready)) {
      alert("Someone isn't ready");
      return;
    }
    onStart({ gameRef, gameState, playerName });
  };

  const toggleReady = (playerId) => {
    let newPlayers = gameState.players;
    newPlayers[playerId].ready = !newPlayers[playerId].ready;
    gameRef.update({
      players: newPlayers,
    });
  };

  if (!gameState.players) {
    return <players-list> No players yet </players-list>;
  }

  return (
    <players-list>
      <h2>Waiting to play</h2>
      {Object.entries(gameState.players).map(([key, player]) => (
        <label key={player.name}>
          <player-name>
            {player.name} is {player.ready ? "ready" : "not ready"}
          </player-name>
          {player.name === playerName && (
            <button onClick={() => toggleReady(key)}>Toggle if Ready</button>
          )}
        </label>
      ))}
      <button
        onClick={() => startGame()}
        disabled={Object.values(gameState.players).some((x) => !x.ready)}
      >
        Start Game
      </button>
    </players-list>
  );
};

export default Lobby;
