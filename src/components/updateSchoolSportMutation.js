import { API } from 'aws-amplify';
import { updateSchoolSport } from '../graphql/mutations';

import { saveImages, deleteImages } from './SaveImage';
import { upload } from '@testing-library/user-event/dist/upload';

const updateSchoolSportMutation = async (
  e,
  props,
  sportType,
  wins,
  currentImages,
  currentImagesToDelete
) => {
  const name =
    e.target.name.value ||
    `${sportType} : ${
      e.target.school.options[e.target.school.selectedIndex].textContent
    }`;

  try {
    let uploadingImages;
    if (currentImages.length > 0) {
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
    }
    if (currentImagesToDelete.length > 0) {
      try {
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
      query: updateSchoolSport,
      variables: {
        input: {
          name: name,
          entryType: props.entry.entryType,
          startYear: e.target.startYear.value || props.entry.startYear || null,
          endYear: e.target.endYear.value || props.entry.endYear || null,

          sport: sportType,
          sportId: props.entry.sportId,
          wins: wins || [],
          description: e.target.description.value || '',
          notes: e.target.notes.value || '',
          images: uploadingImages || [],
          createdBy: props.currentUser,
        },
      },
    });
    return response.data;
  } catch (err) {
    console.log('error creating School Sport: ', err);
    window.alert('Error creating School Sport. Please try again.');
    return Promise.reject(err);
  }
};

export default updateSchoolSportMutation;
