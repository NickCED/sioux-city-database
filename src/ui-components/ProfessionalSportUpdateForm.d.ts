/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
    sportType?: string;
    description?: string;
    notes?: string;
};
export declare type ProfessionalSportUpdateFormValidationValues = {
    startYear?: ValidationFunction<number>;
    endYear?: ValidationFunction<number>;
    sportType?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    notes?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ProfessionalSportUpdateFormOverridesProps = {
    ProfessionalSportUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    startYear?: PrimitiveOverrideProps<TextFieldProps>;
    endYear?: PrimitiveOverrideProps<TextFieldProps>;
    sportType?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    notes?: PrimitiveOverrideProps<TextFieldProps>;
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
