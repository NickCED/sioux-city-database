import { API } from 'aws-amplify';
import { updateVenue } from '../graphql/mutations';
import { saveImages } from './SaveImage';

const updateVenueMutation = async (e, props, currentImages) => {
  console.log(e.target.location);
  try {
    const uploadingImages = await saveImages(currentImages);
    await API.graphql({
      query: updateVenue,
      variables: {
        input: {
          id: props.entry.id,
          name: e.target.name.value,
          entryType: props.entry.entryType,
          startYear: e.target.startYear.value || props.entry.startYear || null,
          endYear: e.target.endYear.value || props.entry.endYear || null,
          location: e.target.location.value || props.entry.location || '',
          description:
            e.target.description.value || props.entry.description || '',
          notes: e.target.notes.value || props.entry.notes || '',
          images: uploadingImages || [],
          createdBy: props.currentUser,
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

export default updateVenueMutation;
