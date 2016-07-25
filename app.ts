import * as debugFactory from 'debug';
import * as http from 'http';
import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

import sampleRoute from './routes/sample';

let debug = debugFactory('app:server');

let staticsPath = __dirname;

let app = express();

// Configure logger 
app.use(logger('dev'));

// Configure bodyParser 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Configure static paths 
app.use(express.static(path.join(staticsPath, 'public')));

// Purt server 
let port = process.env.PORT || 3000;

app.set('port', port);

app.use('/', sampleRoute);

app.use(function(req, res, next) {
    var err = new Error('Not Found');

    err['status'] = 404;
    //(err).status = 404;
    next(err);
});

// Create server 
var server = http.createServer(app);

// indicated port listen 
server.listen(port);

server.on('error', (err: any) => {
    console.error(err);
});

server.on('listening', () => {
    var port = server.address().port;
    debug('Listening on ' + port);
});