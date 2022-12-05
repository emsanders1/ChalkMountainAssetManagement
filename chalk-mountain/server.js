const express = require('express'),
db_operations = require('./db-utils/operations');


db_operations.viewAll().then(res => {
    console.log(res);
})

db_operations.viewAsset('431').then(res => {
    console.log(res);
})