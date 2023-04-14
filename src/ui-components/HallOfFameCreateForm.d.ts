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
export declare type HallOfFameCreateFormInputValues = {
    name?: string;
    inductionYear?: number;
    sport?: string;
    description?: string;
    notableAchievements?: string[];
    notes?: string;
};
export declare type HallOfFameCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    inductionYear?: ValidationFunction<number>;
    sport?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    notableAchievements?: ValidationFunction<string>;
    notes?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type HallOfFameCreateFormOverridesProps = {
    HallOfFameCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    inductionYear?: PrimitiveOverrideProps<TextFieldProps>;
    sport?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    notableAchievements?: PrimitiveOverrideProps<TextFieldProps>;
    notes?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type HallOfFameCreateFormProps = React.PropsWithChildren<{
    overrides?: HallOfFameCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: HallOfFameCreateFormInputValues) => HallOfFameCreateFormInputValues;
    onSuccess?: (fields: HallOfFameCreateFormInputValues) => void;
    onError?: (fields: HallOfFameCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: HallOfFameCreateFormInputValues) => HallOfFameCreateFormInputValues;
    onValidate?: HallOfFameCreateFormValidationValues;
} & React.CSSProperties>;
export default function HallOfFameCreateForm(props: HallOfFameCreateFormProps): React.ReactElement;
