/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { School } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SchoolUpdateFormInputValues = {
    name?: string;
    logoUrl?: string;
    description?: string;
};
export declare type SchoolUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    logoUrl?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SchoolUpdateFormOverridesProps = {
    SchoolUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    logoUrl?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SchoolUpdateFormProps = React.PropsWithChildren<{
    overrides?: SchoolUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    school?: School;
    onSubmit?: (fields: SchoolUpdateFormInputValues) => SchoolUpdateFormInputValues;
    onSuccess?: (fields: SchoolUpdateFormInputValues) => void;
    onError?: (fields: SchoolUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SchoolUpdateFormInputValues) => SchoolUpdateFormInputValues;
    onValidate?: SchoolUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SchoolUpdateForm(props: SchoolUpdateFormProps): React.ReactElement;
