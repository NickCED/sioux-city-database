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
export declare type VenueCreateFormInputValues = {
    name?: string;
    startYear?: number;
    endYear?: number;
    location?: string;
    description?: string;
    notes?: string;
};
export declare type VenueCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    startYear?: ValidationFunction<number>;
    endYear?: ValidationFunction<number>;
    location?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    notes?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type VenueCreateFormOverridesProps = {
    VenueCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    startYear?: PrimitiveOverrideProps<TextFieldProps>;
    endYear?: PrimitiveOverrideProps<TextFieldProps>;
    location?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    notes?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type VenueCreateFormProps = React.PropsWithChildren<{
    overrides?: VenueCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: VenueCreateFormInputValues) => VenueCreateFormInputValues;
    onSuccess?: (fields: VenueCreateFormInputValues) => void;
    onError?: (fields: VenueCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: VenueCreateFormInputValues) => VenueCreateFormInputValues;
    onValidate?: VenueCreateFormValidationValues;
} & React.CSSProperties>;
export default function VenueCreateForm(props: VenueCreateFormProps): React.ReactElement;
