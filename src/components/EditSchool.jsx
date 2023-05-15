import React from 'react';
import { useState } from 'react';
import FileBrowser from './FileBrowser';
import {
  Flex,
  Button,
  Heading,
  Text,
  TextField,
  TextAreaField,
  Divider,
} from '@aws-amplify/ui-react';
import { IoCloseOutline } from 'react-icons/io5';
import { YearSelector } from './YearSelector';
import './EditSchool.css';
import missingImage from '../images/ImagePlaceHolder.png';

export default function EditSchool(props) {
  const [currentLogo, setCurrentLogo] = useState();
  const handleLogoListChange = (filesList) => {
    setCurrentLogo(filesList[0] || null);
    setHasChanged(true);
  };
  const handleSubmit = (e, props) => {};
  const handleFormCancel = (e) => {};

  const currentYear = new Date().getFullYear();
  const [hasChanged, setHasChanged] = React.useState(false);
  const [showSubmit, setShowSubmit] = React.useState(false);
  const handleCloseEditSchool = (e) => {
    if (
      e.target.classList.contains('edit-school') ||
      e.target.classList.contains('close-icon')
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
    if (props.school.yearEnd) {
      return props.school.yearEnd;
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
                  max={currentYear}
                  initYear={props.school.startYear || ''}
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
                  active={props.school.endYear ? true : false}
                  showChange={true}
                  initYear={props.school.endYear || ''}
                  onChange={onYearEndChange}
                />
              </Flex>
            </Flex>
            <FileBrowser
              singleFile={true}
              onFilesListChange={handleLogoListChange}
              heading='Add A Logo Image'
              placeholder='Enter a title to use for the image'
            />
            <Heading level={6} marginTop={'1em'}>
              Location
            </Heading>
            <TextField
              name='location'
              placeholder='Enter the location of the school'
            />
            <Heading level={6} marginTop={'1em'}>
              Description
            </Heading>
            <TextAreaField name='description' placeholder='Description' />
            <Heading level={6} marginTop={'1em'}>
              Additional Notes
            </Heading>
            <TextAreaField
              name='notes'
              placeholder='Additional notes will not be used for display purposes, only internal use'
            />

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
              <Button isDisabled={!hasChanged} type='submit'>
                Submit
              </Button>
            </Flex>
          </form>
        </Flex>
      </Flex>
    </Flex>
  );
}
