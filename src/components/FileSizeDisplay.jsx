import React from 'react';
import { Text } from '@aws-amplify/ui-react';

export default function FileSizeDisplay(props) {
  function formatFileSize(fileSizeInBytes) {
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB'];
    let fileSizeInKB = fileSizeInBytes / 1024;
    let unitIndex = 0;

    while (fileSizeInKB > 1024 && unitIndex < units.length - 1) {
      fileSizeInKB /= 1024;
      unitIndex++;
    }

    return fileSizeInKB.toFixed(1) + ' ' + units[unitIndex + 1];
  }
  const fileSizeString = formatFileSize(props.fileSizeInBytes);

  return <Text>{fileSizeString}</Text>;
}
