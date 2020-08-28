import { Observable, Subject } from 'rxjs';
import { Reading } from './../models/Reading';
import { SingleReading, ReadingType } from '../models/ReadingType';

export const temperatureSubject = new Subject();
export const airPressureSubject = new Subject();
export const humiditySubject = new Subject();

let workerId: any;
let events = [];
// time in milli seconds
let displayobjectThresholdTime = 100;

let emitter: any;
const observable = Observable.create((e: any) => emitter = e);

let readingObject = new Reading();

const process = () => {
    if (events.length > 0) {
        if(readingObject.canSendEventToDashboard())
            emitter.next(readingObject.get());
        events = [];
        clearInterval(workerId);
        workerId = null;
    }
}

// It makes sure that displayobject will not be send before 100
const startWorker = () => {
    process();
    workerId = setInterval(() => {
        process();
    }, displayobjectThresholdTime);
}

const eventObserver = () => {
    if (workerId) {
        events.push(true);
    }
    else {
        startWorker();
    }
}

export const eventService = {
    sendMessage: (message: SingleReading) => {
        readingObject.updateReadings(message);
        eventObserver();
    },
    getMessage: () => observable
};

// Just to show data update from different systems on interval of 900ms.
export const fakeSystemUpdate = () => {
    setInterval(() => {
        let random: Number = Math.floor(Math.random() * 100) % 3;
        switch (random) {
            case 0:
                temperatureSubject.next(parseFloat((Math.random()*100).toFixed(2)));
                break;
            case 1:
                airPressureSubject.next(parseFloat((Math.random()*100).toFixed(2)))
                break;
            case 2:
                humiditySubject.next(parseFloat((Math.random()*100).toFixed(2)))
                break;
        }
    }, 900);
}