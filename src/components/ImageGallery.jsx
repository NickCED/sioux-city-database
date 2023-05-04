import React, { useState } from 'react';
import styled from 'styled-components';
import { IoChevronForward, IoChevronBack } from 'react-icons/io5';

const GalleryContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  height: calc(100% - 2rem);
  width: calc(100% - 2rem);
`;

const MainImage = styled.img`
  width: 100%;
  max-height: 85%;
  object-fit: contain;
  margin: auto;
`;

const Thumbnails = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15%;
  width: 90%;
  margin: auto;
`;

const Thumbnail = styled.img`
  width: ${({ thumbnailSize }) => thumbnailSize}%;
  max-height: 100%;
  border-radius: ${({ borderRadius }) => borderRadius}px;
  margin: 0 0.5rem;
  opacity: ${({ active }) => (active ? 1 : 0.7)};
  cursor: pointer;
`;

const ArrowButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
`;

const ImageGallery = ({
  images,
  numThumbnails = 5,
  displayThumbnails = true,
  borderRadius = 0,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const thumbnailSize = 100 / numThumbnails;
  console.log(images);
  const changeImage = (direction) => {
    const newIndex = currentImageIndex + direction;
    if (newIndex >= 0 && newIndex < images.length) {
      setCurrentImageIndex(newIndex);
    }
  };

  return (
    <GalleryContainer>
      <MainImage
        src={images[currentImageIndex].thumbnailUrl}
        alt={images[currentImageIndex].name}
      />
      {displayThumbnails && (
        <Thumbnails>
          <ArrowButton onClick={() => changeImage(-1)}>
            <IoChevronBack />
          </ArrowButton>
          {images.map((image, index) => (
            <Thumbnail
              key={image.id}
              src={image.thumbnailUrl}
              alt={image.name}
              thumbnailSize={thumbnailSize}
              borderRadius={borderRadius}
              active={index === currentImageIndex}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
          <ArrowButton onClick={() => changeImage(1)}>
            <IoChevronForward />
          </ArrowButton>
        </Thumbnails>
      )}
    </GalleryContainer>
  );
};

export default ImageGallery;
