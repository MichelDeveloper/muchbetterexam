import React, { useContext } from 'react';
import { Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import GameContext from '../../context/GameContext';

const RankingDrawerContent = () => {
  const { matchesArray } = useContext(GameContext);
  return (
    <DrawerContentScrollView>
      {matchesArray.length > 0 ? (
        matchesArray.map((item, index) => (
          <Text
            style={styles.text}
            key={index}
          >{`${item.matchNumber} - ${item.winner}`}</Text>
        ))
      ) : (
        <Text style={styles.text}>No results yet...</Text>
      )}
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    margin: 10,
    width: '90%',
    height: 40,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 35,
    fontWeight: 'bold',
    backgroundColor: '#ddd',
    alignSelf: 'center',
  },
});

export default RankingDrawerContent;
