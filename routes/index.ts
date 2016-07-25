import * as express from "express";

module Route {

    /**
      * Index
    */
    export class Index {
        public index (req: express.Request, res : express.Response, next : express.NextFunction){
            res.json({
                title: "Hola Aplicación Express"
            });
        }
     }
}

export = Route;