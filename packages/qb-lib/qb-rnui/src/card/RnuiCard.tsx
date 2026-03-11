
import { FC, ReactNode } from 'react';
import { StyleSheet, View, type DimensionValue } from 'react-native';
import { Card } from 'react-native-paper';
import { RnuiImage, RnuiImagePropsT } from '../image/RnuiImage';

export type RnuiCardPropsT = {
  height?: DimensionValue;
  imageProps?: RnuiImagePropsT;
  children?: ReactNode;
  testID?: string;
};

export const RnuiCard: FC<RnuiCardPropsT> = ({
  height,
  imageProps,
  children,
}) => {
  return (
    <Card testID='CardTid' style={[styles.card, { height }]}>
      <View style={styles.imageContainer}>
        {imageProps && <RnuiImage testID='RnuiImageTid' {...imageProps} />}
      </View>

      <View testID='contentTid' style={styles.content}>{children}</View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
  },
  imageContainer: {
    overflow: 'hidden',
    borderTopStartRadius: 12,
    borderTopEndRadius: 12,
  },
  content: {
    padding: 12,
    flexGrow: 1,
  },
});
