import React, { useEffect, useState } from 'react';
import './EditEntry.css';
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
  Card,
  Button,
  Alert,
  TextAreaField,
} from '@aws-amplify/ui-react';

import { API, graphql } from 'aws-amplify';
import { Storage } from 'aws-amplify';
import { getHallOfFame } from '../graphql/queries';
import { saveImage } from './SaveImage';
import updateHallOfFameMutation from './updateHallofFameMutation';
import updateProfessionalTeamMutation from './updateProfessionalTeamMutation';
import updateSchoolSportMutation from './updateSchoolSportMutation';
import updateVenueMutation from './updateVenueMutation';
import { IoCloseOutline } from 'react-icons/io5';

export default function EditEntry(props) {
  const [newName, setNewName] = useState(() => {
    if (props.entry.name) {
      return props.entry.name;
    }
    return '';
  });
  const [alertName, setAlertName] = useState(false);
  const [entryType, setEntryType] = useState(() => {
    if (props.entry.entryType) {
      return props.entry.entryType;
    }
    return '';
  });
  const [notableAchievements, setNotableAchievements] = useState([]);
  const [sportType, setSportType] = useState(() => {
    if (props.entry.sport) {
      return props.entry.sport;
    }
    return '';
  });

  const [currentImages, setCurrentImages] = useState([]);
  const [wins, setWins] = useState([]);
  const [showSubmit, setShowSubmit] = useState(false);
  const [expandedEntryType, setExpandedEntryType] = useState(true);
  const [description, setDescription] = useState(() => {
    if (props.entry.description) {
      return props.entry.description;
    }
    return '';
  });

  const handleCloseEntry = (e) => {
    if (
      e.target.classList.contains('add-edit') ||
      e.target.classList.contains('close-icon')
    ) {
      const addViewContainer = document.querySelector('.add-edit');
      addViewContainer.classList.add('add-edit-reverse');

      addViewContainer.addEventListener('animationend', () => {
        props.onCloseEntry();
      });
    }
  };

  const handleImageListChange = (filesList) => {
    console.log('handleImageListChange: ', filesList);
    setCurrentImages(filesList);
  };

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
  const handleFormCancel = (event) => {
    event.preventDefault();
    //handle submit canceling
  };

  const handleSubmit = async (event, props) => {
    switch (event.target.entryType.value) {
      case 'Hall of Fame':
        updateHallOfFameMutation(
          event,
          props,
          sportType,
          notableAchievements,
          currentImages
        );
        break;
      case 'Professional Team':
        await updateProfessionalTeamMutation(
          event,
          props,
          sportType,
          currentImages
        );
        break;
      case 'School':
        await updateSchoolSportMutation(
          event,
          props,
          sportType,
          wins,
          currentImages
        );
        break;
      case 'Venue':
        await updateVenueMutation(event, props, currentImages);
        break;
      default:
        break;
    }
  };

  const onSportTypeChange = (event) => {
    event.preventDefault();
    if (event.target.name === 'selectedSport') {
      setSportType(event.target.value);
      console.log('sportType: ', event.target.value);
    } else if (event.target.name === 'addedSport') {
      setSportType(event.target.value);
    }
  };

  //YEAR START ================================================================
  const [yearStart, setYearStart] = useState(() => {
    if (props.entry.yearStart) {
      return props.entry.yearStart;
    }
    return '';
  });
  const onYearStartChange = (event) => {
    event.preventDefault();
    if (event.target.name === 'startYear') {
      setYearStart(event.target.value);
    }
  };
  //YEAR END ==================================================================
  const [yearEnd, setYearEnd] = useState(() => {
    if (props.entry.yearEnd) {
      return props.entry.yearEnd;
    }
    return '';
  });
  const onYearEndChange = (event) => {
    event.preventDefault();
    if (event.target.name === 'endYear') {
      setYearEnd(event.target.value);
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
      if (newName === '') {
        setAlertName(true);
        setTimeout(() => {
          setAlertName(false);
        }, 4000);
        setExpandedEntryType(false);
        return;
      }
      setExpandedEntryType(true);
      setAlertName(false);
      setShowSubmit(true);
    }
  };

  return (
    <Flex className='add-edit'>
      <Flex className='add-edit-card-container'>
        <Flex className='add-edit-card'>
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
            Edit Entry
          </Heading>
          <form
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
              }
            }}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
              props.onFormSubmit();
            }}
          >
            <Heading level={6} marginTop={'1em'}>
              Name
            </Heading>
            {alertName && <Alert variant='error'>Name is required</Alert>}
            <TextField
              name='name'
              onChange={(e) => {
                setNewName(e.target.value);
                checkEntryNameType(e);
              }}
              defaultValue={props.entry.name || ''}
              placeholder={
                entryType === 'School'
                  ? 'Team Name or Nick Name'
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
              defaultValue={props.entry.entryType}
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
                      initYear={props.entry.inductionYear || ''}
                      min={1800}
                      max={2023}
                    />
                  </Flex>
                )}

                {entryType === 'School' && (
                  <Flex direction={'column'} gap={'0'}>
                    <Heading level={6} marginTop={'1em'}>
                      School
                    </Heading>
                    <SelectField
                      name='school'
                      placeholder='School'
                      defaultValue={
                        props.schoolData.find(
                          (school) => school.id === props.entry.school
                        ).name || ''
                      }
                    >
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

                {entryType === 'Professional Team' ||
                entryType === 'School' ||
                entryType === 'Hall of Fame' ? (
                  <Flex direction={'column'} gap={'0'}>
                    <Heading level={6} marginTop={'1em'}>
                      Sport
                    </Heading>
                    <SportSelection
                      name='sport'
                      initSport={`${props.entry.sport}` || ''}
                      onChange={onSportTypeChange}
                    />
                  </Flex>
                ) : null}

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
                        min={1800}
                        max={2023}
                        initYear={props.entry.startYear || ''}
                        onChange={onYearStartChange}
                        showChange={true}
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
                        max={2023}
                        initYear={props.entry.endYear || ''}
                        showChange={true}
                        onChange={onYearEndChange}
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
                      name='Location'
                      defaultValue={props.entry.location || ''}
                      placeholder='Enter the location of the venue'
                    />
                  </div>
                )}
                {entryType === 'Hall of Fame' && (
                  <Flex direction={'column'} gap={'0'}>
                    <NoteAchievement
                      onAchievementListChange={handleAchievementListChange}
                      achievementList={props.entry.notableAchievements || []}
                    />
                  </Flex>
                )}

                <Heading level={6} marginTop={'1em'}>
                  Description
                </Heading>
                <TextAreaField
                  name='description'
                  defaultValue={props.entry.description || ''}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  placeholder='Description'
                />

                {entryType === 'School' && (
                  <Win
                    onWinListChange={handleWinListChange}
                    initWins={props.entry.wins || []}
                  />
                )}

                <Heading level={6} marginTop={'1em'}>
                  Additional Notes
                </Heading>
                <TextAreaField
                  name='notes'
                  defaultValue={props.entry.notes || ''}
                  placeholder='Additional notes will not be used for display purposes, only internal use'
                />

                <FileBrowser
                  heading='Upload Images for Gallery'
                  onFilesListChange={handleImageListChange}
                  viewIds={props.entry.images || []}
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
