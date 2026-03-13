import { RnuiImage, type TestableComponentT } from '@qb/rnui';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type AirbnbImageGridPropsT = TestableComponentT & {
  images: string[];
  height?: number;
  spacing?: number;
  borderRadius?: number;
};

export const AirbnbImageGrid: React.FC<AirbnbImageGridPropsT> = ({
  images,
  height = 320,
  spacing = 6,
  borderRadius = 16,
}) => {
  const isAtLeastFive = images.length >= 5;
  const isAtLeastThree = images.length >= 3;
  const isAtLeastTwo = images.length >= 2;

  const [img1, img2, img3, img4, img5] = images;

  return (
    <View
      style={[
        styles.container,
        { height, borderRadius, gap: spacing },
      ]}
    >
      {/* LEFT IMAGE */}
      <View
        style={[
          styles.left,
          { flex: isAtLeastFive ? 1 : isAtLeastThree ? 2 : 1 },
        ]}
      >
        <RnuiImage testID='Image_1' imageSource={img1} height={height} />
      </View>

      {/* RIGHT SIDE */}
      {isAtLeastTwo &&
        <View style={[styles.right, { flex: 1, gap: spacing }]}>
          {isAtLeastFive ? (
            <>
              <View style={[styles.row, { gap: spacing }]}>
                <View style={{ flex: 1 }}>
                  <RnuiImage
                    testID='Image_2_of_5'
                    imageSource={img2}
                    height={(height - spacing) / 2}
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <RnuiImage
                    testID='Image_3_of_5'
                    imageSource={img3}
                    height={(height - spacing) / 2}
                  />
                </View>
              </View>

              <View style={[styles.row, { gap: spacing }]}>
                <View style={{ flex: 1 }}>
                  <RnuiImage
                    testID='Image_4_of_5'
                    imageSource={img4}
                    height={(height - spacing) / 2}
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <RnuiImage
                    testID='Image_5_of_5'
                    imageSource={img5}
                    height={(height - spacing) / 2}
                  />
                </View>
              </View>
            </>
          ) : isAtLeastThree ? (
            <>
              <RnuiImage
                testID='Image_2_of_3'
                imageSource={img2}
                height={(height - spacing) / 2}
              />
              <RnuiImage
                testID='Image_3_of_3'
                imageSource={img3}
                height={(height - spacing) / 2}
              />
            </>
            ) : (
              <>
                <RnuiImage
                  testID='Image_2_of_2'
                  imageSource={img2}
                  height={height}
                />
              </>
            )}
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    overflow: 'hidden',
    width: '100%',
  },

  left: {
    overflow: 'hidden',
  },

  right: {
    justifyContent: 'space-between',
  },

  row: {
    flexDirection: 'row',
    flex: 1,
  },
});