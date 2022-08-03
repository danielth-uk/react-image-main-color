import * as React from 'react';
interface FileAreaInputProps {
    container: React.ReactElement;
    setColorData: React.Dispatch<React.SetStateAction<any>>;
    dropActiveClass?: string;
    imageBaseData?: React.Dispatch<React.SetStateAction<any>>;
}
interface FileButtonInputProps {
    button: React.ReactElement;
    setColorData: React.Dispatch<React.SetStateAction<any>>;
    imageBaseData?: React.Dispatch<React.SetStateAction<any>>;
}
export declare const FileAreaInput: ({ container, setColorData, dropActiveClass, imageBaseData }: FileAreaInputProps) => JSX.Element;
export declare const FileButtonInput: ({ button, setColorData, imageBaseData }: FileButtonInputProps) => JSX.Element;
export {};
