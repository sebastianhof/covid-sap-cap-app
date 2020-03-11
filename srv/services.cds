using cap.covid.project as db from '../db/schema';

service CovidCasesService {

    entity ConfirmedCases as projection on db.ConfirmedCases;
    entity DeathCases as projection on db.DeathCases;
    entity RecoveredCases as projection on db.RecoveredCases;

    action reset();

}