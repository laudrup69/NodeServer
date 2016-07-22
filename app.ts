///

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
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(staticsPath, 'public')));

let port = ProcessingInstruction.env.PORT   || 3000;

app.set('port, port');

app.use('/', sampleRoute);

app.use(function (req, res, next) {
    var err = new Error('Not found');
    (err).status = 404;
    next(err);
});

var server = http.createServer(app);
server.listen(port);
server.on('error', (err) =&gt; {
    console.error(err);
});
server.on('listening', () =&gt; {
    var port = server.address().port;
    debug('Listening on ' + port);
});