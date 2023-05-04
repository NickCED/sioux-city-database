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
export declare type SportCreateFormInputValues = {
    type?: string[];
    createdBy?: string;
};
export declare type SportCreateFormValidationValues = {
    type?: ValidationFunction<string>;
    createdBy?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SportCreateFormOverridesProps = {
    SportCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    type?: PrimitiveOverrideProps<TextFieldProps>;
    createdBy?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SportCreateFormProps = React.PropsWithChildren<{
    overrides?: SportCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SportCreateFormInputValues) => SportCreateFormInputValues;
    onSuccess?: (fields: SportCreateFormInputValues) => void;
    onError?: (fields: SportCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SportCreateFormInputValues) => SportCreateFormInputValues;
    onValidate?: SportCreateFormValidationValues;
} & React.CSSProperties>;
export default function SportCreateForm(props: SportCreateFormProps): React.ReactElement;
