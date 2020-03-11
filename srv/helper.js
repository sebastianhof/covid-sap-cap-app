
const moment = require('moment');

// Helper function generating date fields from 1/22 to current date
// output: [ '1/22/20', '1/23/20', ..., '1/31/20', '2/1/20', ..., today ] 
module.exports.generateDateFields = () => {
    let currentDate = new Date(2020, 1, 22);
    const endDate = new Date();
    const dates = [];

    while (currentDate <= endDate) {
        dates.push(moment(currentDate).format('M/D/YY'));
        currentDate = currentDate = moment(currentDate).add(1, 'days');
    }

    return dates;
}