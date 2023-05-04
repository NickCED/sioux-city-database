import { API } from 'aws-amplify';
import { createSchoolSport } from '../graphql/mutations';
import { updateSchool } from '../graphql/mutations';
import { getSchool } from '../graphql/queries';
import { saveImages } from './SaveImage';
import { v4 as uuidv4 } from 'uuid';

const createSchoolSportMutation = async (
  e,
  props,
  sportType,
  wins,
  currentImages
) => {
  //creating unique id for school sport
  const uniqueId = uuidv4();

  const name =
    e.target.name.value ||
    `${sportType} : ${
      e.target.school.options[e.target.school.selectedIndex].textContent
    }`;

  try {
    const uploadingImages = await saveImages(currentImages);

    await API.graphql({
      query: createSchoolSport,
      variables: {
        input: {
          name: name,
          entryType: e.target.entryType.value,
          startYear: e.target.startYear.value,
          endYear: e.target.endYear.value,
          school: e.target.school.value,
          sport: sportType,
          sportId: uniqueId,
          wins: wins,
          description: e.target.description.value,
          notes: e.target.notes.value,
          images: uploadingImages,
          createdBy: props.currentUser,
        },
      },
    });
  } catch (err) {
    console.log('error creating School Sport: ', err);
    window.prompt('Error creating School Sport. Please try again.');
  }

  try {
    const result = await API.graphql({
      query: getSchool,
      variables: {
        id: e.target.school.value,
      },
    });
    const currentSportsIds = result.data.getSchool.sportsIds || [];
    const updatedSports = [...currentSportsIds, `${uniqueId}`];
    await API.graphql({
      query: updateSchool,
      variables: {
        input: {
          id: e.target.school.value,
          sportsIds: updatedSports,
        },
      },
    });
  } catch (err) {
    console.log('error updating school: ', err);
  }
};

export default createSchoolSportMutation;
