import React, { useState } from 'react';
import './AddEntry.css';
import { YearSelector } from './YearSelector';
import SportSelection from './SportSelection';
import NoteAchievement from './NoteAchievement';
import FileBrowser from './FileBrowser';
import Win from './Win';
import {
  Flex,
  Heading,
  TextField,
  Divider,
  SelectField,
  Button,
  Alert,
  TextAreaField,
} from '@aws-amplify/ui-react';
import { IoCloseOutline } from 'react-icons/io5';

// import { Storage } from 'aws-amplify';
// import { createVenue } from '../graphql/mutations';
// import { createSchool } from '../graphql/mutations';

// import { createProfessionalSport } from '../graphql/mutations';
// import { createProfessionalTeam } from '../graphql/mutations';
// import { createHallOfFame } from '../graphql/mutations';
// import { createSport } from '../graphql/mutations';

import createHallOfFameMutation from './createHallofFameMutation';
import createSchoolSportMutation from './createSchoolSportMutation';
import createProfessionalTeamMutation from './createProfessionalTeamMutation';
import createVenueMutation from './createVenueMutation';

export default function AddEntry(props) {
  const [alertName, setAlertName] = useState(false);
  const [name, setName] = useState('');
  const [entryType, setEntryType] = useState('');
  const [yearStart, setYearStart] = useState();
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [notableAchievements, setNotableAchievements] = useState([]);
  const [wins, setWins] = useState([]);
  const [sportType, setSportType] = useState('');
  const [professionalSport, setProfessionalSport] = useState('');
  const [currentImages, setCurrentImages] = useState([]);
  const [showSubmit, setShowSubmit] = useState(false);
  const [expandedEntryType, setExpandedEntryType] = useState(false);

  //====================================================================================================
  const handleCloseEntry = (e) => {
    if (
      e.target.classList.contains('add-entry') ||
      e.target.classList.contains('close-icon')
    ) {
      const addViewContainer = document.querySelector('.add-entry');
      addViewContainer.classList.add('add-entry-reverse');

      addViewContainer.addEventListener('animationend', () => {
        props.onCloseEntry();
      });
    }
  };
  // use state handlers ======================================
  const handleAchievementListChange = (notableAchievements) => {
    console.log('handleAchievementListChange: ', notableAchievements);
    const notableAchievementsArray = notableAchievements.map((achievement) =>
      JSON.stringify(achievement)
    );
    console.log('handleAchievementListChange: ', notableAchievementsArray);
    setNotableAchievements(notableAchievementsArray);
  };
  const handleWinListChange = (wins) => {
    const winsArray = wins.map((win) => JSON.stringify(win));
    setWins(winsArray);
  };
  const handleImageListChange = (filesList) => {
    console.log('handleImageListChange: ', filesList);
    setCurrentImages(filesList);
  };
  const handleLogoListChange = (filesList) => {
    console.log('handleLogoListChange: ', filesList);
  };
  const handleFormCancel = (event) => {
    event.preventDefault();
    //handle submit canceling
  };

  const onSportTypeChange = (event) => {
    event.preventDefault();
    if (event.target.name === 'selectedSport') {
      setSportType(event.target.value);
    } else if (event.target.name === 'addedSport') {
      setSportType(event.target.value);
    }
  };

  const onYearStartChange = (event) => {
    event.preventDefault();
    console.log('onYearStartChange: ', event.target.value);
    if (event.target.name === 'startYear') {
      setYearStart(event.target.value);
    }
  };

  const checkEntryNameType = (event) => {
    event.preventDefault();

    if (event.target.name === 'name') {
      if (event.target.value === '' && entryType === 'School') {
        setExpandedEntryType(true);
        setAlertName(false);
        setShowSubmit(true);
        return;
      }
      if (event.target.value !== '' && entryType !== '') {
        setExpandedEntryType(true);
        setAlertName(false);
        setShowSubmit(true);
        return;
      }
    } else if (event.target.name === 'entryType') {
      if (event.target.value === 'School') {
        setExpandedEntryType(true);
        setAlertName(false);
        setShowSubmit(true);
        return;
      }
      if (name === '') {
        setAlertName(true);
        setTimeout(() => {
          setAlertName(false);
        }, 4000);
        setExpandedEntryType(false);
        return;
      }
      if (event.target.value === '') {
        setExpandedEntryType(false);
        setShowSubmit(false);
        return;
      }
      setExpandedEntryType(true);
      setAlertName(false);
      setShowSubmit(true);
    }
  };
  const handleSubmit = async (event, props) => {
    console.log('handleSubmit: ', event.target.school);
    if (
      event.target.entryType.value === 'School' &&
      event.target.school.value === ''
    ) {
      alert('Please select a school');
      return;
    }

    switch (event.target.entryType.value) {
      case 'Hall of Fame':
        createHallOfFameMutation(
          event,
          props,
          sportType,
          notableAchievements,
          currentImages
        );
        break;
      case 'Professional Team':
        await createProfessionalTeamMutation(
          event,
          props,
          professionalSport,
          currentImages
        );
        break;
      case 'School':
        await createSchoolSportMutation(
          event,
          props,
          sportType,
          wins,
          currentImages
        );
        break;
      case 'Venue':
        await createVenueMutation(event, props, currentImages);
        break;
      default:
        break;
    }
    props.onFormSubmit();
  };

  //===============================================================================================
  //===============================================================================================

  return (
    <Flex className='add-entry'>
      <Flex className='add-entry-card-container'>
        <Flex className='add-entry-card'>
          <Button
            size='small'
            border={'none'}
            className='close-icon'
            onClick={handleCloseEntry}
            style={{
              position: 'absolute',
              alignSelf: 'flex-end',
              cursor: 'pointer',
              margin: '0.5rem 0.5rem 0 0',
            }}
          >
            <IoCloseOutline size={'1.5rem'} pointerEvents={'none'} />
          </Button>
          <Heading level={5} style={{ textAlign: 'center' }}>
            Add Entry
          </Heading>
          <form
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
              }
            }}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e, props);
            }}
          >
            <Heading level={6} marginTop={'1em'}>
              Name
            </Heading>
            {alertName && <Alert variant='error'>Name is required</Alert>}
            <TextField
              name='name'
              onChange={(e) => {
                setName(e.target.value);
                checkEntryNameType(e);
              }}
              placeholder={
                entryType === 'School'
                  ? 'Team Name or Nick Name (optional)'
                  : entryType === 'Professional Team'
                  ? 'Team Name or Nick Name'
                  : 'Name'
              }
            />
            <Heading level={6} marginTop={'1em'}>
              Entry Type
            </Heading>
            <SelectField
              name='entryType'
              placeholder='Entry Type'
              onChange={(e) => {
                setEntryType(e.target.value);
                checkEntryNameType(e);
              }}
            >
              <option value='Hall of Fame'>Hall of Fame</option>
              <option value='Professional Team'>
                Professional Team or Club
              </option>
              <option value='School'>School Sport</option>
              <option value='Venue'>Sports Venue</option>
              {/*expand entry type based on selection*/}
            </SelectField>
            {expandedEntryType && (
              <div>
                <Divider
                  style={{
                    margin: '1rem 0',
                  }}
                ></Divider>
                {entryType === 'Hall of Fame' && (
                  <Flex direction={'column'} gap={'0'}>
                    <Heading level={6} marginTop={'1em'}>
                      Induction Year
                    </Heading>
                    <YearSelector
                      selectName='inductionYear'
                      min={1800}
                      max={currentYear}
                    />
                  </Flex>
                )}
                {entryType === 'School' && (
                  <Flex direction={'column'} gap={'0'}>
                    <Heading level={6} marginTop={'1em'}>
                      School
                    </Heading>
                    <SelectField name='school' placeholder='School'>
                      <optgroup label='High Schools'>
                        {props.highSchoolData.map((school) => (
                          <option key={school.id} value={school.id}>
                            {school.name}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label='Colleges'>
                        {props.collegeData.map((school) => (
                          <option key={school.id} value={school.id}>
                            {school.name}
                          </option>
                        ))}
                      </optgroup>
                    </SelectField>
                  </Flex>
                )}
                {entryType === 'School' || entryType === 'Hall of Fame' ? (
                  <Flex direction={'column'} gap={'0'}>
                    <Heading level={6} marginTop={'1em'}>
                      Sport
                    </Heading>
                    <SportSelection name='sport' onChange={onSportTypeChange} />
                  </Flex>
                ) : null}
                {entryType === 'Professional Team' && (
                  <Flex direction={'column'} gap={'0'}>
                    <Heading level={6} marginTop={'1em'}>
                      Professional Sport or Club
                    </Heading>
                    <SelectField
                      name='sport'
                      placeholder='Select Sport or Club Type'
                      onChange={(e) => {
                        setProfessionalSport(e.target.value);
                      }}
                    >
                      <optgroup label='Sports'>
                        {props.professionalData.map((sport) => (
                          <option key={sport.id} value={sport.id}>
                            {sport.sport}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label='Clubs'>
                        {props.clubData.map((club) => (
                          <option key={club.id} value={club.id}>
                            {club.sport}
                          </option>
                        ))}
                      </optgroup>
                    </SelectField>
                  </Flex>
                )}
                {entryType === 'School' ||
                entryType === 'Professional Team' ||
                entryType === 'Venue' ? (
                  <Flex>
                    <Flex
                      direction={'column'}
                      gap={'0'}
                      textAlign={'center'}
                      grow={1}
                    >
                      <Heading level={6} marginTop={'1em'}>
                        Starting Year
                      </Heading>
                      <YearSelector
                        selectName='startYear'
                        onChange={onYearStartChange}
                        min={1800}
                        max={currentYear}
                      />
                    </Flex>
                    <Flex
                      direction={'column'}
                      gap={'0'}
                      textAlign={'center'}
                      grow={1}
                    >
                      <Heading level={6} marginTop={'1em'}>
                        Ending Year
                      </Heading>
                      <YearSelector
                        selectName='endYear'
                        min={yearStart}
                        max={currentYear}
                        active={true}
                      />
                    </Flex>
                  </Flex>
                ) : null}
                {entryType === 'Venue' && (
                  <div>
                    <Heading level={6} marginTop={'1em'}>
                      Location
                    </Heading>
                    <TextField
                      name='location'
                      placeholder='Enter the location of the venue'
                    />
                  </div>
                )}
                {entryType === 'Hall of Fame' && (
                  <Flex direction={'column'} gap={'0'}>
                    <NoteAchievement
                      onAchievementListChange={handleAchievementListChange}
                    />
                  </Flex>
                )}
                <Heading level={6} marginTop={'1em'}>
                  Description
                </Heading>
                <TextAreaField name='description' placeholder='Description' />
                {entryType === 'School' && (
                  <Win onWinListChange={handleWinListChange} />
                )}
                <Heading level={6} marginTop={'1em'}>
                  Additional Notes
                </Heading>
                <TextAreaField
                  name='notes'
                  placeholder='Additional notes will not be used for display purposes, only internal use'
                />
                <FileBrowser
                  heading='Upload Images for Gallery'
                  onFilesListChange={handleImageListChange}
                />
              </div>
            )}
            <Divider
              style={{
                margin: '1rem 0',
              }}
            ></Divider>
            <Flex justifyContent={'space-between'}>
              <Button
                onClick={(e) => {
                  handleFormCancel(e);
                  props.onFormCancel();
                }}
              >
                Cancel
              </Button>
              <Button isDisabled={!showSubmit} type='submit'>
                Submit
              </Button>
            </Flex>
          </form>
        </Flex>
      </Flex>
    </Flex>
  );
}
