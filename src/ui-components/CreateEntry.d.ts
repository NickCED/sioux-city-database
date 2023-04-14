/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type CreateEntryInputValues = {
    Field0?: string;
    Field1?: string;
};
export declare type CreateEntryValidationValues = {
    Field0?: ValidationFunction<string>;
    Field1?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CreateEntryOverridesProps = {
    CreateEntryGrid?: PrimitiveOverrideProps<GridProps>;
    Field0?: PrimitiveOverrideProps<TextFieldProps>;
    Field1?: PrimitiveOverrideProps<SelectFieldProps>;
} & EscapeHatchProps;
export declare type CreateEntryProps = React.PropsWithChildren<{
    overrides?: CreateEntryOverridesProps | undefined | null;
} & {
    onSubmit: (fields: CreateEntryInputValues) => void;
    onChange?: (fields: CreateEntryInputValues) => CreateEntryInputValues;
    onValidate?: CreateEntryValidationValues;
} & React.CSSProperties>;
export default function CreateEntry(props: CreateEntryProps): React.ReactElement;
