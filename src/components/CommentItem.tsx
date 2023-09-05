import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {theme} from '../utils/Utils';
import Text from './Text';
import {FontWeight} from '../models/Common';

interface Props {
  owner: string;
  comment: string;
  isCurrentUser?: boolean;
  isPrecededByOwn?: boolean;
}

const CommentItem = ({
  owner,
  comment,
  isCurrentUser,
  isPrecededByOwn,
}: Props) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.innerContainer,
          {
            backgroundColor: isCurrentUser
              ? theme['color-primary-100']
              : theme['color-primary-700'],
            alignItems: isCurrentUser ? 'flex-end' : 'flex-start',
            marginLeft: isCurrentUser ? 'auto' : 0,
          },
        ]}>
        {!isPrecededByOwn && (
          <Text
            weight={FontWeight.Bold}
            style={[
              styles.text,
              {
                fontSize: 12,
                color: isCurrentUser ? theme['color-primary-800'] : 'white',
                textTransform: 'uppercase',
              },
            ]}>
            {isCurrentUser ? 'Tú' : owner}
          </Text>
        )}
        <Text
          style={[
            styles.text,
            {
              color: isCurrentUser ? theme['color-primary-800'] : 'white',
              textAlign: isCurrentUser ? 'right' : 'left',
            },
          ]}>
          {comment}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  innerContainer: {
    justifyContent: 'flex-start',
    backgroundColor: theme['color-primary-800'],
    width: (Dimensions.get('window').width - 20) * 0.8,
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});

export default CommentItem;
