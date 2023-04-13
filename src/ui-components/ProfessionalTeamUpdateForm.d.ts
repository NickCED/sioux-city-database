/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { ProfessionalTeam } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ProfessionalTeamUpdateFormInputValues = {
    name?: string;
    startYear?: number;
    endYear?: number;
    type?: string;
    description?: string;
};
export declare type ProfessionalTeamUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    startYear?: ValidationFunction<number>;
    endYear?: ValidationFunction<number>;
    type?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ProfessionalTeamUpdateFormOverridesProps = {
    ProfessionalTeamUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    startYear?: PrimitiveOverrideProps<TextFieldProps>;
    endYear?: PrimitiveOverrideProps<TextFieldProps>;
    type?: PrimitiveOverrideProps<SelectFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ProfessionalTeamUpdateFormProps = React.PropsWithChildren<{
    overrides?: ProfessionalTeamUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    professionalTeam?: ProfessionalTeam;
    onSubmit?: (fields: ProfessionalTeamUpdateFormInputValues) => ProfessionalTeamUpdateFormInputValues;
    onSuccess?: (fields: ProfessionalTeamUpdateFormInputValues) => void;
    onError?: (fields: ProfessionalTeamUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ProfessionalTeamUpdateFormInputValues) => ProfessionalTeamUpdateFormInputValues;
    onValidate?: ProfessionalTeamUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ProfessionalTeamUpdateForm(props: ProfessionalTeamUpdateFormProps): React.ReactElement;
