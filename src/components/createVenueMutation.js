import { API } from 'aws-amplify';
import { createVenue } from '../graphql/mutations';
import { saveImages } from './SaveImage';

const createVenueMutation = async (e, props, currentImages) => {
  let uploadingImages;
  try {
    uploadingImages = await saveImages(
      currentImages,
      'Images',
      props.currentUser
    );
  } catch (err) {
    console.log('error uploading these images : ', err);
    window.alert(
      'There was an error uploading these images, please try deleting and reuploading. '
    );
    throw err;
  }
  try {
    await API.graphql({
      query: createVenue,
      variables: {
        input: {
          name: e.target.name.value,
          entryType: e.target.entryType.value,
          startYear: e.target.startYear.value || null,
          endYear: e.target.endYear.value || null,
          location: e.target.location.value || '',
          description: e.target.description.value || '',
          notes: e.target.notes.value || '',
          images: uploadingImages || [],
          createdBy: props.currentUser || 'unknown user',
        },
      },
    });
  } catch (err) {
    console.log('error creating Venue 1: ', err);
    throw err;
  }
};

export default createVenueMutation;
