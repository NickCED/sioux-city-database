import { useEffect, useState } from 'react';
import { Flex, Button, Text, Card } from '@aws-amplify/ui-react';
import { getImages } from './SaveImage';

export default function DisplayCurrentImages({ imageIds }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const images = await getImages(imageIds);
      setImages(images);
      console.log('images : ', images);
    };
    fetchImages();
  }, [imageIds]);

  return (
    <Flex>
      {images.map((image) => (
        <Card key={image.id}>
          <Image src={image.src} alt={image.alt}>
            {' '}
          </Image>
        </Card>
      ))}
    </Flex>
  );
}
