const cds = require('@sap/cds');

const https = require('https');
const csvtojson = require('csvtojson');
const moment = require('moment');
const crypto = require('crypto');
const uuidv4 = require('uuid').v4;

const PROVINCE_FIELD = 'Province/State';
const COUNTRY_FIELD = 'Country/Region';
const LAT_FIELD = 'Lat';
const LONG_FIELD = 'Long';

const generateFields = () => {
    let currentDate = new Date(2020, 1, 22);
    const endDate = new Date();
    const dates = [];

    while (currentDate <= endDate) {
        dates.push(moment(currentDate).format('M/D/YY'));
        dates.push(moment(currentDate).format('M/D/YYYY'));
        currentDate = currentDate = moment(currentDate).add(1, 'days');
    }

    return dates;
}

const loadData = async (url) => {
    return new Promise((resolve, reject) => {
       https.get(url, (resp) => {
               let data = '';

               resp.on('data', (chunk) => {
                   data += chunk;
               });

               resp.on('end', () => {
                   csvtojson({
                       noheader: false,
                       output: 'json'
                   })
                   .fromString(data)
                   .then((csvRows) => {
                       const data = csvRows.flatMap(row => { 

                           var dateFields = generateFields();
                           return dateFields
                            .filter(d => row.hasOwnProperty(d))
                            .map(d => {

                               return {
                                   ID: uuidv4(),
                                   province: row[PROVINCE_FIELD],
                                   country: row[COUNTRY_FIELD],
                                   latitude: parseFloat(row[LAT_FIELD]) || 0,
                                   longitude: parseFloat(row[LONG_FIELD]) || 0,
                                   cases: parseInt(row[d]) || 0, 
                                   date: moment(d, 'M/D/YY').format('YYYY-MM-DD')
                               }

                           });

                       });                    

                       resolve(data);

                   });

               });

           }

       ).on('error', (err) => {
           console.log(`Error ${err}`);
           reject(err);
       });
   });


} 

module.exports = async (srv) => {
    const { ConfirmedCases, DeathCases, RecoveredCases, AggregatedCovidCases } = srv.entities('cap.covid');

    const init = async () => {

        await DELETE.from(ConfirmedCases);
        await DELETE.from(DeathCases);
        await DELETE.from(RecoveredCases);

        const confirmedData = await loadData('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv');
        const deathData = await loadData('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv'); 
        const recoveredData = await loadData('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv'); 

        await INSERT.into(ConfirmedCases).entries(confirmedData); 
        await INSERT.into(DeathCases).entries(deathData);
        await INSERT.into(RecoveredCases).entries(recoveredData);
    }

    srv.on('reset', init);

    init();

}