const cds = require('@sap/cds');
const express = require('express');
const odatav2proxy = require('@sap/cds-odata-v2-adapter-proxy');
const moment = require('moment');
const GeoJSON = require('geojson');

module.exports = async (options) => {
    const app = cds.app = options.app || express();

    // mount static resources and common middlewares...
    app.use (express.static (cds.env.folders.app));  //> defaults to ./app

    // load specified models or all in project
    const model = cds.model = options.from = await cds.load(options.from || '*');

    // connect to primary database if required
    if (cds.requires.db) cds.db = await cds.connect.to('db');

    // bootstrap --in-memory db if requested
    if (options.in_memory) cds.db = await cds.deploy(model, options);

    // construct and mount modelled services
    await cds.serve(options).in(app);

    // start http server
    const {
        PORT = 4004
    } = process.env;

    app.use(odatav2proxy({
        port: PORT
    }));

    app.get('/geojson', async (req, res) => {
        // TODO: Add authentication
        var { AggregatedCovidCases } = model.entities('cap.covid');

        // Some default
        const currentDate = moment().subtract(1, 'days');
        const year = currentDate.year();
        const month = currentDate.month();
        const day = currentDate.date();

        const requestDate = moment([year, month, day]).format('YYYY-MM-DD');

        var cases = await SELECT.from(AggregatedCovidCases).where({ ReportDate: requestDate });

        var data = GeoJSON.parse(cases, { Point: [ 'Latitude', 'Longitude' ] });

        res.send(data);

    });

    return app.listen(PORT);
}