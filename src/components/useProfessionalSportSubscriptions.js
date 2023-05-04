import { useState, useEffect } from 'react';
import { API, Hub } from 'aws-amplify';
import * as subscriptions from '../graphql/subscriptions';
import { CONNECTION_STATE_CHANGE } from '@aws-amplify/pubsub';

export function useOtherSubscriptions() {
  const [professionalSportData, setProfessionalSportData] = useState([]);

  useEffect(() => {
    Hub.listen('api', (data) => {
      const { payload } = data;
      if (payload.event === CONNECTION_STATE_CHANGE) {
        const connectionState = payload.data.connectionState;
      }
    });

    //====================================================================================================

    const createProfessionalSportSub = API.graphql({
      query: subscriptions.onCreateProfessionalSport,
    }).subscribe({
      next: (professionalSportData) => {
        const newProfessionalSport =
          professionalSportData.value.data.onCreateProfessionalSport;
        setProfessionalSportData((prev) => [...prev, newProfessionalSport]);
      },
    });

    const updateProfessionalSportSub = API.graphql({
      query: subscriptions.onUpdateProfessionalSport,
    }).subscribe({
      next: (professionalSportData) => {
        const updatedProfessionalSport =
          professionalSportData.value.data.onUpdateProfessionalSport;
        setProfessionalSportData((prev) => {
          const oldProfessionalSportEntries = prev.filter(
            (entry) => entry.id !== updatedProfessionalSport.id
          );
          const newProfessionalSportEntries = [
            ...oldProfessionalSportEntries,
            updatedProfessionalSport,
          ];
          return newProfessionalSportEntries;
        });
      },
    });

    const deleteProfessionalSportSub = API.graphql({
      query: subscriptions.onDeleteProfessionalSport,
    }).subscribe({
      next: (professionalSportData) => {
        const deletedProfessionalSport =
          professionalSportData.value.data.onDeleteProfessionalSport;
        setProfessionalSportData((prev) =>
          prev.filter((entry) => entry.id !== deletedProfessionalSport.id)
        );
      },
    });
    //====================================================================================================
    return () => {
      createProfessionalSportSub.unsubscribe();
      updateProfessionalSportSub.unsubscribe();
      deleteProfessionalSportSub.unsubscribe();
    };
  }, []);

  return { professionalSportData, setProfessionalSportData };
}
