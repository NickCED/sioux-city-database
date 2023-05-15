import { Text, Heading, TextField, Button, Flex } from '@aws-amplify/ui-react';
import { IoAddOutline, IoCloseOutline, IoPencilOutline } from 'react-icons/io5';
import { useState, useRef } from 'react';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import './NoteAchievement.css';
import { YearSelector } from './YearSelector';

export default function NoteAchievement(props) {
  const [added, setAdded] = useState(() => {
    if (props.achievementList === undefined) return [];

    if (props.achievementList.length > 0) {
      const achievements = [];
      for (let i = 0; i < props.achievementList.length; i++) {
        const achievement = JSON.parse(`${props.achievementList[i]}`);
        achievements.push(achievement);
      }
      return achievements;
    }
    return [];
  });

  const inputRef = useRef();
  const yearRef = useRef(); // Added yearRef for the YearSelector

  const addAchievement = () => {
    const newAchievement = inputRef.current.value;
    const newYear = yearRef.current.value; // get year from yearRef
    if (newAchievement === '') return;
    if (newAchievement) {
      const updatedAchievementList = [
        ...added,
        { id: uuidv4(), text: newAchievement, year: newYear }, // include year in the achievement object
      ];
      setAdded(updatedAchievementList);
      props.onAchievementListChange(updatedAchievementList);
      inputRef.current.value = '';
      yearRef.current.value = '';
    }
  };
  const [editting, setEditting] = useState(false);
  const editAchievement = (id) => {
    setEditting(true);
    const achievement = added.find((achievement) => achievement.id === id);
    const newAchievement = prompt('Edit achievement', achievement.text);
    if (newAchievement === null) return;
    if (newAchievement) {
      const updatedAchievementList = added.map((achievement) =>
        achievement.id === id
          ? { ...achievement, text: newAchievement }
          : achievement
      );
      setAdded(updatedAchievementList);
    }
  };

  const removeAchievement = (id) => {
    const updateAchievementList = added.filter(
      (achievement) => achievement.id !== id
    );
    setAdded(updateAchievementList);
    props.onAchievementListChange(updateAchievementList);
  };
  const [draggingIndex, setDraggingIndex] = useState(null);

  function handleDragStart(e, index) {
    setDraggingIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', null);
  }

  function handleDragEnter(e, index) {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
    Array.from(e.currentTarget.children).forEach(
      (child) => (child.style.pointerEvents = 'none')
    );
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }

  function handleDragLeave(e) {
    e.currentTarget.classList.remove('drag-over');
    Array.from(e.currentTarget.children).forEach(
      (child) => (child.style.pointerEvents = 'auto')
    );
  }

  function handleDrop(e, index) {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');

    const newAdded = [...added];
    const draggedFile = newAdded[draggingIndex];
    newAdded.splice(draggingIndex, 1);
    newAdded.splice(index, 0, draggedFile);
    Array.from(e.currentTarget.children).forEach(
      (child) => (child.style.pointerEvents = 'auto')
    );
    setDraggingIndex(null);

    setAdded(newAdded);
    props.onAchievementListChange(newAdded);
  }
  function handleDragEnd(e) {
    setDraggingIndex(null);
  }

  return (
    <div
      className='notable-achievements'
      style={{
        width: '100%',
      }}
    >
      <Heading level={6} marginTop={'1em'}>
        Add Notable Achievements
      </Heading>
      <Flex display='flex' direction='row' alignItems='center' gap={'px'}>
        <YearSelector min={1800} max={2023} ref={yearRef} />{' '}
        {/* Added YearSelector */}
        <TextField
          justifyContent={'flex-start'}
          ref={inputRef}
          placeholder='Type here...'
          grow={1}
        />
        <Button marginTop={'0.5rem'} border={'none'} onClick={addAchievement}>
          <IoAddOutline size='1.5rem' />
        </Button>
      </Flex>
      {added.map((achievement, index) => (
        <li
          key={achievement.id}
          style={{
            className: 'achievement',
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
            alignItems: 'center',
            marginTop: '0.25rem',
            border: '1px solid #b07c02',
            paddingLeft: '0.25rem',
            borderRadius: '0.25rem',
            cursor: 'grab',
          }}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragEnter={(e) => handleDragEnter(e, index)}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, index)}
          onDragEnd={handleDragEnd}
        >
          <Flex
            justifyContent={'space-between'}
            width={'100%'}
            style={{ cursor: 'grab' }}
          >
            <Flex flex={1} width={'60%'} gap={'0'} alignItems={'center'}>
              <Text
                className='achievement-text'
                style={{
                  fontWeight: 'medium',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  marginRight: '0.5rem',
                  cursor: 'pointer',
                }}
              >
                {achievement.year !== '' && (
                  <span
                    style={{
                      color: 'rgb(176, 124, 2)',
                      padding: '.5rem',
                    }}
                  >
                    {achievement.year}
                  </span>
                )}{' '}
                {achievement.text}
              </Text>
            </Flex>
            <Flex gap={'0'}>
              <Button
                border={'none'}
                onClick={() => {
                  editAchievement(achievement.id);
                }}
              >
                <IoPencilOutline size='1.5rem' />
              </Button>
              <Button
                border={'none'}
                onClick={() => {
                  removeAchievement(achievement.id);
                }}
              >
                <IoCloseOutline size='1.5rem' />
              </Button>
            </Flex>
          </Flex>
        </li>
      ))}
    </div>
  );
}
