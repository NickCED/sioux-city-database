import React from 'react';
import { useState } from 'react';
import { FileUploader } from '@aws-amplify/ui-react';
import FileBrowser from './FileBrowser';

export default function AddImages(props) {
  const [message, setMessage] = useState('');
  const handleOnSuccess = ({ key }) => {
    setMessage(`Successfully uploaded ${key}`);
    console.log('key: ', key);
  };
  return (
    <div
      style={{
        marginTop: '1rem',
      }}
    >
      <FileBrowser />
    </div>
  );
}
