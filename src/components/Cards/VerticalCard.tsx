import React from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {default as theme} from '../../../custom-theme.json';
import {FontWeight} from '../../models/Common';
import Text from '../Text';
import {Icon} from '@ui-kitten/components';

interface Props {
  title: string;
  content: string;
  callToAction?: string;

  didPressCallToAction?: () => void;
}

const VerticalInfoCard = ({
  title,
  content,
  callToAction,
  didPressCallToAction = () => {},
}: Props) => {
  return (
    <View style={styles.container}>
      <Text weight={FontWeight.SemiBold} style={styles.title}>
        {title.toUpperCase()}
      </Text>
      <Text weight={FontWeight.Medium} style={styles.content}>
        {content}
      </Text>
      {callToAction && (
        <TouchableOpacity
          style={styles.callToActionContainer}
          onPress={didPressCallToAction}>
          <View style={styles.innerCallToActionContainer}>
            <Text weight={FontWeight.Bold} style={styles.callToAction}>
              {callToAction?.toUpperCase()}
            </Text>
            <Icon
              fill={theme['color-primary-600']}
              name="arrow-ios-forward-outline"
              style={styles.icon}
            />
          </View>
        </TouchableOpacity>
      )}
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
  titlesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
  },
  title: {
    color: theme['color-primary-700'],
    fontSize: 13,
    marginBottom: 0,
  },
  callToActionContainer: {
    backgroundColor: theme['color-primary-100'],
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 100,
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 'auto',
  },
  innerCallToActionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  callToAction: {
    color: theme['color-primary-700'],
    fontSize: 14,
    marginBottom: 0,
  },
  content: {
    fontSize: 18,
    fontWeight: '400',
    color: 'black',
  },
  icon: {
    marginLeft: 0,
    height: 20,
    width: 20,
    marginTop: -2,
  },
});

export default VerticalInfoCard;
