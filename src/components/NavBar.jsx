import {
  Button,
  Card,
  Flex,
  Image,
  SearchField,
  Text,
} from '@aws-amplify/ui-react';
import { Storage } from 'aws-amplify';
import React from 'react';

export default function NavBar(props) {
  const [logoSrc, setLogoSrc] = React.useState('');

  React.useEffect(() => {
    async function fetchLogo() {
      const logo = await Storage.get('siouxCityLogo.png');
      setLogoSrc(logo);
    }
    fetchLogo();
  }, []);
  return (
    <Flex
      direction='row'
      alignItems='center'
      display='flex'
      wrap={'wrap'}
      justifyContent='space-between'
      padding='0.5rem'
      backgroundColor='var(--amplify-colors-primary)'
      color='var(--amplify-colors-white)'
    >
      <Card
        display={'flex'}
        alignItems='center'
        justifyContent='center'
        basis={'content'}
      >
        <Image
          src={logoSrc}
          alt='Sioux City Logo'
          width='29vw'
          objectFit={'contain'}
          margin='0 2vw 0 2vw'
          maxWidth={'385px'}
        />
        <Card display={'flex'} alignItems='center'>
          <Text
            fontWeight='700'
            fontSize='1rem'
            marginLeft='0.5rem'
            color='rgba(178, 9, 50, 1)'
            lineHeight={'1.5rem'}
          >
            Sports History
          </Text>
          <Text
            fontWeight='700'
            fontSize='1.5rem'
            marginLeft='0.5rem'
            lineHeight={'1.5rem'}
          >
            |
          </Text>
          <Text
            fontWeight='700'
            fontSize='1rem'
            marginLeft='0.5rem'
            lineHeight={'1.5rem'}
            color='rgba(225, 107, 2, 1)'
          >
            Database
          </Text>
        </Card>
      </Card>
      <Card display={'flex'} alignItems='center' basis={'content'}>
        <Button marginRight={'1vw'}>add entry</Button>

        <SearchField width={'20vw'} placeholder='Search...' />
        <Button marginLeft={'1vw'} onClick={props.onSignOut}>
          sign out
        </Button>
      </Card>
    </Flex>
  );
}
