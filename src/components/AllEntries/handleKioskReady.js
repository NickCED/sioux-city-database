import { API } from 'aws-amplify';
import * as mutations from '../../graphql/mutations';

export const handleKioskReady = (event, entry) => {
  switch (entry.entryType) {
    case 'Hall of Fame':
      API.graphql({
        query: mutations.updateHallOfFame,
        variables: {
          input: {
            id: entry.id,
            kioskReady: event.target.checked,
          },
        },
      });
      break;
    case 'School':
      API.graphql({
        query: mutations.updateSchool,
        variables: {
          input: {
            sportId: entry.sportId,
            kioskReady: event.target.checked,
          },
        },
      });
      break;
    case 'Professional Team':
      API.graphql({
        query: mutations.updateProfessionalTeam,
        variables: {
          input: {
            teamId: entry.teamId,
            kioskReady: event.target.checked,
          },
        },
      });
      break;
    case 'Venue':
      API.graphql({
        query: mutations.updateVenue,
        variables: {
          input: {
            id: entry.id,
            kioskReady: event.target.checked,
          },
        },
      });
      break;
    default:
      console.log('Error: entryType not found');
  }
};
