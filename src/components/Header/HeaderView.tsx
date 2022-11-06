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
  onBackAction?: () => void;
}

const BackIcon = (props: any) => (
  <Icon {...props} fill="#FFFFFF" name="arrow-back" />
);

const HeaderView = ({
  title = 'Fitness App',
  showBackIcon = false,
  onBackAction = () => {},
}: Props) => {
  const renderBackAction = () => {
    if (!showBackIcon) return <></>;
    return <TopNavigationAction icon={BackIcon} onPress={onBackAction} />;
  };

  return (
    <Layout style={styles.container} level="1">
      <TopNavigation
        alignment="center"
        title={props => (
          <Text {...props} style={styles.title}>
            {title}
          </Text>
        )}
        style={styles.header}
        accessoryLeft={renderBackAction}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    backgroundColor: theme['color-primary-500'],
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  icon: {
    color: 'white',
  },
});

export default HeaderView;
