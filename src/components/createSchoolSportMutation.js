import { API } from 'aws-amplify';
import { createSchoolSport } from '../graphql/mutations';
import { updateSchool } from '../graphql/mutations';
import { getSchool, getSchoolSport } from '../graphql/queries';
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
  console.log('name : ', name);

  try {
    const uploadingImages = await saveImages(
      currentImages,
      'Images',
      props.currentUser
    );

    await API.graphql({
      query: createSchoolSport,
      variables: {
        input: {
          name: name,
          entryType: e.target.entryType.value,
          startYear: e.target.startYear.value || null,
          endYear: e.target.endYear.value || null,
          school: e.target.school.value || '',
          sport: sportType || '',
          sportId: uniqueId,
          wins: wins || '',
          description: e.target.description.value || '',
          notes: e.target.notes.value || '',
          images: uploadingImages || [],
          createdBy: props.currentUser || 'unknown user',
        },
      },
    });
  } catch (err) {
    console.log('error creating School Sport: ', err);
    window.alert('Error creating School Sport. Please try again.');
    return;
  }

  if (
    e.target.school.value !== undefined ||
    e.target.school.value !== null ||
    e.target.school.value !== ''
  ) {
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
      console.log('error updating school sportsIds: ', err);
    }
  }
};

export default createSchoolSportMutation;
