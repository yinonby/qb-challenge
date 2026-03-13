
import { type FC } from 'react';
import { Pressable, View } from 'react-native';
import type { PlatformUiLinkPropsT } from '../types/PlatformUiLinkTypes';
import { PlatformUiExpoLink } from './PlatformUiExpoLink';

export const PlatformUiLink: FC<PlatformUiLinkPropsT> = ({
  addPressable = false,
  testID,
  children,
  ...rest
}) => {
  return (
    <View testID={testID}>
      <PlatformUiExpoLink {...rest} >
        {addPressable ?
          <Pressable testID='PressableTid'>
            {children}
          </Pressable> :
          children
        }
      </PlatformUiExpoLink>
    </View>
  );
};
