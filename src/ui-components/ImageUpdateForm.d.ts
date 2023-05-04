/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Image } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ImageUpdateFormInputValues = {
    imageID?: string;
    thumbnailID?: string;
    name?: string;
    originalSize?: number;
    description?: string;
    preSignedUrl?: string;
    credits?: string;
    size?: number;
    type?: string;
    createdBy?: string;
};
export declare type ImageUpdateFormValidationValues = {
    imageID?: ValidationFunction<string>;
    thumbnailID?: ValidationFunction<string>;
    name?: ValidationFunction<string>;
    originalSize?: ValidationFunction<number>;
    description?: ValidationFunction<string>;
    preSignedUrl?: ValidationFunction<string>;
    credits?: ValidationFunction<string>;
    size?: ValidationFunction<number>;
    type?: ValidationFunction<string>;
    createdBy?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ImageUpdateFormOverridesProps = {
    ImageUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    imageID?: PrimitiveOverrideProps<TextFieldProps>;
    thumbnailID?: PrimitiveOverrideProps<TextFieldProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    originalSize?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    preSignedUrl?: PrimitiveOverrideProps<TextFieldProps>;
    credits?: PrimitiveOverrideProps<TextFieldProps>;
    size?: PrimitiveOverrideProps<TextFieldProps>;
    type?: PrimitiveOverrideProps<TextFieldProps>;
    createdBy?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ImageUpdateFormProps = React.PropsWithChildren<{
    overrides?: ImageUpdateFormOverridesProps | undefined | null;
} & {
    imageID?: string;
    image?: Image;
    onSubmit?: (fields: ImageUpdateFormInputValues) => ImageUpdateFormInputValues;
    onSuccess?: (fields: ImageUpdateFormInputValues) => void;
    onError?: (fields: ImageUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ImageUpdateFormInputValues) => ImageUpdateFormInputValues;
    onValidate?: ImageUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ImageUpdateForm(props: ImageUpdateFormProps): React.ReactElement;
