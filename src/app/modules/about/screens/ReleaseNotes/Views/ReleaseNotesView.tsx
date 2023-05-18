import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Markdown from 'react-native-markdown-display';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

interface Props {
  copy: string;
}

const ReleaseNotesView = ({copy}: Props) => {
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Markdown style={{body: styles.display}}>{copy}</Markdown>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20,
    width: Dimensions.get('window').width,
    paddingBottom: 100,
  },
  display: {
    width: Dimensions.get('window').width - 40,
  },
});

export default ReleaseNotesView;
