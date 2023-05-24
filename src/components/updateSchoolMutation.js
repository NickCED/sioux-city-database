import { API } from 'aws-amplify';
import { updateSchool } from '../graphql/mutations';
import { saveImages, deleteImages } from './SaveImage';

const updateSchoolMutation = async (
  e,
  props,
  currentLogo,
  currentImagesToDelete
) => {
  try {
    let uploadingImages;
    if (currentLogo) {
      try {
        uploadingImages = await saveImages(
          [currentLogo],
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
      query: updateSchool,
      variables: {
        input: {
          id: props.school.id,
          location: e.target.location.value || '',
          startYear:
            e.target.startYear.value === ''
              ? null
              : e.target.startYear.value || props.school.startYear || null,
          endYear:
            e.target.endYear.value === ''
              ? null
              : e.target.endYear.value || props.school.endYear || null,

          description: e.target.description.value || '',
          notes: e.target.notes.value || '',
          logoUrl: uploadingImages ? uploadingImages[0] : null,
          createdBy: props.currentUser,
        },
      },
    });
    return response.data;
  } catch (err) {
    console.log('error creating School : ', err);
    window.alert('Error creating School. Please try again.');
    return Promise.reject(err);
  }
};

export default updateSchoolMutation;
