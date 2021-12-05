import React, { useMemo, useContext } from 'react';
import { ImageBackground, StyleSheet, ScrollView, Text } from 'react-native';
import { vw } from 'react-native-expo-viewport-units';
import sand from '../../assets/images/sand.png';
import GameContext from '../../context/GameContext';

const GameMoves = ({ actualGameMoves }) => {
  const { playerOne, playerTwo } = useContext(GameContext);
  const renderGameMoves = useMemo(() => {
    if (actualGameMoves.length > 0) {
      return actualGameMoves.map((item, index) => (
        <Text style={styles.moveText} key={index}>{`${
          item.player === 'Red' ? playerOne : playerTwo
        }: [L:${item.pos.x}, C:${item.pos.y}]`}</Text>
      ));
    }
    return null;
  }, [actualGameMoves, playerOne, playerTwo]);

  return (
    <ImageBackground
      style={styles.sandImageContainer}
      imageStyle={styles.sandBackgroundImage}
      source={sand}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        {renderGameMoves}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    width: vw(90),
    alignItems: 'center',
  },
  moveText: {
    backgroundColor: '#77777799',
    width: '90%',
    height: 30,
    margin: 5,
    borderRadius: 5,
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
  },
  sandImageContainer: {
    width: vw(90),
    height: vw(30),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    marginBottom: 96,
  },
  sandBackgroundImage: {
    borderRadius: 16,
  },
});

export default GameMoves;
