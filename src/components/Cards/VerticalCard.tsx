import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {default as theme} from '../../../custom-theme.json';
import {FontWeight} from '../../models/Common';
import Text from '../Text';

interface Props {
  title: string;
  content: string;
}

const VerticalInfoCard = ({title, content}: Props) => {
  return (
    <View style={styles.container}>
      <Text weight={FontWeight.SemiBold} style={styles.title}>
        {title.toUpperCase()}
      </Text>
      <Text weight={FontWeight.Medium} style={styles.content}>
        {content}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    backgroundColor: 'white',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
    width: Dimensions.get('window').width,
  },
  title: {
    color: theme['color-primary-700'],
    fontSize: 13,
    marginBottom: 0,
  },
  content: {
    fontSize: 18,
    fontWeight: '400',
    color: 'black',
  },
});

export default VerticalInfoCard;
