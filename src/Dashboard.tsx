import React from 'react';
import { eventService, temperatureSubject, airPressureSubject, humiditySubject, fakeSystemUpdate } from './_services';
import { ReadingType } from './models/ReadingType'

function Dashboard() {

    const [display, setDisplay] = React.useState<any>(null);

    React.useEffect(() => {
        eventService.getMessage().subscribe((obj: any) => {
            setDisplay(obj);
        });
        temperatureSubject.subscribe(
            (data: any) => {
                eventService.sendMessage({ type: ReadingType.temperature, value: data })
            });
        airPressureSubject.subscribe(
            (data: any) => {
                eventService.sendMessage({ type: ReadingType.airPressure, value: data })
            })
        humiditySubject.subscribe(
            (data: any) => {
                eventService.sendMessage({ type: ReadingType.humidity, value: data })
            });
        fakeSystemUpdate();
    }, []);



    return (
        <div>
            {display && <div className="row well">
                <div className="col-md-3"></div>
                <div className="col-md-2">
                    <span><b>Temperature:</b> {display.temperature ? display.temperature : 'NA'}</span>
                </div>
                <div className="col-md-2">
                    <span><b>Air Pressure:</b> {display.airPressure ? display.airPressure : 'NA'}</span>
                </div>
                <div className="col-md-2">
                    <span><b>Humidity:</b> {display.humidity ? display.humidity : 'NA'}</span>
                </div>
                <div className="col-md-3"></div>
            </div>}
        </div>
    );
}

export default Dashboard;
