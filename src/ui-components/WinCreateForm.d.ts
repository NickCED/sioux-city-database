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
export declare type WinCreateFormInputValues = {
    winID?: string;
    name?: string;
};
export declare type WinCreateFormValidationValues = {
    winID?: ValidationFunction<string>;
    name?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type WinCreateFormOverridesProps = {
    WinCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    winID?: PrimitiveOverrideProps<TextFieldProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type WinCreateFormProps = React.PropsWithChildren<{
    overrides?: WinCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: WinCreateFormInputValues) => WinCreateFormInputValues;
    onSuccess?: (fields: WinCreateFormInputValues) => void;
    onError?: (fields: WinCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: WinCreateFormInputValues) => WinCreateFormInputValues;
    onValidate?: WinCreateFormValidationValues;
} & React.CSSProperties>;
export default function WinCreateForm(props: WinCreateFormProps): React.ReactElement;
