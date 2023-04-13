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
export declare type ProfessionalTeamCreateFormInputValues = {
    name?: string;
    startYear?: number;
    endYear?: number;
    type?: string;
    description?: string;
};
export declare type ProfessionalTeamCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    startYear?: ValidationFunction<number>;
    endYear?: ValidationFunction<number>;
    type?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ProfessionalTeamCreateFormOverridesProps = {
    ProfessionalTeamCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    startYear?: PrimitiveOverrideProps<TextFieldProps>;
    endYear?: PrimitiveOverrideProps<TextFieldProps>;
    type?: PrimitiveOverrideProps<SelectFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ProfessionalTeamCreateFormProps = React.PropsWithChildren<{
    overrides?: ProfessionalTeamCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ProfessionalTeamCreateFormInputValues) => ProfessionalTeamCreateFormInputValues;
    onSuccess?: (fields: ProfessionalTeamCreateFormInputValues) => void;
    onError?: (fields: ProfessionalTeamCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ProfessionalTeamCreateFormInputValues) => ProfessionalTeamCreateFormInputValues;
    onValidate?: ProfessionalTeamCreateFormValidationValues;
} & React.CSSProperties>;
export default function ProfessionalTeamCreateForm(props: ProfessionalTeamCreateFormProps): React.ReactElement;
