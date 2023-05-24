import React from 'react';
import {StyleSheet, View} from 'react-native';
import CommentTextBox from '../../../../../../components/CommentTextBox';

interface Props {}

const PatientExerciseCommentsView = ({}: Props) => {
  return (
    <View style={styles.container}>
      <CommentTextBox value="" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default PatientExerciseCommentsView;
