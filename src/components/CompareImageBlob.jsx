import React, { useState, useEffect } from 'react';

const CompareImageBlob = ({ originalImageSrc, blob }) => {
  const [originalImage, setOriginalImage] = useState(null);
  const [blobImage, setBlobImage] = useState(null);

  useEffect(() => {
    // Create a new Image object for the original image
    const originalImg = new Image();
    originalImg.src = originalImageSrc;
    originalImg.onload = () => {
      setOriginalImage(originalImg);
    };

    // Create a new Image object for the Blob image
    const blobImg = new Image();
    blobImg.src = URL.createObjectURL(blob);
    blobImg.onload = () => {
      setBlobImage(blobImg);
    };
  }, [originalImageSrc, blob]);

  return (
    <div style={{ display: 'flex' }}>
      {originalImage && <img src={originalImage.src} alt='Original Image' />}
      {blobImage && <img src={blobImage.src} alt='Blob Image' />}
    </div>
  );
};

export default CompareImageBlob;
