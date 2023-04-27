import React, {useEffect} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Video from 'react-native-video';
import {Logger, theme, typeOfAsset} from '../../../../../../utils/Utils';
import {FontWeight, MediaType} from '../../../../../../models/Common';
import {Image} from '../../../../../../components/Images';
import {VerticalInfoCard} from '../../../../../../components/Cards';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Text from '../../../../../../components/Text';
import {Icon} from '@ui-kitten/components';

interface Props {
  demoUrl?: string;
  name: string;
  category: string;
  series: string;
  rest: string;
  repetitions: string;
  weight: string;
  notes: string;
  completed: boolean;

  onGetExerciseImage?: () => void;
}

const AdminExerciseDetailsView = ({
  demoUrl,
  name,
  category,
  notes,
  repetitions,
  rest,
  series,
  weight,
  completed,
  onGetExerciseImage = () => {},
}: Props) => {
  const assetType = typeOfAsset(demoUrl ?? '');

  // useEffect(() => {
  //   Logger.warn(assetType);
  //   if (assetType == MediaType.None) {
  //     onGetExerciseImage();
  //   }
  // }, []);

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        {demoUrl && assetType === MediaType.Video && (
          <Video
            resizeMode="contain"
            repeat
            muted
            source={{
              uri: demoUrl,
            }}
            style={styles.video}
          />
        )}
        {demoUrl && assetType === MediaType.Image && (
          <Image
            source={{uri: demoUrl}}
            style={styles.video}
            resizeMode="contain"
          />
        )}
        <View
          style={[
            styles.statusIndicator,
            {
              backgroundColor: completed
                ? theme['color-success-600']
                : theme['color-info-500'],
            },
          ]}>
          <Icon
            style={styles.icon}
            fill="#fff"
            name={completed ? 'checkmark-outline' : 'clock-outline'}
          />
          <Text weight={FontWeight.Bold} style={styles.statusText}>
            {completed ? 'Completado' : 'En espera'}
          </Text>
        </View>
        <View style={styles.list}>
          <VerticalInfoCard title="Nombre" content={name} />
          <VerticalInfoCard title="Categoría" content={category} />
          <VerticalInfoCard title="Series" content={series} />
          <VerticalInfoCard title="Repeticiones" content={repetitions} />
          <VerticalInfoCard title="Descansos" content={rest} />
          <VerticalInfoCard title="Peso" content={weight} />
          <VerticalInfoCard title="Notas" content={notes} />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 20,
  },
  content: {
    width: Dimensions.get('window').width,
    // padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  list: {
    marginTop: 20,
  },
  video: {
    height: 200,
    width: Dimensions.get('window').width - 40,
    backgroundColor: '#00000010',
    borderRadius: 10,
    marginTop: 20,
    alignSelf: 'center',
  },
  statusIndicator: {
    height: 40,
    alignSelf: 'flex-end',
    borderRadius: 20,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginRight: 20,
  },
  statusText: {
    color: 'white',
    textTransform: 'uppercase',
    marginBottom: -3,
  },
  icon: {
    height: 22,
    width: 22,
    marginRight: 5,
  },
});

export default AdminExerciseDetailsView;
