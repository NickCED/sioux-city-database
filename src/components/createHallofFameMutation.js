import { API } from 'aws-amplify';
import { createHallOfFame, createSport } from '../graphql/mutations';
import { saveImages } from './SaveImage';

const createHallOfFameMutation = async (
  e,
  props,
  sportType,
  notableAchievements,
  currentImages,
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
      query: createHallOfFame,
      variables: {
        input: {
          name: e.target.name.value,
          entryType: e.target.entryType.value,
          inductionYear: e.target.inductionYear.value || null,
          sport: sportType || '',
          description: e.target.description.value || '',
          notableAchievements: notableAchievements || [],
          notes: e.target.notes.value || '',
          images: uploadingImages || [],
          createdBy: props.currentUser || 'unknown user',
        },
      },
    });
  } catch (err) {
    console.log('error creating Hall of Fame : ', err);
    throw err;
  }
};

export default createHallOfFameMutation;
