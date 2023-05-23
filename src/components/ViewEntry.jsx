import React, { useState, useEffect } from 'react';
import {
  Text,
  Flex,
  Button,
  Expander,
  ExpanderItem,
} from '@aws-amplify/ui-react';
import './ViewEntry.css';
import { IoCloseOutline } from 'react-icons/io5';
import { getImages } from './SaveImage';

import ViewImages from './ViewImages';

export default function ViewEntry(props) {
  const [viewImages, setViewImages] = useState([]);
  const [showImages, setShowImages] = useState(false);
  const [notableAchievements, setNotableAchievements] = useState([]);
  const [wins, setWins] = useState([]);
  const handleCloseEntry = (e) => {
    if (
      e.target.classList.contains('add-view') ||
      e.target.classList.contains('close-icon')
    ) {
      const addViewContainer = document.querySelector('.add-view');
      addViewContainer.classList.add('add-view-reverse');

      addViewContainer.addEventListener('animationend', () => {
        props.onCloseEntry();
      });
    }
  };
  useEffect(() => {
    if (props.entry.wins) {
      const wins = [];
      if (props.entry.wins.length > 0) {
        for (let i = 0; i < props.entry.wins.length; i++) {
          const win = JSON.parse(`${props.entry.wins[i]}`);
          wins.push(win);
        }

        setWins(wins);
      }
    }
  }, []);

  useEffect(() => {
    if (props.entry.notableAchievements) {
      const achievements = [];
      if (props.entry.notableAchievements.length > 0) {
        for (let i = 0; i < props.entry.notableAchievements.length; i++) {
          const achievement = JSON.parse(
            `${props.entry.notableAchievements[i]}`
          );
          achievements.push(achievement);
        }

        setNotableAchievements(achievements);
      }
    }
  }, []);

  useEffect(() => {
    if (props.entry.images) {
      if (props.entry.images.length > 0) {
        async function getImagesFromS3() {
          const initialFiles = await getImages(props.entry.images);
          setViewImages(initialFiles);
        }
        getImagesFromS3();
      }
    }
  }, []);

  const handleLoadImages = () => {
    setShowImages(true);
  };
  return (
    <Flex className='add-view' onClick={handleCloseEntry}>
      <Flex className={'add-view-card-container'}>
        <Flex className='add-view-card'>
          <Text className='add-view-card-title'>{props.entry.name}</Text>
          <Button
            size='small'
            border={'none'}
            className='close-icon'
            onClick={handleCloseEntry}
            style={{
              position: 'absolute',
              alignSelf: 'flex-end',
              cursor: 'pointer',
              margin: '0.5rem 0.5rem 0 0',
            }}
          >
            <IoCloseOutline size={'1.5rem'} pointerEvents={'none'} />
          </Button>

          <Flex
            className='add-view-contents-1'
            justifyContent={'space-between'}
          >
            <Flex
              className='view-text'
              direction={'column'}
              minWidth={'38%'}
              marginRight={'.5rem'}
            >
              <Flex gap={'0.5rem'} className='space-between'>
                <Text fontWeight={'bold'}>Entry Type:</Text>
                <Text>{props.entry.entryType}</Text>
              </Flex>
              {props.entry.entryType === 'Hall of Fame' && (
                <Flex className='space-between'>
                  <Text fontWeight={'bold'}>Year of Induction:</Text>
                  <Text>{props.entry.inductionYear}</Text>
                </Flex>
              )}
              {props.entry.entryType === 'Hall of Fame' && (
                <Flex className='space-between'>
                  <Text fontWeight={'bold'}>Sport:</Text>
                  <Text>{props.entry.sport}</Text>
                </Flex>
              )}

              {/*====================================================================================================*/}

              {props.entry.entryType === 'School' && (
                <Flex className='space-between'>
                  <Text fontWeight={'bold'}>School:</Text>
                  <Text>
                    {
                      props.schoolData.find(
                        (school) => school.id === props.entry.school
                      ).name
                    }
                  </Text>
                </Flex>
              )}
              {props.entry.entryType === 'School' && (
                <Flex className='space-between'>
                  <Text fontWeight={'bold'}>Year Sport Started:</Text>
                  <Text>{props.entry.startYear}</Text>
                </Flex>
              )}

              {props.entry.entryType === 'School' && (
                <Flex className='space-between'>
                  <Text fontWeight={'bold'}>Year Sport Ended:</Text>
                  <Text>
                    {props.entry.endYear === 1 ? 'Active' : props.entry.endYear}
                  </Text>
                </Flex>
              )}

              {/*====================================================================================================*/}
              {props.entry.entryType === 'Professional Team' && (
                <Flex className='space-between'>
                  <Text fontWeight={'bold'}>Year Team Started:</Text>
                  <Text>{props.entry.startYear}</Text>
                </Flex>
              )}
              {props.entry.entryType === 'Professional Team' && (
                <Flex className='space-between'>
                  <Text fontWeight={'bold'}>Year Team Ended:</Text>
                  <Text>
                    {props.entry.endYear === 1 ? 'Active' : props.entry.endYear}
                  </Text>
                </Flex>
              )}
              {/*====================================================================================================*/}
              {props.entry.entryType === 'Venue' && (
                <Flex className='space-between'>
                  <Text fontWeight={'bold'}>Initial Year:</Text>
                  <Text>{props.entry.startYear}</Text>
                </Flex>
              )}
              {props.entry.entryType === 'Venue' && (
                <Flex className='space-between'>
                  <Text fontWeight={'bold'}>Final Year:</Text>
                  <Text>
                    {props.entry.endYear === 1 ? 'Active' : props.entry.endYear}
                  </Text>
                </Flex>
              )}
              {props.entry.entryType === 'Venue' && (
                <Flex className='space-between'>
                  <Text fontWeight={'bold'}>Location:</Text>
                  <Text>{props.entry.location}</Text>
                </Flex>
              )}
              {/*====================================================================================================*/}
            </Flex>
            <Flex
              className='view-images'
              direction={'column'}
              borderRadius={'0.5rem'}
              minWidth={'50%'}
              flex={'1'}
              boxShadow={'rgba(0, 0, 0, 0.17) 1px 1px 11px 1px'}
              height={'35vh'}
              gap={0}
            >
              {viewImages && (
                <ViewImages images={viewImages} entry={props.entry} />
              )}

              <Text
                style={{
                  position: 'relative',

                  textAlign: 'center',
                }}
              >
                {props.entry.images.length
                  ? viewImages.length
                    ? 'Click on image to enlarge image'
                    : 'Loading images...'
                  : 'No images uploaded'}
              </Text>
            </Flex>
          </Flex>
          <Flex className='add-view-contents-2'>
            {/*====================================================================================================*/}
            {props.entry.entryType === 'School' && (
              <Expander type='single' isCollapsible={true}>
                <ExpanderItem title='Wins' value='item 1'>
                  {props.entry.wins ? (
                    <Flex
                      direction={'column'}
                      style={{
                        overflowY: 'auto',
                        gap: '.5rem',
                        padding: '.75rem',
                      }}
                    >
                      {wins.map((win, index) => (
                        <Expander type='multiple' isCollapsible={true}>
                          <ExpanderItem
                            title={
                              <Text
                                key={win.id}
                                className='win-text'
                                style={{
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  padding: '3px',
                                  width: '100%',
                                  borderRadius: '0.25rem',
                                  whiteSpace: 'wrap',
                                }}
                              >
                                <span
                                  style={{
                                    color: 'rgb(176, 124, 2)',
                                    padding: '.5rem',
                                  }}
                                >
                                  {win.year}
                                </span>{' '}
                                {win.text}
                              </Text>
                            }
                            value={`win-${index}`}
                          ></ExpanderItem>
                        </Expander>
                      ))}
                    </Flex>
                  ) : (
                    <Text>No Wins Currently</Text>
                  )}
                </ExpanderItem>
              </Expander>
            )}

            {/*====================================================================================================*/}
            {props.entry.entryType === 'Hall of Fame' && (
              <Expander type='single' isCollapsible={true} width={'100%'}>
                <ExpanderItem title='Notable Achievements' value='item 1'>
                  {props.entry.notableAchievements ? (
                    <Flex
                      direction={'column'}
                      style={{
                        overflowY: 'auto',
                        gap: '.35rem',
                      }}
                    >
                      {notableAchievements.map((achievement) => (
                        <Text
                          key={achievement.id}
                          className='notable-text'
                          style={{
                            border: '1px solid rgb(112, 112, 112)',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            padding: '3px',
                            width: '100%',
                            borderRadius: '0.25rem',
                            whiteSpace: 'wrap',
                          }}
                        >
                          <span
                            style={{
                              color: 'rgb(176, 124, 2)',
                              padding: '.5rem',
                            }}
                          >
                            {achievement.year}
                          </span>{' '}
                          {achievement.text}
                        </Text>
                      ))}
                    </Flex>
                  ) : (
                    <Text fontSize={'.95rem'} marginLeft={'5px'}>
                      No achievements listed yet
                    </Text>
                  )}
                </ExpanderItem>
              </Expander>
            )}

            <Expander type='single' isCollapsible={true} width={'100%'}>
              <ExpanderItem
                title={
                  props.entry.entryType === 'School'
                    ? 'Without Wins Description'
                    : 'Description'
                }
                value='item 1'
              >
                <Text
                  maxHeight={'35vh'}
                  style={{
                    overflowY: 'auto',
                    padding: '1rem .25rem',
                  }}
                >
                  {props.entry.description}
                </Text>
              </ExpanderItem>
            </Expander>

            <Expander type='single' isCollapsible={true} width={'100%'}>
              <ExpanderItem title='Notes' value='item 1'>
                <Text
                  maxHeight={'35vh'}
                  style={{ overflowY: 'auto', padding: '1rem .25rem' }}
                >
                  {props.entry.notes}
                </Text>
              </ExpanderItem>
            </Expander>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
