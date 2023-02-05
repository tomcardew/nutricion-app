import React, {useState} from 'react';
import {StyleSheet, View, Dimensions, RefreshControl} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {GalleryItems} from '../../../../../../models/Patients';
import PatientMonthCard from './PatientMonthCard';
import {Image} from '../../../../../../components/Images';
import EmptyView from '../../../../../../components/EmptyView';
import moment from 'moment';
import {dateToMonthYear} from '../../../../../../utils/Utils';

interface Props {
  data: GalleryItems[];
  refreshing: boolean;
  onShowPreview: (url: string) => void;
  onRefresh?: () => void;
}

const PatientGalleryView = ({
  data,
  refreshing = false,
  onShowPreview = () => {},
  onRefresh = () => {},
}: Props) => {
  const handlePicturePress = (url: string) => {
    onShowPreview(url);
  };

  return (
    <View style={styles.container}>
      {data.length == 0 && <EmptyView message="No hay fotos para mostrar" />}
      <FlatList
        data={data.slice()}
        renderItem={({item}) => (
          <PatientMonthCard
            month={`${dateToMonthYear(item.date)}`}
            data={item.data}
            onPress={handlePicturePress}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyExtractor={item => `patient-gallery-${dateToMonthYear(item.date)}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    height: Dimensions.get('window').height - 100,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  preview: {
    width: '100%',
    height: '100%',
  },
});

export default PatientGalleryView;
