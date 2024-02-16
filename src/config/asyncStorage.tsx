import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveStorageData = async (
  key: string,
  dataSave: object,
): Promise<void> => {
  if (!key || !dataSave) {
    throw 'Key or dataSave is empty';
  }

  if (typeof dataSave !== 'object') {
    throw 'data is not an object';
  }

  const strSave = JSON.stringify(dataSave);
  await AsyncStorage.setItem(key, strSave);
};

export const getStorageData = async (key: string): Promise<object | null> => {
  const jsonValue = await AsyncStorage.getItem(key);
  return jsonValue != null ? JSON.parse(jsonValue) : null;
};

export const __SERVER_DATA = '__ABIP_SERVER_DATA';
