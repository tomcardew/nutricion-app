import React from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import CommentTextBox from '../../../../../../components/CommentTextBox';
import {ExerciseComment} from '../../../../../../models/Patients';
import EmptyView from '../../../../../../components/EmptyView';
import CommentItem from '../../../../../../components/CommentItem';
import {getRandomInt} from '../../../../../../utils/Utils';

interface Props {
  notes?: ExerciseComment[];
  username?: string;

  commentTextPrompt?: string;
  onChangeText?: (nextValue: string) => void;
  didPressSend?: () => void;
}

const PatientExerciseCommentsView = ({
  notes = [],
  username = '',
  commentTextPrompt = '',
  onChangeText = () => {},
  didPressSend = () => {},
}: Props) => {
  const tabHeight = useBottomTabBarHeight();

  return (
    <View style={[styles.container, {paddingBottom: tabHeight + 8}]}>
      <FlatList
        inverted
        data={notes.slice().reverse()}
        ListEmptyComponent={
          <EmptyView message="No hay comentarios para mostrar" />
        }
        contentContainerStyle={{paddingTop: 10}}
        renderItem={({item}) => (
          <CommentItem
            owner={item.Nombre}
            comment={item.nota}
            isCurrentUser={item.Nombre === username}
            isPrecededByOwn={item.isPrecededByOwn}
          />
        )}
        keyExtractor={item =>
          `patient-exercise-comment-${item.nota}-${getRandomInt(0, 1000)}`
        }
      />
      <CommentTextBox
        value={commentTextPrompt}
        onChangeText={onChangeText}
        didPressSend={didPressSend}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default PatientExerciseCommentsView;
