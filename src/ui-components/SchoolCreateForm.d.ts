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
export declare type SchoolCreateFormInputValues = {
    name?: string;
    logoUrl?: string;
    description?: string;
    notes?: string;
};
export declare type SchoolCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    logoUrl?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    notes?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SchoolCreateFormOverridesProps = {
    SchoolCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    logoUrl?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    notes?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SchoolCreateFormProps = React.PropsWithChildren<{
    overrides?: SchoolCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SchoolCreateFormInputValues) => SchoolCreateFormInputValues;
    onSuccess?: (fields: SchoolCreateFormInputValues) => void;
    onError?: (fields: SchoolCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SchoolCreateFormInputValues) => SchoolCreateFormInputValues;
    onValidate?: SchoolCreateFormValidationValues;
} & React.CSSProperties>;
export default function SchoolCreateForm(props: SchoolCreateFormProps): React.ReactElement;
