 import React from 'react';
import { View, Text as RNText } from 'react-native';
import Svg, { G, Path, Text } from 'react-native-svg';

const data = [
  { label: 'Pop1', value: 13, color: '#ff4d4d' },
  { label: 'Pop2', value: 40, color: '#4d79ff' },
  { label: 'Pop3', value: 47, color: '#00cc99' },
];

const radius = 100;
const center = 120;
const total = data.reduce((sum, d) => sum + d.value, 0);

const PieChartSimple = () => {
  let startAngle = 0;

  const slices = data.map((slice, index) => {
    const angle = (slice.value / total) * 2 * Math.PI;
    const endAngle = startAngle + angle;

    const x1 = center + radius * Math.cos(startAngle - Math.PI / 2);
    const y1 = center + radius * Math.sin(startAngle - Math.PI / 2);
    const x2 = center + radius * Math.cos(endAngle - Math.PI / 2);
    const y2 = center + radius * Math.sin(endAngle - Math.PI / 2);

    const largeArc = angle > Math.PI ? 1 : 0;

    const d = `
      M ${center} ${center}
      L ${x1} ${y1}
      A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}
      Z
    `;

    // Label position (just outside each arc)
    const midAngle = startAngle + angle / 2;
    const labelX = center + (radius + 15) * Math.cos(midAngle - Math.PI / 2);
    const labelY = center + (radius + 15) * Math.sin(midAngle - Math.PI / 2);

    const percent = ((slice.value / total) * 100).toFixed(0);

    startAngle = endAngle;

    return (
      <G key={index}>
        <Path d={d} fill={slice.color} />
        <Text
          x={labelX}
          y={labelY}
          fill="black"
          fontSize="12"
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {percent}%
        </Text>
      </G>
    );
  });

  return (
    <View style={{ alignItems: 'center', marginTop: 40 }}>
      <Svg height="240" width="240">
        {slices}
      </Svg>

      {/* Legend below the chart */}
      <View style={{ marginTop: 20 }}>
        {data.map((item, index) => {
          const percent = ((item.value / total) * 100).toFixed(1);
          return (
            <RNText
              key={index}
              style={{
                fontSize: 14,
                marginVertical: 2,
                color: item.color,
              }}
            >
              {item.label}: {percent}%
            </RNText>
          );
        })}
      </View>
    </View>
  );
};

export default PieChartSimple;
