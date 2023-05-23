/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { SchoolSport } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SchoolSportUpdateFormInputValues = {
    name?: string;
    entryType?: string;
    description?: string;
    noWinsDescription?: string;
    school?: string;
    sport?: string;
    sportId?: string;
    startYear?: number;
    endYear?: number;
    wins?: string[];
    images?: string[];
    notes?: string;
    createdBy?: string;
    kioskReady?: boolean;
};
export declare type SchoolSportUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    entryType?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    noWinsDescription?: ValidationFunction<string>;
    school?: ValidationFunction<string>;
    sport?: ValidationFunction<string>;
    sportId?: ValidationFunction<string>;
    startYear?: ValidationFunction<number>;
    endYear?: ValidationFunction<number>;
    wins?: ValidationFunction<string>;
    images?: ValidationFunction<string>;
    notes?: ValidationFunction<string>;
    createdBy?: ValidationFunction<string>;
    kioskReady?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SchoolSportUpdateFormOverridesProps = {
    SchoolSportUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    entryType?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    noWinsDescription?: PrimitiveOverrideProps<TextFieldProps>;
    school?: PrimitiveOverrideProps<TextFieldProps>;
    sport?: PrimitiveOverrideProps<TextFieldProps>;
    sportId?: PrimitiveOverrideProps<TextFieldProps>;
    startYear?: PrimitiveOverrideProps<TextFieldProps>;
    endYear?: PrimitiveOverrideProps<TextFieldProps>;
    wins?: PrimitiveOverrideProps<TextFieldProps>;
    images?: PrimitiveOverrideProps<TextFieldProps>;
    notes?: PrimitiveOverrideProps<TextFieldProps>;
    createdBy?: PrimitiveOverrideProps<TextFieldProps>;
    kioskReady?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type SchoolSportUpdateFormProps = React.PropsWithChildren<{
    overrides?: SchoolSportUpdateFormOverridesProps | undefined | null;
} & {
    sportId?: string;
    schoolSport?: SchoolSport;
    onSubmit?: (fields: SchoolSportUpdateFormInputValues) => SchoolSportUpdateFormInputValues;
    onSuccess?: (fields: SchoolSportUpdateFormInputValues) => void;
    onError?: (fields: SchoolSportUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SchoolSportUpdateFormInputValues) => SchoolSportUpdateFormInputValues;
    onValidate?: SchoolSportUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SchoolSportUpdateForm(props: SchoolSportUpdateFormProps): React.ReactElement;
