import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Pie from 'react-native-pie';

export default function App() {
  const [selected, setSelected] = useState(null);

  const data = [
    { percentage: 40, color: 'red', label: 'Red' },
    { percentage: 30, color: 'blue', label: 'Blue' },
    { percentage: 30, color: 'green', label: 'Green' },
  ];

  return (
    <View style={styles.container}>
      <Pie
        radius={100}
        innerRadius={60}
        sections={data}
        strokeCap={'butt'}
        backgroundColor="#ddd"
      />

      {/* Overlay Touchable zones */}
      <View style={StyleSheet.absoluteFill}>
        <View style={styles.touchContainer}>
          {data.map((slice, index) => (
            <TouchableOpacity
              key={index}
              style={styles.touchBox}
              onPress={() => setSelected(slice)}
            />
          ))}
        </View>
      </View>

      {/* Tooltip */}
      {selected && (
        <View style={styles.tooltip}>
          <Text style={{ fontWeight: 'bold' }}>{selected.label}</Text>
          <Text>{selected.percentage}%</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 50,
  },
  touchContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
    marginTop: 50,
  },
  touchBox: {
    width: 60,
    height: 120,
    backgroundColor: 'transparent',
  },
  tooltip: {
    position: 'absolute',
    top: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    elevation: 5,
  },
});