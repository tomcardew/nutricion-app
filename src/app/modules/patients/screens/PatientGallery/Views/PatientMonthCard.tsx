import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {PatientPicture} from '../../../../../../models/Patients';
import Thumbnail from '../../../../../../components/Thumbnail';
import {default as theme} from '../../../../../../../custom-theme.json';
import {distributeItems, replaceLocalhost} from '../../../../../../utils/Utils';
import Text from '../../../../../../components/Text';
import {FontWeight} from '../../../../../../models/Common';

interface Props {
  month: string;
  data: PatientPicture[];
  onPress?: (url: string) => void;
}

const PatientMonthCard = ({month, data, onPress = () => {}}: Props) => {
  const distributedData = distributeItems(data);

  const listA = distributedData[0];
  const listB = distributedData[1];
  const listC = distributedData[2];

  return (
    <View style={styles.container}>
      <Text weight={FontWeight.Bold} style={styles.month}>
        {month}
      </Text>
      <View style={styles.pictureContainers}>
        <View style={styles.column}>
          {listA.map(item => (
            <Thumbnail
              style={styles.item}
              key={`patient-gallery-${month}-${item.id}`}
              url={replaceLocalhost(item.url)}
              onPress={() => onPress(item.url)}
            />
          ))}
        </View>
        <View style={styles.column}>
          {listB.map(item => (
            <Thumbnail
              style={styles.item}
              key={`patient-gallery-${month}-${item.id}`}
              url={replaceLocalhost(item.url)}
              onPress={() => onPress(item.url)}
            />
          ))}
        </View>
        <View style={styles.column}>
          {listC.map(item => (
            <Thumbnail
              style={styles.item}
              key={`patient-gallery-${month}-${item.id}`}
              url={replaceLocalhost(item.url)}
              onPress={() => onPress(item.url)}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  pictureContainers: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: '100%',
    width: (Dimensions.get('window').width - 20) / 3,
  },
  item: {
    width: (Dimensions.get('window').width - 20) / 3,
    height: (Dimensions.get('window').width - 20) / 3,
  },
  month: {
    color: theme['color-primary-900'],
    textAlign: 'left',
    width: '100%',
    fontSize: 18,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
});

export default PatientMonthCard;
