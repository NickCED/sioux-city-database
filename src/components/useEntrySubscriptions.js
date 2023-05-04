import { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import * as subscriptions from '../graphql/subscriptions';

const CONNECTION_STATE_CHANGE = 'connectionStateChange';

export function useEntrySubscriptions() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const createHOFSub = API.graphql({
      query: subscriptions.onCreateHallOfFame,
    }).subscribe({
      next: (hallOfFameData) => {
        const newHallOfFame = hallOfFameData.value.data.onCreateHallOfFame;
        setData((prev) => [...prev, newHallOfFame]);
      },
    });

    const updateHOFSub = API.graphql({
      query: subscriptions.onUpdateHallOfFame,
    }).subscribe({
      next: (hallOfFameData) => {
        const updatedHallOfFame = hallOfFameData.value.data.onUpdateHallOfFame;
        setData((prev) => {
          const oldHallOfFameEntries = prev.filter(
            (entry) => entry.id !== updatedHallOfFame.id
          );
          const newHallOfFameEntries = [
            ...oldHallOfFameEntries,
            updatedHallOfFame,
          ];
          return newHallOfFameEntries;
        });
      },
    });

    const deleteHOFSub = API.graphql({
      query: subscriptions.onDeleteHallOfFame,
    }).subscribe({
      next: (hallOfFameData) => {
        const deletedHallOfFame = hallOfFameData.value.data.onDeleteHallOfFame;
        setData((prev) =>
          prev.filter((entry) => entry.id !== deletedHallOfFame.id)
        );
      },
    });
    //====================================================================================================
    const createSchoolSportSub = API.graphql({
      query: subscriptions.onCreateSchoolSport,
    }).subscribe({
      next: (schoolSportData) => {
        const newSchoolSport = schoolSportData.value.data.onCreateSchoolSport;
        setData((prev) => [...prev, newSchoolSport]);
      },
    });

    const updateSchoolSportSub = API.graphql({
      query: subscriptions.onUpdateSchoolSport,
    }).subscribe({
      next: (schoolSportData) => {
        const updatedSchoolSport =
          schoolSportData.value.data.onUpdateSchoolSport;
        setData((prev) => {
          const oldSchoolSportEntries = prev.filter(
            (entry) => entry.sportId !== updatedSchoolSport.sportId
          );
          const newSchoolSportEntries = [
            ...oldSchoolSportEntries,
            updatedSchoolSport,
          ];
          return newSchoolSportEntries;
        });
      },
    });

    const deleteSchoolSportSub = API.graphql({
      query: subscriptions.onDeleteSchoolSport,
    }).subscribe({
      next: (schoolSportData) => {
        const deletedSchoolSport =
          schoolSportData.value.data.onDeleteSchoolSport;
        setData((prev) =>
          prev.filter((entry) => entry.sportId !== deletedSchoolSport.sportId)
        );
      },
    });

    //====================================================================================================
    const createProfessionalTeamSub = API.graphql({
      query: subscriptions.onCreateProfessionalTeam,
    }).subscribe({
      next: (professionalTeamData) => {
        const newProfessionalTeam =
          professionalTeamData.value.data.onCreateProfessionalTeam;
        setData((prev) => [...prev, newProfessionalTeam]);
      },
    });

    const updateProfessionalTeamSub = API.graphql({
      query: subscriptions.onUpdateProfessionalTeam,
    }).subscribe({
      next: (professionalTeamData) => {
        const updatedProfessionalTeam =
          professionalTeamData.value.data.onUpdateProfessionalTeam;
        setData((prev) => {
          const oldProfessionalTeamEntries = prev.filter(
            (entry) => entry.teamId !== updatedProfessionalTeam.teamId
          );
          const newProfessionalTeamEntries = [
            ...oldProfessionalTeamEntries,
            updatedProfessionalTeam,
          ];
          return newProfessionalTeamEntries;
        });
      },
    });

    const deleteProfessionalTeamSub = API.graphql({
      query: subscriptions.onDeleteProfessionalTeam,
    }).subscribe({
      next: (professionalTeamData) => {
        const deletedProfessionalTeam =
          professionalTeamData.value.data.onDeleteProfessionalTeam;
        setData((prev) =>
          prev.filter(
            (entry) => entry.teamId !== deletedProfessionalTeam.teamId
          )
        );
      },
    });

    //====================================================================================================
    const createVenueSub = API.graphql({
      query: subscriptions.onCreateVenue,
    }).subscribe({
      next: (venueData) => {
        const newVenue = venueData.value.data.onCreateVenue;
        setData((prev) => [...prev, newVenue]);
      },
    });

    const updateVenueSub = API.graphql({
      query: subscriptions.onUpdateVenue,
    }).subscribe({
      next: (venueData) => {
        const updatedVenue = venueData.value.data.onUpdateVenue;
        setData((prev) => {
          const oldVenueEntries = prev.filter(
            (entry) => entry.id !== updatedVenue.id
          );
          const newVenueEntries = [...oldVenueEntries, updatedVenue];
          return newVenueEntries;
        });
      },
    });

    const deleteVenueSub = API.graphql({
      query: subscriptions.onDeleteVenue,
    }).subscribe({
      next: (venueData) => {
        const deletedVenue = venueData.value.data.onDeleteVenue;
        setData((prev) => prev.filter((entry) => entry.id !== deletedVenue.id));
      },
    });
    //====================================================================================================
    return () => {
      createHOFSub.unsubscribe();
      deleteHOFSub.unsubscribe();
      updateHOFSub.unsubscribe();
      createSchoolSportSub.unsubscribe();
      deleteSchoolSportSub.unsubscribe();
      updateSchoolSportSub.unsubscribe();
      createProfessionalTeamSub.unsubscribe();
      deleteProfessionalTeamSub.unsubscribe();
      updateProfessionalTeamSub.unsubscribe();
      createVenueSub.unsubscribe();
      deleteVenueSub.unsubscribe();
      updateVenueSub.unsubscribe();
    };
  }, []);

  return { data, setData };
}
