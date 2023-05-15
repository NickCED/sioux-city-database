import {
  Button,
  Divider,
  Flex,
  Heading,
  Text,
  SwitchField,
} from '@aws-amplify/ui-react';
import missingImage from '../images/ImagePlaceHolder.png';
import './ShowSchools.css';
import { IoAddOutline, IoPencilOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { handleKioskReady } from './AllEntries/handleKioskReady';

export default function ShowSchools(props) {
  const [sortedSchools, setSortedSchools] = useState([
    ...props.highSchoolData,
    ...props.collegeData,
  ]);
  useEffect(() => {
    setSortedSchools([...props.highSchoolData, ...props.collegeData]);
  }, [props.highSchoolData, props.collegeData]);
  const handleAddSchool = async () => {
    console.log('add school');
    console.log('props.data', props.data);
  };
  const handleEditSchool = (school) => {
    console.log('edit school', school);
    props.onEditSchool(school);
  };

  return (
    <div className='show-schools'>
      <Flex
        justifyContent={'center'}
        width={'100%'}
        direction={'column'}
        alignItems={'center'}
        style={{
          position: 'sticky',
          top: '0',
          backgroundColor: 'white',
          zIndex: '1',
        }}
      >
        <Heading color={'#047d95'} level={5}>
          Click the Pencil to Edit a School's Information
        </Heading>
        <Divider width={'100%'} />
      </Flex>

      <div className='show-schools-list'>
        {/* <Flex
          className='show-schools-list-card add-school'
          onClick={() => handleAddSchool()}
        >
          <IoAddOutline
            size={'1.5rem'}
            style={{
              pointerEvents: 'none',
            }}
          />
          <Text className='add-school-text'>Add School</Text>
        </Flex> */}
        {sortedSchools.map((school) => (
          <Flex
            className='show-schools-list-card'
            key={school.id}
            gap={{ base: '.25em', md: '1em' }}
          >
            <Text
              color={'#304050'}
              fontWeight={'bold'}
              fontSize={{ base: '.8em', md: '2rem' }}
              flex={1}
              height={'auto'}
              style={{
                overflowY: 'hidden',
                whiteSpace: 'normal',
                padding: '.25em',
                textOverflow: 'ellipsis',
                textAlign: 'center',
              }}
            >
              {school.name}
            </Text>
            <Flex
              height={'100%'}
              alignItems={'center'}
              gap={{ base: '.25em', md: '1em' }}
            >
              <SwitchField
                label='Kiosk Ready'
                isDisabled={false}
                defaultChecked={school.kioskReady}
                isLabelHidden={true}
                school={school}
                onChange={(e) => {
                  console.log('eschool', school);
                  handleKioskReady(e, school, true, false);
                }}
                style={{
                  cursor: 'pointer',
                }}
              />
              <Button
                onClick={() => handleEditSchool(school)}
                border={'none'}
                height={'80%'}
                marginRight={'.25em'}
              >
                <IoPencilOutline size={'1.5rem'} />
              </Button>
            </Flex>
          </Flex>
        ))}
      </div>
    </div>
  );
}
