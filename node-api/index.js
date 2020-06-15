var http = require("http");
var express = require('express');
var app = express();
var mysql      = require('mysql');
var bodyParser = require('body-parser');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'test'
});
 
 
connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected with mysql database...')
})

app.use( bodyParser.json() );      
app.use(bodyParser.urlencoded({    
  extended: true
}));

var server = app.listen(3000, "127.0.0.1", function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("Example app listening at http://%s:%s", host, port)
 
});

app.get('/users', function (req, res) {
   connection.query('select * from users', function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

app.get('/users/:id', function (req, res) {
   connection.query('select * from users where Id=?', [req.params.id], function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

app.put('/users', function (req, res) {
   connection.query('UPDATE `customer` SET `Name`=? where `Id`=?', [req.body.Name,req.body.Id], function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});


app.delete('/users', function (req, res) {
   console.log(req.body);
   connection.query('DELETE FROM `users` WHERE `Id`=?', [req.body.Id], function (error, results, fields) {
	  if (error) throw error;
	  res.end('Record has been deleted!');
	});
});


app.post('/users', function (req, res) {
   var params  = req.body;
   console.log(params);
   connection.query('INSERT INTO users SET ?', params, function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});
