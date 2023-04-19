import AsyncStorage from '@react-native-async-storage/async-storage';

export const nativeSetStringValue = async value => {
  try {
    await AsyncStorage.setItem('user', value);
  } catch (e) {
    console.log(e);
  }
};

export const nativeSetObjectValue = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('user', jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const nativeGetMyStringValue = async () => {
  try {
    return await AsyncStorage.getItem('@user');
  } catch (e) {
    console.log(e);
  }
};

export const nativeGetMyObject = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@user');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

export const webSetToLocalStorage = async value => {
  try {
    localStorage.setItem('user', value);
  } catch (e) {
    console.log(e);
  }
};

export const webGetFromLocalStorage = async () => {
  try {
    const userFromStorage = localStorage.getItem('user');
    return userFromStorage != null ? JSON.parse(userFromStorage) : null;
  } catch (e) {
    console.log(e);
  }
};
