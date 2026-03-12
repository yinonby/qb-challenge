
import type { TestableComponentT } from '@qb-rnui/types/ComponentTypes';
import * as React from "react";
import { Pressable, View } from "react-native";
import { RadioButton, useTheme } from "react-native-paper";

export type RnuiRadioButtonGroupProps<T extends string> = TestableComponentT & {
  optionKeys: T[],
  selectedOptionKey: T | undefined,
  onChange: (optionKey: T) => void,
  renderOption: (optionKey: T) => React.ReactNode,
  noRadioButtons?: boolean,
  noBorder?: boolean,
}

export function RnuiRadioButtonGroup<T extends string>({
  optionKeys,
  selectedOptionKey,
  onChange,
  renderOption,
  noRadioButtons,
  noBorder,
}: RnuiRadioButtonGroupProps<T>) {
  const theme = useTheme();

  const getViewStyle = (optionKey: T) => {
    if (noBorder) {
      return undefined;
    }
    if (optionKey === selectedOptionKey) {
      return {
        borderColor: theme.colors.outline,
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 4,
        paddingVertical: 4,
      }
    } else {
      return {
        paddingHorizontal: 5,
        paddingVertical: 5,
      }
    }
  }

  return (
    <View>
      {optionKeys.map((e, index) =>
        <View key={index}>
          <Pressable testID='PressableTid' onPress={() => {onChange(e)}} style={{marginVertical: 2}}>
            <View
              testID={e.toString()}
              style={[{flexDirection: "row", alignItems: "center"}, getViewStyle(e)]}
            >
              {!noRadioButtons &&
                <RadioButton
                  testID='RadioButtonTid'
                  value={e.toString()}
                  status={selectedOptionKey === e ? "checked" : "unchecked" }
                  onPress={() => { onChange(e) }}
                />
              }
              {renderOption(e)}
            </View>
          </Pressable>
        </View>
      )}
    </View>
  );
};
