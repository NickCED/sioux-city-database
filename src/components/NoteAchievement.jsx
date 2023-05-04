import { Text, Heading, TextField, Button, Flex } from '@aws-amplify/ui-react';
import { IoAddOutline, IoCloseOutline, IoPencilOutline } from 'react-icons/io5';
import { useState } from 'react';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import './NoteAchievement.css';

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

  const inputRef = React.useRef();

  const addAchievement = () => {
    const newAchievement = inputRef.current.value;
    if (newAchievement === '') return;
    if (newAchievement) {
      const updatedAchievementList = [
        ...added,
        { id: uuidv4(), text: newAchievement },
      ];
      setAdded(updatedAchievementList);
      props.onAchievementListChange(updatedAchievementList);
      inputRef.current.value = '';
    }
  };

  const editAchievement = (id) => {
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
          }}
        >
          <Text
            className='achievement-text'
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '100%',
            }}
          >
            {achievement.text}
          </Text>
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
        </li>
      ))}
    </div>
  );
}
