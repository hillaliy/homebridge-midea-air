import { Categories, CharacteristicValue } from '..';
export declare const accessory: {
    displayName: string;
    username: string;
    pincode: string;
    category: Categories;
    services: ({
        sType: string;
        characteristics: ({
            cType: string;
            onUpdate: null;
            perms: string[];
            format: string;
            initialValue: string;
            supportEvents: boolean;
            supportBonjour: boolean;
            manfDescription: string;
            designedMaxLength: number;
        } | {
            cType: string;
            onUpdate: null;
            perms: string[];
            format: string;
            initialValue: boolean;
            supportEvents: boolean;
            supportBonjour: boolean;
            manfDescription: string;
            designedMaxLength: number;
        })[];
    } | {
        sType: string;
        characteristics: ({
            cType: string;
            onUpdate: null;
            perms: string[];
            format: string;
            initialValue: string;
            supportEvents: boolean;
            supportBonjour: boolean;
            manfDescription: string;
            designedMaxLength: number;
            designedMinValue?: undefined;
            designedMaxValue?: undefined;
            designedMinStep?: undefined;
            unit?: undefined;
        } | {
            cType: string;
            onUpdate: (value: CharacteristicValue) => void;
            perms: string[];
            format: string;
            initialValue: number;
            supportEvents: boolean;
            supportBonjour: boolean;
            manfDescription: string;
            designedMaxLength: number;
            designedMinValue: number;
            designedMaxValue: number;
            designedMinStep: number;
            unit?: undefined;
        } | {
            cType: string;
            onUpdate: (value: CharacteristicValue) => void;
            perms: string[];
            format: string;
            initialValue: number;
            supportEvents: boolean;
            supportBonjour: boolean;
            manfDescription: string;
            designedMinValue: number;
            designedMaxValue: number;
            designedMinStep: number;
            designedMaxLength?: undefined;
            unit?: undefined;
        } | {
            cType: string;
            onUpdate: (value: CharacteristicValue) => void;
            perms: string[];
            format: string;
            initialValue: number;
            supportEvents: boolean;
            supportBonjour: boolean;
            manfDescription: string;
            unit: string;
            designedMaxLength?: undefined;
            designedMinValue?: undefined;
            designedMaxValue?: undefined;
            designedMinStep?: undefined;
        } | {
            cType: string;
            onUpdate: (value: CharacteristicValue) => void;
            perms: string[];
            format: string;
            initialValue: number;
            supportEvents: boolean;
            supportBonjour: boolean;
            manfDescription: string;
            designedMinValue: number;
            designedMaxValue: number;
            designedMinStep: number;
            unit: string;
            designedMaxLength?: undefined;
        } | {
            cType: string;
            onUpdate: (value: CharacteristicValue) => void;
            perms: string[];
            format: string;
            initialValue: number;
            supportEvents: boolean;
            supportBonjour: boolean;
            manfDescription: string;
            designedMaxLength?: undefined;
            designedMinValue?: undefined;
            designedMaxValue?: undefined;
            designedMinStep?: undefined;
            unit?: undefined;
        })[];
    })[];
};
//# sourceMappingURL=Thermostat_accessory.d.ts.map