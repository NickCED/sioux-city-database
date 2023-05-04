/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ProfessionalTeamCreateFormInputValues = {
    name?: string;
    entryType?: string;
    startYear?: number;
    endYear?: number;
    sport?: string;
    teamId?: string;
    wins?: string[];
    description?: string;
    images?: string[];
    notes?: string;
    createdBy?: string;
    kioskReady?: boolean;
};
export declare type ProfessionalTeamCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    entryType?: ValidationFunction<string>;
    startYear?: ValidationFunction<number>;
    endYear?: ValidationFunction<number>;
    sport?: ValidationFunction<string>;
    teamId?: ValidationFunction<string>;
    wins?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    images?: ValidationFunction<string>;
    notes?: ValidationFunction<string>;
    createdBy?: ValidationFunction<string>;
    kioskReady?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ProfessionalTeamCreateFormOverridesProps = {
    ProfessionalTeamCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    entryType?: PrimitiveOverrideProps<TextFieldProps>;
    startYear?: PrimitiveOverrideProps<TextFieldProps>;
    endYear?: PrimitiveOverrideProps<TextFieldProps>;
    sport?: PrimitiveOverrideProps<TextFieldProps>;
    teamId?: PrimitiveOverrideProps<TextFieldProps>;
    wins?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    images?: PrimitiveOverrideProps<TextFieldProps>;
    notes?: PrimitiveOverrideProps<TextFieldProps>;
    createdBy?: PrimitiveOverrideProps<TextFieldProps>;
    kioskReady?: PrimitiveOverrideProps<SwitchFieldProps>;
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
