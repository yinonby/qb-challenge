
import { fireEvent, render } from '@testing-library/react-native';
import * as ReactNativepaper from 'react-native-paper';
import { RnuiRadioButtonGroup } from './RnuiRadioButtonGroup';

// mocks

jest.mock('react-native-paper', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    RadioButton: View,
    useTheme: jest.fn(),
  };
});

jest.mock('../icon/RnuiMaterialIcon', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    RnuiMaterialIcon: View,
  }
});

// tests

describe('RnuiRadioButtonGroup', () => {
  const spy_useTheme = jest.spyOn(ReactNativepaper, 'useTheme');
  spy_useTheme.mockReturnValue({ colors: { outline: 'red' }});
  const optionKeys = ['a', 'b', 'c'];
  const renderOption = (key: string) => <>{key}</>;

  it('renders all options', () => {
    const { getByTestId } = render(
      <RnuiRadioButtonGroup<string>
        optionKeys={optionKeys}
        selectedOptionKey={'a'}
        onChange={jest.fn()}
        renderOption={renderOption}
      />
    );

    expect(getByTestId('a')).toBeTruthy();
    expect(getByTestId('b')).toBeTruthy();
    expect(getByTestId('c')).toBeTruthy();
  });

  it('calls onChange when Pressable is pressed', () => {
    const onChange = jest.fn();

    const { getAllByTestId } = render(
      <RnuiRadioButtonGroup<string>
        optionKeys={optionKeys}
        selectedOptionKey={'a'}
        onChange={onChange}
        renderOption={renderOption}
      />
    );

    const pressables = getAllByTestId('PressableTid');

    fireEvent.press(pressables[1]);

    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('calls onChange when RadioButton is pressed', () => {
    const onChange = jest.fn();

    const { getAllByTestId } = render(
      <RnuiRadioButtonGroup<string>
        optionKeys={optionKeys}
        selectedOptionKey={'a'}
        onChange={onChange}
        renderOption={renderOption}
      />
    );

    const radios = getAllByTestId('RadioButtonTid');

    fireEvent.press(radios[2]);

    expect(onChange).toHaveBeenCalledWith('c');
  });

  it('hides radio buttons when noRadioButtons is true', () => {
    const { queryAllByRole } = render(
      <RnuiRadioButtonGroup<string>
        optionKeys={optionKeys}
        selectedOptionKey={'a'}
        onChange={jest.fn()}
        renderOption={renderOption}
        noRadioButtons
      />
    );

    expect(queryAllByRole('radio').length).toBe(0);
  });

  it('applies selected border style', () => {
    const { getByTestId } = render(
      <RnuiRadioButtonGroup<string>
        optionKeys={optionKeys}
        selectedOptionKey={'b'}
        onChange={jest.fn()}
        renderOption={renderOption}
      />
    );

    const selectedOption = getByTestId('b').parent;

    expect(selectedOption.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          borderColor: 'red',
          borderWidth: 1,
        }),
      ])
    );
  });

  it('does not apply border style when noBorder is true', () => {
    const { getByTestId } = render(
      <RnuiRadioButtonGroup<string>
        optionKeys={optionKeys}
        selectedOptionKey={'b'}
        onChange={jest.fn()}
        renderOption={renderOption}
        noBorder
      />
    );

    const option = getByTestId('b').parent;

    expect(option?.props.style).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          borderWidth: 1,
        }),
      ])
    );
  });
});
