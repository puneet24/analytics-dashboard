import { Reading } from "./Reading";

export enum ReadingType {
    temperature,
    airPressure,
    humidity
}

export class SingleReading {
    type: ReadingType;
    value: Number;
    constructor(type: ReadingType, value: Number) {
        this.type = type;
        this.value = value;
    }
}