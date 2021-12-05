import React, { createContext, useState } from 'react';
import {
  getStorageMatches,
  setStorageMatches,
} from '../storage/MatchResultsController';

const GameContext = createContext({});

export const GameProvider = ({ children }) => {
  const [victoryPositions, setVictoryPositions] = useState([]);
  const [isMultiplayer, setIsMultiplayer] = useState(false);
  const [matchesArray, setMatchesArray] = useState([]);
  const [playerOne, setPlayerOne] = useState('Player 1');
  const [playerTwo, setPlayerTwo] = useState('Player 2');

  const updateMatchesArray = async (winner) => {
    const matchesArray = await getStorageMatches();
    if (matchesArray?.length > 0) {
      const updatedList = [
        ...matchesArray,
        {
          winner:
            winner === 'Draw'
              ? 'Draw'
              : winner === 'Red'
              ? playerOne
              : playerTwo,
          matchNumber: matchesArray.length + 1,
        },
      ];
      await setStorageMatches(updatedList);
      setMatchesArray(updatedList);
    } else {
      const updatedList = [
        {
          winner:
            winner === 'Draw'
              ? 'Draw'
              : winner === 'Red'
              ? playerOne
              : playerTwo,
          matchNumber: 1,
        },
      ];
      await setStorageMatches(updatedList);
      setMatchesArray(updatedList);
    }
  };

  const providerValues = {
    victoryPositions,
    setVictoryPositions,
    isMultiplayer,
    setIsMultiplayer,
    matchesArray,
    setMatchesArray,
    updateMatchesArray,
    playerOne,
    setPlayerOne,
    playerTwo,
    setPlayerTwo,
  };

  return (
    <GameContext.Provider value={providerValues}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
