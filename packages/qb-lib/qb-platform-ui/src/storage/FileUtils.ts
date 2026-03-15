
import { isWeb } from '../platform/PlatformUtils';

export const exportTextFileAsync = async (fileName: string, textFileContent: string): Promise<void> => {
  if (isWeb()) {
    // WEB: Use Blob and anchor link
    const blob = new Blob([textFileContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } else {
    console.error('Native export is currently not supported');
  }
};
