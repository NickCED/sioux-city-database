import { useState } from 'react';
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
  Text,
  Button,
  Alert,
  TextAreaField,
  Autocomplete,
} from '@aws-amplify/ui-react';

import updateHallOfFameMutation from './updateHallofFameMutation';
import updateProfessionalTeamMutation from './updateProfessionalTeamMutation';
import updateSchoolSportMutation from './updateSchoolSportMutation';
import updateVenueMutation from './updateVenueMutation';
import { IoCloseOutline } from 'react-icons/io5';

export default function EditEntry(props) {
  console.log('EditEntry props: ', props.entry);

  // State variables
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);
  const [newName, setNewName] = useState(() => {
    if (props.entry.name) {
      return props.entry.name;
    }
    return '';
  });
  const [alertName, setAlertName] = useState(false);
  const [notableAchievements, setNotableAchievements] = useState(() => {
    if (props.entry.notableAchievements) {
      return props.entry.notableAchievements;
    }
    return [];
  });
  const [addNewSport, setAddNewSport] = useState(false);
  const [sportType, setSportType] = useState(() => {
    if (props.entry.sport) {
      return props.entry.sport;
    }
    return '';
  });
  const [currentImages, setCurrentImages] = useState(() => {
    if (props.entry.images) {
      return props.entry.images;
    }
    return [];
  });
  const [currentImagesToDelete, setCurrentImagesToDelete] = useState([]);
  const [showNoWinsDescription, setShowNoWinsDescription] = useState(false);
  const [wins, setWins] = useState(() => {
    if (props.entry.wins) {
      setShowNoWinsDescription(false);
      return props.entry.wins;
    }
    setShowNoWinsDescription(true);
    return [];
  });
  const [showSubmit, setShowSubmit] = useState(false);
  const [expandedEntryType, setExpandedEntryType] = useState(true);
  const [description, setDescription] = useState(() => {
    if (props.entry.description) {
      return props.entry.description;
    }
    return '';
  });

  // Event handlers
  const handleImageListChange = (filesList) => {
    console.log('handleImageListChange: ', filesList);
    setCurrentImages(filesList);
    setHasChanged(true);
  };

  const handleDeleteImageListChange = (deleteFilesList) => {
    console.log('handleDeleteImageListChange: ', deleteFilesList);
    setCurrentImagesToDelete(deleteFilesList);
    setHasChanged(true);
  };

  const handleReorder = () => {
    setHasChanged(true);
  };

  const handleAchievementListChange = (notableAchievements) => {
    const notableAchievementsArray = notableAchievements.map((achievement) =>
      JSON.stringify(achievement)
    );
    notableAchievementsArray !== props.entry.notableAchievements &&
      setHasChanged(true);
    notableAchievementsArray === props.entry.notableAchievements &&
      setHasChanged(false);
    setNotableAchievements(notableAchievementsArray);
  };

  // handle Win updates for School entries and Professional Team entries

  const handleWinListChange = (wins) => {
    if (wins.length === 0 || wins === undefined) {
      setShowNoWinsDescription(true);
    } else {
      setShowNoWinsDescription(false);
    }
    const winsArray = wins.map((win) => JSON.stringify(win));
    winsArray !== props.entry.wins && setHasChanged(true);
    winsArray === props.entry.wins && setHasChanged(false);
    setWins(winsArray);
  };

  // Other variables
  const currentYear = new Date().getFullYear();
  const entryType = props.entry.entryType ? props.entry.entryType : '';

  //=======================================================================================================
  // Form event handlers

  const handleFormCancel = (event) => {
    event.preventDefault();
    //handle submit canceling
  };
  const handleCloseEntry = (e) => {
    if (
      e.target.classList.contains('add-edit') ||
      e.target.classList.contains('close-icon') ||
      e.target.classList.contains('click-cancel')
    ) {
      const addViewContainer = document.querySelector('.add-edit');
      addViewContainer.classList.add('add-edit-reverse');

      addViewContainer.addEventListener('animationend', () => {
        props.onCloseEntry();
      });
    }
  };

  const handleSubmit = async (event, props) => {
    if (hasSubmitted) return;
    setHasSubmitted(true);
    let awaitEvent;
    console.log('handleSubmit: ', props);
    try {
      switch (entryType) {
        case 'Hall of Fame':
          console.log('Hall of Fame: ', props);
          awaitEvent = await updateHallOfFameMutation(
            event,
            props,
            sportType,
            notableAchievements,
            currentImages,
            currentImagesToDelete,
            addNewSport
          );
          break;
        case 'Professional Team':
          awaitEvent = await updateProfessionalTeamMutation(
            event,
            props,
            sportType,
            currentImages,
            currentImagesToDelete
          );
          break;
        case 'School':
          awaitEvent = await updateSchoolSportMutation(
            event,
            props,
            sportType,
            wins,
            currentImages,
            currentImagesToDelete,
            newName
          );
          break;
        case 'Venue':
          awaitEvent = await updateVenueMutation(
            event,
            props,
            currentImages,
            currentImagesToDelete
          );
          break;
        default:
          break;
      }
      const addViewContainer = document.querySelector('.add-edit');
      addViewContainer.classList.add('add-edit-reverse');

      addViewContainer.addEventListener('animationend', () => {
        props.onFormSubmit();
      });
    } catch (error) {
      window.alert("error: couldn't submit");
      setHasSubmitted(false);
    }
  };

  const onSportTypeChange = (event) => {
    event.preventDefault();
    console.log('onSportTypeChange: newName : ', newName);
    console.log('onSportTypeChange: sportType : ', sportType);
    if (event.target.value !== props.entry.sport) {
      setHasChanged(true);
    } else setHasChanged(false);

    if (
      newName.includes(sportType) &&
      sportType !== event.target.value &&
      sportType !== ''
    ) {
      const updatedSportName = newName.replace(sportType, event.target.value);
      setNewName(updatedSportName);
    }
    if (newName === '') {
      setNewName(
        `${event.target.value} : ${
          props.schoolData.find((school) => school.id === props.entry.school)
            .name
        }`
      );
    }

    if (event.target.name === 'selectedSport') {
      setSportType(event.target.value);
      event.target.value !== props.entry.sport && setHasChanged(true);
      event.target.value === props.entry.sport && setHasChanged(false);
    } else if (event.target.name === 'addedSport') {
      setSportType(event.target.value);
    }
  };
  //InductionYear ==============================================================

  const onInductionYearChange = (event) => {
    event.preventDefault();
    if (event.target.name === 'inductionYear') {
      event.target.value !== props.entry.inductionYear && setHasChanged(true);
      event.target.value === props.entry.inductionYear && setHasChanged(false);
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
      event.target.value !== props.entry.yearStart && setHasChanged(true);
      event.target.value === props.entry.yearStart && setHasChanged(false);
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
      event.target.value !== props.entry.yearEnd && setHasChanged(true);
      event.target.value === props.entry.yearEnd && setHasChanged(false);

      setYearEnd(event.target.value);
    }
  };

  const checkEntryNameType = (event) => {
    event.preventDefault();

    const name = event.target.value;
    const entryType = event.target.name;

    if (entryType === 'name') {
      if (
        (name === '' && entryType === 'School') ||
        (name !== '' && entryType !== '')
      ) {
        setExpandedEntryType(true);
        setAlertName(false);
        setShowSubmit(true);
      }
    } else if (entryType === 'entryType') {
      if (name === 'School' || newName !== '') {
        setExpandedEntryType(true);
        setAlertName(false);
        setShowSubmit(true);
      } else {
        setAlertName(true);
        setTimeout(() => {
          setAlertName(false);
        }, 4000);
        setExpandedEntryType(false);
      }
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
                setNewName(e.target.value);
                checkEntryNameType(e);
                e.target.value !== props.entry.name && setHasChanged(true);
                e.target.value === props.entry.name && setHasChanged(false);
              }}
              value={newName || ''}
              placeholder={
                entryType === 'School'
                  ? 'Team Name or Nick Name'
                  : props.entryType === 'Professional Team'
                  ? 'Team Name or Nick Name'
                  : 'Name'
              }
            />
            <Heading level={6} marginTop={'1em'}>
              Entry Type
            </Heading>
            <Text
              style={{
                margin: '.5rem',
              }}
            >
              {entryType}
            </Text>

            {expandedEntryType && (
              <div>
                {entryType === 'Hall of Fame' && (
                  <Flex direction={'column'} gap={'0'}>
                    <Heading level={6} marginTop={'1em'}>
                      Induction Year
                    </Heading>
                    <YearSelector
                      selectName='inductionYear'
                      initYear={props.entry.inductionYear || ''}
                      min={1800}
                      max={currentYear}
                      onChange={onInductionYearChange}
                      showChange={true}
                    />
                  </Flex>
                )}

                {entryType === 'School' && (
                  <Flex direction={'column'} gap={'0'}>
                    <Heading level={6} marginTop={'1em'}>
                      School
                    </Heading>
                    <Text style={{ margin: '.5rem' }}>
                      {
                        props.schoolData.find(
                          (school) => school.id === props.entry.school
                        ).name
                      }
                    </Text>
                  </Flex>
                )}

                {entryType === 'School' || entryType === 'Hall of Fame' ? (
                  <Flex direction={'column'} gap={'0'}>
                    <Heading level={6} marginTop={'1em'}>
                      Sport
                    </Heading>
                    <SportSelection
                      name='sport'
                      initSport={`${props.entry.sport}` || ''}
                      onChange={onSportTypeChange}
                      onAddSport={setAddNewSport}
                    />
                  </Flex>
                ) : null}

                {entryType === 'Professional Team' && (
                  <Flex direction={'column'} gap={'0'}>
                    <Heading level={6} marginTop={'1em'}>
                      Professional Sport or Club
                    </Heading>
                    <Text style={{ margin: '.5rem' }}>
                      {
                        props.sportsData.find(
                          (sport) => sport.id === props.entry.sport
                        ).sport
                      }
                    </Text>
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
                        min={1800}
                        max={currentYear}
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
                        min={yearStart || props.entry.startYear || 1800}
                        max={currentYear}
                        initYear={props.entry.endYear || ''}
                        active={true}
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
                      name='location'
                      defaultValue={props.entry.location || ''}
                      placeholder='Enter the location of the venue'
                      onChange={(e) => {
                        e.target.value !== props.entry.location &&
                          setHasChanged(true);
                        e.target.value === props.entry.location &&
                          setHasChanged(false);
                      }}
                    />
                  </div>
                )}
                {entryType === 'Hall of Fame' && (
                  <Flex direction={'column'} gap={'0'}>
                    <NoteAchievement
                      onAchievementListChange={handleAchievementListChange}
                      achievementList={notableAchievements || []}
                      onReorder={handleReorder}
                    />
                  </Flex>
                )}

                <Heading level={6} marginTop={'1em'}>
                  {entryType === 'School'
                    ? 'Without Wins Description'
                    : 'Description'}
                </Heading>
                <TextAreaField
                  name='description'
                  defaultValue={props.entry.description || ''}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    e.target.value !== props.entry.description &&
                      setHasChanged(true);
                    e.target.value === props.entry.description &&
                      setHasChanged(false);
                  }}
                  placeholder='Description'
                />

                {entryType === 'School' && (
                  <Win
                    onWinListChange={handleWinListChange}
                    winList={props.entry.wins || []}
                    onDescriptionChange={(e) => {
                      setHasChanged(true);
                    }}
                    onReorder={handleReorder}
                  />
                )}

                <Heading level={6} marginTop={'1em'}>
                  Additional Notes
                </Heading>
                <TextAreaField
                  name='notes'
                  defaultValue={props.entry.notes || ''}
                  placeholder='Additional notes will not be used for display purposes, only internal use'
                  onChange={(e) => {
                    e.target.value !== props.entry.notes && setHasChanged(true);
                    e.target.value === props.entry.notes &&
                      setHasChanged(false);
                  }}
                />

                <FileBrowser
                  heading='Upload Images for Gallery'
                  onFilesListChange={handleImageListChange}
                  onDeletedFilesListChange={handleDeleteImageListChange}
                  viewIds={props.entry.images || []}
                  onViewIds={(files) => setCurrentImages(files)}
                />
              </div>
            )}
            <Divider
              style={{
                margin: '1rem 0',
              }}
            ></Divider>
            <Flex justifyContent={'space-between'}>
              <Button className='click-cancel' onClick={handleCloseEntry}>
                Cancel
              </Button>
              <Button
                isDisabled={!hasChanged}
                isLoading={hasSubmitted}
                type='submit'
              >
                Submit
              </Button>
            </Flex>
          </form>
        </Flex>
      </Flex>
    </Flex>
  );
}
