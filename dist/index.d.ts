import * as React from 'react';
interface FileAreaInputProps {
    container: React.ReactElement;
    setColorData: React.Dispatch<React.SetStateAction<any>>;
    dropActiveClass?: string;
}
export declare const FileAreaInput: ({ container, setColorData, dropActiveClass }: FileAreaInputProps) => JSX.Element;
interface FileButtonInputProps {
    button: React.ReactElement;
    setColorData: React.Dispatch<React.SetStateAction<any>>;
}
export declare const FileButtonInput: ({ button, setColorData }: FileButtonInputProps) => JSX.Element;
export {};
