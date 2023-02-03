import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {
  DatePicker,
  Selector,
  TextInput,
} from '../../../../../../components/Inputs';
import {ActionButton} from '../../../../../../components/Buttons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {IndexPath} from '@ui-kitten/components';

interface Props {
  name: string;
  date: Date | undefined;
  genderSelectedIndex: IndexPath | IndexPath[] | undefined;
  genderSelectedValue: string;
  email: string;
  password: string;
  passwordConfirmation: string;

  onRegisterPress?: () => void;

  didChangeName?: (nextValue: string) => void;
  didChangeDate?: (nextValue: Date | undefined) => void;
  didChangeGender?: (nextValue: IndexPath | IndexPath[]) => void;
  didChangeEmail?: (nextValue: string) => void;
  didChangePassword?: (nextValue: string) => void;
  didChangePasswordConfirmation?: (nextValue: string) => void;
}

const SignupView = ({
  name,
  date,
  genderSelectedIndex,
  genderSelectedValue,
  email,
  password,
  passwordConfirmation,
  didChangeName,
  didChangeDate,
  didChangeGender,
  didChangeEmail,
  didChangePassword,
  didChangePasswordConfirmation,
  onRegisterPress = () => {},
}: Props) => {
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <TextInput
          label="Nombre"
          value={name}
          textContentType="name"
          onChangeText={didChangeName}
        />
        <DatePicker
          date={date}
          label="Fecha de nacimiento"
          onSelect={didChangeDate}
        />
        <Selector
          label="Género"
          placeholder="Selecciona una opción"
          selectedIndex={genderSelectedIndex}
          onSelect={didChangeGender}
          keys={["Femenino", "Masculino"]}
          value={genderSelectedValue}
        />
        <TextInput
          label="Correo electrónico"
          value={email}
          textContentType="emailAddress"
          onChangeText={didChangeEmail}
        />
        <TextInput
          label="Contraseña"
          value={password}
          secureTextEntry
          textContentType="newPassword"
          onChangeText={didChangePassword}
        />
        <TextInput
          label="Confirma tu contraseña"
          value={passwordConfirmation}
          secureTextEntry
          textContentType="newPassword"
          onChangeText={didChangePasswordConfirmation}
        />
        <ActionButton
          style={styles.button}
          title="Entrar"
          onPress={onRegisterPress}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  content: {
    width: Dimensions.get('window').width,
    padding: 20,
    flex: 1,
    justifyContent: 'flex-start',
  },
  button: {
    marginTop: 20,
  },
});

export default SignupView;
