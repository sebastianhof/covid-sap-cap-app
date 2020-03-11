'use strict';
const https = require('https');
const csvtojson = require('csvtojson');
const moment = require('moment');
const { generateDateFields } = require('./helper');

const PROVINCE_FIELD = 'Province/State';
const COUNTRY_FIELD = 'Country/Region';
const LAT_FIELD = 'Lat';
const LONG_FIELD = 'Long';
const crypto = require('crypto');


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
                                    date: moment(d, 'M/D/YY').toDate()
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



module.exports =  async (srv) => {

    const { ConfirmedCases, DeathCases, RecoveredCases } = cds.entities('cap.covid.project');

    srv.on('READ', 'ConfirmedCases', (req) => {
        loadData('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv').then((data) => {
            const tx = srv.transaction(req);
            tx.run(INSERT.into(ConfirmedCases).entries(data));
        });
    });


   

    
    loadData('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Death.csv').then((data) => {
        //srv.run(INSERT.into(DeathCases).entries(data));
    }); 

    loadData('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Recovered.csv').then((data) => {
        //srv.run(INSERT.into(RecoveredCases).entries(data));
    }); 







}