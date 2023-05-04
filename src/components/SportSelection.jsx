import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listSports } from '../graphql/queries';
import { SelectField, TextField } from '@aws-amplify/ui-react';
import { uniqueStringArrayMerge } from './uniqueStringArrayMerge.ts';

function SportSelection(props) {
  const [addSport, setAddSport] = React.useState(false);
  const [sports, setSports] = React.useState([]);
  const [selectedSport, setSelectedSport] = React.useState('');

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
      setSports(sportsOptions);
    } catch (err) {
      console.log('error fetching sports', err);
    }
  };

  React.useEffect(() => {
    if (props.initSport) {
      props.initSport === ''
        ? setSelectedSport('')
        : setSelectedSport(props.initSport);
    }
    fetchSports();
  }, []);

  const handleOptionChange = (e) => {
    if (e.target.name === 'selectedSport') {
      e.target.value === 'Add a sport' ? setAddSport(true) : setAddSport(false);
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
