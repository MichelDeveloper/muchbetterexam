import React, { useState, useContext, useCallback, useEffect } from 'react';
import {
  Alert,
  BackHandler,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Image } from 'react-native-animatable';
import Board from '../../components/Board';
import GameContext from '../../context/GameContext';
import {
  backgroundAnimation,
  calculateMove,
  calculateWinner,
  defaultArray,
} from '../../miscellaneous/helper';
import waterbackground from '../../assets/images/waterbackground.png';
import {
  deleteStorageMatches,
  getStorageMatches,
} from '../../storage/MatchResultsController';
import GameMoves from '../../components/GameMoves';
import Footer from '../../components/Footer';
import { useNavigation } from '@react-navigation/native';

const Game = () => {
  const {
    setVictoryPositions,
    isMultiplayer,
    setMatchesArray,
    updateMatchesArray,
    playerOne,
    playerTwo,
  } = useContext(GameContext);
  const navigation = useNavigation();
  const [boardArray, setBoardArray] = useState(defaultArray);
  const [playerTurn, setPlayerTurn] = useState('X');
  const [actualGameMoves, setActualGameMoves] = useState([]);

  const addMoveToList = useCallback((i, player, arr) => {
    const newMove = {
      player: player,
      pos: calculateMove(i),
    };
    if (arr?.length > 0) {
      setActualGameMoves([...arr, newMove]);
    } else {
      setActualGameMoves([newMove]);
    }
  }, []);

  const changeTurn = useCallback(() => {
    const nextPlayer = playerTurn === 'X' ? 'O' : 'X';
    setPlayerTurn(nextPlayer);
  }, [playerTurn]);

  const finishGame = useCallback(
    (victoryPositions, ia) => {
      setVictoryPositions(victoryPositions);
      const invert = ia ? 'O' : 'X';
      const winner = playerTurn === invert ? 'Red' : 'Blue';
      updateMatchesArray(winner);
      setTimeout(
        () =>
          Alert.alert(
            'GameOver',
            `The winner is ${winner === 'Red' ? playerOne : playerTwo}`,
            [
              {
                text: 'Restart',
                onPress: () => {
                  setActualGameMoves([]);
                  setBoardArray(defaultArray);
                  setVictoryPositions([]);
                },
              },
            ]
          ),
        500
      );
    },
    [playerOne, playerTurn, playerTwo, setVictoryPositions, updateMatchesArray]
  );

  const finishWithDraw = useCallback(() => {
    updateMatchesArray('Draw');
    setTimeout(
      () =>
        Alert.alert('GameOver', `The game was a draw`, [
          {
            text: 'Restart',
            onPress: () => {
              setActualGameMoves([]);
              setBoardArray(defaultArray);
              setVictoryPositions([]);
            },
          },
        ]),
      500
    );
  }, [setVictoryPositions, updateMatchesArray]);

  const runIA = useCallback(
    (updatedArray, movesArray) => {
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
      addMoveToList(
        magicNumber,
        playerTurn !== 'X' ? 'Red' : 'Blue',
        movesArray
      );

      const gameIsFinishedAux = calculateWinner(updatedArrayIA);
      if (gameIsFinishedAux) {
        const { victoryPositions } = gameIsFinishedAux;
        finishGame(victoryPositions, true);
      } else {
        const gameIsTieAux = !updatedArrayIA.find((item) => item.value === '');
        if (gameIsTieAux) {
          finishWithDraw();
        }
      }
    },
    [addMoveToList, finishGame, finishWithDraw, playerTurn]
  );

  const handleSquarePress = useCallback(
    (i) => {
      if (boardArray[i].value !== '') {
        return;
      }
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
      const newMove = {
        player: playerTurn === 'X' ? 'Red' : 'Blue',
        pos: calculateMove(i),
      };
      const gameIsTieAux = !updatedArray.find((item) => item.value === '');
      const gameIsFinishedAux = calculateWinner(updatedArray);
      if (gameIsFinishedAux) {
        const { victoryPositions } = gameIsFinishedAux;
        finishGame(victoryPositions);
      } else if (isMultiplayer && !gameIsTieAux) {
        if (actualGameMoves.length > 0) {
          setActualGameMoves([...actualGameMoves, newMove]);
        } else {
          setActualGameMoves([newMove]);
        }
        changeTurn();
      } else if (!gameIsTieAux) {
        const newMovesArr = [...actualGameMoves, newMove];
        runIA(updatedArray, newMovesArr);
      } else {
        finishWithDraw();
      }
    },
    [
      actualGameMoves,
      boardArray,
      changeTurn,
      finishGame,
      finishWithDraw,
      isMultiplayer,
      playerTurn,
      runIA,
    ]
  );

  const deleteStorage = useCallback(() => {
    Alert.alert('Attention', 'This action will delete your app data', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          await deleteStorageMatches();
          setMatchesArray([]);
          setActualGameMoves([]);
          setBoardArray(defaultArray);
          setVictoryPositions([]);
        },
      },
    ]);
  }, [setMatchesArray, setVictoryPositions]);

  useEffect(() => {
    const setAsyncData = async () => {
      const arr = await getStorageMatches();
      setMatchesArray(arr);
    };
    setAsyncData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back to the menu?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => {
            navigation.navigate('Menu');
            setActualGameMoves([]);
            setBoardArray(defaultArray);
            setVictoryPositions([]);
          },
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [navigation, setVictoryPositions]);

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
      <Text style={styles.title}>Frog Lily Toad</Text>
      <StatusBar barStyle='light-content' />
      <Board boardArray={boardArray} onPress={handleSquarePress} />
      <GameMoves actualGameMoves={actualGameMoves} />
      <Footer deleteStorage={deleteStorage} />
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
    marginBottom: 32,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
    fontWeight: 'bold',
    color: '#ddd',
  },
});

export default Game;
