import { API } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';
import { deleteImages } from './SaveImage';
// entry comes from the confirmDeleteEntry function in AllEntries.js
// entry comes from the row.orginal in AllEntries.js
export const handleDeleteEntry = async (entry) => {
  switch (entry.entryType) {
    case 'Venue':
      try {
        const result = await API.graphql({
          query: queries.getVenue,
          variables: { id: entry.id },
        });
        const images = result.data.getVenue.images;

        await deleteImages(images);

        await API.graphql({
          query: mutations.deleteVenue,
          variables: { input: { id: entry.id } },
        });
      } catch (e) {
        console.log(e);
      }
      break;
    case 'Hall of Fame':
      try {
        const result = await API.graphql({
          query: queries.getHallOfFame,
          variables: { id: entry.id },
        });
        const images = result.data.getHallOfFame.images;

        await deleteImages(images);

        await API.graphql({
          query: mutations.deleteHallOfFame,
          variables: { input: { id: entry.id } },
        });
      } catch (e) {
        console.log(e);
      }
      break;
    case 'Professional Team':
      console.log('deleting professional team', entry);
      try {
        const result = await API.graphql({
          query: queries.getProfessionalTeam,
          variables: { teamId: entry.teamId },
        });
        const images = result.data.getProfessionalTeam.images;

        await deleteImages(images);

        await API.graphql({
          query: mutations.deleteProfessionalTeam,
          variables: { input: { teamId: entry.teamId } },
        });
      } catch (e) {
        console.log(e);
      }
      break;
    case 'School':
      try {
        const result = await API.graphql({
          query: queries.getSchoolSport,
          variables: { sportId: entry.sportId },
        });
        const images = result.data.getSchoolSport.images;

        if (images.length > 0) {
          await deleteImages(images);
        }
        await API.graphql({
          query: mutations.deleteSchoolSport,
          variables: { input: { sportId: entry.sportId } },
        });
      } catch (e) {
        console.log(e);
      }
      try {
        const result = await API.graphql({
          query: queries.getSchool,
          variables: { id: entry.school },
        });

        const updatedSports = result.data.getSchool.sportsIds.filter(
          (sportId) => sportId !== entry.sportId
        );
        await API.graphql({
          query: mutations.updateSchool,
          variables: { input: { id: entry.school, sportsIds: updatedSports } },
        });
      } catch (e) {
        console.log('error deleting sport from school', e);
      }
      break;
    default:
      console.log('Unknown entry type');
  }
};
