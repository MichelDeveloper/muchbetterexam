import React, { useState, useContext, useCallback } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import Board from '../../components/Board';
import GameContext from '../../context/GameContext';
import { calculateWinner, defaultArray } from '../../miscellaneous/helper';

const Game = () => {
  const { setVictoryPositions } = useContext(GameContext);
  const [boardArray, setBoardArray] = useState(defaultArray);
  const [playerTurn, setPlayerTurn] = useState('X');
  const [gameIsFinished, setGameIsFinished] = useState(false);

  const handleSquarePress = useCallback(
    (i) => {
      const updatedArray = [
        ...boardArray.map((item, index) =>
          index === i ? { id: item.id, value: playerTurn } : item
        ),
      ];
      setBoardArray(updatedArray);
      const gameIsFinishedAux = calculateWinner(updatedArray);
      if (!!gameIsFinishedAux) {
        setGameIsFinished(true);
        const { victoryPositions } = gameIsFinishedAux;
        setVictoryPositions(victoryPositions);
        alert(`GameOver the winner is ${playerTurn === 'X' ? 'Red' : 'Blue'}`);
      } else {
        const nextPlayer = playerTurn === 'X' ? 'O' : 'X';
        setPlayerTurn(nextPlayer);
      }
    },
    [boardArray]
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <Text style={styles.title}>Frog Lily Toad</Text>
      <Board boardArray={boardArray} onPress={handleSquarePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6487ca',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 64,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
    fontWeight: 'bold',
    color: '#ddd',
  },
});

export default Game;
