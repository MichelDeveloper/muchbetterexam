import React, { useState, useContext, useCallback } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native-animatable';
import Board from '../../components/Board';
import GameContext from '../../context/GameContext';
import {
  backgroundAnimation,
  calculateWinner,
  defaultArray,
} from '../../miscellaneous/helper';

const Game = () => {
  const { setVictoryPositions } = useContext(GameContext);
  const [boardArray, setBoardArray] = useState(defaultArray);
  const [playerTurn, setPlayerTurn] = useState('X');
  const [gameIsFinished, setGameIsFinished] = useState(false);
  const [gameIsTie, setGameIsTie] = useState(false);

  const handleSquarePress = useCallback(
    (i) => {
      const updatedArray = [
        ...boardArray.map((item, index) =>
          index === i
            ? {
                id: item.id,
                value: item.value === '' ? playerTurn : item.value,
              }
            : item
        ),
      ];
      setBoardArray(updatedArray);
      const gameIsTieAux = !updatedArray.find((item) => item.value === '');
      if (gameIsTieAux) {
        setGameIsTie(true);
        alert('GameOver the game was a draw');
      } else {
        const gameIsFinishedAux = calculateWinner(updatedArray);
        if (gameIsFinishedAux) {
          setGameIsFinished(true);
          const { victoryPositions } = gameIsFinishedAux;
          setVictoryPositions(victoryPositions);
          alert(
            `GameOver the winner is ${playerTurn === 'X' ? 'Red' : 'Blue'}`
          );
        } else {
          const nextPlayer = playerTurn === 'X' ? 'O' : 'X';
          setPlayerTurn(nextPlayer);
        }
      }
    },
    [boardArray]
  );

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/waterbackground.png')}
        resizeMode='repeat'
        iterationCount={'infinite'}
        direction={'alternate'}
        duration={15000}
        easing={'ease-in-out-quad'}
        animation={backgroundAnimation}
        style={styles.imageContainer}
      />
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
  imageContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
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
