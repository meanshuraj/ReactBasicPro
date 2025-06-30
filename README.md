 import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Pie from 'react-native-pie';

const data = [
  { name: 'Pop1', value: 13, color: '#ff4d4d' },
  { name: 'Pop2', value: 40, color: '#4d79ff' },
  { name: 'Pop3', value: 47, color: '#00cc99' },
];

const total = data.reduce((sum, d) => sum + d.value, 0);
const radius = 80;

const PieChartWithLabels = () => {
  let cumulativePercent = 0;

  return (
    <View style={styles.container}>
      {/* Pie Chart */}
      <View style={{ width: 200, height: 200 }}>
        <Pie
          radius={radius}
          innerRadius={0}
          sections={data.map((d) => ({
            percentage: (d.value / total) * 100,
            color: d.color,
          }))}
          dividerSize={2}
          strokeCap={'butt'}
        />

        {/* Labels outside each arc */}
        {data.map((item, index) => {
          const percent = (item.value / total) * 100;
          const midAngle = (cumulativePercent + percent / 2) * 3.6; // 360 degrees
          const radians = (midAngle * Math.PI) / 180;
          const x = 100 + (radius + 20) * Math.cos(radians);
          const y = 100 + (radius + 20) * Math.sin(radians);
          cumulativePercent += percent;

          return (
            <Text
              key={index}
              style={[
                styles.label,
                {
                  left: x - 10,
                  top: y - 10,
                },
              ]}
            >
              {percent.toFixed(0)}%
            </Text>
          );
        })}
      </View>

      {/* Legend below */}
      <View style={{ marginTop: 20 }}>
        {data.map((item, index) => {
          const percent = ((item.value / total) * 100).toFixed(1);
          return (
            <Text key={index} style={{ fontSize: 14, color: item.color }}>
              {item.name}: {percent}%
            </Text>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 40,
  },
  label: {
    position: 'absolute',
    fontSize: 12,
    color: 'black',
  },
});

export default PieChartWithLabels;
