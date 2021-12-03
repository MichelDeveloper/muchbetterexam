import React from 'react';
import Square from '../Square';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { vw } from 'react-native-expo-viewport-units';

const Board = ({ boardArray, onPress }) => {
  return (
    <View>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={boardArray}
          numColumns={3}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <Square
              index={index}
              value={item?.value}
              onPress={() => onPress(index)}
            />
          )}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: vw(90),
    height: vw(90),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Board;
