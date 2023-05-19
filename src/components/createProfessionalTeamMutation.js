import { API } from 'aws-amplify';
import { createProfessionalTeam } from '../graphql/mutations';
import { saveImages } from './SaveImage';
import { v4 as uuidv4 } from 'uuid';

const createProfessionalTeamMutation = async (
  e,
  props,
  professionalSport,
  currentImages
) => {
  const uniqueId = uuidv4();
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
      query: createProfessionalTeam,
      variables: {
        input: {
          name: e.target.name.value,
          entryType: e.target.entryType.value,
          startYear: e.target.startYear.value || null,
          endYear: e.target.endYear.value || null,
          sport: professionalSport || '',
          teamId: uniqueId,
          description: e.target.description.value || '',
          notes: e.target.notes.value || '',
          images: uploadingImages || [],
          createdBy: props.currentUser || 'unknown user',
        },
      },
    });
  } catch (err) {
    console.log('error creating Hall of Fame 1: ', err);
    throw err;
  }
};

export default createProfessionalTeamMutation;
