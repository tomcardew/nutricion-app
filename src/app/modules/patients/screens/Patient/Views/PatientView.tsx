import React from 'react';
import {StyleSheet, View, FlatList, Dimensions} from 'react-native';
import {Patient} from '../../../../../../models/Patients';
import {ProfilePicture} from '../../../../../../components/Images';
import MenuOptionView from './MenuOptionView';
import ScreenNames from '../../../../../../constants/Screens';
import CommonBanner from '../../../../../../components/CommonBanner';
import Text from '../../../../../../components/Text';

interface Props {
  data: Patient | null;
  onNavigateTo?: (screen: ScreenNames, props?: any) => void;
  onToggleExercises?: () => void;
  onToggleAccess?: (newValue: boolean) => void;
  onUploadDiet?: () => void;
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
  onUploadDiet = () => {},
}: Props) => {
  const patientIsActive = data?.activo;
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
      title: 'Actualizar dieta',
      props: {
        isUploadDiet: true,
      },
    },
    {
      title: '',
      type: 'separator',
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
      title: patientIsActive ? 'Desactivar acceso' : 'Activar acceso',
      type: 'menu',
      style: patientIsActive ? 'destructive' : 'regular',
      props: {
        isChangeAccess: true,
        newValue: !patientIsActive,
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
    } else if (item.props.isUploadDiet) {
      onUploadDiet();
    }
  };

  return (
    <View style={styles.container}>
      <ProfilePicture
        type="tall"
        fullname={data?.nombre}
        email={data?.email}
        url={data?.urlFoto}
        fallback={data?.nombre}
      />
      {patientIsActive != undefined && !patientIsActive && (
        <CommonBanner
          type="danger"
          text="Este paciente no se encuentra activo"
        />
      )}
      <View style={styles.content}>
        <FlatList
          contentContainerStyle={{paddingBottom: 60}}
          data={options.slice()}
          renderItem={item => (
            <MenuOptionView
              title={item.item.title}
              type={item.item.type}
              style={item.item.style}
              disabled={
                !patientIsActive &&
                !(item.item.props && item.item.props.isChangeAccess)
              }
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
