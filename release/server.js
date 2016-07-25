"use strict";
var express = require("express");
var path = require("path");
var logger = require("morgan");
var bodyParser = require("body-parser");
var indexRoute = require("./routes/index");
var Server = (function () {
    function Server() {
        this.app = express();
        this.config();
        this.routes();
    }
    Server.instance = function () {
        return new Server();
    };
    Server.prototype.config = function () {
        this.app.use(logger("dev"));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(express.static(path.join(__dirname, "public")));
        this.app.use(this.onError);
    };
    Server.prototype.onError = function (err, req, res, next) {
        console.error(err);
    };
    Server.prototype.routes = function () {
        var router;
        router = express.Router();
        var index = new indexRoute.Index();
        router.get("/", index.index.bind(index.index));
        this.app.use(router);
    };
    Server.prototype.run = function (port) {
        this.app.set("port", port);
        this.app.listen(port);
    };
    return Server;
}());
exports.Server = Server;
//# sourceMappingURL=server.js.map