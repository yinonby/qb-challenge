
import type { FC } from 'react';
import { Checkbox, CheckboxProps } from "react-native-paper";

export const RnuiCheckbox: FC<CheckboxProps> = (props) => {
  return <Checkbox testID='CheckboxTid' {...props }/>
};
