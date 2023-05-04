import { Button, Divider, Flex, Heading, Text } from '@aws-amplify/ui-react';
import missingImage from '../images/ImagePlaceHolder.png';
import './ShowProfessionalSports.css';
import { IoAddOutline, IoPencilOutline } from 'react-icons/io5';

export default function ShowProfessionalSports(props) {
  let professionalSports = props.data;

  const handleAddProfessionalSports = async () => {};

  return (
    <div className='show-professional-sports'>
      <Flex justifyContent={'center'} width={'100%'}>
        {/* <Button
          size='small'
          marginRight={'2rem'}
          onClick={() => handleAddProfessionalSports()}
        >
          add professional-sport
        </Button> */}
        <Heading color={'#047d95'} level={5}>
          Click the Pencil to Edit a Professional Sport's Information
        </Heading>
      </Flex>
      <Divider width={'100%'} />
      <div className='show-professional-sports-list'>
        {professionalSports.map((professionalSport) => (
          <Flex
            className='show-professional-sports-list-card'
            key={professionalSport.id}
          >
            <Text
              color={'#304050'}
              fontWeight={'bold'}
              fontSize={'1em'}
              style={{
                overflow: 'hidden',
                whiteSpace: 'normal',
                margin: '0 auto',
                textOverflow: 'ellipsis',
                textAlign: 'center',
              }}
            >
              {professionalSport.sport}
            </Text>

            <Flex height={'100%'} alignItems={'center'}>
              <Button
                border={'none'}
                height={'80%'}
                onClick={(e) => {
                  props.onEditProfessionalSport(professionalSport.id);
                }}
              >
                <IoPencilOutline size={'1.5rem'} />
              </Button>
              <img
                className='professional-sports-list-logo'
                src={
                  professionalSport.logo ? professionalSport.logo : missingImage
                }
                alt='logo'
              />
            </Flex>
          </Flex>
        ))}
        <Flex
          className='show-professional-sports-list-card add-professional-sport'
          onClick={() => handleAddProfessionalSports()}
        >
          <IoAddOutline
            size={'1.5rem'}
            style={{
              pointerEvents: 'none',
            }}
          />
          <Text className='add-professional-sport-text'>
            Add Professional Sport
          </Text>
        </Flex>
      </div>
    </div>
  );
}
