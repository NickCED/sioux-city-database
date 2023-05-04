/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { ProfessionalSport } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ProfessionalSportUpdateFormInputValues = {
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
export declare type ProfessionalSportUpdateFormValidationValues = {
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
export declare type ProfessionalSportUpdateFormOverridesProps = {
    ProfessionalSportUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
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
export declare type ProfessionalSportUpdateFormProps = React.PropsWithChildren<{
    overrides?: ProfessionalSportUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    professionalSport?: ProfessionalSport;
    onSubmit?: (fields: ProfessionalSportUpdateFormInputValues) => ProfessionalSportUpdateFormInputValues;
    onSuccess?: (fields: ProfessionalSportUpdateFormInputValues) => void;
    onError?: (fields: ProfessionalSportUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ProfessionalSportUpdateFormInputValues) => ProfessionalSportUpdateFormInputValues;
    onValidate?: ProfessionalSportUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ProfessionalSportUpdateForm(props: ProfessionalSportUpdateFormProps): React.ReactElement;
