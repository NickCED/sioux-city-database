import { API } from 'aws-amplify';
import { updateHallOfFame } from '../graphql/mutations';
import { saveImages } from './SaveImage';

const updateHallOfFameMutation = async (
  e,
  props,
  sportType,
  notableAchievements,
  currentImages
) => {
  try {
    const uploadingImages = await saveImages(currentImages);
    await API.graphql({
      query: updateHallOfFame,
      variables: {
        input: {
          id: props.entry.id,
          name: e.target.name.value || props.entry.name,

          inductionYear:
            e.target.inductionYear.value || props.entry.inductionYear || null,
          sport: sportType || props.entry.sport || '',
          description: e.target.description.value || '',
          notableAchievements: notableAchievements || [],
          notes: e.target.notes.value || '',
          images: uploadingImages || [],
          createdBy: props.currentUser || 'unknown user',
        },
      },
    })
      .then((data) => {
        console.log('data from Hall of Fame: ', data);
      })
      .catch((err) => {
        console.log('error creating Hall of Fame 2: ', err);
      });
  } catch (err) {
    console.log('error creating Hall of Fame 1: ', err);
    window.alert('Error creating Hall of Fame. Please try again.');
  }
};

export default updateHallOfFameMutation;
