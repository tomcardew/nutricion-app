import React from 'react';
import {StyleSheet, View, FlatList, Dimensions} from 'react-native';
import {Patient} from '../../../../../../models/Patients';
import {Image} from '../../../../../../components/Images';
import FastImage from 'react-native-fast-image';
import MenuOptionView from './MenuOptionView';
import ScreenNames from '../../../../../../constants/Screens';

interface Props {
  data: Patient | null;
  onNavigateTo?: (screen: ScreenNames, props?: any) => void;
  onToggleExercises?: () => void;
  onToggleAccess?: (newValue: boolean) => void;
}

interface MenuOption {
  title: string;
  screen?: ScreenNames;
  props?: any;
  type?: 'menu' | 'toggle' | 'separator';
  style?: 'regular' | 'destructive';
}

const PatientView = ({
  data,
  onNavigateTo = () => {},
  onToggleExercises = () => {},
  onToggleAccess = () => {},
}: Props) => {
  const options: MenuOption[] = [
    {
      title: 'Datos del paciente',
      screen: ScreenNames.PatientData,
      props: {
        patientId: data?.idUsuario,
      },
    },
    {
      title: 'Galería',
      screen: ScreenNames.PatientGallery,
    },
    {
      title: 'Programar Ejercicios',
      screen: ScreenNames.AdminExercisesList,
    },
    {
      title: 'Activar/Desactivar Ejercicios',
      type: 'toggle',
      props: {
        isToggleExercises: true,
      },
    },
    {
      title: '',
      type: 'separator',
    },
    {
      title: data?.activo ? 'Desactivar acceso' : 'Activar acceso',
      type: 'menu',
      style: data?.activo ? 'destructive' : 'regular',
      props: {
        isChangeAccess: true,
        newValue: !(data?.activo ?? false),
      },
    },
    {
      title: '',
      type: 'separator',
    },
  ];

  const onItemPressed = (item: MenuOption) => {
    if (item.screen) {
      onNavigateTo(item.screen ?? ScreenNames.Login, item.props);
    } else if (item.props.isToggleExercises) {
      onToggleExercises();
    } else if (item.props.isChangeAccess) {
      onToggleAccess(item.props.newValue ?? true);
    }
  };

  return (
    <View style={styles.container}>
      {data?.urlFoto && (
        <Image
          style={styles.image}
          source={{
            uri: data?.urlFoto
              ? data?.urlFoto
              : `https://ui-avatars.com/api/?name=${data?.nombre}&size=512&background=e5f9bb`,
            cache: data?.urlFoto
              ? FastImage.cacheControl.immutable
              : FastImage.cacheControl.cacheOnly,
          }}
        />
      )}
      <View style={styles.content}>
        <FlatList
          data={options.slice()}
          renderItem={item => (
            <MenuOptionView
              title={item.item.title}
              type={item.item.type}
              style={item.item.style}
              active={
                item.item.props && item.item.props.isToggleExercises
                  ? data?.seccion_ejercicios
                  : undefined
              }
              onPress={() => {
                onItemPressed(item.item);
              }}
            />
          )}
          keyExtractor={(item, index) =>
            `patient-menu-option-${item.title}-${index}`
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: Dimensions.get('screen').width,
    height: 250,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    // height: 1000
  },
});

export default PatientView;
