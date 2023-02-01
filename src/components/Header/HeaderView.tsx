import React from 'react';
import {StyleSheet} from 'react-native';
import {
  Layout,
  TopNavigation,
  Icon,
  TopNavigationAction,
  Text,
} from '@ui-kitten/components';
import {default as theme} from '../../../custom-theme.json';

interface Props {
  title?: string;
  showBackIcon?: boolean;
  color?: string;
  backgroundColor?: string;
  onBackAction?: () => void;
}

const BackIcon = (props: any) => <Icon {...props} name="arrow-back" />;

const HeaderView = ({
  title = 'Fitness App',
  showBackIcon = false,
  color = 'white',
  backgroundColor = theme['color-primary-500'],
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
          <Text {...props} style={[styles.title, {color}]}>
            {title}
          </Text>
        )}
        style={{backgroundColor}}
        accessoryLeft={renderBackAction}
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
    fontWeight: '700',
  },
});

export default HeaderView;
