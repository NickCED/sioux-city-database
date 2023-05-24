import { API } from 'aws-amplify';
import { updateHallOfFame, createSport } from '../graphql/mutations';
import { saveImages, deleteImages } from './SaveImage';

const updateHallOfFameMutation = async (
  e,
  props,
  sportType,
  notableAchievements,
  currentImages,
  currentImagesToDelete,
  addNewSport
) => {
  if (addNewSport) {
    console.log('adding new sport : ', sportType);
    try {
      await API.graphql({
        query: createSport,
        variables: {
          input: {
            type: sportType,
          },
        },
      });
    } catch (err) {
      console.log('error creating sport : ', err);
      throw err;
    }
  }
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
      query: updateHallOfFame,
      variables: {
        input: {
          id: props.entry.id,
          name: e.target.name.value || props.entry.name,

          inductionYear:
            e.target.inductionYear.value === ''
              ? null
              : e.target.inductionYear.value ||
                props.entry.inductionYear ||
                null,
          sport: sportType || props.entry.sport || '',
          description: e.target.description.value || '',
          notableAchievements: notableAchievements,
          notes: e.target.notes.value || '',
          images: uploadingImages,
          createdBy: props.currentUser || 'unknown user',
        },
      },
    });

    return response.data;
  } catch (err) {
    console.log('error creating Hall of Fame 1: ', err);
    window.alert('Error creating Hall of Fame. Please try again.');
    return Promise.reject(err);
  }
};

export default updateHallOfFameMutation;
