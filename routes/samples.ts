///

import * as express from 'express';
let router = express.router()

/* GET home page. */
router.get('/', (req, res, next) =&gt; {
    res.json({
        title: 'Hello Express'
    });
});

export default router;