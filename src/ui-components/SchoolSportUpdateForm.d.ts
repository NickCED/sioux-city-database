/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { SchoolSport } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SchoolSportUpdateFormInputValues = {
    name?: string;
    description?: string;
    school?: string;
    sport?: string;
    startYear?: number;
    endYear?: number;
    notes?: string;
};
export declare type SchoolSportUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    school?: ValidationFunction<string>;
    sport?: ValidationFunction<string>;
    startYear?: ValidationFunction<number>;
    endYear?: ValidationFunction<number>;
    notes?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SchoolSportUpdateFormOverridesProps = {
    SchoolSportUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    school?: PrimitiveOverrideProps<TextFieldProps>;
    sport?: PrimitiveOverrideProps<TextFieldProps>;
    startYear?: PrimitiveOverrideProps<TextFieldProps>;
    endYear?: PrimitiveOverrideProps<TextFieldProps>;
    notes?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SchoolSportUpdateFormProps = React.PropsWithChildren<{
    overrides?: SchoolSportUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    schoolSport?: SchoolSport;
    onSubmit?: (fields: SchoolSportUpdateFormInputValues) => SchoolSportUpdateFormInputValues;
    onSuccess?: (fields: SchoolSportUpdateFormInputValues) => void;
    onError?: (fields: SchoolSportUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SchoolSportUpdateFormInputValues) => SchoolSportUpdateFormInputValues;
    onValidate?: SchoolSportUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SchoolSportUpdateForm(props: SchoolSportUpdateFormProps): React.ReactElement;
