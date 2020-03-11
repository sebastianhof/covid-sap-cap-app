using { cap.covid as db } from '../db/schema';

service CovidService {
    action reset();
    action geojson( day: Integer, month: Integer, year: Integer );

    entity ConfirmedCases as projection on db.ConfirmedCases;
    entity DeathCases as projection on db.DeathCases;
    entity RecoveredCases as projection on db.RecoveredCases;
}