import React, { useState } from 'react';
import { View, Text, Button, Modal, StyleSheet, Linking } from 'react-native';

const WelcomePage = ({ name = 'username' }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleVisit = () => {
    Linking.openURL('https://www.google.com');
  };

  return (
  
    <View style={styles.container}>
      {!modalVisible && 
      (<View>
      <Text style={styles.welcome}>Welcome {name}</Text>
      <Text style={styles.infoText}>
        This is some information or introductory text that describes something important or interesting on the page.
      </Text>

      <View style={styles.buttonContainer}>
        <Button title="Later" onPress={() => setModalVisible(true)} />
        <Button title="Visit" onPress={handleVisit} />
      </View>
      </View>)}
    
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>Hello World </Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default WelcomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  welcome: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalBox: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
  },
});
