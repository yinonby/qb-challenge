
import { useGenericStyles } from '@qb-dashboard-ui/types/GenericStyles';
import { RnuiIconButton, RnuiText, type TestableComponentT } from '@qb/rnui';
import React, { type FC } from 'react';
import { View } from 'react-native';

type PaginationControlPropsT = TestableComponentT & {
  totalItemsNum: number,
  curPage: number,
  curPageItemsNum: number,
  isLastPage: boolean,
  itemsPerPage: number,
  onPrev: () => void,
  onNext: () => void,
}

export const PaginationControl: FC<PaginationControlPropsT> = (props) => {
  const { totalItemsNum, curPage, curPageItemsNum, isLastPage, itemsPerPage, onPrev, onNext } = props;
  const genericStyles = useGenericStyles();
  const startIdx = curPage * itemsPerPage;
  const endIdx = startIdx + curPageItemsNum;

  const handlePressNext = (): void => {
    onNext();
  }

  const handlePressPrev = (): void => {
    onPrev();
  };

  return (
    <View style={genericStyles.flexRow}>
      <RnuiIconButton
        testID='PrevButtonTid'
        icon='arrow-left'
        size='xs'
        disabled={curPage === 0}
        onPress={handlePressPrev}
        style={{ marginHorizontal: 0 }}
      />

      <RnuiText>{`${startIdx + 1}-${endIdx} / ${totalItemsNum}`}</RnuiText>

      <RnuiIconButton
        testID='NextButtonTid'
        icon='arrow-right'
        size='xs'
        disabled={isLastPage}
        onPress={handlePressNext}
        style={{ marginHorizontal: 0 }}
      />
    </View>
  );
};
