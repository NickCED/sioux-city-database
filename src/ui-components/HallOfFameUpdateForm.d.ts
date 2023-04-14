/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { HallOfFame } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type HallOfFameUpdateFormInputValues = {
    name?: string;
    inductionYear?: number;
    sport?: string;
    description?: string;
    notableAchievements?: string[];
    notes?: string;
};
export declare type HallOfFameUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    inductionYear?: ValidationFunction<number>;
    sport?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    notableAchievements?: ValidationFunction<string>;
    notes?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type HallOfFameUpdateFormOverridesProps = {
    HallOfFameUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    inductionYear?: PrimitiveOverrideProps<TextFieldProps>;
    sport?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    notableAchievements?: PrimitiveOverrideProps<TextFieldProps>;
    notes?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type HallOfFameUpdateFormProps = React.PropsWithChildren<{
    overrides?: HallOfFameUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    hallOfFame?: HallOfFame;
    onSubmit?: (fields: HallOfFameUpdateFormInputValues) => HallOfFameUpdateFormInputValues;
    onSuccess?: (fields: HallOfFameUpdateFormInputValues) => void;
    onError?: (fields: HallOfFameUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: HallOfFameUpdateFormInputValues) => HallOfFameUpdateFormInputValues;
    onValidate?: HallOfFameUpdateFormValidationValues;
} & React.CSSProperties>;
export default function HallOfFameUpdateForm(props: HallOfFameUpdateFormProps): React.ReactElement;
