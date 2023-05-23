import { Button, Divider, Flex, Heading, Text } from '@aws-amplify/ui-react';
import missingImage from '../images/ImagePlaceHolder.png';
import automobileImage from '../images/automobile.png';
import baseballImage from '../images/baseball.png';
import basketballImage from '../images/basketball.png';
import boatingImage from '../images/boating.jpg';
import countryClubImage from '../images/countryclub.jpg';
import hockeyImage from '../images/hockey.png';
import soccerImage from '../images/soccer.png';
import softballImage from '../images/softball.png';
import horseRacingImage from '../images/horseracing.png';

import './ShowProfessionalSports.css';
import { IoAddOutline, IoPencilOutline } from 'react-icons/io5';

export default function ShowProfessionalSports(props) {
  let professionalSports = props.data;

  const getImageSource = (sport) => {
    switch (sport) {
      case 'Automobile Racing':
        return automobileImage;
      case 'Baseball':
        return baseballImage;
      case 'Basketball':
        return basketballImage;
      case 'Boat Clubs':
        return boatingImage;
      case 'Country Clubs':
        return countryClubImage;
      case 'Ice Hockey':
        return hockeyImage;
      case 'Horse & Dog Racing':
        return horseRacingImage;
      case 'Soccer':
        return soccerImage;
      case 'Softball':
        return softballImage;

      default:
        return missingImage;
    }
  };

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
                overflowX: 'hidden',
                whiteSpace: 'normal',
                padding: '.25em',
                textOverflow: 'ellipsis',
                textAlign: 'center',
              }}
            >
              {professionalSport.sport}
            </Text>

            <Flex
              height={'100%'}
              alignItems={'center'}
              gap={{ base: '.25em', md: '1em' }}
            >
              <Button
                border={'none'}
                height={'80%'}
                onClick={(e) => {
                  props.onEditProfessionalSport(professionalSport);
                }}
              >
                <IoPencilOutline size={'1.5rem'} />
              </Button>
              <img
                style={{ borderRadius: '.5rem', marginRight: '1rem' }}
                className='professional-sports-list-logo'
                src={getImageSource(professionalSport.sport)}
                alt='logo'
              />
            </Flex>
          </Flex>
        ))}
        {/* <Flex
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
        </Flex> */}
      </div>
    </div>
  );
}
