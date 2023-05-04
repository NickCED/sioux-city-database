import { Flex, Heading } from '@aws-amplify/ui-react';
import { YearSelector } from './YearSelector';
import FileBrowser from './FileBrowser';
import { useState } from 'react';
import './EditProfessionalSport.css';

export default function EditProfessionalSport(props) {
  console.log(props);
  const [sportName, setSportName] = useState(() => {
    if (props.data.sport) {
      return props.data.sport;
    }
    return '';
  });
  console.log(props.data);
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
    }
  };
  const [yearEnd, setYearEnd] = useState(() => {
    if (props.data.yearEnd) {
      return props.data.yearEnd;
    }
    return '';
  });
  const onYearEndChange = (event) => {
    event.preventDefault();
    if (event.target.name === 'endYear') {
      setYearEnd(event.target.value);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <Flex className='add-edit-professional-sport'>
      <Flex className='add-edit-professional-sport-card-container'>
        <Flex className='add-edit-professional-sport-card'>
          <Flex className='add-edit-professional-sport-card-header'></Flex>
          <Heading level={3} color={'#047d95'}>
            Edit {sportName}
          </Heading>
          <Flex className='add-edit-professional-sport-card-body'>
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
            </form>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
