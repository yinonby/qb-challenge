
import type { TestableComponentT } from '@qb-rnui/types/ComponentTypes';
import { FC, type PropsWithChildren } from 'react';
import { StyleSheet, View, type DimensionValue } from 'react-native';
import { Card } from 'react-native-paper';
import { RnuiImage, RnuiImagePropsT } from '../image/RnuiImage';

export type RnuiCardPropsT = TestableComponentT & {
  height?: DimensionValue;
  imageProps?: RnuiImagePropsT;
  borderRadius?: number,
  noPadding?: boolean,
};

export const RnuiCard: FC<PropsWithChildren<RnuiCardPropsT>> = ({
  height,
  imageProps,
  borderRadius = 12,
  noPadding = false,
  children,
}) => {
  const cardStyle = {
    borderRadius,
  }
  const imageContainerStyle = {
    borderTopStartRadius: borderRadius,
    borderTopEndRadius: borderRadius,
  }

  return (
    <Card testID='CardTid' style={[styles.card, cardStyle, { height }]}>
      {imageProps &&
        <View style={[styles.imageContainer, imageContainerStyle]}>
          <RnuiImage testID='RnuiImageTid' {...imageProps} />
        </View>
      }

      <View testID='contentTid' style={[styles.content, !noPadding && styles.padding]}>{children}</View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
  },
  imageContainer: {
    overflow: 'hidden',
  },
  content: {
    flexGrow: 1,
  },
  padding: {
    padding: 12,
  },
});
