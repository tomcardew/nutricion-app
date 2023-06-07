import {Icon} from '@ui-kitten/components';
import React from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import {FontWeight} from '../../models/Common';
import {theme} from '../../utils/Utils';
import Text from '../Text';

interface Props {
  title?: string;
  padding?: number;
  children?: JSX.Element | JSX.Element[] | any;
  iconName?: string;
  actionTitle?: string;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  onActionPress?: () => void;
}

const SimpleCard = ({
  title,
  padding = 10,
  children,
  iconName,
  actionTitle,
  style,
  contentStyle,
  onActionPress = () => {},
}: Props) => {
  return (
    <View style={[styles.container, style]}>
      {title && (
        <View style={styles.titleContainer}>
          {iconName && (
            <Icon
              style={{width: 18, height: 18, marginRight: 5, marginTop: -1}}
              name={iconName}
            />
          )}
          <Text weight={FontWeight.Bold} style={styles.title}>
            {title}
          </Text>
          {actionTitle && (
            <TouchableOpacity style={styles.action} onPress={onActionPress}>
              <View style={styles.action}>
                <Text weight={FontWeight.SemiBold} style={styles.actionTitle}>
                  {actionTitle}
                </Text>
                <Icon
                  fill={theme['color-primary-600']}
                  name="arrow-ios-forward-outline"
                  style={styles.icon}
                />
              </View>
            </TouchableOpacity>
          )}
        </View>
      )}
      <View style={[{padding}, contentStyle]}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    elevation: 3,
    borderRadius: 6,
    overflow: 'hidden',
  },
  titleContainer: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#F4F4F4',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    color: 'black',
    textTransform: 'uppercase',
    fontSize: 15,
  },
  action: {
    marginLeft: 'auto',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  actionTitle: {
    color: theme['color-primary-600'],
  },
  icon: {
    marginLeft: -2,
    height: 20,
    width: 20,
    marginTop: -2,
  },
});

export default SimpleCard;
