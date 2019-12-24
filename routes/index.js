var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var url = require('url');

// The database is not used for anything outside of my example and is shut down.
var mysqlConnection = mysql.createConnection({
    host: 'database-1.ckkauay6zoa9.us-west-1.rds.amazonaws.com',
    user: 'admin',
    password: 'password',
    database: 'ChromeExtensinDB'
})

mysqlConnection.connect((err) => {
    if (!err) {
        console.log('DB CONNECTION SUCCEEDED')
    } else {
        console.log('DB CONNECTION FAILED: ' + JSON.stringify(err))
    }
})
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    if (typeof query.id !== 'undefined') {
        req.body = {
            ID: query.id,
            date: new Date()
        }
        let emp = req.body
        mysqlConnection.query('INSERT INTO CheckIn1 SET ?', emp, function (err, res, fields) {
            if(err)
                console.log('ERROR: ' + err)
        });
    }
    mysqlConnection.query('SELECT * FROM CheckIn1', (err, rows, fields) => {
        if (!err) {
            res.render('index', { title: JSON.stringify(rows) });
        } else {
            console.log(err)
        }
    })
});

module.exports = router;
