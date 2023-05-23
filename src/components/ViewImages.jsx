import { Button, Flex, Text } from '@aws-amplify/ui-react';
import {
  IoCloseOutline,
  IoSearch,
  IoChevronBack,
  IoChevronForward,
} from 'react-icons/io5';
import { useEffect, useState, useRef } from 'react';
import './ViewImages.css';

export default function ViewImages(props) {
  const [height, setHeight] = useState('90%');
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [currentImageName, setCurrentImageName] = useState('');
  const popup = document.getElementById('imageModal');

  const changeImage = (image, index) => {
    setCurrentImageName(image.name);
    setCurrentImageUrl(image.url);
    popup.showModal();
  };
  return (
    <Flex
      className='view-images-container'
      gap='1rem'
      style={{
        width: '100%',
        flex: '1 1 auto',
        justifyContent: 'flex-start',
        alignItems: 'center',
        overflowX: 'auto',
        padding: '1rem',
        minWidth: '100%',
      }}
    >
      <dialog
        id='imageModal'
        onClick={(e) => {
          const target = popup.getBoundingClientRect();
          if (
            e.clientX < target.left ||
            e.clientX > target.right ||
            e.clientY < target.top ||
            e.clientY > target.bottom
          ) {
            popup.close();
            setCurrentImageName('');
            setCurrentImageUrl('');
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        <Flex className='image-modal-container'>
          <Button
            size='small'
            border={'none'}
            className='close-icon'
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              popup.close();
            }}
            style={{
              zIndex: 100,
              position: 'absolute',
              top: '0.5rem',
              right: '0.5rem',
              cursor: 'pointer',
              margin: '0.5rem 0.5rem 0 0',
            }}
          >
            <IoCloseOutline size={'1.5rem'} pointerEvents={'none'} />
          </Button>
          <Button
            border={'none'}
            className='back-icon'
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const index = props.images.findIndex(
                (image) => image.url === currentImageUrl
              );
              if (index > 0) {
                const image = props.images[index - 1];
                setCurrentImageName(image.name);
                setCurrentImageUrl(image.url);
              }
            }}
            style={{
              zIndex: 100,
              position: 'absolute',
              top: '50%',
              left: '0.5rem',
              cursor: 'pointer',
              margin: '0.5rem 0.5rem 0 0',
            }}
          >
            <IoChevronBack size={'1.5rem'} pointerEvents={'none'} />
          </Button>
          <Button
            border={'none'}
            className='forward-icon'
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const index = props.images.findIndex(
                (image) => image.url === currentImageUrl
              );
              if (index < props.images.length - 1) {
                const image = props.images[index + 1];
                setCurrentImageName(image.name);
                setCurrentImageUrl(image.url);
              }
            }}
            style={{
              zIndex: 100,
              position: 'absolute',
              top: '50%',
              right: '0.5rem',
              cursor: 'pointer',
              margin: '0.5rem 0.5rem 0 0',
            }}
          >
            <IoChevronForward size={'1.5rem'} pointerEvents={'none'} />
          </Button>

          <Flex
            flex={0}
            height={height}
            width={'100%'}
            justifyContent={'center'}
          >
            <img
              id='imageModalImage'
              src={currentImageUrl}
              alt={currentImageUrl}
              style={{
                height: { height },
                width: 'auto',
                overflow: 'auto',
              }}
            />
          </Flex>
          <Text
            style={{
              zIndex: 100,
              fontSize: '1.5rem',
              fontWeight: 'bold',
              textAlign: 'center',
              flex: '0 0 auto',
              width: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
            className='image-modal-name'
          >
            {currentImageName}
          </Text>
        </Flex>
      </dialog>
      {props.images.map((image, index) => (
        <img
          key={index}
          src={image.thumbnailUrl}
          alt={image.name}
          style={{
            height: '100%',
            width: 'auto',
            cursor: 'pointer',
            imageOrientation: 'auto',
            boxSizing: 'border-box',
            borderRadius: '3px',
          }}
          onClick={() => changeImage(image, index)}
        />
      ))}
    </Flex>
  );
}
