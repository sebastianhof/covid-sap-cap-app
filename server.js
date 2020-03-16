module.exports = async (options) => {

    const cds = require('@sap/cds')
    const odatav2proxy = require('@sap/cds-odata-v2-adapter-proxy');
    
    const express = require('express')
    const app = cds.app = options.app || express()
    cds.emit('bootstrap',app) // hook for project-local server.js

    // mount static resources and common middlewares...
    app.use (express.static (cds.env.folders.app))  //> defaults to ./app
    app.get ('/',(_,res) => res.send (index.html))  //> if none in ./app
    app.use ('/favicon.ico', express.static (__dirname+'/etc/favicon.ico', {maxAge:'14d'}))
    //app.use (options.logger||logger)  //> basic request logging

    // load specified models or all in project
    const model = cds.model = options.from = await cds.load (options.from||'*')

    // connect to primary database if required
    if (cds.requires.db) cds.db = await cds.connect.to('db')

    // bootstrap --in-memory db if requested
    if (options.in_memory) cds.db = await cds.deploy (model,options)

    // construct and mount modelled services
    await cds.serve (options) .in (app)

    // start http server
    const { PORT=4004 } = process.env
    app.use(odatav2proxy({
        port: PORT
    }));
    return app.listen (PORT)
}
