import React, {useState} from 'react';
import {StyleSheet, View, Dimensions, RefreshControl} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {GalleryItems} from '../../../../../../models/Patients';
import EmptyView from '../../../../../../components/EmptyView';
import {dateToMonthYear} from '../../../../../../utils/Utils';
import PatientMonthCard from '../../../../patients/screens/PatientGallery/Views/PatientMonthCard';
import {PillButton} from '../../../../../../components/Buttons';
import {GalleryCategory} from '../../../../../../models/Common';

interface Props {
  data: GalleryItems[];
  refreshing: boolean;
  category: GalleryCategory;
  onShowPreview: (index: number) => void;
  onRefresh?: () => void;
  didChangeCategory?: (category: GalleryCategory) => void;
}

const GalleryView = ({
  data,
  refreshing = false,
  category,
  onShowPreview = () => {},
  onRefresh = () => {},
  didChangeCategory = () => {},
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.categoriesContainer}>
        <PillButton
          title="Actividades"
          style={{marginRight: 10}}
          selected={category === GalleryCategory.Activities}
          onPress={() => didChangeCategory(GalleryCategory.Activities)}
        />
        <PillButton
          title="Progreso"
          style={{marginRight: 10}}
          selected={category === GalleryCategory.Progress}
          onPress={() => didChangeCategory(GalleryCategory.Progress)}
        />
        <PillButton
          title="Otras"
          selected={category === GalleryCategory.Other}
          onPress={() => didChangeCategory(GalleryCategory.Other)}
        />
      </View>
      <FlatList
        data={data.slice()}
        ListEmptyComponent={<EmptyView message="No hay fotos para mostrar" />}
        contentContainerStyle={{paddingBottom: 140}}
        renderItem={({item}) => (
          <PatientMonthCard
            month={`${dateToMonthYear(item.date)}`}
            data={item.data}
            onPress={onShowPreview}
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
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // backgroundColor: '#00000010',
    width: Dimensions.get('window').width,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  preview: {
    width: '100%',
    height: '100%',
  },
});

export default GalleryView;
