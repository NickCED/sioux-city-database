/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Win } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type WinUpdateFormInputValues = {
    winTitle?: string;
    year?: number;
    notes?: string;
};
export declare type WinUpdateFormValidationValues = {
    winTitle?: ValidationFunction<string>;
    year?: ValidationFunction<number>;
    notes?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type WinUpdateFormOverridesProps = {
    WinUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    winTitle?: PrimitiveOverrideProps<TextFieldProps>;
    year?: PrimitiveOverrideProps<TextFieldProps>;
    notes?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type WinUpdateFormProps = React.PropsWithChildren<{
    overrides?: WinUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    win?: Win;
    onSubmit?: (fields: WinUpdateFormInputValues) => WinUpdateFormInputValues;
    onSuccess?: (fields: WinUpdateFormInputValues) => void;
    onError?: (fields: WinUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: WinUpdateFormInputValues) => WinUpdateFormInputValues;
    onValidate?: WinUpdateFormValidationValues;
} & React.CSSProperties>;
export default function WinUpdateForm(props: WinUpdateFormProps): React.ReactElement;