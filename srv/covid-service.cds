using { cap.covid as db } from '../db/schema';

service CovidService {
    action reset ();

    entity ConfirmedCases as projection on db.ConfirmedCases;
    entity DeathCases as projection on db.DeathCases;
    entity RecoveredCases as projection on db.RecoveredCases;
    entity AggregatedCovidCases as projection on db.AggregatedCovidCases;
}
