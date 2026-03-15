import { isWeb } from '../platform/PlatformUtils';
import { exportTextFileAsync } from './FileUtils';

jest.mock('../platform/PlatformUtils', () => ({
  isWeb: jest.fn(),
}));

describe('exportTextFile', () => {
  const fileName = 'test.csv';
  const fileContent = 'id,name\n1,Test';
  const mock_isWeb = isWeb as jest.Mock;

  beforeEach(() => {
    jest.resetAllMocks();

    // Mock isWeb
    mock_isWeb.mockReturnValue(true);

    // Mock Blob entirely (dummy class)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global as any).Blob = class {
      constructor() {}
    };

    // Mock URL

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global as any).URL = {
      createObjectURL: jest.fn().mockReturnValue('blob://url'),
      revokeObjectURL: jest.fn(),
    };

    // Mock document

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global as any).document = {
      createElement: jest.fn().mockReturnValue({
        href: '',
        setAttribute: jest.fn(),
        click: jest.fn(),
      }),
      body: {
        appendChild: jest.fn(),
        removeChild: jest.fn(),
      },
    };
  });

  it('should create a blob and trigger download on web', async () => {
    await exportTextFileAsync(fileName, fileContent);

    expect(global.Blob).toBeDefined();
    expect(global.URL.createObjectURL).toHaveBeenCalled();
    expect(global.document.createElement).toHaveBeenCalledWith('a');
    expect(global.document.body.appendChild).toHaveBeenCalled();
    expect(global.document.body.removeChild).toHaveBeenCalled();
    expect(global.URL.revokeObjectURL).toHaveBeenCalledWith('blob://url');
  });

  it('should log error when not web', async () => {
    mock_isWeb.mockReturnValue(false);
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});

    await exportTextFileAsync(fileName, fileContent);

    expect(consoleErrorMock).toHaveBeenCalledWith('Native export is currently not supported');

    consoleErrorMock.mockRestore();
  });
});
