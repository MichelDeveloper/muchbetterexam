import React, { createContext, useState, ReactNode } from 'react';
import {
  getStorageMatches,
  setStorageMatches,
} from '../storage/MatchResultsController';

interface GameContextProviderProps {
  children: ReactNode;
}

interface MatchesArray {
  winner: string;
  matchNumber: number;
}

interface GameContextProps {
  victoryPositions: number[];
  setVictoryPositions: (victoryPositions: number[]) => void;
  isMultiplayer: boolean;
  setIsMultiplayer: (isMultiplayer: boolean) => void;
  matchesArray: MatchesArray[];
  setMatchesArray: (matchesArray: MatchesArray[]) => void;
  updateMatchesArray: (winner: string) => Promise<void>;
  playerOne: string;
  setPlayerOne: (playerOne: string) => void;
  playerTwo: string;
  setPlayerTwo: (playerTwo: string) => void;
}

const GameContext = createContext({} as GameContextProps);

export const GameProvider = ({ children }: GameContextProviderProps) => {
  const [victoryPositions, setVictoryPositions] = useState<number[]>([]);
  const [isMultiplayer, setIsMultiplayer] = useState(false);
  const [matchesArray, setMatchesArray] = useState<MatchesArray[]>([]);
  const [playerOne, setPlayerOne] = useState<string>('Player 1');
  const [playerTwo, setPlayerTwo] = useState<string>('Player 2');

  const updateMatchesArray = async (winner: string) => {
    const matchesArray = await getStorageMatches();
    if (matchesArray?.length > 0) {
      const updatedList: MatchesArray[] = [
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
