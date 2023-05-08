import { API } from 'aws-amplify';
import { updateSchoolSport } from '../graphql/mutations';

import { saveImages } from './SaveImage';

const updateSchoolSportMutation = async (
  e,
  props,
  sportType,
  wins,
  currentImages
) => {
  const name =
    e.target.name.value ||
    `${sportType} : ${
      e.target.school.options[e.target.school.selectedIndex].textContent
    }`;

  try {
    const uploadingImages = await saveImages(currentImages);

    await API.graphql({
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
  } catch (err) {
    console.log('error creating School Sport: ', err);
    window.alert('Error creating School Sport. Please try again.');
  }
};

export default updateSchoolSportMutation;
