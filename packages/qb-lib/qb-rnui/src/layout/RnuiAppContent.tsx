
import React, { ReactElement } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useRnuiContext } from '../theme/RnuiProvider';

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
        rnuiStyles.content?.padding ? { padding: rnuiStyles.content.padding } : styles.padding,
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
  padding: {
    padding: 24,
  },
});
