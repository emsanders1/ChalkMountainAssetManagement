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

router.use((request, response, next) => {
  console.log('REST API Accessed...');
  next();
});
 
 
router.route('/assets').get((request, response) => {
    // Default Pagination Settings
    let pageSize = parseInt(request.query.pageSize) || 50;
    let pageNumber = parseInt(request.query.pageNumber) || 1;
    let sortColumn = request.query.sortColumn || 'UNITNUMBER';
    let sortOrder = request.query.sortOrder === 'DESC' ? 'DESC' : 'ASC';
    let statusBit = request.query.statusBit === '1' ? 1 : request.query.statusBit === '0' ? 0 : null;;

    db.viewAssets(sortColumn, sortOrder, pageSize, pageNumber, statusBit)
      .then((data) => {
        response.status(200).json(data.recordset);
    }).catch((err) => {
        console.error(err);
        response.status(500).json({ error: 'Internal Server Error' });
    });
});

router.route('/assets/tractors').get((request, response) => {
  // Default Pagination Settings
  let pageSize = parseInt(request.query.pageSize) || 50;
  let pageNumber = parseInt(request.query.pageNumber) || 1;
  let sortColumn = request.query.sortColumn || 'UNITNUMBER';
  let sortOrder = request.query.sortOrder === 'DESC' ? 'DESC' : 'ASC';
  let statusBit = request.query.statusBit === '1' ? 1 : request.query.statusBit === '0' ? 0 : null;;

  db.viewTractors(sortColumn, sortOrder, pageSize, pageNumber, statusBit)
    .then((data) => {
      response.status(200).json(data.recordset);
  }).catch((err) => {
      console.error(err);
      response.status(500).json({ error: 'Internal Server Error' });
  });
});

router.route('/assets/trailers').get((request, response) => {
  // Default Pagination Settings
  let pageSize = parseInt(request.query.pageSize) || 50;
  let pageNumber = parseInt(request.query.pageNumber) || 1;
  let sortColumn = request.query.sortColumn || 'UNITNUMBER';
  let sortOrder = request.query.sortOrder === 'DESC' ? 'DESC' : 'ASC';
  let statusBit = request.query.statusBit === '1' ? 1 : request.query.statusBit === '0' ? 0 : null;;

  db.viewTrailers(sortColumn, sortOrder, pageSize, pageNumber, statusBit)
    .then((data) => {
      response.status(200).json(data.recordset);
  }).catch((err) => {
      console.error(err);
      response.status(500).json({ error: 'Internal Server Error' });
  });
});

router.route('/assets/sendInService').post((request, response) => {
  const user = request.query.user;
  const assetId = request.query.assetId;

  if (!user || !assetId) {
    return response.status(400).send('User and asset ID are required.');
  }

  db.getAssetStatus(assetId).then((data)  => {
    if (!data.recordset.length) {
      return response.status(404).send('Asset not found.');
    }

    const assetStatus = data.recordset[0]['STATUS'];
    console.log("api.js sendInService getAssetStatus" + assetStatus)

    if (assetStatus) {
      return response.status(304).send('Asset is already in service.');
    }

    db.sendInService(user, assetId).then(() => {
      response.sendStatus(200);
    }).catch((error) => {
      console.error('Error sending asset in service:', error);
      response.status(500).send('Error sending asset in service.');
    });
  }).catch((error) => {
    console.error('Error getting asset status:', error);
    response.status(500).send('Error getting asset status.');
  });
});

router.route('/assets/sendOutOfService').post((request, response) => {
  const user = request.query.user;
  const assetId = request.query.assetId;
  const notes = request.query.notes;

  if (!user || !assetId || !notes) {
    return response.status(400).send('User, asset ID, and notes are required.');
  }

  db.getAssetStatus(assetId).then((data)  => {
    if (!data.recordset.length) {
      return response.status(404).send('Asset not found.');
    }

    const assetStatus = data.recordset[0]['STATUS'];

    if (!assetStatus) {
      return response.status(304).send('Asset is already out of service.');
    }

    const cleanNotes = notes.replace(/[^a-zA-Z0-9 ,.\-_]/g, '');
    console.log("Clean notes " + cleanNotes)

    db.sendOutOfService(user, assetId, cleanNotes).then(() => {
      response.sendStatus(200);
    }).catch((error) => {
      console.error('Error sending asset out of service:', error);
      response.status(500).send('Error sending asset out of service.');
    });
  }).catch((error) => {
    console.error('Error getting asset status:', error);
    response.status(500).send('Error getting asset status.');
  });
});
  
var port = process.env.PORT || 8090;
app.listen(port);
console.log('REST API is runnning at ' + port);

