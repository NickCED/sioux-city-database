import React from 'react';
import { useState } from 'react';
import FileBrowser from './FileBrowser';
import {
  Flex,
  Button,
  Heading,
  TextField,
  TextAreaField,
  Divider,
} from '@aws-amplify/ui-react';
import { IoCloseOutline } from 'react-icons/io5';
import { YearSelector } from './YearSelector';
import './EditSchool.css';

import updateSchoolMutation from './updateSchoolMutation';

export default function EditSchool(props) {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [currentLogo, setCurrentLogo] = useState();
  const [currentImagesToDelete, setCurrentImagesToDelete] = useState([]);
  const handleLogoListChange = (filesList) => {
    console.log(filesList.length);
    if (filesList.length < 1) {
      setCurrentLogo('');

      setHasChanged(true);
      return;
    }
    setCurrentLogo(filesList[0] || null);
    console.log('filesList', filesList);
    setHasChanged(true);
  };
  const handleLogoListDelete = (filesList) => {
    console.log(filesList.length);
    if (filesList.length < 1) {
      setCurrentImagesToDelete([]);
      setHasChanged(true);
      return;
    }
    setCurrentImagesToDelete(filesList);
    console.log('filesList', filesList);
    setHasChanged(true);
  };

  const handleSubmit = async (e, props) => {
    setHasSubmitted(true);
    let awaitEvent;
    try {
      awaitEvent = await updateSchoolMutation(
        e,
        props,
        currentLogo,
        currentImagesToDelete
      );
      const addViewContainer = document.querySelector('.edit-school');
      addViewContainer.classList.add('edit-school-reverse');

      addViewContainer.addEventListener('animationend', () => {
        props.onFormSubmit();
      });
    } catch (error) {
      console.log('error', error);
      window.alert('Error updating school');
      setHasSubmitted(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const [hasChanged, setHasChanged] = React.useState(false);
  const [showSubmit, setShowSubmit] = React.useState(false);
  const handleCloseEditSchool = (e) => {
    if (
      e.target.classList.contains('edit-school') ||
      e.target.classList.contains('close-icon') ||
      e.target.classList.contains('cancel-edit-school')
    ) {
      const addViewContainer = document.querySelector('.edit-school');
      addViewContainer.classList.add('edit-school-reverse');

      addViewContainer.addEventListener('animationend', () => {
        props.onCloseEditSchool();
      });
    }
  };
  const [yearStart, setYearStart] = useState(() => {
    if (props.school.startYear) {
      return props.school.startYear;
    }
    return '';
  });
  const onYearStartChange = (event) => {
    event.preventDefault();
    if (event.target.name === 'startYear') {
      setYearStart(event.target.value);
      event.target.value !== props.school.yearStart && setHasChanged(true);
      event.target.value === props.school.yearStart && setHasChanged(false);
    }
  };
  //YEAR END ==================================================================
  const [yearEnd, setYearEnd] = useState(() => {
    if (props.school.endYear) {
      return props.school.endYear;
    }
    return '';
  });
  const onYearEndChange = (event) => {
    event.preventDefault();
    if (event.target.name === 'endYear') {
      event.target.value !== props.school.yearEnd && setHasChanged(true);
      event.target.value === props.school.yearEnd && setHasChanged(false);

      setYearEnd(event.target.value);
    }
  };

  const handleLocationInputChange = (event) => {
    event.preventDefault();
    if (event.target.name === 'location') {
      event.target.value !== props.school.location && setHasChanged(true);
      event.target.value === props.school.location && setHasChanged(false);
    }
  };
  const handleDescriptionChange = (event) => {
    event.preventDefault();
    if (event.target.name === 'description') {
      event.target.value !== props.school.description && setHasChanged(true);
      event.target.value === props.school.description && setHasChanged(false);
    }
  };
  const handleNotesChange = (event) => {
    event.preventDefault();
    if (event.target.name === 'notes') {
      event.target.value !== props.school.notes && setHasChanged(true);
      event.target.value === props.school.notes && setHasChanged(false);
    }
  };

  return (
    <Flex className='edit-school'>
      <Flex className='edit-school-card-container'>
        <Flex className='edit-school-card'>
          <Button
            size='small'
            border={'none'}
            className='close-icon'
            onClick={handleCloseEditSchool}
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
            Edit {props.school.name}
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
                  showChange={true}
                  max={currentYear}
                  unknown={true}
                  initYear={
                    props.school.startYear === 0
                      ? 0
                      : props.school.startYear || ''
                  }
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
                  min={yearStart || props.school.startYear || 1800}
                  max={currentYear}
                  active={true}
                  unknown={true}
                  showChange={true}
                  initYear={
                    props.school.endYear === 0
                      ? 0
                      : props.school.endYear
                      ? props.school.endYear
                      : ''
                  }
                  onChange={onYearEndChange}
                />
              </Flex>
            </Flex>
            <FileBrowser
              singleFile={true}
              onFilesListChange={handleLogoListChange}
              onDeletedFilesListChange={handleLogoListDelete}
              heading='Add A Logo Image'
              viewIds={[props.school.logoUrl] || []}
              onViewIds={(file) => setCurrentLogo(file)}
              placeholder='Enter a title to use for the image'
            />
            <Heading level={6} marginTop={'1em'}>
              Location
            </Heading>
            <TextField
              name='location'
              placeholder='Enter the location of the school'
              defaultValue={props.school.location}
              onChange={handleLocationInputChange}
            />
            <Heading level={6} marginTop={'1em'}>
              Description
            </Heading>
            <TextAreaField
              name='description'
              placeholder='Description'
              onChange={handleDescriptionChange}
              defaultValue={props.school.description}
            />
            <Heading level={6} marginTop={'1em'}>
              Additional Notes
            </Heading>
            <TextAreaField
              name='notes'
              placeholder='Additional notes will not be used for display purposes, only internal use'
              onChange={handleNotesChange}
              defaultValue={props.school.notes}
            />

            <Divider
              style={{
                margin: '1rem 0',
              }}
            ></Divider>
            <Flex justifyContent={'space-between'}>
              <Button
                className='cancel-edit-school'
                onClick={handleCloseEditSchool}
              >
                Cancel
              </Button>
              <Button isDisabled={!hasChanged || hasSubmitted} type='submit'>
                Submit
              </Button>
            </Flex>
          </form>
        </Flex>
      </Flex>
    </Flex>
  );
}
