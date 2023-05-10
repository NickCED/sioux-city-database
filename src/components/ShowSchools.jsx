import { Button, Divider, Flex, Heading, Text } from '@aws-amplify/ui-react';
import missingImage from '../images/ImagePlaceHolder.png';
import './ShowSchools.css';
import { IoAddOutline, IoPencilOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';

export default function ShowSchools(props) {
  const [sortedSchools, setSortedSchools] = useState([
    ...props.highSchoolData,
    ...props.collegeData,
  ]);

  const handleAddSchool = async () => {
    console.log('add school');
    console.log('props.data', props.data);
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
              <Button border={'none'} height={'80%'}>
                <IoPencilOutline size={'1.5rem'} />
              </Button>
              <img
                className='schools-list-logo'
                src={school.logo ? school.logo : missingImage}
                alt='logo'
              />
            </Flex>
          </Flex>
        ))}
      </div>
    </div>
  );
}
