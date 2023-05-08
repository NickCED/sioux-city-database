import { API } from 'aws-amplify';
import { createVenue } from '../graphql/mutations';
import { saveImages } from './SaveImage';

const createVenueMutation = async (e, props, currentImages) => {
  try {
    console.log('currentImages: ', currentImages);
    console.log('e.target: ', e.target.location);

    const uploadingImages = await saveImages(
      currentImages,
      'Images',
      props.currentUser
    );
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
    })
      .then((data) => {
        console.log('data from Venue: ', data);
      })
      .catch((err) => {
        console.log('error creating Venue 2: ', err);
      });
  } catch (err) {
    console.log('error creating Venue 1: ', err);
  }
};

export default createVenueMutation;
