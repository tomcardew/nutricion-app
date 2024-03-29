import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Layout,
  TopNavigation,
  Icon,
  TopNavigationAction,
} from '@ui-kitten/components';
import {default as theme} from '../../../custom-theme.json';
import Text from '../Text';
import {FontWeight} from '../../models/Common';

interface Props {
  title?: string;
  subtitle?: string;
  showBackIcon?: boolean;
  color?: string;
  backgroundColor?: string;
  rightAccessory?: JSX.Element;
  onBackAction?: () => void;
}

const BackIcon = (props: any) => <Icon {...props} name="arrow-back" />;

const HeaderView = ({
  title = 'Fitness App',
  subtitle,
  showBackIcon = false,
  color = 'white',
  backgroundColor = theme['color-primary-500'],
  rightAccessory,
  onBackAction = () => {},
}: Props) => {
  const renderBackAction = () => {
    if (!showBackIcon) return <></>;
    return (
      <TopNavigationAction
        icon={<BackIcon fill={color} />}
        onPress={onBackAction}
      />
    );
  };

  return (
    <Layout style={styles.container} level="1">
      <TopNavigation
        alignment="center"
        title={props => (
          <View>
            <Text weight={FontWeight.SemiBold} style={[styles.title, {color}]}>
              {title}
            </Text>
            {subtitle && (
              <Text style={[styles.subtitle, {color}]}>{subtitle}</Text>
            )}
          </View>
        )}
        style={{backgroundColor}}
        accessoryLeft={renderBackAction}
        accessoryRight={rightAccessory}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: -5,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default HeaderView;
