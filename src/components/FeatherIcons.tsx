import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface Props {
  name: string;
  style: any;
}

export const FeatherIconsPack = {
  name: 'feather',
  icons: createIconsMap(),
};

function createIconsMap() {
  return new Proxy(
    {},
    {
      get(target, name) {
        return IconProvider(name);
      },
    },
  );
}

const IconProvider = (name: any) => ({
  toReactElement: (props: any) => FeatherIcon({name, ...props}),
});

const FeatherIcon = ({name, style}: Props) => {
  const {height, tintColor, ...iconStyle} = StyleSheet.flatten(style);
  return <Icon name={name} size={height} color={tintColor} style={iconStyle} />;
};
