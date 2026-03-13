
import { __puiMocks } from '@qb/platform-ui';
import { render } from '@testing-library/react-native';
import { AppErrorPage } from './AppErrorPage';

describe('AppErrorPage', () => {
  const { mock_navigateReplace } = __puiMocks;

  it('renders correctly', () => {
    const { getByTestId } = render(
      <AppErrorPage/>
    );

    getByTestId('RnuiTextTid');

    const button = getByTestId('RnuiButtonTid');
    button.props.onPress();
    expect(mock_navigateReplace).toHaveBeenCalledWith('/');
  });
});
