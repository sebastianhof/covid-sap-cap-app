const https = require('https');
const csvtojson = require('csvtojson');
const moment = require('moment');
const crypto = require('crypto');
const { generateDateFields } = require('./helper');

const PROVINCE_FIELD = 'Province/State';
const COUNTRY_FIELD = 'Country/Region';
const LAT_FIELD = 'Lat';
const LONG_FIELD = 'Long';


function loadData(url) {
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

                           var dateFields = generateDateFields();
                           return dateFields.map(d => {

                               const hash = {
                                   province: row[PROVINCE_FIELD],
                                   country: row[COUNTRY_FIELD],
                                   date: moment(d, 'M/D/YY').toDate()
                               }

                               return {
                                   ID: crypto.createHash('md5').update(JSON.stringify(hash)).digest('hex'),
                                   province: row[PROVINCE_FIELD],
                                   country: row[COUNTRY_FIELD],
                                   latitude: parseFloat(row[LAT_FIELD]),
                                   longitude: parseFloat(row[LONG_FIELD]),
                                   cases: parseInt(row[d]), 
                                   date: moment(d, 'M/D/YY').unix()
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
    const { ConfirmedCases, DeathCases, RecoveredCases } = srv.entities('cap.covid.project');

    const init = async () => {

        DELETE.from(ConfirmedCases);
        DELETE.from(DeathCases);
        DELETE.from(RecoveredCases);

        // INSERT.into(ConfirmedCases).entries({
        //     cases:989,
        //     country:"Mainland China",
        //     ID:"de50277562af4d10cd95b5de0240ad9e",
        //     reportDate: new Date(),
        //     latitude:31.8257,
        //     longitude:117.2264,
        //     province:"Anhui"
        //  })

         loadData('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv').then((data) => {
            INSERT.into(ConfirmedCases).entries(data);
        });
    
        
        loadData('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv').then((data) => {
            INSERT.into(DeathCases).entries(data);
        }); 
    
        loadData('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Recovered.csv').then((data) => {
            INSERT.into(RecoveredCases).entries(data);
        }); 

    }

    await init();

    srv.on('reset', init);


}