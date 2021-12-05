import React, { useContext, useMemo } from 'react';
import { ImageBackground, Pressable, StyleSheet } from 'react-native';
import { Image } from 'react-native-animatable';
//@ts-ignore
import { vw } from 'react-native-expo-viewport-units';
import GameContext from '../../context/GameContext';
import waterlily from '../../assets/images/waterlily.png';
import redfrog from '../../assets/images/redfrog.png';
import bluefrog from '../../assets/images/bluefrog.png';

interface SquareProps {
  index: number;
  value: string;
  onPress: () => void;
}

const Square = ({ index, value, onPress }: SquareProps) => {
  const { victoryPositions } = useContext(GameContext);

  const isWinnerPosition = useMemo(() => {
    if (victoryPositions.length > 0 && victoryPositions.includes(index)) {
      return true;
    }
    return false;
  }, [index, victoryPositions]);

  return (
    <Pressable style={styles.square} onPress={onPress}>
      <ImageBackground
        style={styles.image}
        imageStyle={
          isWinnerPosition
            ? [styles.backgroundImage, { borderWidth: 4, borderColor: '#fff' }]
            : styles.backgroundImage
        }
        source={waterlily}
      >
        {value === 'X' ? (
          <Image animation={'bounceIn'} style={styles.image} source={redfrog} />
        ) : value === 'O' ? (
          <Image
            animation={'bounceIn'}
            style={styles.image}
            source={bluefrog}
          />
        ) : null}
      </ImageBackground>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  square: {
    width: vw(28),
    height: vw(28),
    borderRadius: 30,
    margin: 4,
    borderWidth: 1,
  },
  image: {
    width: vw(28),
    height: vw(28),
  },
  backgroundImage: {
    borderRadius: 30,
  },
});

export default Square;
