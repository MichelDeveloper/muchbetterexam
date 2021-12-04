import React, { useState, useContext, useCallback, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native-animatable';
import Board from '../../components/Board';
import GameContext from '../../context/GameContext';
import {
  backgroundAnimation,
  calculateWinner,
  defaultArray,
} from '../../miscellaneous/helper';
import waterbackground from '../../assets/images/waterbackground.png';
import { getStorageMatches } from '../../storage/MatchResultsController';

const Game = () => {
  const {
    setVictoryPositions,
    isMultiPlayer,
    matchesArray,
    setMatchesArray,
    updateMatchesArray,
  } = useContext(GameContext);
  const [boardArray, setBoardArray] = useState(defaultArray);
  const [playerTurn, setPlayerTurn] = useState('X');
  const [gameIsFinished, setGameIsFinished] = useState(false);
  const [gameIsTie, setGameIsTie] = useState(false);

  const runIA = useCallback(
    (updatedArray) => {
      const magicArray = updatedArray
        .map((item, index) => (item.value === '' ? index : null))
        .filter((item) => item);
      const magicNumber =
        magicArray[Math.floor(Math.random() * magicArray.length)];
      const updatedArrayIA = [
        ...updatedArray.map((item, index) =>
          index === magicNumber
            ? {
                id: item.id,
                value:
                  item.value === ''
                    ? playerTurn === 'X'
                      ? 'O'
                      : 'X'
                    : item.value,
              }
            : item
        ),
      ];
      setBoardArray(updatedArrayIA);
    },
    [playerTurn]
  );

  const changeTurn = useCallback(() => {
    const nextPlayer = playerTurn === 'X' ? 'O' : 'X';
    setPlayerTurn(nextPlayer);
  }, [playerTurn]);

  const finishGame = useCallback(
    (victoryPositions) => {
      setGameIsFinished(true);
      setVictoryPositions(victoryPositions);
      const winner = playerTurn === 'X' ? 'Red' : 'Blue';
      updateMatchesArray(winner);
      alert(`GameOver the winner is ${winner}`);
    },
    [playerTurn, setVictoryPositions, updateMatchesArray]
  );

  const finishWithDraw = useCallback(() => {
    setGameIsTie(true);
    updateMatchesArray('Draw');
    alert('GameOver the game was a draw');
  }, [updateMatchesArray]);

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
        finishWithDraw();
      } else {
        const gameIsFinishedAux = calculateWinner(updatedArray);
        if (gameIsFinishedAux) {
          const { victoryPositions } = gameIsFinishedAux;
          finishGame(victoryPositions);
        } else if (isMultiPlayer) {
          changeTurn();
        } else {
          runIA(updatedArray);
        }
      }
    },
    [
      boardArray,
      changeTurn,
      finishGame,
      finishWithDraw,
      isMultiPlayer,
      playerTurn,
      runIA,
    ]
  );

  useEffect(() => {
    const setAsyncData = async () => {
      const arr = await getStorageMatches();
      setMatchesArray(arr);
    };
    setAsyncData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={waterbackground}
        resizeMode='repeat'
        iterationCount='infinite'
        direction='alternate'
        duration={15000}
        easing='ease-in-out-quad'
        animation={backgroundAnimation}
        style={styles.imageContainer}
      />
      <StatusBar barStyle='light-content' />
      <Text style={styles.title}>Frog Lily Toad</Text>
      {matchesArray.length > 0
        ? matchesArray.map((item, index) => (
            <Text key={index}>{`${item.matchNumber} ${item.winner}`}</Text>
          ))
        : null}
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
