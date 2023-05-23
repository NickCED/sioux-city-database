import {
  Text,
  Heading,
  Button,
  Flex,
  TextAreaField,
  Autocomplete,
} from '@aws-amplify/ui-react';
import { IoAddOutline, IoCloseOutline, IoPencilOutline } from 'react-icons/io5';
import { useState, useEffect, useRef } from 'react';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import './Win.css';
import { YearSelector } from './YearSelector';

//win Component
export default function Win(props) {
  // State Variables

  const [added, setAdded] = useState(() => getInitialWins(props.winList));
  const [winOptions, setWinOptions] = useState(() => {
    let sortedTexts = added.map((win) => ({ id: win.text, label: win.text }));
    sortedTexts.sort((a, b) => a.label.localeCompare(b.label));
    return sortedTexts;
  });
  const [showDescriptionEditor, setShowDescriptionEditor] = useState(null);
  const [winAutoCompleteValue, setWinAutoCompleteValue] = useState('');
  // State Variable for Drag and Drop
  const [draggingIndex, setDraggingIndex] = useState(null);

  //Refs
  const descriptionRef = useRef();
  const yearRef = useRef();

  useEffect(() => {
    if (showDescriptionEditor) {
      descriptionRef.current.focus();
    }
  }, [showDescriptionEditor]);

  useEffect(() => {
    let sortedTexts = added.map((win) => ({ id: win.text, label: win.text }));
    sortedTexts.sort((a, b) => a.label.localeCompare(b.label));
    setWinOptions(sortedTexts);
  }, [added]);

  useEffect(() => {
    console.log('added', added);
    console.log('winOptions', winOptions);
  }, []);
  //====================================================================================================
  // Functions for Handling Add, Edit, and Delete of Wins
  const addWin = () => {
    const newWin = winAutoCompleteValue;
    const newYear = yearRef.current.value;

    if (newWin === '') return;

    if (newWin) {
      const updatedWinList = [
        ...added,
        {
          id: uuidv4(),
          text: newWin,
          year: newYear,
        },
      ];
      setAdded(updatedWinList);
      props.onWinListChange(updatedWinList);
      setWinAutoCompleteValue('');
      yearRef.current.value = '';
    }
  };
  const editWinName = (id) => {
    const win = added.find((win) => win.id === id);
    const newWin = prompt('Edit win', win.text);
    if (newWin === null) return;
    if (newWin) {
      const updatedWinsList = added.map((win) =>
        win.id === id ? { ...win, text: newWin } : win
      );
      setAdded(updatedWinsList);
      props.onWinListChange(updatedWinsList);
    }
  };

  const removeWin = (id) => {
    const updatedWinsList = added.filter((win) => win.id !== id);
    setAdded(updatedWinsList);
    props.onWinListChange(updatedWinsList);
  };

  const handleWinAutoCompleteChange = (e) => {
    setWinAutoCompleteValue(e.target.value);
  };
  const handleWinAutoCompleteSelect = (option) => {
    const { label } = option;
    setWinAutoCompleteValue(label);
  };
  const handleWinAutoCompleteClear = (e) => {
    setWinAutoCompleteValue('');
  };
  //====================================================================================================
  // Functions for Drag and Drop
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
    props.onWinListChange(newAdded);
  }
  function handleDragEnd(e) {
    setDraggingIndex(null);
  }

  //====================================================================================================
  // Render Component
  return (
    <div
      className='wins'
      style={{
        width: '100%',
      }}
    >
      <Heading level={6} marginTop={'1em'}>
        Add A Win
      </Heading>
      <Flex display='flex' direction='row' alignItems='center' gap={'px'}>
        <YearSelector min={1800} max={2023} ref={yearRef} />
        <Autocomplete
          className='win-autocomplete'
          marginTop={'0.5rem'}
          justifyContent={'flex-start'}
          onChange={handleWinAutoCompleteChange}
          onSelect={handleWinAutoCompleteSelect}
          onClear={handleWinAutoCompleteClear}
          value={winAutoCompleteValue}
          options={winOptions}
          placeholder='Enter Win Type here...'
        />
        <Button marginTop={'0.5rem'} border={'none'} onClick={addWin}>
          <IoAddOutline size='1.5rem' />
        </Button>
      </Flex>
      {added.map((win, index) => (
        <li
          key={win.id}
          style={{
            className: 'win',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: '0.25rem',
            alignItems: 'center',
            gap: '0.5rem',
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
            style={{
              cursor: 'grab',
            }}
          >
            <Flex flex={1} width={'60%'} gap={'0'} alignItems={'center'}>
              <Text
                className='win-text'
                style={{
                  fontWeight: 'medium',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  marginRight: '0.5rem',
                  cursor: 'pointer',
                }}
              >
                {win.year !== '' && (
                  <span
                    style={{
                      color: 'rgb(176, 124, 2)',
                      padding: '.5rem',
                    }}
                  >
                    {win.year}
                  </span>
                )}{' '}
                {win.text}
              </Text>
            </Flex>
            <Flex
              style={{
                flex: '1 1 0',
                justifyContent: 'flex-end',
                gap: '.25rem',
              }}
            >
              <Button
                border={'none'}
                padding={' .25rem'}
                onClick={() => {
                  editWinName(win.id);
                }}
              >
                <IoPencilOutline size='1.25rem' />
              </Button>
              <Button
                border={'none'}
                onClick={() => {
                  setShowDescriptionEditor(
                    win.id === showDescriptionEditor ? null : win.id
                  );
                }}
                color={'#006dff'}
                fontWeight={'300'}
                textDecoration={'underline'}
                size='small'
              >
                {win.description ? 'Edit Info' : 'Add Info'}
              </Button>
              <Button
                border={'none'}
                padding={' .5rem'}
                onClick={() => {
                  removeWin(win.id);
                }}
              >
                <IoCloseOutline size='1.5rem' />
              </Button>
            </Flex>
          </Flex>
          {showDescriptionEditor === win.id && (
            <Flex basis={'100%'} alignItems={'center'}>
              <TextAreaField
                grow={1}
                ref={descriptionRef}
                placeholder='Type win information here...'
                value={win.description}
                onChange={(e) => {
                  console.log('e.target.value', e.target.value);
                  const updatedWins = added.map((w) =>
                    w.id === win.id ? { ...w, description: e.target.value } : w
                  );
                  console.log('updatedwins', updatedWins);
                  setAdded(updatedWins);
                  props.onWinListChange(updatedWins);
                }}
              />
              <Button
                height={'fit-content'}
                onClick={() => setShowDescriptionEditor(null)}
              >
                Done
              </Button>
            </Flex>
          )}
        </li>
      ))}
    </div>
  );
}

//Function for getting initial state of wins
function getInitialWins(winList) {
  if (winList === undefined) {
    return [];
  }

  if (winList.length === 0) {
    return [];
  }
  if (winList.length > 0) {
    const wins = [];
    winList.forEach((win) => {
      const winObj = JSON.parse(`${win}`);
      wins.push(winObj);
    });

    return wins;
  }

  return [];
}
