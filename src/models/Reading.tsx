import { ReadingType, SingleReading } from './ReadingType'

export class Reading {
    temperature: Number | null = null;
    lastUpdatedTemperature: any = new Date();
    airPressure: Number | null = null;
    lastUpdatedAirPressure: any = new Date();
    humidity: Number | null = null;
    lastUpdatedHumidity: any = new Date();
    systemUpdateTime: Number = 1000;
    constructor() {

    }

    get() {
        let currDate: any = new Date();
        if((currDate - this.lastUpdatedTemperature) > this.systemUpdateTime) {
            this.temperature = null;
        }
        if((currDate - this.lastUpdatedAirPressure) > this.systemUpdateTime) {
            this.airPressure = null;
        }
        if((currDate - this.lastUpdatedHumidity) > this.systemUpdateTime) {
            this.humidity = null;
        }
        return {
            temperature: this.temperature,
            airPressure: this.airPressure,
            humidity: this.humidity
        }
    }

    updateReadings(reading: SingleReading) {
        switch(reading.type) {
            case ReadingType.temperature:
                this.temperature = reading.value;
                this.lastUpdatedTemperature = new Date();
                break;
            case ReadingType.airPressure:
                this.airPressure = reading.value;
                this.lastUpdatedAirPressure = new Date();
                break;
            case ReadingType.humidity:
                this.humidity = reading.value;
                this.lastUpdatedHumidity = new Date();
                break;
        }
    }
}