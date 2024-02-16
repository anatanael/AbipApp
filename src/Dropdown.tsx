import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/FontAwesome6';

import {colors} from './config/colors';

const IconMenu = () => (
  <Icon name="ellipsis-vertical" size={28} color={colors.text} />
);

type DropdownProps = {
  navigation: StackNavigationProp<any>;
};

const Dropdown: React.FC<DropdownProps> = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const options = ['Configurações'];

  const handleOptionSelect = () => {
    navigation.navigate('Settings');
    setModalVisible(false);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.buttonIcon}>
        <IconMenu />
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {options.map(option => (
                <TouchableOpacity
                  key={option}
                  onPress={() => handleOptionSelect()}>
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonIcon: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.background,
    padding: 16,
    borderRadius: 10,
    elevation: 5,
    position: 'absolute',
    top: 4,
    right: 4,
    borderWidth: 1,
    borderColor: colors.text,
  },
  optionText: {
    fontSize: 16,
    paddingVertical: 2,
    color: colors.text,
  },
});

export default Dropdown;
