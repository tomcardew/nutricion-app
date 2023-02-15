import React from 'react';
import {StyleSheet, View, Dimensions, RefreshControl} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {GalleryItems} from '../../../../../../models/Patients';
import EmptyView from '../../../../../../components/EmptyView';
import {dateToMonthYear} from '../../../../../../utils/Utils';
import PatientMonthCard from '../../../../patients/screens/PatientGallery/Views/PatientMonthCard';

interface Props {
  data: GalleryItems[];
  refreshing: boolean;
  onShowPreview: (url: string) => void;
  onRefresh?: () => void;
}

const GalleryView = ({
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
      {data.length > 0 && (
        <FlatList
          data={data.slice()}
          contentContainerStyle={{paddingBottom: 140}}
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
      )}
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

export default GalleryView;
