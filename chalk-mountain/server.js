const express = require('express'),
db_operations = require('./db-utils/operations');


db_operations.viewAll().then(res => {
    console.log(res);
})

// db_operations.sendInService('ESanders', 'S211')
// db_operations.sendInService('JFlores', 'S212')
// db_operations.sendInService('MBolding', 'S214')

// db_operations.sendOutOfService('MBolding', 'S211', 'Tire burst.')
// db_operations.sendOutOfService('MBolding', 'S212', 'Radiator out.')
// db_operations.sendOutOfService('ZNiece', 'S214', 'Bad fuel.')

// db_operations.viewAsset('S211').then(res => {
//     console.log(res)
// })