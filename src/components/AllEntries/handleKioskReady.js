import { API } from 'aws-amplify';
import * as mutations from '../../graphql/mutations';

export const handleKioskReady = (
  event,
  entry,
  isSchool = false,
  isProfSport = false
) => {
  if (!isSchool && !isProfSport) {
    switch (entry.entryType) {
      case 'Hall of Fame':
        try {
          API.graphql({
            query: mutations.updateHallOfFame,
            variables: {
              input: {
                id: entry.id,
                kioskReady: event.target.checked,
              },
            },
          });
        } catch (error) {
          console.log('error updating hall of fame: ', error);
        }
        break;
      case 'School':
        try {
          API.graphql({
            query: mutations.updateSchool,
            variables: {
              input: {
                sportId: entry.sportId,
                kioskReady: event.target.checked,
              },
            },
          });
        } catch (error) {
          console.log('error updating school: ', error);
        }
        break;
      case 'Professional Team':
        try {
          API.graphql({
            query: mutations.updateProfessionalTeam,
            variables: {
              input: {
                teamId: entry.teamId,
                kioskReady: event.target.checked,
              },
            },
          });
        } catch (error) {
          console.log('error updating professional team: ', error);
        }
        break;
      case 'Venue':
        try {
          API.graphql({
            query: mutations.updateVenue,
            variables: {
              input: {
                id: entry.id,
                kioskReady: event.target.checked,
              },
            },
          });
        } catch (error) {
          console.log('error updating venue: ', error);
        }
        break;
      default:
        console.log('Error: entryType not found');
    }
  }

  if (isSchool) {
    console.log('school', entry);
    try {
      API.graphql({
        query: mutations.updateSchool,
        variables: {
          input: {
            id: entry.id,
            kioskReady: event.target.checked,
          },
        },
      });
    } catch (error) {
      console.log('error updating school: ', error);
    }
  }
};
