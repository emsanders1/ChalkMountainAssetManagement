var  db = require('./db-utils/operations');
var  express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
var  bodyParser = require('body-parser');
var  cors = require('cors');
const ldap = require('ldapjs');
var  app = express();
var  router = express.Router();

app.use(bodyParser.urlencoded({ extended:  true }));
app.use(bodyParser.json());

app.use(session({
  name: "SESS_NAME",
  secret: "SESS_SECRET",
  saveUninitialized: false,
  resave: false,
  cookie: {
    sameSite: 'none',
    secure: process.env.NODE_ENV === "production",
    domain:'localhost:8090',
    maxAge: 1000,
    httpOnly: true,
  },
}));


app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(cookieParser());

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
  let statusBit = request.query.statusBit === '1' ? 1 : request.query.statusBit === '0' ? 0 : null;
  let searchText = request.query.searchText || null;

  db.viewAssets(sortColumn, sortOrder, pageSize, pageNumber, statusBit, searchText)
    .then((data) => {
      const assetList = data.recordset;
      db.viewAssetsCount(statusBit, searchText)
        .then((data) => {
          const assetCount = data.recordset[0]['AssetCount'];
          response.status(200).json({'assetCount': assetCount, 'assetList': assetList});
        }).catch((err) => {
          console.error(err);
          response.status(500).json({ error: 'Internal Server Error' });
        });
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
  let statusBit = request.query.statusBit === '1' ? 1 : request.query.statusBit === '0' ? 0 : null;
  let searchText = request.query.searchText || null;

  db.viewTractors(sortColumn, sortOrder, pageSize, pageNumber, statusBit, searchText)
    .then((data) => {
      const assetList = data.recordset;
      db.viewTractorsCount(statusBit, searchText)
        .then((data) => {
          const assetCount = data.recordset[0]['AssetCount'];
          response.status(200).json({'assetCount': assetCount, 'assetList': assetList});
        }).catch((err) => {
          console.error(err);
          response.status(500).json({ error: 'Internal Server Error' });
        })
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
  let statusBit = request.query.statusBit === '1' ? 1 : request.query.statusBit === '0' ? 0 : null;
  let searchText = request.query.searchText || null;

  db.viewTrailers(sortColumn, sortOrder, pageSize, pageNumber, statusBit, searchText)
    .then((data) => {
      const assetList = data.recordset;
      db.viewTrailersCount(statusBit, searchText)
        .then((data) => {
          const assetCount = data.recordset[0]['AssetCount'];
          response.status(200).json({'assetCount': assetCount, 'assetList': assetList});
        }).catch((err) => {
          console.error(err);
          response.status(500).json({ error: 'Internal Server Error' });
        })
  }).catch((err) => {
      console.error(err);
      response.status(500).json({ error: 'Internal Server Error' });
  });
});

router.route('/assets/sendInService').post((request, response) => {
  const sessionId = request.get("sessionId");
  const username = allSessionData[sessionId].username;
  const groups = allSessionData[sessionId].groups;
  const assetId = request.body.assetId;

  if(!groups.includes('ShopAdmin') && !groups.includes('Mechanic')) {
    return response.status(401).send('User not authorized.')
  }

  db.getAssetStatus(assetId).then((data)  => {
    if (!data.recordset.length) {
      return response.status(404).send('Asset not found.');
    }

    const assetStatus = data.recordset[0]['STATUS'];

    if (assetStatus) {
      return response.status(304).send('Asset is already in service.');
    }

    db.sendInService(username, assetId).then(() => {
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
  const sessionId = request.get("sessionId");
  const username = allSessionData[sessionId].username;
  const groups = allSessionData[sessionId].groups;
  const assetId = request.body.assetId;
  const notes = request.body.notes;

  if(!groups.includes('ShopAdmin') && !groups.includes('YardCoordinator')) {
    return response.status(401).send('User not authorized.')
  }

  db.getAssetStatus(assetId).then((data)  => {
    if (!data.recordset.length) {
      return response.status(404).send('Asset not found.');
    }

    const assetStatus = data.recordset[0]['STATUS'];

    if (!assetStatus) {
      return response.status(304).send('Asset is already out of service.');
    }

    const cleanNotes = notes.replace(/[^a-zA-Z0-9 ,.;_]/g, '');

    db.sendOutOfService(username, assetId, cleanNotes).then(() => {
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

let allSessionData = {};

router.route('/ldap').post((req, res) => {
  console.log("LDAP endpoint called!");  
  console.log(req.body.username);
  console.log(req.body.password);

  const bindDomainName = `cn=${req.body.username},cn=Users,dc=ManBearPig,dc=com`;
  const bindPassword = `${req.body.password}`;

  client = ldap.createClient({
    url: 'ldap://172.16.50.3:389',
    timeout: 100000,
    idleTimeout: 300000,
    maxWaitTime: 5000,
    maxConnections: 10,
    bindDN: bindDomainName,
    bindCredentials: bindPassword,
    tlsOptions: {},
    reconnect: true,
  });

  client.bind(bindDomainName, bindPassword, (error) => {
    if (error) {
      console.error(error);
      return res.status(500).send({ message: 'Failed to connect to LDAP server',  error});
    } else {
      console.log('Successfully binded to the server!');

      const username = bindDomainName.split(',')[0].substr(3);
      req.session.username = username;
      console.log("Username:", req.session.username);
      client.search(bindDomainName, {
        scope: 'base',
        attributes: ['memberOf']
      }, (err, ldapResult) => {
        const groups = [];

        ldapResult.on('searchEntry', (entry) => {
          groups.push(...entry.object.memberOf.map((group) => {
            const groupDn = group.split(',')[0];
            const groupName = groupDn.split('=')[1];
            return groupName;
          }));
        });

        ldapResult.on('end', () => {
          console.log('Groups:', groups);
          // Store the groups in the session of the user
          req.session.groups = groups;
          allSessionData[req.session.id] = req.session;
          console.log(allSessionData)
          req.session.save();

          // Set the session ID in a cookie on the client side
          res.cookie('sessionId', req.session.id, { maxAge: 900000, credentials: true, path: '/', secure: false });
          res.status(200).json();
        });      
      });
    }
  });
});

router.route('/ldap/getGroups').get((req, res) => {
  const sessionId = req.get("sessionId")
  const session = allSessionData[sessionId];
  if (session) {
    res.status(200).json(session.groups);
  } else {
    res.status(200).json([]);
  }
});

router.route('/ldap/logout').post((req, res) => {
  const sessionId = req.get("sessionId");
  const session = allSessionData[sessionId];
  if (session) {
    delete allSessionData[sessionId]; // Remove the session data
    res.status(200).json();
  } else {
    res.status(200).json({ message: 'Session does not exist!' });
  }
});



router.route('/ldap/getName').get((req, res) => {
  const sessionId = req.get("sessionId");
  const session = allSessionData[sessionId];
  if (session) {
    res.status(200).json(session.username);
  } else {
    res.status(200).json("");
  }
});

var port = process.env.PORT || 8090;
app.listen(port);
console.log('REST API is runnning at ' + port);