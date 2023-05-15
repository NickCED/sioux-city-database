import { API } from 'aws-amplify';
import { updateSchool } from '../graphql/mutations';
import { saveImages } from './SaveImage';

const updateSchoolMutation = async (
  e,
  props,
  sportType,
  notableAchievements,
  currentImages
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
    const response = await API.graphql({
      query: updateSchool,
      variables: {
        input: {
          id: props.entry.id,
          name: e.target.name.value || props.entry.name,
          startYear: e.target.startYear.value || props.entry.startYear || null,
          endYear: e.target.endYear.value || props.entry.endYear || null,
          sport: sportType || props.entry.sport || '',
          description: e.target.description.value || '',

          notes: e.target.notes.value || '',
          images: uploadingImages || [],
          createdBy: props.currentUser || 'unknown user',
        },
      },
    });
    return response.data;
  } catch (err) {
    console.log('error updating School: ', err);
    window.alert('Error Updating School. Please try again.');
    return Promise.reject(err);
  }
};

export default updateSchoolMutation;
