var  db = require('./db-utils/operations');
var  express = require('express');
var  bodyParser = require('body-parser');
var  cors = require('cors');
var  app = express();
var  router = express.Router();

app.use(bodyParser.urlencoded({ extended:  true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

// https://www.telerik.com/blogs/step-by-step-create-node-js-rest-api-sql-server-database
// https://app.swaggerhub.com/apis/BOLDINGMATTHEWD/chalk-mountain_asset_management/1.0.0#/assets/put_assets__assetId_
// https://expressjs.com/en/api.html#router.route

router.use((request, response, next) => {
  console.log('REST API Accessed...');
  next();
});
 
 
router.route('/assets').get((request, response) => {
  db.viewAll().then((data) => {
    response.status(200).json(data.recordset);
  })
})

router.route('/assets/:assetId').get((request, response) => {
  db.viewAsset(request.params.assetId).then((data) => {
    response.status(200).json(data.recordset);
  })
})

router.route('/assets/sendInService/:assetId').post((request, response) => {
  console.log("Send in service request received.")
  db.getAssetStatus(request.params.assetId).then((data)  => {
    if(data.recordset[0]['STATUS']) {
      response.sendStatus(304);
    } else {
      db.sendInService("MBoldng", request.params.assetId);
      response.sendStatus(200);
    }
  })
})

router.route('/assets/sendOutOfService/:assetId/:notes').post((request, response) => {
  console.log("Send out of service request received.")
  db.getAssetStatus(request.params.assetId).then((data)  => {
    if(data.recordset[0]['STATUS']) {
      db.sendOutOfService("MBoldng", request.params.assetId, request.params.notes);
      response.sendStatus(200);
    } else {
      response.sendStatus(304);
    }
  })
})
  
  
var port = process.env.PORT || 8090;
app.listen(port);
console.log('REST API is runnning at ' + port);