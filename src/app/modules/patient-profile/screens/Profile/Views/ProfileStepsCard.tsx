import React, {useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  Dimensions,
  Animated,
} from 'react-native';
import SimpleCard from '../../../../../../components/Cards/SimpleCard';
import Text from '../../../../../../components/Text';
import {FontWeight} from '../../../../../../models/Common';
import {theme} from '../../../../../../utils/Utils';

interface Props {
  count?: number;
  goal?: number;
  simple?: boolean;
  style?: StyleProp<ViewStyle>;
}

const ProfileStepsCard = ({count = 0, simple, goal = 5000, style}: Props) => {
  const widthAnim = useRef(new Animated.Value(0)).current;
  const currentValue = (count * barWidth) / goal;
  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: currentValue,
      duration: 1500,
      useNativeDriver: false,
      delay: 1000,
    }).start();
  }, [count]);

  const innerBody = () => (
    <View>
      <View style={styles.contentContainer}>
        <Animated.View style={[styles.progressBar, {width: widthAnim}]}>
          {currentValue > 50 && (
            <Text
              numberOfLines={1}
              weight={FontWeight.Bold}
              style={styles.stepsText}>
              {count}
            </Text>
          )}
        </Animated.View>
      </View>
      <View style={styles.textsContainer}>
        {currentValue <= 50 && <Text>Actual: {count} pasos</Text>}
        <Text>Meta: {goal} pasos</Text>
      </View>
    </View>
  );

  if (simple) {
    return (
      <View style={[styles.container, style]}>
        <Text
          weight={FontWeight.Bold}
          style={{color: theme['color-primary-700'], fontSize: 18}}>
          Pasos
        </Text>
        {innerBody()}
      </View>
    );
  }
  return (
    <SimpleCard title="Pasos" style={[styles.container, style]}>
      {innerBody()}
    </SimpleCard>
  );
};

const barWidth = Dimensions.get('window').width - 80;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    width: barWidth,
    height: 30,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: theme['color-primary-200'],
    backgroundColor: theme['color-primary-100'],
    marginTop: 20,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  progressBar: {
    height: 30,
    borderRadius: 30,
    backgroundColor: theme['color-primary-500'],
    minWidth: 30,
    maxWidth: barWidth,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
  textsContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  stepsText: {
    color: 'white',
  },
});

export default ProfileStepsCard;
