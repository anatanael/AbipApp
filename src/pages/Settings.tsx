import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';

import {colors} from '../config/colors';
import {ScrollView} from 'react-native-gesture-handler';

import {
  saveStorageData,
  getStorageData,
  __SERVER_DATA,
} from '../config/asyncStorage';

import {TypeServerData} from '../config/types';

const Home: React.FC<any> = () => {
  const [serverIp, setServerIp] = useState('');
  const [serverPort, setServerPort] = useState('');

  const [dataInitial, setDataInitial] = useState<TypeServerData>({
    serverIp: '',
    serverPort: '',
  });

  const [changesDetected, setChangesDetected] = useState<boolean>(false);

  const onSaveSettings = () => {
    const serverData: TypeServerData = {
      serverIp,
      serverPort,
    };

    try {
      saveStorageData(__SERVER_DATA, serverData);
      setDataInitial(serverData);

      ToastAndroid.show('Configurações salvas com sucesso', ToastAndroid.SHORT);
    } catch (err) {
      console.log(err);
      ToastAndroid.show('Erro ao salvar', ToastAndroid.SHORT);
    }
  };

  const onChangeServerIp = (event: any) => {
    setServerIp(event.nativeEvent.text);
  };

  const onChangeServerPort = (event: any) => {
    setServerPort(event.nativeEvent.text);
  };

  useEffect(() => {
    const main = async () => {
      const data = await getStorageData(__SERVER_DATA);

      if (!data) {
        return;
      }

      const dataStorage = data as TypeServerData;

      setDataInitial(dataStorage);

      setServerIp(dataStorage.serverIp);
      setServerPort(dataStorage.serverPort);
    };

    main();
  }, []);

  useEffect(() => {
    setChangesDetected(
      dataInitial.serverIp !== serverIp ||
        dataInitial.serverPort !== serverPort,
    );
  }, [serverIp, serverPort, dataInitial]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.containerScrollView}>
        <View style={styles.section}>
          <Text style={styles.titleSection}>Servidor</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.labelInput}>IP</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={serverIp}
              onChange={onChangeServerIp}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.labelInput}>Porta</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={serverPort}
              onChange={onChangeServerPort}
            />
          </View>
        </View>
      </ScrollView>

      {changesDetected && (
        <Text style={styles.msgChangesDetected}>* Alterações não salvas</Text>
      )}

      <View style={styles.containerButtonSave}>
        <TouchableOpacity style={styles.buttonSave} onPress={onSaveSettings}>
          <Text style={styles.textButtonSave}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 8,
  },
  containerScrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  section: {
    borderWidth: 1,
    borderColor: colors.text,
    borderStyle: 'dotted',
    marginBottom: 16,
    padding: 8,
  },
  titleSection: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.text,
  },
  inputGroup: {
    justifyContent: 'center',
    marginBottom: 8,
  },
  labelInput: {
    fontSize: 16,
    marginBottom: 8,
    color: colors.text,
  },
  input: {
    borderWidth: 1,
    height: 40,
    borderColor: 'gray',
    fontSize: 16,
    padding: 10,
    borderRadius: 5,
    color: colors.text,
  },
  containerButtonSave: {
    flexDirection: 'row',

    justifyContent: 'center',
    marginBottom: 8,
  },
  msgChangesDetected: {
    color: 'red',
    marginBottom: 8,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonSave: {
    backgroundColor: colors.background,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  textButtonSave: {
    color: colors.text,
    fontSize: 18,
  },
});

export default Home;
