"use strict";
var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    res.json({
        title: 'Hello Express'
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
//# sourceMappingURL=sample.js.map