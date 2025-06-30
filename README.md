 import React from 'react';
import { View, Text as RNText } from 'react-native';
import { VictoryPie } from 'victory-native';

const pieChartData = [
  {
    name: 'Pop1',
    population: 13,
    color: '#ff4d4d',
    legendFontColor: '#7F7F7F',
    legendFontSize: 14,
  },
  {
    name: 'Pop2',
    population: 40,
    color: '#4d79ff',
    legendFontColor: '#7F7F7F',
    legendFontSize: 14,
  },
  {
    name: 'Pop3',
    population: 47,
    color: '#00cc99',
    legendFontColor: '#7F7F7F',
    legendFontSize: 14,
  },
];

const VictoryPieChart = () => {
  const total = pieChartData.reduce((sum, item) => sum + item.population, 0);

  // Transform for Victory
  const pieData = pieChartData.map((item) => ({
    x: item.name,
    y: item.population,
  }));

  const colorScale = pieChartData.map((item) => item.color);

  return (
    <View style={{ alignItems: 'center', marginTop: 40 }}>
      <VictoryPie
        data={pieData}
        width={300}
        height={300}
        colorScale={colorScale}
        innerRadius={0}
        labelRadius={({ radius }) => radius + 15}
        labels={({ datum }) =>
          `${((datum.y / total) * 100).toFixed(0)}%`
        }
        style={{
          labels: { fontSize: 14, fill: 'black' },
        }}
      />

      {/* Legend below */}
      <View style={{ marginTop: 20 }}>
        {pieChartData.map((item, index) => {
          const percent = ((item.population / total) * 100).toFixed(1);
          return (
            <RNText
              key={index}
              style={{
                fontSize: item.legendFontSize,
                marginVertical: 2,
                color: item.legendFontColor,
              }}
            >
              {item.name}: {percent}%
            </RNText>
          );
        })}
      </View>
    </View>
  );
};

export default VictoryPieChart;
