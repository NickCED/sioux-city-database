import { API } from 'aws-amplify';
import { updateVenue } from '../graphql/mutations';
import { saveImages, deleteImages } from './SaveImage';

const updateVenueMutation = async (
  e,
  props,
  currentImages,
  currentImagesToDelete
) => {
  console.log(e.target.location);
  try {
    let uploadingImages;
    try {
      uploadingImages = await saveImages(currentImages);
    } catch (error) {
      console.log('Error uploading images:', error);
      window.alert(
        'There was an error uploading these images, please try deleting and reuploading.'
      );
      throw error; // Throw the error to stop further execution
    }
    try {
      await deleteImages(currentImagesToDelete);
    } catch (error) {
      console.log('Error deleting images:', error);
      window.alert(
        'There was an error deleting these images, please try again.'
      );
      throw error; // Throw the error to stop further execution
    }
    await API.graphql({
      query: updateVenue,
      variables: {
        input: {
          id: props.entry.id,
          name: e.target.name.value,
          entryType: props.entry.entryType,
          startYear:
            e.target.startYear.value === ''
              ? null
              : props.school.startYear || null,
          endYear:
            e.target.endYear.value === '' ? null : props.school.endYear || null,

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
        return true;
      })
      .catch((err) => {
        console.log('error creating Venue 2: ', err);
        return false;
      });
  } catch (err) {
    console.log('error creating Venue 1: ', err);
    window.alert('Error creating Venue. Please try again.');
    return false;
  }
};

export default updateVenueMutation;
