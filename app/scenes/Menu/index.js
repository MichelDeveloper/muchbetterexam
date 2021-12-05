import React, { useCallback, useContext } from 'react';
import {
  ImageBackground,
  Text,
  StyleSheet,
  Pressable,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { vw } from 'react-native-expo-viewport-units';
import ia from '../../assets/images/ia.png';
import multiplayer from '../../assets/images/multiplayer.png';
import waterbackground from '../../assets/images/waterbackground.png';
import { Image } from 'react-native-animatable';
import { backgroundAnimation } from '../../miscellaneous/helper';
import GameContext from '../../context/GameContext';

const Menu = () => {
  const navigation = useNavigation();
  const { setIsMultiPlayer } = useContext(GameContext);

  const playSinglePlayer = useCallback(() => {
    navigation.navigate('Game');
  }, [navigation]);

  const playMultiPlayer = useCallback(() => {
    setIsMultiPlayer(true);
    navigation.navigate('Game');
  }, [navigation, setIsMultiPlayer]);

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
      <Text style={styles.title}>Select Game Mode:</Text>
      <Pressable onPress={playSinglePlayer}>
        <ImageBackground
          style={styles.ImageContainer}
          imageStyle={styles.backgroundImage}
          source={ia}
        ></ImageBackground>
      </Pressable>
      <Pressable onPress={playMultiPlayer}>
        <ImageBackground
          style={styles.ImageContainer}
          imageStyle={styles.backgroundImage}
          source={multiplayer}
        ></ImageBackground>
      </Pressable>
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
    marginBottom: 32,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
    fontWeight: 'bold',
    color: '#ddd',
  },
  ImageContainer: {
    width: vw(90),
    height: vw(30),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    marginBottom: 32,
  },
  backgroundImage: {
    borderRadius: 16,
  },
  imageContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default Menu;
