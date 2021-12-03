import React, { createContext, useState } from 'react';

const GameContext = createContext({});

export const GameProvider = ({ children }) => {
  const [victoryPositions, setVictoryPositions] = useState([]);

  const providerValues = {
    victoryPositions,
    setVictoryPositions,
  };

  return (
    <GameContext.Provider value={providerValues}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
