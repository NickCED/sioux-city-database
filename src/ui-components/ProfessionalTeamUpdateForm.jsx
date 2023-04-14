/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { ProfessionalTeam } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function ProfessionalTeamUpdateForm(props) {
  const {
    id: idProp,
    professionalTeam: professionalTeamModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    startYear: "",
    endYear: "",
    sportType: "",
    description: "",
    notes: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [startYear, setStartYear] = React.useState(initialValues.startYear);
  const [endYear, setEndYear] = React.useState(initialValues.endYear);
  const [sportType, setSportType] = React.useState(initialValues.sportType);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [notes, setNotes] = React.useState(initialValues.notes);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = professionalTeamRecord
      ? { ...initialValues, ...professionalTeamRecord }
      : initialValues;
    setName(cleanValues.name);
    setStartYear(cleanValues.startYear);
    setEndYear(cleanValues.endYear);
    setSportType(cleanValues.sportType);
    setDescription(cleanValues.description);
    setNotes(cleanValues.notes);
    setErrors({});
  };
  const [professionalTeamRecord, setProfessionalTeamRecord] = React.useState(
    professionalTeamModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(ProfessionalTeam, idProp)
        : professionalTeamModelProp;
      setProfessionalTeamRecord(record);
    };
    queryData();
  }, [idProp, professionalTeamModelProp]);
  React.useEffect(resetStateValues, [professionalTeamRecord]);
  const validations = {
    name: [{ type: "Required" }],
    startYear: [],
    endYear: [],
    sportType: [],
    description: [],
    notes: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          name,
          startYear,
          endYear,
          sportType,
          description,
          notes,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(
            ProfessionalTeam.copyOf(professionalTeamRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "ProfessionalTeamUpdateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              startYear,
              endYear,
              sportType,
              description,
              notes,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Start year"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={startYear}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              startYear: value,
              endYear,
              sportType,
              description,
              notes,
            };
            const result = onChange(modelFields);
            value = result?.startYear ?? value;
          }
          if (errors.startYear?.hasError) {
            runValidationTasks("startYear", value);
          }
          setStartYear(value);
        }}
        onBlur={() => runValidationTasks("startYear", startYear)}
        errorMessage={errors.startYear?.errorMessage}
        hasError={errors.startYear?.hasError}
        {...getOverrideProps(overrides, "startYear")}
      ></TextField>
      <TextField
        label="End year"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={endYear}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              startYear,
              endYear: value,
              sportType,
              description,
              notes,
            };
            const result = onChange(modelFields);
            value = result?.endYear ?? value;
          }
          if (errors.endYear?.hasError) {
            runValidationTasks("endYear", value);
          }
          setEndYear(value);
        }}
        onBlur={() => runValidationTasks("endYear", endYear)}
        errorMessage={errors.endYear?.errorMessage}
        hasError={errors.endYear?.hasError}
        {...getOverrideProps(overrides, "endYear")}
      ></TextField>
      <TextField
        label="Sport type"
        isRequired={false}
        isReadOnly={false}
        value={sportType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              startYear,
              endYear,
              sportType: value,
              description,
              notes,
            };
            const result = onChange(modelFields);
            value = result?.sportType ?? value;
          }
          if (errors.sportType?.hasError) {
            runValidationTasks("sportType", value);
          }
          setSportType(value);
        }}
        onBlur={() => runValidationTasks("sportType", sportType)}
        errorMessage={errors.sportType?.errorMessage}
        hasError={errors.sportType?.hasError}
        {...getOverrideProps(overrides, "sportType")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              startYear,
              endYear,
              sportType,
              description: value,
              notes,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <TextField
        label="Notes"
        isRequired={false}
        isReadOnly={false}
        value={notes}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              startYear,
              endYear,
              sportType,
              description,
              notes: value,
            };
            const result = onChange(modelFields);
            value = result?.notes ?? value;
          }
          if (errors.notes?.hasError) {
            runValidationTasks("notes", value);
          }
          setNotes(value);
        }}
        onBlur={() => runValidationTasks("notes", notes)}
        errorMessage={errors.notes?.errorMessage}
        hasError={errors.notes?.hasError}
        {...getOverrideProps(overrides, "notes")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || professionalTeamModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || professionalTeamModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
