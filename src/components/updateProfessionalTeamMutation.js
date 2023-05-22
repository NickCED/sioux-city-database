import { API } from 'aws-amplify';
import { updateProfessionalTeam } from '../graphql/mutations';
import { saveImages, deleteImages } from './SaveImage';

const updateProfessionalTeamMutation = async (
  e,
  props,
  sportType,
  currentImages,
  currentImagesToDelete
) => {
  let uploadingImages;
  try {
    try {
      uploadingImages = await saveImages(currentImages);
    } catch (error) {
      console.log('Error uploading images:', error);
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

    const response = await API.graphql({
      query: updateProfessionalTeam,
      variables: {
        input: {
          name: e.target.name.value,
          entryType: props.entry.entryType,
          startYear:
            e.target.startYear.value === ''
              ? null
              : props.school.startYear || null,
          endYear:
            e.target.endYear.value === '' ? null : props.school.endYear || null,

          teamId: props.entry.teamId,
          description: e.target.description.value,
          notes: e.target.notes.value,
          images: uploadingImages || [],
          createdBy: props.currentUser,
        },
      },
    });
    return response.data;
  } catch (err) {
    console.log('error creating Hall of Fame 1: ', err);
    window.alert('Error creating Professional Team. Please try again.');
    return Promise.reject(err);
  }
};

export default updateProfessionalTeamMutation;
