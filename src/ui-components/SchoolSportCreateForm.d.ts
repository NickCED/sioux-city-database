/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SchoolSportCreateFormInputValues = {
    name?: string;
    description?: string;
    startYear?: number;
    endYear?: number;
};
export declare type SchoolSportCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    startYear?: ValidationFunction<number>;
    endYear?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SchoolSportCreateFormOverridesProps = {
    SchoolSportCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    startYear?: PrimitiveOverrideProps<TextFieldProps>;
    endYear?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SchoolSportCreateFormProps = React.PropsWithChildren<{
    overrides?: SchoolSportCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SchoolSportCreateFormInputValues) => SchoolSportCreateFormInputValues;
    onSuccess?: (fields: SchoolSportCreateFormInputValues) => void;
    onError?: (fields: SchoolSportCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SchoolSportCreateFormInputValues) => SchoolSportCreateFormInputValues;
    onValidate?: SchoolSportCreateFormValidationValues;
} & React.CSSProperties>;
export default function SchoolSportCreateForm(props: SchoolSportCreateFormProps): React.ReactElement;
