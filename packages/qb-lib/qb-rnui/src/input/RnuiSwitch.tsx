
import { type FC } from 'react';
import { SwitchProps as RnpSwitchProps, Switch } from 'react-native-paper';

export type RnuiSwitchPropsT = RnpSwitchProps & {
  isSwitchOn: boolean,
  onToggleSwitch: (value: boolean) => void,
}

export const RnuiSwitch: FC<RnuiSwitchPropsT> = (props) => {
  const { isSwitchOn, onToggleSwitch } = props;

  return <Switch testID='SwitchTid' value={isSwitchOn} onValueChange={onToggleSwitch} />;
};
