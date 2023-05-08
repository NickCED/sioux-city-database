import React, { forwardRef, useEffect } from 'react';
import { SelectField } from '@aws-amplify/ui-react';

export const YearSelector = forwardRef(({ selectName, ...props }, ref) => {
  const [options, setOptions] = React.useState([]);
  const currentYear = new Date().getFullYear();
  const [year, setYear] = React.useState(props.initYear);
  const showChange = props.showChange ? props.showChange : false;
  const initialYear =
    props.initYear === 1
      ? 'Active'
      : props.initYear === ''
      ? ''
      : props.initYear;
  const [changedYear, setChangedYear] = React.useState(false);
  const showChangeStyle = {
    color: 'blue',
    fontWeight: 'bold',
  };
  const [style, setStyle] = React.useState({});
  const newOptions = [];
  for (let i = props.max; i >= props.min; i--) {
    newOptions.push(
      <option key={i} value={i}>
        {i === 1 ? 'Active' : i}
        {i === initialYear && changedYear ? '***' : ''}
      </option>
    );
  }

  const handleChange = (e) => {
    if (showChange) {
      if (`${e.target.value}` === `${initialYear}`) {
        setStyle({});
        console.log('no styling');
        setChangedYear(false);
      }
      if (`${e.target.value}` !== `${initialYear}`) {
        setStyle(showChangeStyle);
        console.log('styling');
        setChangedYear(true);
      }
    }

    setYear(e.target.value);
    if (props.onChange) props.onChange(e);
  };

  return (
    <SelectField
      name={selectName}
      value={year}
      style={style}
      onChange={handleChange}
      ref={ref}
    >
      <option value={''}>Select a year</option>
      {props.active ? <option value={1}>Active</option> : null}
      {newOptions}
    </SelectField>
  );
});
