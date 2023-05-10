import React from 'react';
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

export default function EditSchool(props) {
  const handleCloseEditSchool = () => {};
  const handleLogoListChange = (filesList) => {};
  const handleSubmit = (e, props) => {};
  const handleFormCancel = (e) => {};
  const handleImageListChange = (filesList) => {};
  const onYearStartChange = (e) => {};
  const currentYear = new Date().getFullYear();
  const [yearStart, setYearStart] = React.useState();
  const [showSubmit, setShowSubmit] = React.useState(false);

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
          <Heading level={5} style={{ marginBottom: '1rem' }}>
            Edit School
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
            <Text>
              {
                props.schoolData.find((school) => {
                  return school.id === props.school.id;
                }).name
              }
            </Text>
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
              placeholder='Enter the location of the venue'
            />
            <Heading level={6} marginTop={'1em'}>
              Description
            </Heading>
            <TextAreaField name='description' placeholder='Description' />

            <FileBrowser
              heading='Upload Images for Gallery'
              onFilesListChange={handleImageListChange}
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
