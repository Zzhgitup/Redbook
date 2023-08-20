import AsyncStorage from '@react-native-async-storage/async-storage';
export const save = async (key: string, value: any) => {
  try {
    return await AsyncStorage.setItem(key, value);
  } catch (error: any) {
    console.error(error);
  }
};
export const load = async (params: string) => {
  try {
    return await AsyncStorage.getItem(params);
  } catch (error) {
    console.log(error);
  }
};
export const remove = async (key: string) => {
  try {
    return await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};
export const clean = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log(error);
  }
};
