
import { isIos } from '@qb-rnui/utils/RnuiUtils';
import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Checkbox, CheckboxProps, useTheme } from "react-native-paper";

export const RnuiCheckbox: FC<CheckboxProps> = (props) => {
  const theme = useTheme();

  if (!isIos()) {
    return <Checkbox testID='CheckboxTid' {...props} />;
  }

  // make sure that on ios there is border
  return (
    <View style={styles.container} >
      <View
        style={[styles.border, { borderColor: theme.colors.outline }]}
      />
      <View style={[styles.checkboxContainer]}>
        <Checkbox testID='IosCheckboxTid' {...props}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 36,
    height: 36,
    padding: 6,
    position: 'relative',
  },
  border: {
    borderWidth: 2,
    borderRadius: 4,
    width: 24,
    height: 24,
  },
  checkboxContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 36,
    height: 36,
  },
});
