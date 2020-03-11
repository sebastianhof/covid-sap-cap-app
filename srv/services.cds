using cap.covid.project as covid from '../db/schema';

service CovidCasesService {

    entity ConfirmedCases as projection on covid.ConfirmedCases;
    entity DeathsCases as projection on covid.DeathCases;
    entity RecoveredCases as projection on covid.RecoveredCases;

}