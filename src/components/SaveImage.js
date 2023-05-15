import { Storage } from 'aws-amplify';
import { getImage } from '../graphql/queries';
import { createImage, updateImage, deleteImage } from '../graphql/mutations';
import { API } from 'aws-amplify';

//=======================================================
//Save Images
//=======================================================
export async function saveImages(images, location = 'Images', user) {
  const imageIds = [];

  if (images) {
    const imageOperations = [];

    for (const image of images) {
      if (image.useAWS) {
        await API.graphql({
          query: updateImage,
          variables: {
            input: {
              imageID: image.imageID,
              name: image.name,
            },
          },
        });
        imageIds.push(image.imageID);
        continue;
      }
      const {
        imageID,
        name,
        originalSize,
        size,
        type,
        blob,
        thumbnailID,
        thumbnailBlob,
      } = image;
      const key = `${location}/${imageID}`;
      const thumbnailKey = `${location}/${thumbnailID}`;

      imageOperations.push(
        Storage.put(key, blob, {
          contentType: type,
          cacheControl: 'max-age=2592000',
        })
          .then((result) => {
            imageIds.push(imageID);
            console.log('img uploaded : ', result);
          })
          .catch((err) => {
            console.log('error uploading image : ', err);
            return null;
          })
      );
      imageOperations.push(
        Storage.put(thumbnailKey, thumbnailBlob, {
          contentType: type,
        })
          .then((result) => {
            console.log('thumbnail uploaded : ', result);
          })
          .catch((err) => {
            console.log('error uploading thumbnail : ', err);
            return null;
          })
      );

      await API.graphql({
        query: createImage,
        variables: {
          input: {
            imageID: imageID,
            thumbnailID: thumbnailID,
            name: name,
            originalSize: originalSize,
            size: size,
            type: type,
            createdBy: user,
          },
        },
      });
    }

    await Promise.all(imageOperations);
  }

  return imageIds;
}

//=======================================================
//Get Images
//=======================================================

export async function getImages(
  imageIds,
  location = 'Images',
  shouldDownload = false
) {
  const images = [];

  for (const imageID of imageIds) {
    console.log('imageID : ', imageID);
    const key = `${location}/${imageID}`;

    const getOptions = {
      download: shouldDownload,
      cacheControl: 'max-age=2592000',
    };

    try {
      let result;
      try {
        result = await Storage.get(key, getOptions);
      } catch (error) {
        throw error;
        console.log('Error downloading image:', error);
      }

      const { data } = await API.graphql({
        query: getImage,
        variables: {
          imageID: imageID,
        },
      });

      const thumbnailKey = `${location}/${data.getImage.thumbnailID}`;
      const thumbnailResult = await Storage.get(thumbnailKey, getOptions);
      console.log('imageResult : ', data.getImage);
      const image = {
        imageID: data.getImage.imageID,
        thumbnailID: data.getImage.thumbnailID,
        url: result,
        thumbnailUrl: thumbnailResult,
        name: data.getImage.name,
        originalSize: data.getImage.originalSize,
        size: data.getImage.size,
        type: data.getImage.type,
        createdBy: data.getImage.createdBy,
        useAWS: true,
      };

      images.push(image);
    } catch (err) {
      console.log('error downloading image : ', err);
    }
  }

  return images;
}

//=======================================================
//Delete Images
//=======================================================
export async function deleteImages(imageIds, location = 'Images') {
  console.log('deleting images : ', imageIds);
  if (imageIds === null || imageIds === undefined) return;
  if (imageIds.length > 0) {
    const imageOperations = [];

    for (const imageID of imageIds) {
      const key = `${location}/${imageID}`;
      const imageData = await API.graphql({
        query: getImage,
        variables: {
          imageID: imageID,
        },
      });
      const thumbnailKey = `${location}/${imageData.data.getImage.thumbnailID}`;

      imageOperations.push(
        Storage.remove(key)
          .then((result) => {})
          .catch((err) => {
            console.log('error deleting image : ', err);
            return null;
          })
      );
      imageOperations.push(
        Storage.remove(thumbnailKey)
          .then((result) => {})
          .catch((err) => {
            console.log('error deleting thumbnail : ', err);
            return null;
          })
      );

      await API.graphql({
        query: deleteImage,
        variables: {
          input: {
            imageID: imageID,
          },
        },
      }).catch((err) => {
        console.log('error deleting image from db: ', err);
        return null;
      });
    }

    await Promise.all(imageOperations);
  } else {
    console.log('no images to delete');
  }
}
