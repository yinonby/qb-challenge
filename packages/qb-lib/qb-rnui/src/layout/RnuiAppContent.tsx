
import React, { ReactElement } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useRnuiContext } from '../theme/RnuiProvider';

export const defaultContentPaddingHorizontal = 32;

export type RnuiAppContentPropsT = {
  children: ReactElement | ReactElement[],
  testID?: string,
};

export const RnuiAppContent: React.FC<RnuiAppContentPropsT> = ({ children }) => {
  const { rnuiStyles } = useRnuiContext();
  const theme = useTheme();

  return (
    <ScrollView
      testID='ScrollViewTid'
      style={[
        { backgroundColor: theme?.colors.background }, // must set backgroundColor manually
        styles.container,
        rnuiStyles.content?.paddingHorizontal ?
          { paddingHorizontal: rnuiStyles.content.paddingHorizontal } : styles.paddingHorizontal,
        rnuiStyles.content?.paddingVertical ?
          { paddingVertical: rnuiStyles.content.paddingVertical } : styles.paddingVertical,
      ]}
    >
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: '100%',
  },
  paddingHorizontal: {
    paddingHorizontal: defaultContentPaddingHorizontal,
  },
  paddingVertical: {
    paddingVertical: 12,
  },
});
