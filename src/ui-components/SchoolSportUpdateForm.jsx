/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SwitchField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { SchoolSport } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button
            size="small"
            variation="link"
            isDisabled={hasError}
            onClick={addItem}
          >
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function SchoolSportUpdateForm(props) {
  const {
    sportId: sportIdProp,
    schoolSport: schoolSportModelProp,
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
    entryType: "",
    description: "",
    school: "",
    sport: "",
    sportId: "",
    startYear: "",
    endYear: "",
    wins: [],
    images: [],
    notes: "",
    createdBy: "",
    kioskReady: false,
  };
  const [name, setName] = React.useState(initialValues.name);
  const [entryType, setEntryType] = React.useState(initialValues.entryType);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [school, setSchool] = React.useState(initialValues.school);
  const [sport, setSport] = React.useState(initialValues.sport);
  const [sportId, setSportId] = React.useState(initialValues.sportId);
  const [startYear, setStartYear] = React.useState(initialValues.startYear);
  const [endYear, setEndYear] = React.useState(initialValues.endYear);
  const [wins, setWins] = React.useState(initialValues.wins);
  const [images, setImages] = React.useState(initialValues.images);
  const [notes, setNotes] = React.useState(initialValues.notes);
  const [createdBy, setCreatedBy] = React.useState(initialValues.createdBy);
  const [kioskReady, setKioskReady] = React.useState(initialValues.kioskReady);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = schoolSportRecord
      ? { ...initialValues, ...schoolSportRecord }
      : initialValues;
    setName(cleanValues.name);
    setEntryType(cleanValues.entryType);
    setDescription(cleanValues.description);
    setSchool(cleanValues.school);
    setSport(cleanValues.sport);
    setSportId(cleanValues.sportId);
    setStartYear(cleanValues.startYear);
    setEndYear(cleanValues.endYear);
    setWins(cleanValues.wins ?? []);
    setCurrentWinsValue("");
    setImages(cleanValues.images ?? []);
    setCurrentImagesValue("");
    setNotes(cleanValues.notes);
    setCreatedBy(cleanValues.createdBy);
    setKioskReady(cleanValues.kioskReady);
    setErrors({});
  };
  const [schoolSportRecord, setSchoolSportRecord] =
    React.useState(schoolSportModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = sportIdProp
        ? await DataStore.query(SchoolSport, sportIdProp)
        : schoolSportModelProp;
      setSchoolSportRecord(record);
    };
    queryData();
  }, [sportIdProp, schoolSportModelProp]);
  React.useEffect(resetStateValues, [schoolSportRecord]);
  const [currentWinsValue, setCurrentWinsValue] = React.useState("");
  const winsRef = React.createRef();
  const [currentImagesValue, setCurrentImagesValue] = React.useState("");
  const imagesRef = React.createRef();
  const validations = {
    name: [],
    entryType: [{ type: "Required" }],
    description: [],
    school: [],
    sport: [],
    sportId: [{ type: "Required" }],
    startYear: [],
    endYear: [],
    wins: [],
    images: [],
    notes: [],
    createdBy: [],
    kioskReady: [],
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
          entryType,
          description,
          school,
          sport,
          sportId,
          startYear,
          endYear,
          wins,
          images,
          notes,
          createdBy,
          kioskReady,
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
            SchoolSport.copyOf(schoolSportRecord, (updated) => {
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
      {...getOverrideProps(overrides, "SchoolSportUpdateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              entryType,
              description,
              school,
              sport,
              sportId,
              startYear,
              endYear,
              wins,
              images,
              notes,
              createdBy,
              kioskReady,
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
        label="Entry type"
        isRequired={true}
        isReadOnly={false}
        value={entryType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              entryType: value,
              description,
              school,
              sport,
              sportId,
              startYear,
              endYear,
              wins,
              images,
              notes,
              createdBy,
              kioskReady,
            };
            const result = onChange(modelFields);
            value = result?.entryType ?? value;
          }
          if (errors.entryType?.hasError) {
            runValidationTasks("entryType", value);
          }
          setEntryType(value);
        }}
        onBlur={() => runValidationTasks("entryType", entryType)}
        errorMessage={errors.entryType?.errorMessage}
        hasError={errors.entryType?.hasError}
        {...getOverrideProps(overrides, "entryType")}
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
              entryType,
              description: value,
              school,
              sport,
              sportId,
              startYear,
              endYear,
              wins,
              images,
              notes,
              createdBy,
              kioskReady,
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
        label="School"
        isRequired={false}
        isReadOnly={false}
        value={school}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              entryType,
              description,
              school: value,
              sport,
              sportId,
              startYear,
              endYear,
              wins,
              images,
              notes,
              createdBy,
              kioskReady,
            };
            const result = onChange(modelFields);
            value = result?.school ?? value;
          }
          if (errors.school?.hasError) {
            runValidationTasks("school", value);
          }
          setSchool(value);
        }}
        onBlur={() => runValidationTasks("school", school)}
        errorMessage={errors.school?.errorMessage}
        hasError={errors.school?.hasError}
        {...getOverrideProps(overrides, "school")}
      ></TextField>
      <TextField
        label="Sport"
        isRequired={false}
        isReadOnly={false}
        value={sport}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              entryType,
              description,
              school,
              sport: value,
              sportId,
              startYear,
              endYear,
              wins,
              images,
              notes,
              createdBy,
              kioskReady,
            };
            const result = onChange(modelFields);
            value = result?.sport ?? value;
          }
          if (errors.sport?.hasError) {
            runValidationTasks("sport", value);
          }
          setSport(value);
        }}
        onBlur={() => runValidationTasks("sport", sport)}
        errorMessage={errors.sport?.errorMessage}
        hasError={errors.sport?.hasError}
        {...getOverrideProps(overrides, "sport")}
      ></TextField>
      <TextField
        label="Sport id"
        isRequired={true}
        isReadOnly={true}
        value={sportId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              entryType,
              description,
              school,
              sport,
              sportId: value,
              startYear,
              endYear,
              wins,
              images,
              notes,
              createdBy,
              kioskReady,
            };
            const result = onChange(modelFields);
            value = result?.sportId ?? value;
          }
          if (errors.sportId?.hasError) {
            runValidationTasks("sportId", value);
          }
          setSportId(value);
        }}
        onBlur={() => runValidationTasks("sportId", sportId)}
        errorMessage={errors.sportId?.errorMessage}
        hasError={errors.sportId?.hasError}
        {...getOverrideProps(overrides, "sportId")}
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
              entryType,
              description,
              school,
              sport,
              sportId,
              startYear: value,
              endYear,
              wins,
              images,
              notes,
              createdBy,
              kioskReady,
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
              entryType,
              description,
              school,
              sport,
              sportId,
              startYear,
              endYear: value,
              wins,
              images,
              notes,
              createdBy,
              kioskReady,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              entryType,
              description,
              school,
              sport,
              sportId,
              startYear,
              endYear,
              wins: values,
              images,
              notes,
              createdBy,
              kioskReady,
            };
            const result = onChange(modelFields);
            values = result?.wins ?? values;
          }
          setWins(values);
          setCurrentWinsValue("");
        }}
        currentFieldValue={currentWinsValue}
        label={"Wins"}
        items={wins}
        hasError={errors?.wins?.hasError}
        errorMessage={errors?.wins?.errorMessage}
        setFieldValue={setCurrentWinsValue}
        inputFieldRef={winsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Wins"
          isRequired={false}
          isReadOnly={false}
          value={currentWinsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.wins?.hasError) {
              runValidationTasks("wins", value);
            }
            setCurrentWinsValue(value);
          }}
          onBlur={() => runValidationTasks("wins", currentWinsValue)}
          errorMessage={errors.wins?.errorMessage}
          hasError={errors.wins?.hasError}
          ref={winsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "wins")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              entryType,
              description,
              school,
              sport,
              sportId,
              startYear,
              endYear,
              wins,
              images: values,
              notes,
              createdBy,
              kioskReady,
            };
            const result = onChange(modelFields);
            values = result?.images ?? values;
          }
          setImages(values);
          setCurrentImagesValue("");
        }}
        currentFieldValue={currentImagesValue}
        label={"Images"}
        items={images}
        hasError={errors?.images?.hasError}
        errorMessage={errors?.images?.errorMessage}
        setFieldValue={setCurrentImagesValue}
        inputFieldRef={imagesRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Images"
          isRequired={false}
          isReadOnly={false}
          value={currentImagesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.images?.hasError) {
              runValidationTasks("images", value);
            }
            setCurrentImagesValue(value);
          }}
          onBlur={() => runValidationTasks("images", currentImagesValue)}
          errorMessage={errors.images?.errorMessage}
          hasError={errors.images?.hasError}
          ref={imagesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "images")}
        ></TextField>
      </ArrayField>
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
              entryType,
              description,
              school,
              sport,
              sportId,
              startYear,
              endYear,
              wins,
              images,
              notes: value,
              createdBy,
              kioskReady,
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
      <TextField
        label="Created by"
        isRequired={false}
        isReadOnly={false}
        value={createdBy}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              entryType,
              description,
              school,
              sport,
              sportId,
              startYear,
              endYear,
              wins,
              images,
              notes,
              createdBy: value,
              kioskReady,
            };
            const result = onChange(modelFields);
            value = result?.createdBy ?? value;
          }
          if (errors.createdBy?.hasError) {
            runValidationTasks("createdBy", value);
          }
          setCreatedBy(value);
        }}
        onBlur={() => runValidationTasks("createdBy", createdBy)}
        errorMessage={errors.createdBy?.errorMessage}
        hasError={errors.createdBy?.hasError}
        {...getOverrideProps(overrides, "createdBy")}
      ></TextField>
      <SwitchField
        label="Kiosk ready"
        defaultChecked={false}
        isDisabled={false}
        isChecked={kioskReady}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              name,
              entryType,
              description,
              school,
              sport,
              sportId,
              startYear,
              endYear,
              wins,
              images,
              notes,
              createdBy,
              kioskReady: value,
            };
            const result = onChange(modelFields);
            value = result?.kioskReady ?? value;
          }
          if (errors.kioskReady?.hasError) {
            runValidationTasks("kioskReady", value);
          }
          setKioskReady(value);
        }}
        onBlur={() => runValidationTasks("kioskReady", kioskReady)}
        errorMessage={errors.kioskReady?.errorMessage}
        hasError={errors.kioskReady?.hasError}
        {...getOverrideProps(overrides, "kioskReady")}
      ></SwitchField>
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
          isDisabled={!(sportIdProp || schoolSportModelProp)}
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
              !(sportIdProp || schoolSportModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
