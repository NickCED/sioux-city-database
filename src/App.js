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
import EditSchool from './components/EditSchool';
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
          case ' a7f0f8db-8f0b-429a-970b-0e3288d39566':
            username = 'T Munson';
            break;
          case 'dc8bf206-5432-4ad6-8e67-d3d2b11fee12':
            username = 'H Aguirre';
            break;
          case '434ba226-08fe-4b0d-b6a6-7960e02ad174':
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
  //School
  const [showEditSchool, setShowEditSchool] = useState(false);
  const [editSchoolData, setEditSchoolData] = useState();

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
      console.log('schoolData: ', schoolData);
    }
  }, [schoolData]);

  const handleEditSchool = (school) => {
    setEditSchoolData(school);
    setShowEditSchool(true);
  };
  const handleSchoolCancel = () => {
    setShowEditSchool(false);
    setEditSchoolData();
  };
  const handleSchoolSubmit = () => {
    setShowEditSchool(false);
    setEditSchoolData();
  };

  // ================================================================================================================
  //Professional Sports
  const [sportsData, setSportsData] = useState([]);
  const [editSportData, setEditSportData] = useState([]);
  const [professionalData, setProfessionalData] = useState([]);
  const [clubData, setClubData] = useState([]);

  useEffect(() => {
    try {
      const fetchProfessionalSports = async () => {
        const professionalSportsData = await API.graphql({
          query: listProfessionalSports,
        });

        setSportsData(professionalSportsData.data.listProfessionalSports.items);
      };

      fetchProfessionalSports();
    } catch (e) {
      console.log(e);
    }
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
        {showEditSchool && (
          <EditSchool
            onFormSubmit={handleSchoolSubmit}
            onFormCancel={handleSchoolCancel}
            currentUser={currentUserName}
            onCloseEditSchool={handleSchoolCancel}
            highSchoolData={highSchoolData}
            collegeData={collegeData}
            school={editSchoolData}
          />
        )}
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
            highSchoolData={highSchoolData}
            collegeData={collegeData}
            schoolData={schoolData}
            sportsData={sportsData}
            professionalData={professionalData}
            clubData={clubData}
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
            professionalData={professionalData}
            clubData={clubData}
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
            schoolData={schoolData}
            highSchoolData={highSchoolData}
            collegeData={collegeData}
            professionalData={professionalData}
            clubData={clubData}
            onEditProfessionalSport={(sport) =>
              handleAddProfessionalSport(sport)
            }
            onEditSchool={handleEditSchool}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default withAuthenticator(App, {
  hideSignUp: true,
});
