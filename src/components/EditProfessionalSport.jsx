import {
  Flex,
  Heading,
  Button,
  TextAreaField,
  Divider,
} from '@aws-amplify/ui-react';
import { YearSelector } from './YearSelector';
import { IoCloseOutline } from 'react-icons/io5';
import FileBrowser from './FileBrowser';
import { useState } from 'react';
import updateProfessionalSportMutation from './updateProfessionalSportMutation';
import './EditProfessionalSport.css';

export default function EditProfessionalSport(props) {
  console.log(props);
  const [currentImages, setCurrentImages] = useState([]);
  const [currentImagesToDelete, setCurrentImagesToDelete] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);
  const [sportName, setSportName] = useState(() => {
    if (props.data.sport) {
      return props.data.sport;
    }
    return '';
  });

  const [yearStart, setYearStart] = useState(() => {
    if (props.data.yearStart) {
      return props.data.yearStart;
    }
    return '';
  });
  const onYearStartChange = (event) => {
    event.preventDefault();
    if (event.target.name === 'startYear') {
      setYearStart(event.target.value);
      event.target.value !== props.data.yearStart && setHasChanged(true);
      event.target.value === props.data.yearStart && setHasChanged(false);
    }
  };
  //YEAR END ==================================================================
  const [yearEnd, setYearEnd] = useState(() => {
    if (props.data.endYear) {
      return props.data.endYear;
    }
    return '';
  });
  const onYearEndChange = (event) => {
    event.preventDefault();
    if (event.target.name === 'endYear') {
      event.target.value !== props.data.yearEnd && setHasChanged(true);
      event.target.value === props.data.yearEnd && setHasChanged(false);

      setYearEnd(event.target.value);
    }
  };

  const handleDescriptionChange = (event) => {
    event.preventDefault();
    if (event.target.name === 'description') {
      event.target.value !== props.data.description && setHasChanged(true);
      event.target.value === props.data.description && setHasChanged(false);
    }
  };
  const handleNotesChange = (event) => {
    event.preventDefault();
    if (event.target.name === 'notes') {
      event.target.value !== props.data.notes && setHasChanged(true);
      event.target.value === props.data.notes && setHasChanged(false);
    }
  };
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
  const handleCloseEditProfessionalSport = (e) => {
    if (
      e.target.classList.contains('add-edit-professional-sport') ||
      e.target.classList.contains('close-icon') ||
      e.target.classList.contains('cancel-edit-professional-sport')
    ) {
      const addViewContainer = document.querySelector(
        '.add-edit-professional-sport'
      );
      addViewContainer.classList.add('add-edit-professional-sport-reverse');

      addViewContainer.addEventListener('animationend', () => {
        props.onCloseEdit();
      });
    }
  };
  const handleSubmit = async (e, props) => {
    setHasSubmitted(true);
    let awaitEvent;
    try {
      awaitEvent = await updateProfessionalSportMutation(
        e,
        props,
        currentImages,
        currentImagesToDelete
      );
      const addViewContainer = document.querySelector(
        '.add-edit-professional-sport'
      );
      addViewContainer.classList.add('add-edit-professional-sport-reverse');

      addViewContainer.addEventListener('animationend', () => {
        props.onFormSubmit();
      });
    } catch (error) {
      console.log('error', error);
      window.alert('Error updating sport');
      setHasSubmitted(false);
    }
  };
  return (
    <Flex className='add-edit-professional-sport'>
      <Flex className='add-edit-professional-sport-card-container'>
        <Flex className='add-edit-professional-sport-card'>
          <Button
            size='small'
            border={'none'}
            className='close-icon'
            onClick={handleCloseEditProfessionalSport}
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
            Edit {sportName}
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
                  min={1800}
                  max={2023}
                  initYear={props.data.startYear || ''}
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
                  initYear={props.data.endYear || ''}
                  showChange={true}
                  onChange={onYearEndChange}
                />
              </Flex>
            </Flex>
            <FileBrowser
              heading='Upload Images for Gallery'
              onFilesListChange={handleImageListChange}
              onDeleteFilesListChange={handleDeleteImageListChange}
              viewIds={props.data.images || []}
              onViewIds={(files) => setCurrentImages(files)}
            />

            <Heading level={6} marginTop={'1em'}>
              Description
            </Heading>
            <TextAreaField
              name='description'
              placeholder='Description'
              onChange={handleDescriptionChange}
              defaultValue={props.data.description}
            />
            <Heading level={6} marginTop={'1em'}>
              Additional Notes
            </Heading>
            <TextAreaField
              name='notes'
              placeholder='Additional notes will not be used for display purposes, only internal use'
              onChange={handleNotesChange}
              defaultValue={props.data.notes}
            />

            <Divider
              style={{
                margin: '1rem 0',
              }}
            ></Divider>
            <Flex justifyContent={'space-between'}>
              <Button
                className='cancel-edit-professional-sport'
                onClick={handleCloseEditProfessionalSport}
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
