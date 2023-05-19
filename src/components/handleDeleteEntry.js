import { API } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';
import { deleteImages } from './SaveImage';
// entry comes from the confirmDeleteEntry function in AllEntries.js
// entry comes from the row.orginal in AllEntries.js
export const handleDeleteEntry = async (entry) => {
  if (!entry || !entry.entryType) return console.error('no entry or entryType');

  try {
    switch (entry.entryType) {
      case 'Venue':
        const venueResult = await API.graphql({
          query: queries.getVenue,
          variables: { id: entry.id },
        });

        if (!venueResult.data || !venueResult.data.getVenue) {
          console.error('Failed to get venue');
          return;
        }

        const venueImages = venueResult.data.getVenue.images;
        await deleteImages(venueImages);

        await API.graphql({
          query: mutations.deleteVenue,
          variables: { input: { id: entry.id } },
        });

        break;

      case 'Hall of Fame':
        const hallofFameResult = await API.graphql({
          query: queries.getHallOfFame,
          variables: { id: entry.id },
        });

        if (!hallofFameResult.data || !hallofFameResult.data.getHallOfFame) {
          console.error('Failed to get hall of fame');
          return;
        }

        const hallofFameImages = hallofFameResult.data.getHallOfFame.images;

        await deleteImages(hallofFameImages);

        await API.graphql({
          query: mutations.deleteHallOfFame,
          variables: { input: { id: entry.id } },
        });

        break;

      case 'Professional Team':
        console.log('deleting professional team', entry);

        const professionalTeamResult = await API.graphql({
          query: queries.getProfessionalTeam,
          variables: { teamId: entry.teamId },
        });

        if (
          !professionalTeamResult.data ||
          !professionalTeamResult.data.getProfessionalTeam
        ) {
          console.error('Failed to get professional team');
          return;
        }

        const professionalTeamImages =
          professionalTeamResult.data.getProfessionalTeam.images;

        await deleteImages(professionalTeamImages);

        await API.graphql({
          query: mutations.deleteProfessionalTeam,
          variables: { input: { teamId: entry.teamId } },
        });

        break;

      case 'School':
        const schoolResult = await API.graphql({
          query: queries.getSchoolSport,
          variables: { sportId: entry.sportId },
        });

        if (!schoolResult.data || !schoolResult.data.getSchoolSport) {
          console.error('Failed to get school sport');
          return;
        }

        const schoolImages = schoolResult.data.getSchoolSport.images;

        if (schoolImages.length > 0) {
          await deleteImages(schoolImages);
        }
        await API.graphql({
          query: mutations.deleteSchoolSport,
          variables: { input: { sportId: entry.sportId } },
        });

        const updatedSports = schoolResult.data.getSchool.sportsIds.filter(
          (sportId) => sportId !== entry.sportId
        );

        await API.graphql({
          query: mutations.updateSchool,
          variables: {
            input: { id: entry.school, sportsIds: updatedSports },
          },
        });

        break;
      default:
        console.log('Unknown entry type');
    }
  } catch (error) {}
};
