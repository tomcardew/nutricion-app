import React, {useState} from 'react';
import {Input, Icon} from '@ui-kitten/components';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {KeyboardTypeOptions} from 'react-native';

interface Props {
  label?: string;
  placeholder?: string;
  value: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions | undefined;
  accessoryRight?: JSX.Element | undefined;
  autocapitalize?: boolean;
  textContentType?:
    | 'none'
    | 'URL'
    | 'addressCity'
    | 'addressCityAndState'
    | 'addressState'
    | 'countryName'
    | 'creditCardNumber'
    | 'emailAddress'
    | 'familyName'
    | 'fullStreetAddress'
    | 'givenName'
    | 'jobTitle'
    | 'location'
    | 'middleName'
    | 'name'
    | 'namePrefix'
    | 'nameSuffix'
    | 'nickname'
    | 'organizationName'
    | 'postalCode'
    | 'streetAddressLine1'
    | 'streetAddressLine2'
    | 'sublocality'
    | 'telephoneNumber'
    | 'username'
    | 'password'
    | 'newPassword'
    | 'oneTimeCode'
    | undefined;

  onChangeText?: (nextValue: string) => void;
}

interface EyeAccessoryProps {
  selected: boolean;

  onToggle?: () => void;
}

const EyeAccessory = ({selected, onToggle = () => {}}: EyeAccessoryProps) => (
  <TouchableOpacity onPress={onToggle}>
    <Icon
      style={styles.icon}
      fill="#333"
      name={selected ? 'eye-off-outline' : 'eye-outline'}
    />
  </TouchableOpacity>
);

const TextInput = ({
  label,
  placeholder,
  value,
  accessoryRight,
  secureTextEntry,
  keyboardType,
  textContentType,
  autocapitalize = true,
  onChangeText = () => {},
}: Props) => {
  const [state, setState] = useState({passwordVisible: false});

  const togglePassword = () => {
    setState({passwordVisible: !state.passwordVisible});
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.text}>{label}</Text>}
      <Input
        placeholder={placeholder}
        value={value}
        style={styles.input}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        textContentType={textContentType}
        secureTextEntry={secureTextEntry && !state.passwordVisible}
        autoCapitalize={autocapitalize ? "sentences" : "none"}
        accessoryRight={
          accessoryRight ? (
            accessoryRight
          ) : secureTextEntry ? (
            <EyeAccessory
              selected={state.passwordVisible}
              onToggle={togglePassword}
            />
          ) : undefined
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    color: 'black',
  },
  input: {
    backgroundColor: '#f6f6f6',
    borderColor: '#ddd',
    borderRadius: 10,
  },
  text: {
    marginBottom: 5,
    color: '#000',
    fontSize: 15,
  },
  icon: {
    height: 24,
    width: 24,
  },
});

export default TextInput;
