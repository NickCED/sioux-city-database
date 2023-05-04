import { API } from 'aws-amplify';
import { createHallOfFame } from '../graphql/mutations';
import { saveImages } from './SaveImage';

const createHallOfFameMutation = async (
  e,
  props,
  sportType,
  notableAchievements,
  currentImages
) => {
  console.log('notableAchievements: ', notableAchievements);
  try {
    const uploadingImages = await saveImages(
      currentImages,
      'Images',
      props.currentUser
    );
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
  }
};

export default createHallOfFameMutation;
