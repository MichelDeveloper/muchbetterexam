import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorageKey from '../constants/AsyncStorageKey';

interface MatchesArray {
  winner: string;
  matchNumber: number;
}

export const getStorageMatches = async () => {
  try {
    const json = await AsyncStorage.getItem(AsyncStorageKey.MATCHES);
    if (json) {
      const parsedObj = await JSON.parse(json);
      return parsedObj?.list;
    }
    return [];
  } catch (err) {
    console.log(err);
  }
};

export const setStorageMatches = async (data: MatchesArray[]) => {
  try {
    await AsyncStorage.setItem(
      AsyncStorageKey.MATCHES,
      JSON.stringify({ list: data })
    );
  } catch (err) {
    console.log(err);
  }
};

export const deleteStorageMatches = async () => {
  try {
    await AsyncStorage.removeItem(AsyncStorageKey.MATCHES);
  } catch (err) {
    console.log(err);
  }
};
