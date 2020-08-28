import { ReadingType, SingleReading } from './ReadingType'

export class Reading {
    temperature: Number | null = null;
    lastUpdatedTemperature: any = null;
    airPressure: Number | null = null;
    lastUpdatedAirPressure: any = null;
    humidity: Number | null = null;
    lastUpdatedHumidity: any = null;
    // will automatically update value to NA if system update time is passed.
    systemUpdateTime: Number = 1000;
    constructor() {

    }

    get() {
        let currDate: any = new Date();
        if(this.lastUpdatedTemperature && (currDate - this.lastUpdatedTemperature) > this.systemUpdateTime) {
            this.temperature = null;
        }
        if(this.lastUpdatedAirPressure && (currDate - this.lastUpdatedAirPressure) > this.systemUpdateTime) {
            this.airPressure = null;
        }
        if(this.lastUpdatedHumidity && (currDate - this.lastUpdatedHumidity) > this.systemUpdateTime) {
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

    canSendEventToDashboard() {
        return this.lastUpdatedTemperature && this.lastUpdatedAirPressure && this.lastUpdatedHumidity;
    }
}