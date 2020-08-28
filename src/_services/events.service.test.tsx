import React from 'react';
import { render } from '@testing-library/react';
import { fakeSystemUpdate, temperatureSubject, humiditySubject, airPressureSubject, eventService } from './events.service';
import { ReadingType, SingleReading} from './../models/ReadingType'

test('fakesysystemupdate should update reading more than 5 times in 5 secs', async () => {
    let totalUpdates = 0;
    fakeSystemUpdate();
    temperatureSubject.subscribe(() => {
        totalUpdates += 1;
    });
    airPressureSubject.subscribe(() => {
        totalUpdates += 1;
    });
    humiditySubject.subscribe(() => {
        totalUpdates += 1;
    });
    await new Promise((resolve, reject) => {
        setTimeout(() => {
           resolve(true); 
        }, 5000);
    });
    expect(totalUpdates).toBeGreaterThanOrEqual(5);
});

test('should receive displayobject on sending message from all three units within 100ms', async () => {
    let message = null;
    eventService.getMessage().subscribe((obj: any) => {
        message = obj;
    });
    eventService.sendMessage({type: ReadingType.temperature, value: 245.23 });
    eventService.sendMessage({type: ReadingType.humidity, value: 345.23 });
    eventService.sendMessage({type: ReadingType.airPressure, value: 145.23 });
    await new Promise((resolve, reject) => {
        setTimeout(() => {
           resolve(true); 
        }, 110);
    });
    expect(message).not.toBeNull();
});

test('should not receive displayobject on sending message until all units are updated at least once', async () => {
    let message = null;
    eventService.getMessage().subscribe((obj: any) => {
        message = obj;
    });
    eventService.sendMessage({type: ReadingType.temperature, value: 245.23 });
    await new Promise((resolve, reject) => {
        setTimeout(() => {
           resolve(true); 
        }, 110);
    });
    expect(message).toBeNull();
});

test('should not displayobject message within 100ms even if its updated simultaneously', async () => {
    let messageReceivedTimestampArray: any = [];
    eventService.getMessage().subscribe((obj: any) => {
        messageReceivedTimestampArray.push(new Date());
    });
    eventService.sendMessage({type: ReadingType.temperature, value: 245.23 });
    eventService.sendMessage({type: ReadingType.humidity, value: 245.23 });
    eventService.sendMessage({type: ReadingType.airPressure, value: 245.23 });
    // waiting for 50ms between sending messages
    for(var i=0;i<5;i++) {
        await new Promise((resolve, reject) => {
            setTimeout(() => {
               resolve(true); 
            }, 50);
        }); 
    }
    // testing all consecutive timestamps and diff between them should be greater than 100ms as per requirement.
    for(var i=0;i<messageReceivedTimestampArray.length - 1;i++) {
        expect(messageReceivedTimestampArray[i+1] - messageReceivedTimestampArray[i]).toBeGreaterThanOrEqual(100);
    }
})
