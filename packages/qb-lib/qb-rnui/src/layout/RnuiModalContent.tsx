
import { useRnuiContext } from '@qb-rnui/theme/RnuiProvider';
import type { TestableComponentT } from '@qb-rnui/types/ComponentTypes';
import { type FC, type PropsWithChildren } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Surface } from 'react-native-paper';
import { RnuiMaterialIcon } from '../icon/RnuiMaterialIcon';

type RnuiModalContentPropsT = TestableComponentT & {
  includeCloseButton ?: boolean,
  onClose ?: () => void,
  notScrollable ?: boolean,
  closeButtomSize?: number,
}

export const RnuiModalContent: FC<PropsWithChildren<RnuiModalContentPropsT>> = (props) => {
  // props
  const {
    includeCloseButton,
    onClose,
    notScrollable,
    closeButtomSize = 20,
    children,
  } = props;

  // hooks
  const { rnuiStyles } = useRnuiContext();

  // variables
  const closeButtomMargin = 4;
  const keyboardShouldPersistTaps = 'always'; // this is required so the scroll view doesn't handle any taps
  const appContentPaddingHorizontal: number = rnuiStyles.content?.padding || 24;

  return (
    <Surface
      elevation={2}
      style={[
        styles.surface,
        { height: '100%' },
        includeCloseButton && { paddingVertical: closeButtomSize + closeButtomMargin },
      ]}
    >
      {notScrollable ?
        <View
          testID='ContentViewTid'
          style={[
            styles.content,
            { paddingHorizontal: appContentPaddingHorizontal },
          ]}
        >
          {children}
        </View> :
        <View style={[
          { height: '100%', width: '100%' },
        ]}>
          <ScrollView
            testID='ScrollViewTid'
            keyboardShouldPersistTaps={keyboardShouldPersistTaps}
            showsVerticalScrollIndicator
            persistentScrollbar
            style={[
              styles.content,
              { paddingHorizontal: appContentPaddingHorizontal },
            ]}
          >
            {children}
          </ScrollView>
        </View>
      }

      {includeCloseButton &&
        <View style={{ position: 'absolute', top: 0, end: 0 }}>
          <Pressable testID='PressableTid' onPress={onClose} style={{ margin: closeButtomMargin }} >
            <RnuiMaterialIcon name='close' size={closeButtomSize} />
          </Pressable>
        </View>
      }
    </Surface>
  );
};

const styles = StyleSheet.create({
  surface: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 16,
  },
  content: {
    width: '100%',
  },
});
