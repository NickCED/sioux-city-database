import { API } from 'aws-amplify';
import { updateHallOfFame } from '../graphql/mutations';
import { getImages } from './SaveImage';

const updateHallOfFameMutation = async (e, props, id, ...args) => {
  const { sportType, notableAchievements, currentImages } = args[0];
  try {
    const uploadingImages = await getImages(currentImages);
    await API.graphql({
      query: updateHallOfFame,
      variables: {
        input: {
          name: e.target.name.value,
          entryType: e.target.entryType.value,
          inductionYear: e.target.inductionYear.value,
          sport: sportType,
          description: e.target.description.value,
          notableAchievements: notableAchievements,
          notes: e.target.notes.value,
          images: uploadingImages,
          createdBy: props.currentUser,
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
  }
};

export default updateHallOfFameMutation;
