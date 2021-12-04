import React, { createContext, useState } from 'react';
import {
  getStorageMatches,
  setStorageMatches,
} from '../storage/MatchResultsController';

const GameContext = createContext({});

export const GameProvider = ({ children }) => {
  const [victoryPositions, setVictoryPositions] = useState([]);
  const [isMultiPlayer, setIsMultiPlayer] = useState(false);
  const [matchesArray, setMatchesArray] = useState([]);

  const updateMatchesArray = async (winner) => {
    const matchesArray = await getStorageMatches();
    if (matchesArray?.length > 0) {
      const updatedList = [
        ...matchesArray,
        { winner: winner, matchNumber: matchesArray.length + 1 },
      ];
      await setStorageMatches(updatedList);
      setMatchesArray(updatedList);
    } else {
      const updatedList = [{ winner: winner, matchNumber: 1 }];
      await setStorageMatches(updatedList);
      setMatchesArray(updatedList);
    }
  };

  const providerValues = {
    victoryPositions,
    setVictoryPositions,
    isMultiPlayer,
    setIsMultiPlayer,
    matchesArray,
    setMatchesArray,
    updateMatchesArray,
  };

  return (
    <GameContext.Provider value={providerValues}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
