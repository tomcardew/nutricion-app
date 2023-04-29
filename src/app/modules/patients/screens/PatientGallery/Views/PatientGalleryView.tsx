import React, {useState} from 'react';
import {StyleSheet, View, Dimensions, RefreshControl} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {GalleryItems} from '../../../../../../models/Patients';
import PatientMonthCard from './PatientMonthCard';
import EmptyView from '../../../../../../components/EmptyView';
import {dateToMonthYear} from '../../../../../../utils/Utils';
import {PillButton} from '../../../../../../components/Buttons';
import {GalleryCategory} from '../../../../../../models/Common';

interface Props {
  data: GalleryItems[];
  refreshing: boolean;
  onShowPreview: (url: string) => void;
  onRefresh?: () => void;
  didChangeCategory?: (category: GalleryCategory) => void;
}

const PatientGalleryView = ({
  data,
  refreshing = false,
  onShowPreview = () => {},
  onRefresh = () => {},
  didChangeCategory = () => {},
}: Props) => {
  const [category, setCategory] = useState<GalleryCategory>(
    GalleryCategory.Activities,
  );

  const handlePicturePress = (url: string) => {
    onShowPreview(url);
  };

  const toggleCategory = (category: GalleryCategory) => {
    setCategory(category);
    didChangeCategory(category);
  };

  return (
    <View style={styles.container}>
      <View style={styles.categoriesContainer}>
        <PillButton
          title="Actividades"
          style={{marginRight: 10}}
          selected={category === GalleryCategory.Activities}
          onPress={() => toggleCategory(GalleryCategory.Activities)}
        />
        <PillButton
          title="Progreso"
          style={{marginRight: 10}}
          selected={category === GalleryCategory.Progress}
          onPress={() => toggleCategory(GalleryCategory.Progress)}
        />
        <PillButton
          title="Otras"
          selected={category === GalleryCategory.Other}
          onPress={() => toggleCategory(GalleryCategory.Other)}
        />
      </View>
      <FlatList
        data={data.slice()}
        ListEmptyComponent={
          <EmptyView message="No hay fotos para mostrar. Intenta con otra categoría." />
        }
        contentContainerStyle={{paddingBottom: 150}}
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

export default PatientGalleryView;
