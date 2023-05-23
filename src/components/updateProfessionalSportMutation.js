import { API } from 'aws-amplify';
import { updateProfessionalSport } from '../graphql/mutations';
import { saveImages, deleteImages } from './SaveImage';

const updateProfessionalSportMutation = async (
  e,
  props,
  currentImages,
  currentImagesToDelete
) => {
  let uploadingImages;
  try {
    try {
      uploadingImages = await saveImages(
        currentImages,
        'Images',
        props.currentUser
      );
    } catch (error) {
      console.log('Error uploading images:', error);
      window.alert(
        'There was an error uploading these images, please try deleting and reuploading.'
      );
      throw error; // Throw the error to stop further execution
    }

    if (currentImagesToDelete.length > 0) {
      try {
        console.log('currentImagesToDelete:', currentImagesToDelete);
        await deleteImages(currentImagesToDelete);
      } catch (error) {
        console.log('Error deleting images:', error);
        window.alert(
          'There was an error deleting these images, please try again.'
        );
        throw error; // Throw the error to stop further execution
      }
    }
    const response = await API.graphql({
      query: updateProfessionalSport,
      variables: {
        input: {
          id: props.data.id,

          startYear:
            e.target.startYear.value === ''
              ? null
              : props.data.startYear || null,
          endYear:
            e.target.endYear.value === '' ? null : props.data.endYear || null,

          description: e.target.description.value || '',
          notes: e.target.notes.value || '',
          images: uploadingImages,
          createdBy: props.currentUser,
        },
      },
    });
    return response.data;
  } catch (err) {
    console.log('error creating ProfessionalSport : ', err);
    window.alert('Error creating ProfessionalSport. Please try again.');
    return Promise.reject(err);
  }
};

export default updateProfessionalSportMutation;
