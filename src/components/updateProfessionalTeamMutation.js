import { API } from 'aws-amplify';
import { createProfessionalTeam } from '../graphql/mutations';
import { saveImages } from './SaveImage';
import { v4 as uuidv4 } from 'uuid';

const createProfessionalTeamMutation = async (
  e,
  props,
  sportType,
  currentImages
) => {
  const uniqueId = uuidv4();

  try {
    const uploadingImages = await saveImages(currentImages);

    await API.graphql({
      query: createProfessionalTeam,
      variables: {
        input: {
          name: e.target.name.value,
          entryType: e.target.entryType.value,
          startYear: e.target.startYear.value,
          endYear: e.target.endYear.value,
          sport: sportType,
          teamId: uniqueId,
          description: e.target.description.value,
          notes: e.target.notes.value,
          images: uploadingImages,
          createdBy: props.currentUser,
        },
      },
    });
  } catch (err) {
    console.log('error creating Hall of Fame 1: ', err);
  }
};

export default createProfessionalTeamMutation;
