
import { isWeb } from '@qb-rnui/utils/RnuiUtils';
import { type FC } from 'react';
import { type TextStyle } from 'react-native';
import { Button as RnpButton, ButtonProps as RnpButtonProps } from 'react-native-paper';
import { useRnuiContext } from '../theme/RnuiProvider';

export type RnuiButtonPropsT = RnpButtonProps & {
  size?: 'xs' | 'small' | 'medium',
};

export const RnuiButton: FC<RnuiButtonPropsT> = ({
  size,
  mode = 'contained', // default mode
  uppercase = false,  // default PaperButton behavior override
  ...props
}) => {
  const { rnuiStyles } = useRnuiContext();
  let labelStyle: TextStyle | undefined = undefined;
  if (size === 'xs') {
    labelStyle = {
      marginHorizontal: isWeb() ? 8 : 16,
      marginVertical: 8,
      fontSize: 12,
      lineHeight: 16,
    };

    if (rnuiStyles.xsButtonLabelStyle) {
      labelStyle = {
        ...labelStyle,
        ...rnuiStyles.xsButtonLabelStyle,
      }
    };

    if (isWeb()) {
      if (props.icon) {
        labelStyle.paddingHorizontal = 16;
      } else {
        labelStyle.paddingHorizontal = 8;
      }
    };
  }

  return (
    <RnpButton
      testID='btn-tid'
      style={{
        minWidth: size === 'xs' ? 48 : undefined,
        height: size === 'xs' ? 32 : undefined,
        justifyContent: 'center',
      }}
      labelStyle={labelStyle}
      mode={mode}
      uppercase={uppercase}
      {...props}
    />
  );
};
