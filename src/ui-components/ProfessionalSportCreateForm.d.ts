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
export declare type ProfessionalSportCreateFormInputValues = {
    startYear?: number;
    endYear?: number;
    sport?: string;
    teams?: string[];
    description?: string;
    images?: string[];
    notes?: string;
    createdBy?: string;
    kioskReady?: boolean;
};
export declare type ProfessionalSportCreateFormValidationValues = {
    startYear?: ValidationFunction<number>;
    endYear?: ValidationFunction<number>;
    sport?: ValidationFunction<string>;
    teams?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    images?: ValidationFunction<string>;
    notes?: ValidationFunction<string>;
    createdBy?: ValidationFunction<string>;
    kioskReady?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ProfessionalSportCreateFormOverridesProps = {
    ProfessionalSportCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    startYear?: PrimitiveOverrideProps<TextFieldProps>;
    endYear?: PrimitiveOverrideProps<TextFieldProps>;
    sport?: PrimitiveOverrideProps<TextFieldProps>;
    teams?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    images?: PrimitiveOverrideProps<TextFieldProps>;
    notes?: PrimitiveOverrideProps<TextFieldProps>;
    createdBy?: PrimitiveOverrideProps<TextFieldProps>;
    kioskReady?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type ProfessionalSportCreateFormProps = React.PropsWithChildren<{
    overrides?: ProfessionalSportCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ProfessionalSportCreateFormInputValues) => ProfessionalSportCreateFormInputValues;
    onSuccess?: (fields: ProfessionalSportCreateFormInputValues) => void;
    onError?: (fields: ProfessionalSportCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ProfessionalSportCreateFormInputValues) => ProfessionalSportCreateFormInputValues;
    onValidate?: ProfessionalSportCreateFormValidationValues;
} & React.CSSProperties>;
export default function ProfessionalSportCreateForm(props: ProfessionalSportCreateFormProps): React.ReactElement;
