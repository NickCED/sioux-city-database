import { forwardRef, useState } from 'react';
import { SelectField } from '@aws-amplify/ui-react';

export const YearSelector = forwardRef(({ selectName, ...props }, ref) => {
  // State Hooks
  const [year, setYear] = useState(props.initYear);
  const [style, setStyle] = useState({});

  // Configuration
  const showChange = props.showChange || false;
  const initialYear = props.initYear === 1 ? 'Active' : props.initYear;
  const extendOnChangeEvent = props.onChange || false;

  // Styling for showing changed year
  const showChangeStyle = {
    color: 'blue',
    fontWeight: 'bold',
  };

  // Create Year Options
  const options = Array.from(
    { length: props.max - props.min + 1 },
    (year, i) => props.max - i
  ).map((value) => (
    <option key={value} value={value}>
      {value}
      {value === props.initYear && showChange ? '***' : ''}
    </option>
  ));

  // Event handler for option change
  const handleChange = (e) => {
    const selectedValue = e.target.value;
    const initYearAsString = String(initialYear);
    const isSelectedYearChanged = String(selectedValue) !== initYearAsString;

    if (showChange) {
      setStyle(isSelectedYearChanged ? showChangeStyle : {});
    }

    setYear(selectedValue);

    if (extendOnChangeEvent) props.onChange(e);
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
      {options}
    </SelectField>
  );
});
