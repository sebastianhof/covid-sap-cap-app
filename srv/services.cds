using cap.covid.project as covid from '../db/schema';

service CovidCasesService {

    entity ConfirmedCases as projection on covid.Confirmed;
    entity DeathsCases as projection on covid.Deaths;
    entity RecoveredCases as projection on covid.Recovered;

}