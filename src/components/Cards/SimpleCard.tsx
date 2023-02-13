import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {default as theme} from '../../../custom-theme.json';

interface Props {
  title?: string;
  children?: JSX.Element | JSX.Element[] | any;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
}

const SimpleCard = ({title, children, style, contentStyle}: Props) => {
  return (
    <View style={[styles.container, style]}>
      {title && (
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      )}
      <View style={[styles.content, contentStyle]}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    elevation: 3,
    borderRadius: 6,
    overflow: 'hidden',
  },
  content: {
    padding: 10,
  },
  titleContainer: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#F4F4F4',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    color: 'black',
    fontWeight: '600',
    textTransform: 'uppercase',
    fontSize: 15,
  },
});

export default SimpleCard;
