import React, { useEffect, useState } from 'react';

import './App.css';
import { defaultTheme } from '@aws-amplify/ui-react';
import { ThemeProvider } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { withAuthenticator } from '@aws-amplify/ui-react';
import NavBar from './components/NavBar';
import AddEntry from './components/AddEntry';
import EditEntry from './components/EditEntry';
import ViewEntry from './components/ViewEntry';
import AllEntries from './components/AllEntries';
import { listProfessionalSports } from './graphql/queries';
import EditProfessionalSport from './components/EditProfessionalSport';
import { listSchools } from './graphql/queries';
import { useSchoolSubscriptions } from './components/useSchoolSubscriptions';

import { Auth, API } from 'aws-amplify';

function App({ signOut }) {
  const [currentUserName, setCurrentUserName] = useState('');

  React.useEffect(() => {
    document.title = 'Sioux City Uploads';
  }, []);
  const handleSignOut = () => {
    signOut();
  };

  useEffect(() => {
    const fetchUser = async () => {
      let isMounted = true;
      const user = await Auth.currentAuthenticatedUser();
      if (isMounted) {
        let username = `${user.username}`;
        switch (username) {
          case '3df3e384-e4d1-4715-bb0d-1e684054d411':
            username = 'Admin: N Smith';
            break;
          case '55b8880e-824d-4f4f-8906-3445b60a24e8':
            username = 'T Munson';
            break;
          case 'dc8bf206-5432-4ad6-8e67-d3d2b11fee12':
            username = 'H Aguirre';
            break;
          case 'ee608651-8a55-44d2-a151-16a30eae135f':
            username = 'D Mayo';
            break;
          default:
            username = 'Unknown User ';
            break;
        }

        setCurrentUserName(username);
      }
      return () => {
        isMounted = false;
      };
    };
    fetchUser();
  }, []);

  // ================================================================================================================
  //School Subscriptions
  const { schoolData, setSchoolData } = useSchoolSubscriptions();
  const [highSchoolData, setHighSchoolData] = useState([]);
  const [collegeData, setCollegeData] = useState([]);

  useEffect(() => {
    const fetchCurrentSchools = async () => {
      const schoolsData = await API.graphql({
        query: listSchools,
      });
      setSchoolData(schoolsData.data.listSchools.items);
    };
    fetchCurrentSchools();
  }, []);

  useEffect(() => {
    if (schoolData) {
      const highSchools = schoolData.filter((school) =>
        school.name.includes('High School')
      );
      const colleges = schoolData.filter((school) =>
        school.name.includes('College')
      );

      const sortByName = (a, b) => a.name.localeCompare(b.name);

      const sortedHighSchools = highSchools.sort(sortByName);
      const sortedColleges = colleges.sort(sortByName);

      setHighSchoolData(sortedHighSchools);
      setCollegeData(sortedColleges);
    }
  }, [schoolData]);
  // ================================================================================================================
  const [sportsData, setSportsData] = useState([]);
  const [editSportData, setEditSportData] = useState([]);
  const [professionalData, setProfessionalData] = useState([]);
  const [clubData, setClubData] = useState([]);

  useEffect(() => {
    const fetchProfessionalSports = async () => {
      const professionalSportsData = await API.graphql({
        query: listProfessionalSports,
      });

      setSportsData(professionalSportsData.data.listProfessionalSports.items);
    };
    fetchProfessionalSports();
  }, []);

  useEffect(() => {
    if (sportsData) {
      const professionalSports = sportsData.filter(
        (sport) => !sport.sport.includes('Clubs')
      );
      const clubs = sportsData.filter((sport) => sport.sport.includes('Clubs'));

      const sortByName = (a, b) => a.sport.localeCompare(b.sport);

      const sortedProfessionals = professionalSports.sort(sortByName);
      const sortedClubs = clubs.sort(sortByName);

      setProfessionalData(sortedProfessionals);
      setClubData(sortedClubs);
    }
  }, [sportsData]);

  // ================================================================================================================
  // load the data from the database
  // useEffect(() => {
  //   const fetchEntries = async () => {
  //     const response = await API.graphql({query: listVenues});

  //   }
  const [searchText, setSearchText] = useState('');

  const [searchDisabled, setSearchDisabled] = useState(false);
  const handleSearchChange = (searchText) => {
    setSearchText(searchText);
  };
  const handleTabChange = (isDisabled) => {
    isDisabled ? setSearchDisabled(true) : setSearchDisabled(false);
    if (isDisabled) {
      setSearchText('');
    }
  };

  // ================================================================================================================
  // Edit Professional Sport
  const [showEditProfessionalSport, setShowEditProfessionalSport] =
    useState(false);

  const handleAddProfessionalSport = (sport) => {
    console.log('sport: ', sport);
    setEditSportData(sportsData.find((s) => s.sport === sport));
    setShowEditProfessionalSport(true);
  };
  const handleProfessionalCancel = () => {
    setShowEditProfessionalSport(false);
  };
  const handleProfessionalSubmit = () => {
    setShowEditProfessionalSport(false);
  };

  // ================================================================================================================
  // View Entry
  const [showViewEntry, setShowViewEntry] = useState(false);
  const [viewableEntry, setViewableEntry] = useState();
  const handleAddViewEntry = (entry) => {
    setViewableEntry(entry);
    setShowViewEntry(true);
  };
  const handleViewCancel = () => {
    setShowViewEntry(false);
  };
  const handleViewSubmit = () => {
    setShowViewEntry(false);
  };

  // ================================================================================================================
  // Edit Entry
  const [showEditEntry, setShowEditEntry] = useState(false);
  const [editableEntry, setEditableEntry] = useState();
  const handleAddEditEntry = (entry) => {
    setEditableEntry(entry);
    setShowEditEntry(true);
  };

  const handleUpdateSubmit = () => {
    setShowEditEntry(false);
  };
  const handleUpdateCancel = () => {
    setShowEditEntry(false);
  };
  //=========================================================================
  const [showAddEntry, setShowAddEntry] = useState(false);

  const handleAddEntry = () => {
    setShowAddEntry(true);
  };

  const handleFormSubmit = () => {
    setShowAddEntry(false);
  };
  const handleFormCancel = () => {
    setShowAddEntry(false);
  };

  //=========================================================================
  //Custom Theming
  const myTheme = {
    name: 'myCustomTheme',
    tokens: {
      ...defaultTheme.tokens,
    },
  };

  return (
    <ThemeProvider theme={myTheme}>
      <div
        className='SiouxCityDatabase'
        style={{
          height: '99vh',
          width: '99vw',

          transform: 'translate(-50%, -50%)',
          top: '50%',
          left: '50%',
          overflow: 'hidden',
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {showEditProfessionalSport && (
          <EditProfessionalSport
            onFormSubmit={handleProfessionalSubmit}
            onFormCancel={handleProfessionalCancel}
            currentUser={currentUserName}
            onCloseEntry={handleProfessionalCancel}
            data={editSportData}
          />
        )}
        {showViewEntry && (
          <ViewEntry
            onFormSubmit={handleViewSubmit}
            onFormCancel={handleViewCancel}
            currentUser={currentUserName}
            entry={viewableEntry}
            onCloseEntry={handleViewCancel}
            schoolData={schoolData}
          />
        )}
        {showEditEntry && (
          <EditEntry
            onFormSubmit={handleUpdateSubmit}
            onFormCancel={handleUpdateCancel}
            currentUser={currentUserName}
            entry={editableEntry}
            schoolData={schoolData}
            onCloseEntry={handleUpdateCancel}
          />
        )}

        {showAddEntry && (
          <AddEntry
            currentUser={currentUserName}
            setAddEntry={handleFormSubmit}
            onFormSubmit={handleFormSubmit}
            onFormCancel={handleFormCancel}
            onCloseEntry={handleFormCancel}
            highSchoolData={highSchoolData}
            collegeData={collegeData}
          />
        )}
        <div
          style={{
            height: '100vh',
            overflow: 'hidden',
            position: 'sticky',
            top: 0,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <NavBar
            onSignOut={handleSignOut}
            onAddEntry={handleAddEntry}
            onSearchChange={handleSearchChange}
            searchDisabled={searchDisabled}
          />
          <AllEntries
            onEditEntry={(entry) => handleAddEditEntry(entry)}
            onViewEntry={handleAddViewEntry}
            searchText={searchText}
            onTabChange={handleTabChange}
            highSchoolData={highSchoolData}
            collegeData={collegeData}
            professionalData={professionalData}
            clubData={clubData}
            onEditProfessionalSport={(sport) =>
              handleAddProfessionalSport(sport)
            }
          />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default withAuthenticator(App, {
  hideSignUp: true,
});
