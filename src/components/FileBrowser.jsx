import { Flex, TextField, Button, Text, Heading } from '@aws-amplify/ui-react';
import {
  IoCloudUploadOutline,
  IoPencilOutline,
  IoCloseOutline,
} from 'react-icons/io5';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import { useState, useEffect } from 'react';
import FileSizeDisplay from './FileSizeDisplay';
import { resizeImage } from './ResizeImage';
import { getImages } from './SaveImage';
import './FileBrowser.css';

export default function FileBrowser({
  heading = 'Upload Images',
  placeholder = 'Enter a title to use for the image',
  ...props
}) {
  const componentID = uuidv4();
  const singleFile = props.singleFile || false;
  const [filesList, setFilesList] = useState([]);
  const [deleteFilesList, setDeleteFilesList] = useState([]);
  const inputRef = React.useRef();
  const [newImage, setNewImage] = useState('');
  const [buttonText, setButtonText] = useState('Upload Image');

  useEffect(() => {
    if (props.viewIds) {
      if (props.viewIds.length === 0) return;
      async function getImagesFromS3() {
        const initialFiles = await getImages(props.viewIds);
        if (initialFiles.length > 0) {
          setFilesList(initialFiles);
          props.onViewIds(initialFiles);
        }
      }
      getImagesFromS3();
    }
  }, []);

  const handleDelete = (imageID) => {
    const updatedFilesList = filesList.filter(
      (file) => file.imageID !== imageID
    );
    const updatedDeletedFilesList = filesList.filter(
      (file) => file.imageID === imageID
    );
    setDeleteFilesList(updatedDeletedFilesList);
    setFilesList(updatedFilesList);
    if (updatedFilesList.length === 0 && singleFile) {
      setButtonText('Upload Image');
    }
    props.onDeletedFilesListChange(updatedDeletedFilesList);
    props.onFilesListChange(updatedFilesList);
  };

  const handleEdit = (imageID) => {
    const fileToEdit = filesList.find((file) => file.imageID === imageID);
    const newTitle = prompt('Enter a new title for the image', fileToEdit.name);
    if (newTitle) {
      const updatedFilesList = filesList.map((file) =>
        file.imageID === imageID ? { ...file, name: newTitle } : file
      );
      setFilesList(updatedFilesList);
      props.onFilesListChange(updatedFilesList);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    try {
      const thumbnailBlob = await resizeImage(file, 450, 450, 0.68, false);
      const resizedBlob = await resizeImage(file, 2880, 1620, 0.92);

      const fileID = uuidv4();
      const thumbnailID = uuidv4();

      const newFileSize = resizedBlob.size;

      // Only prompt the user if they haven't entered a title in the secondary text field.
      let imageTitle = inputRef.current.value;
      if (!imageTitle) {
        imageTitle = prompt('Please enter a title for the image', newImage);
      }

      if (imageTitle) {
        const updatedFilesList = [
          ...filesList,
          {
            imageID: fileID,
            name: imageTitle, // Update the name property with the user's input.
            type: file.type,
            originalSize: file.size,
            size: newFileSize,
            blob: resizedBlob,
            thumbnailID: thumbnailID,
            thumbnailBlob: thumbnailBlob,
            useAWS: false,
          },
        ];
        setFilesList(updatedFilesList);
        if (updatedFilesList.length > 0 && singleFile) {
          setButtonText('Thanks!'); // Update the button text to indicate that the user has uploaded an image.

          console.log('Thanks!'); // Log the button text to the console for debugging purposes.
        }
        props.onFilesListChange(updatedFilesList);
        inputRef.current.value = '';
      }

      // Clear the image being uploaded so reuploading the same image works.

      e.target.value = '';
    } catch (error) {
      console.error(error);
      // Handle any errors that might occur here.
    }
  };

  //Handle drag and drop reordering of images

  const [draggingIndex, setDraggingIndex] = useState(null);

  function handleDragStart(e, index) {
    setDraggingIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', null);
  }

  function handleDragEnter(e, index) {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
    Array.from(e.currentTarget.children).forEach(
      (child) => (child.style.pointerEvents = 'none')
    );
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }

  function handleDragLeave(e) {
    e.currentTarget.classList.remove('drag-over');
    Array.from(e.currentTarget.children).forEach(
      (child) => (child.style.pointerEvents = 'auto')
    );
  }

  function handleDrop(e, index) {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');

    const newFilesList = [...filesList];
    const draggedFile = newFilesList[draggingIndex];
    newFilesList.splice(draggingIndex, 1);
    newFilesList.splice(index, 0, draggedFile);
    Array.from(e.currentTarget.children).forEach(
      (child) => (child.style.pointerEvents = 'auto')
    );
    setDraggingIndex(null);

    setFilesList(newFilesList);
    props.onFilesListChange(newFilesList);
  }
  function handleDragEnd(e) {
    setDraggingIndex(null);
  }

  return (
    <div>
      <Heading level={6} marginTop={'1em'}>
        {heading}
      </Heading>

      <Flex direction={'column'}>
        <TextField name='title' ref={inputRef} placeholder={placeholder} />
        <Button
          style={{
            padding: '0',
          }}
        >
          <label
            htmlFor={`files-${componentID}`}
            style={{
              display: 'flex',
              gap: '.5rem',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '.5rem',
              cursor: 'pointer',
              width: '100%',
              height: '100%',
            }}
          >
            <Text>{buttonText}</Text>
            <IoCloudUploadOutline size={'1.5rem'} />
          </label>
          <input
            id={`files-${componentID}`}
            type='file'
            accept='image/*'
            onChange={handleFileChange}
            style={{ display: 'none' }}
            disabled={singleFile && filesList.length > 0}
          />
        </Button>
        {filesList.length > 0 && (
          <Text fontSize={'.65rem'} color={'#96120b'} variation='warning'>
            *NOTE: SIZE WILL BE SMALLER THAN ORIGINAL AS IMAGES ARE
            AUTOMATICALLY RESIZED FOR INTERACTIVE KIOSK DISPLAY.
          </Text>
        )}
        {filesList.length > 1 && (
          <Text fontSize={'1rem'} color={'black'} variation='warning'>
            Drag and drop to reorder images. Click on the pencil icon to edit
            title.
          </Text>
        )}
      </Flex>

      <Flex
        width={'95%'}
        style={{
          overflowX: 'auto',
        }}
      >
        {filesList.map((file, index) => (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
              margin: '.5rem 0 ',
              maxWidth: '30%',
              border: '1px solid #ddd',
              borderRadius: '3px',
              padding: '.5rem',
              opacity: draggingIndex === index ? 0.5 : 1,
              cursor: 'grab',
            }}
            key={file.imageID}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnter={(e) => handleDragEnter(e, index)}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
          >
            <img
              src={
                file.useAWS ? file.thumbnailUrl : URL.createObjectURL(file.blob)
              }
              alt={file.name}
              style={{
                maxHeight: '20vh',
                width: 'auto',
                maxWidth: '100%',
                height: 'auto',
                borderRadius: '3px',
                flex: '0',
              }}
            />
            <Flex
              direction={'column'}
              width={'100%'}
              flex={'1'}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              <Text
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {file.name}
              </Text>
              <Flex justifyContent={'space-between'}>
                <FileSizeDisplay fileSizeInBytes={file.size} />
                <Flex>
                  <IoPencilOutline
                    cursor={'pointer'}
                    onClick={() => handleEdit(file.imageID)}
                    size={'1.25rem'}
                  />
                  <IoCloseOutline
                    cursor={'pointer'}
                    onClick={() => handleDelete(file.imageID)}
                    size={'1.5rem'}
                  />
                </Flex>
              </Flex>
            </Flex>
          </div>
        ))}
      </Flex>
    </div>
  );
}
