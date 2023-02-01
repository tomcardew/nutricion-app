import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {default as theme} from '../../../custom-theme.json';

interface Props {
  title: string;
  content: string;
}

const VerticalInfoCard = ({title, content}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title.toUpperCase()}</Text>
      <Text style={styles.content}>{content}</Text>
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
    fontWeight: '700',
    color: theme['color-primary-700'],
    fontSize: 13,
    marginBottom: 5,
  },
  content: {
    fontSize: 18,
    fontWeight: '400',
    color: 'black',
    lineHeight: 18,
  },
});

export default VerticalInfoCard;
