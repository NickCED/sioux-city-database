import { useState, useEffect } from 'react';
import { API, Hub } from 'aws-amplify';
import * as subscriptions from '../graphql/subscriptions';
import { CONNECTION_STATE_CHANGE } from '@aws-amplify/pubsub';

export function useSchoolSubscriptions() {
  const [schoolData, setSchoolData] = useState([]);

  useEffect(() => {
    Hub.listen('api', (data) => {
      const { payload } = data;
      if (payload.event === CONNECTION_STATE_CHANGE) {
        const connectionState = payload.data.connectionState;
      }
    });

    const createSchoolSub = API.graphql({
      query: subscriptions.onCreateSchool,
    }).subscribe({
      next: (schoolData) => {
        const newSchool = schoolData.value.data.onCreateSchool;
        setSchoolData((prev) => [...prev, newSchool]);
      },
    });

    const updateSchoolSub = API.graphql({
      query: subscriptions.onUpdateSchool,
    }).subscribe({
      next: (schoolData) => {
        const updatedSchool = schoolData.value.data.onUpdateSchool;
        setSchoolData((prev) => {
          const oldSchoolEntries = prev.filter(
            (entry) => entry.id !== updatedSchool.id
          );
          const newSchoolEntries = [...oldSchoolEntries, updatedSchool];
          return newSchoolEntries;
        });
      },
    });

    const deleteSchoolSub = API.graphql({
      query: subscriptions.onDeleteSchool,
    }).subscribe({
      next: (schoolData) => {
        const deletedSchool = schoolData.value.data.onDeleteSchool;
        setSchoolData((prev) =>
          prev.filter((entry) => entry.id !== deletedSchool.id)
        );
      },
    });
    //====================================================================================================

    //====================================================================================================
    return () => {
      createSchoolSub.unsubscribe();
      updateSchoolSub.unsubscribe();
      deleteSchoolSub.unsubscribe();
    };
  }, []);

  return { schoolData, setSchoolData };
}
