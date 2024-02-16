import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';

import {Camera, CameraType} from 'react-native-camera-kit';
import {request, PERMISSIONS} from 'react-native-permissions';
import axios from 'axios';

import {colors} from '../config/colors';

import {__SERVER_DATA, getStorageData} from '../config/asyncStorage';
import {TypeServerData} from '../config/types';

const ButtonActiveCamera = ({onPress}: {onPress: () => void}) => (
  <TouchableOpacity style={styles.buttonActiveCamera} onPress={onPress}>
    <Text style={styles.textButtonActiveCamera}>Ler novamente</Text>
  </TouchableOpacity>
);

const Home: React.FC<any> = ({navigation}) => {
  const [server, setServer] = useState('');
  const [barcode, setBarcode] = useState('');
  const [cameraActive, setCameraActive] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      request(PERMISSIONS.ANDROID.CAMERA);

      getStorageData(__SERVER_DATA).then(data => {
        if (data) {
          const dataSave = data as TypeServerData;
          setServer(dataSave.serverIp + ':' + dataSave.serverPort);
        }
      });
    });

    return unsubscribe;
  }, [navigation]);

  const onBarcodeScan = async (event: any) => {
    setCameraActive(false);
    const barcodeRead: string = event.nativeEvent.codeStringValue;

    try {
      await axios.post(`http://${server}/barcode`, {barcode: barcodeRead});
      ToastAndroid.show('Código de barra lido com sucesso', ToastAndroid.SHORT);
      setBarcode(barcodeRead);
    } catch (err) {
      ToastAndroid.show(
        'Erro ao se comunicar com o servidor',
        ToastAndroid.SHORT,
      );
      setCameraActive(true);
    }
  };

  return (
    <View style={styles.container}>
      {cameraActive && (
        <View style={styles.containerCamera}>
          <View style={styles.containerTitle}>
            <Text style={styles.title}>Leia o código de barras</Text>
          </View>

          <Camera
            cameraType={CameraType.Back}
            scanBarcode={true}
            showFrame={false}
            onReadCode={onBarcodeScan}
            onOr
          />
        </View>
      )}

      {!cameraActive && (
        <View style={styles.containerNotCamera}>
          <Text style={styles.text}>Último código de barra lido</Text>
          <Text style={styles.textLastBarcode}>{barcode}</Text>
          <ButtonActiveCamera onPress={() => setCameraActive(true)} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.primary,
    padding: 8,
  },
  containerCamera: {
    position: 'relative',
  },
  containerTitle: {
    position: 'absolute',

    width: '100%',
    top: -64,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: colors.text,
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
  },
  textLastBarcode: {
    marginVertical: 16,
    fontSize: 20,
    color: colors.text,
  },
  containerNotCamera: {
    alignItems: 'center',
  },
  buttonActiveCamera: {
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  textButtonActiveCamera: {
    color: colors.text,
  },
});

export default Home;
