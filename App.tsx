import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import WelcomePage from './Components/WelcomePage';

function App(): React.JSX.Element {
  return (
     <SafeAreaView style = {{flex:1}}>
      <WelcomePage name="Anshu Raj"/>
     </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});