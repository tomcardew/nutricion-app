import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Pdf from 'react-native-pdf';
import EmptyView from '../../../../../../components/EmptyView';
import {Logger} from '../../../../../../utils/Utils';

interface Props {
  source?: string;
  onError?: (error: any) => void;
}

const PatientDietView = ({source, onError = () => {}}: Props) => {
  return (
    <View style={styles.container}>
      {source && (
        <Pdf
          source={{
            uri: source,
            cache: false,
          }}
          onError={onError}
          style={styles.pdf}
        />
      )}
      {!source && <EmptyView />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default PatientDietView;
