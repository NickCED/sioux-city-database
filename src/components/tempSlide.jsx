import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Storage } from 'aws-amplify';

const SlideShow = () => {
  const [images, setImages] = useState([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [canStart, setCanStart] = useState(false);
  const [sliderInitialized, setSliderInitialized] = useState(false);
  const sliderRef = React.useRef(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        const imageKeys = await Storage.list('TempSlideShow/');
        const imageUrls = await Promise.all(
          imageKeys.results.slice(1).map(async (key) => {
            const imageUrl = await Storage.get(key.key);
            return { url: imageUrl, title: key.key };
          })
        );
        setImages(imageUrls);
      } catch (error) {
        console.log('Error fetching images: ', error);
      }
    }
    fetchImages();
  }, []);

  useEffect(() => {
    // Add load event listener to each image element
    images.forEach((image) => {
      const img = new Image();
      img.onload = handleImageLoad;
      img.src = image.url;
    });
  }, [images]);

  const handleImageLoad = () => {
    setLoadedCount((count) => count + 1); // Increment loadedCount
  };

  useEffect(() => {
    // Set canStart flag once all images have loaded
    if (loadedCount === images.length) {
      setCanStart(true);
      document.getElementsByClassName('sliderDiv')[0].style.opacity = 1;

      console.log('canStart: ', canStart);
    }
  }, [loadedCount, images]);

  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 5000,
    useTransform: true,
    centerMode: true,
    variableWidth: true,
    initialSlide: 12,
    draggable: false,
    autoplay: true,
    autoplaySpeed: 500,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          variableWidth: false,
        },
      },
    ],
  };

  return (
    <div
      style={{
        opacity: 0,
        transition: 'opacity 2s ease-in-out',
      }}
      className='sliderDiv'
    >
      <Slider ref={sliderRef} {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image.url} alt={image.title} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SlideShow;
