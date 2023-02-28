import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {theme} from '../../../../../../utils/Utils';

export interface GraphData {
  labels?: string[];
  data?: number[];
}

interface Props {
  data?: GraphData;
  height?: number;
  bezier?: boolean;
}

const PatientProgressGraphView = ({data, height = 250, bezier}: Props) => {
  return (
    <View style={styles.container}>
      <LineChart
        data={{
          labels: data?.labels ?? [''],
          datasets: [
            {
              data: data?.data ?? [0],
            },
          ],
        }}
        width={Dimensions.get('window').width - 20} // from react-native
        height={height}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0, // optional, defaults to 2dp
          color: () => theme['color-primary-500'],
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 0,
          },
          propsForDots: {
            r: '0',
            strokeWidth: '0',
            fill: theme['color-primary-100'],
          },
          propsForVerticalLabels: {
            fill: '#000',
            opacity: 0.2,
            fontWeight: '600',
            dx: 0,
          },
        }}
        bezier={bezier}
        style={{
          marginVertical: 8,
          borderRadius: 0,
          paddingRight: 40,
          marginBottom: -10,
          marginTop: 0,
        }}
        withInnerLines={false}
        withOuterLines={false}
        withHorizontalLines={false}
        withVerticalLines={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});

export default PatientProgressGraphView;
