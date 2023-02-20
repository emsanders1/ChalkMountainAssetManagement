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
  if(request.query.assetId === undefined) {
    // Default pagination settings
    let itemsPerPage = request.query.itemsPerPage === undefined ? 50 : request.query.itemsPerPage;
    let page = request.query.page === undefined ? 1 : request.query.page;
    let orderBy = request.query.orderBy === undefined ? "UNITNUMBER" : request.query.orderBy;
    let order = request.query.order === undefined ? "ASC" : request.query.order;

    db.viewAll(itemsPerPage, page, orderBy, order).then((data) => {
      response.status(200).json(data.recordset);
    })
  } else {
    db.viewAsset(request.query.assetId).then((data) => {
      response.status(200).json(data.recordset);
    })
  }
})

router.route('/assets/sendInService').post((request, response) => {
  console.log("Send in service request received.")
  db.getAssetStatus(request.query.assetId).then((data)  => {
    if(data.recordset[0]['STATUS']) {
      response.sendStatus(304);
    } else {
      db.sendInService(request.query.user, request.query.assetId);
      response.sendStatus(200);
    }
  })
})

router.route('/assets/sendOutOfService').post((request, response) => {
  console.log("Send out of service request received.")
  db.getAssetStatus(request.params.assetId).then((data)  => {
    if(data.recordset[0]['STATUS']) {
      db.sendOutOfService(request.query.user, request.query.assetId, request.query.notes);
      response.sendStatus(200);
    } else {
      response.sendStatus(304);
    }
  })
})
  
  
var port = process.env.PORT || 8090;
app.listen(port);
console.log('REST API is runnning at ' + port);