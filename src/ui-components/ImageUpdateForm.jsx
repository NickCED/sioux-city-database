/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Image } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function ImageUpdateForm(props) {
  const {
    imageID: imageIDProp,
    image: imageModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    imageID: "",
    thumbnailID: "",
    name: "",
    originalSize: "",
    description: "",
    preSignedUrl: "",
    credits: "",
    size: "",
    type: "",
    createdBy: "",
  };
  const [imageID, setImageID] = React.useState(initialValues.imageID);
  const [thumbnailID, setThumbnailID] = React.useState(
    initialValues.thumbnailID
  );
  const [name, setName] = React.useState(initialValues.name);
  const [originalSize, setOriginalSize] = React.useState(
    initialValues.originalSize
  );
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [preSignedUrl, setPreSignedUrl] = React.useState(
    initialValues.preSignedUrl
  );
  const [credits, setCredits] = React.useState(initialValues.credits);
  const [size, setSize] = React.useState(initialValues.size);
  const [type, setType] = React.useState(initialValues.type);
  const [createdBy, setCreatedBy] = React.useState(initialValues.createdBy);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = imageRecord
      ? { ...initialValues, ...imageRecord }
      : initialValues;
    setImageID(cleanValues.imageID);
    setThumbnailID(cleanValues.thumbnailID);
    setName(cleanValues.name);
    setOriginalSize(cleanValues.originalSize);
    setDescription(cleanValues.description);
    setPreSignedUrl(cleanValues.preSignedUrl);
    setCredits(cleanValues.credits);
    setSize(cleanValues.size);
    setType(cleanValues.type);
    setCreatedBy(cleanValues.createdBy);
    setErrors({});
  };
  const [imageRecord, setImageRecord] = React.useState(imageModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = imageIDProp
        ? await DataStore.query(Image, imageIDProp)
        : imageModelProp;
      setImageRecord(record);
    };
    queryData();
  }, [imageIDProp, imageModelProp]);
  React.useEffect(resetStateValues, [imageRecord]);
  const validations = {
    imageID: [{ type: "Required" }],
    thumbnailID: [],
    name: [{ type: "Required" }],
    originalSize: [],
    description: [],
    preSignedUrl: [],
    credits: [],
    size: [],
    type: [],
    createdBy: [],
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
          imageID,
          thumbnailID,
          name,
          originalSize,
          description,
          preSignedUrl,
          credits,
          size,
          type,
          createdBy,
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
            Image.copyOf(imageRecord, (updated) => {
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
      {...getOverrideProps(overrides, "ImageUpdateForm")}
      {...rest}
    >
      <TextField
        label="Image id"
        isRequired={true}
        isReadOnly={true}
        value={imageID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              imageID: value,
              thumbnailID,
              name,
              originalSize,
              description,
              preSignedUrl,
              credits,
              size,
              type,
              createdBy,
            };
            const result = onChange(modelFields);
            value = result?.imageID ?? value;
          }
          if (errors.imageID?.hasError) {
            runValidationTasks("imageID", value);
          }
          setImageID(value);
        }}
        onBlur={() => runValidationTasks("imageID", imageID)}
        errorMessage={errors.imageID?.errorMessage}
        hasError={errors.imageID?.hasError}
        {...getOverrideProps(overrides, "imageID")}
      ></TextField>
      <TextField
        label="Thumbnail id"
        isRequired={false}
        isReadOnly={false}
        value={thumbnailID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              imageID,
              thumbnailID: value,
              name,
              originalSize,
              description,
              preSignedUrl,
              credits,
              size,
              type,
              createdBy,
            };
            const result = onChange(modelFields);
            value = result?.thumbnailID ?? value;
          }
          if (errors.thumbnailID?.hasError) {
            runValidationTasks("thumbnailID", value);
          }
          setThumbnailID(value);
        }}
        onBlur={() => runValidationTasks("thumbnailID", thumbnailID)}
        errorMessage={errors.thumbnailID?.errorMessage}
        hasError={errors.thumbnailID?.hasError}
        {...getOverrideProps(overrides, "thumbnailID")}
      ></TextField>
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              imageID,
              thumbnailID,
              name: value,
              originalSize,
              description,
              preSignedUrl,
              credits,
              size,
              type,
              createdBy,
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
        label="Original size"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={originalSize}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              imageID,
              thumbnailID,
              name,
              originalSize: value,
              description,
              preSignedUrl,
              credits,
              size,
              type,
              createdBy,
            };
            const result = onChange(modelFields);
            value = result?.originalSize ?? value;
          }
          if (errors.originalSize?.hasError) {
            runValidationTasks("originalSize", value);
          }
          setOriginalSize(value);
        }}
        onBlur={() => runValidationTasks("originalSize", originalSize)}
        errorMessage={errors.originalSize?.errorMessage}
        hasError={errors.originalSize?.hasError}
        {...getOverrideProps(overrides, "originalSize")}
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
              imageID,
              thumbnailID,
              name,
              originalSize,
              description: value,
              preSignedUrl,
              credits,
              size,
              type,
              createdBy,
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
        label="Pre signed url"
        isRequired={false}
        isReadOnly={false}
        value={preSignedUrl}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              imageID,
              thumbnailID,
              name,
              originalSize,
              description,
              preSignedUrl: value,
              credits,
              size,
              type,
              createdBy,
            };
            const result = onChange(modelFields);
            value = result?.preSignedUrl ?? value;
          }
          if (errors.preSignedUrl?.hasError) {
            runValidationTasks("preSignedUrl", value);
          }
          setPreSignedUrl(value);
        }}
        onBlur={() => runValidationTasks("preSignedUrl", preSignedUrl)}
        errorMessage={errors.preSignedUrl?.errorMessage}
        hasError={errors.preSignedUrl?.hasError}
        {...getOverrideProps(overrides, "preSignedUrl")}
      ></TextField>
      <TextField
        label="Credits"
        isRequired={false}
        isReadOnly={false}
        value={credits}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              imageID,
              thumbnailID,
              name,
              originalSize,
              description,
              preSignedUrl,
              credits: value,
              size,
              type,
              createdBy,
            };
            const result = onChange(modelFields);
            value = result?.credits ?? value;
          }
          if (errors.credits?.hasError) {
            runValidationTasks("credits", value);
          }
          setCredits(value);
        }}
        onBlur={() => runValidationTasks("credits", credits)}
        errorMessage={errors.credits?.errorMessage}
        hasError={errors.credits?.hasError}
        {...getOverrideProps(overrides, "credits")}
      ></TextField>
      <TextField
        label="Size"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={size}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              imageID,
              thumbnailID,
              name,
              originalSize,
              description,
              preSignedUrl,
              credits,
              size: value,
              type,
              createdBy,
            };
            const result = onChange(modelFields);
            value = result?.size ?? value;
          }
          if (errors.size?.hasError) {
            runValidationTasks("size", value);
          }
          setSize(value);
        }}
        onBlur={() => runValidationTasks("size", size)}
        errorMessage={errors.size?.errorMessage}
        hasError={errors.size?.hasError}
        {...getOverrideProps(overrides, "size")}
      ></TextField>
      <TextField
        label="Type"
        isRequired={false}
        isReadOnly={false}
        value={type}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              imageID,
              thumbnailID,
              name,
              originalSize,
              description,
              preSignedUrl,
              credits,
              size,
              type: value,
              createdBy,
            };
            const result = onChange(modelFields);
            value = result?.type ?? value;
          }
          if (errors.type?.hasError) {
            runValidationTasks("type", value);
          }
          setType(value);
        }}
        onBlur={() => runValidationTasks("type", type)}
        errorMessage={errors.type?.errorMessage}
        hasError={errors.type?.hasError}
        {...getOverrideProps(overrides, "type")}
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
              imageID,
              thumbnailID,
              name,
              originalSize,
              description,
              preSignedUrl,
              credits,
              size,
              type,
              createdBy: value,
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
          isDisabled={!(imageIDProp || imageModelProp)}
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
              !(imageIDProp || imageModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
