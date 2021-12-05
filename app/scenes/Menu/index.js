import React, { useCallback, useMemo, useContext, useState } from 'react';
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
import play from '../../assets/images/play.png';
import { Image } from 'react-native-animatable';
import { backgroundAnimation } from '../../miscellaneous/helper';
import GameContext from '../../context/GameContext';
import GameTypes from '../../constants/GameTypes';
import Input from '../../components/Input';

const Menu = () => {
  const navigation = useNavigation();
  const { setIsMultiplayer, setPlayerOne, setPlayerTwo } =
    useContext(GameContext);
  const [scene, setScene] = useState('');
  const [playerOneName, setPlayerOneName] = useState('Player 1');
  const [playerTwoName, setPlayerTwoName] = useState('Player 2');

  const playSingleplayer = useCallback(() => {
    setPlayerOne(playerOneName);
    setPlayerTwo('IA');
    setIsMultiplayer(false);
    setScene('');
    navigation.navigate('Game');
  }, [navigation, playerOneName, setIsMultiplayer, setPlayerOne, setPlayerTwo]);

  const playMultiplayer = useCallback(() => {
    setPlayerOne(playerOneName);
    setPlayerTwo(playerTwoName);
    setIsMultiplayer(true);
    setScene('');
    navigation.navigate('Game');
  }, [
    navigation,
    playerOneName,
    playerTwoName,
    setIsMultiplayer,
    setPlayerOne,
    setPlayerTwo,
  ]);

  const renderGameModeSelection = useMemo(() => {
    return (
      <>
        <Text style={styles.title}>Select Game Mode:</Text>
        <Pressable onPress={() => setScene(GameTypes.SINGLE_PLAYER)}>
          <ImageBackground
            style={styles.ImageContainer}
            imageStyle={styles.backgroundImage}
            source={ia}
          ></ImageBackground>
        </Pressable>
        <Pressable onPress={() => setScene(GameTypes.MULTI_PLAYER)}>
          <ImageBackground
            style={styles.ImageContainer}
            imageStyle={styles.backgroundImage}
            source={multiplayer}
          ></ImageBackground>
        </Pressable>
      </>
    );
  }, []);

  const renderSingleplayerSetup = useMemo(() => {
    return (
      <>
        <Text style={styles.title}>Select Player Name:</Text>
        <Input
          autoCapitalize='words'
          onChangeText={setPlayerOneName}
          placeholder='Player 1'
          value={playerOneName}
        />
        <Pressable onPress={playSingleplayer}>
          <ImageBackground
            style={styles.ImageContainer}
            imageStyle={styles.backgroundImage}
            source={play}
          ></ImageBackground>
        </Pressable>
      </>
    );
  }, [playSingleplayer, playerOneName]);

  const renderMultiplayerSetup = useMemo(() => {
    return (
      <>
        <Text style={styles.title}>Select Player Names:</Text>
        <Input
          autoCapitalize='words'
          onChangeText={setPlayerOneName}
          placeholder='Player 1'
          value={playerOneName}
        />
        <Input
          autoCapitalize='words'
          onChangeText={setPlayerTwoName}
          placeholder='Player 2'
          value={playerTwoName}
        />
        <Pressable onPress={playMultiplayer}>
          <ImageBackground
            style={styles.ImageContainer}
            imageStyle={styles.backgroundImage}
            source={play}
          ></ImageBackground>
        </Pressable>
      </>
    );
  }, [playMultiplayer, playerOneName, playerTwoName]);

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
      {!scene
        ? renderGameModeSelection
        : scene === GameTypes.SINGLE_PLAYER
        ? renderSingleplayerSetup
        : scene === GameTypes.MULTI_PLAYER
        ? renderMultiplayerSetup
        : null}
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
