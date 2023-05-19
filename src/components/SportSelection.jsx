import { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listSports } from '../graphql/queries';
import { SelectField, TextField } from '@aws-amplify/ui-react';
import { uniqueStringArrayMerge } from './uniqueStringArrayMerge.ts';

function SportSelection(props) {
  // State variables
  const [addSport, setAddSport] = useState(false);
  const [sports, setSports] = useState([]);
  const [selectedSport, setSelectedSport] = useState(props.initSport || '');

  // Predefined sports
  const genericSports = [
    'Archery',
    'Automobile Racing',
    'Baseball',
    'Basketball',
    'Bowling',
    'Boxing',
    'Cross Country',
    'Curling',
    'Cycling',
    'Darts',
    'Dog and Horse Racing',
    'Football',
    'Golf',
    'Ice Hockey',
    'Lacrosse',
    'Martial Arts',
    'Motorcycle Racing',
    'Mountain Biking',
    'Mountain Climbing',
    'Powerlifting',
    'Racquetball',
    'Rodeo',
    'Rowing',
    'Rugby',
    'Roller Derby',
    'Soccer',
    'Softball',
    'Swimming',
    'Table Tennis',
    'Tennis',
    'Track and Field',
    'Wrestling',
    'Volleyball',
  ];

  // Fetch user inputed additional sports from database
  const fetchSports = async () => {
    try {
      const result = await API.graphql(graphqlOperation(listSports));
      const databaseSports = result.data.listSports.items.map(
        (item) => item.type
      );
      const sportsOptions = uniqueStringArrayMerge(
        genericSports,
        databaseSports
      );
      const sortedSports = sportsOptions.sort();
      setSports(sortedSports);
    } catch (err) {
      console.log('error fetching sports', err);
    }
  };
  //fetch on mount
  useEffect(() => {
    fetchSports();
  }, []);

  // Handle user input changes
  const handleOptionChange = (e) => {
    if (e.target.name === 'selectedSport') {
      if (e.target.value === 'Add a new sport') {
        setAddSport(true);
        props.onAddSport(true);
        return;
      } else {
        setAddSport(false);
        props.onAddSport(false);
      }
    }
    setSelectedSport(e.target.value);
    props.onChange(e);
  };

  return (
    <div>
      <SelectField
        name='selectedSport'
        value={selectedSport}
        onChange={handleOptionChange}
      >
        <option value=''>Select a sport</option>
        {sports.map
          ? sports.map((sport, index) => (
              <option key={`${sport}-${index}}`} value={sport}>
                {sport}
              </option>
            ))
          : null}
        <option value='Add a new sport'>Add a new sport</option>
      </SelectField>
      {addSport && (
        <TextField
          name='addedSport'
          onChange={handleOptionChange}
          placeholder='Add a new sport'
        />
      )}
    </div>
  );
}

export default SportSelection;
