import { Button, Flex, Image, SearchField, Text } from '@aws-amplify/ui-react';
import { useState, useEffect } from 'react';
import logoSrc from '../images/siouxCityLogo.png';
import darkLogoSrc from '../images/siouxCityLogoDarkMode.png';
import React from 'react';

export default function NavBar(props) {
  const [mode, setMode] = useState();

  useEffect(() => {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        const colorScheme = event.matches ? 'dark' : 'light';
        console.log(colorScheme); // "dark" or "light"
        setMode(colorScheme);
      });
  }, []);

  const handleSearchChange = (event) => {
    props.onSearchChange(event.target.value);
  };

  return (
    <Flex
      className='NavBar'
      minWidth={'570px'}
      direction='row'
      alignItems='center'
      display='flex'
      wrap={'wrap'}
      flex='0 0 auto'
      justifyContent='space-between'
      padding='0.5rem'
      backgroundColor='var(--amplify-colors-primary)'
      color='var(--amplify-colors-white)'
    >
      <Flex
        grow={1}
        alignItems='center'
        className='quickfixNavBar'
        justifyContent={{ base: 'center', md: 'flex-start' }}
      >
        <Image
          src={mode === 'dark' ? darkLogoSrc : logoSrc}
          alt='Sioux City Logo'
          width='29vw'
          objectFit={'contain'}
          margin='0 2vw 0 2vw'
          maxWidth={'385px'}
          minWidth={'235px'}
        />
        <Flex className='sportsHistory' alignItems='center' gap={'0'}>
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
        </Flex>
      </Flex>

      <Flex grow={1} margin={'0 2vw 0 2vw'}>
        <Button marginRight={'1vw'} onClick={props.onAddEntry}>
          add entry
        </Button>

        <SearchField
          grow={1}
          placeholder='Search...'
          onChange={handleSearchChange}
          isDisabled={props.searchDisabled}
        />
        <Button marginLeft={'1vw'} onClick={props.onSignOut}>
          sign out
        </Button>
      </Flex>
    </Flex>
  );
}
