/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Sport } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SportUpdateFormInputValues = {
    type?: string[];
    createdBy?: string;
};
export declare type SportUpdateFormValidationValues = {
    type?: ValidationFunction<string>;
    createdBy?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SportUpdateFormOverridesProps = {
    SportUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    type?: PrimitiveOverrideProps<TextFieldProps>;
    createdBy?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SportUpdateFormProps = React.PropsWithChildren<{
    overrides?: SportUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    sport?: Sport;
    onSubmit?: (fields: SportUpdateFormInputValues) => SportUpdateFormInputValues;
    onSuccess?: (fields: SportUpdateFormInputValues) => void;
    onError?: (fields: SportUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SportUpdateFormInputValues) => SportUpdateFormInputValues;
    onValidate?: SportUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SportUpdateForm(props: SportUpdateFormProps): React.ReactElement;
