import * as degubFactory from "debug";
import * as http from "http";
import * as express from "express";
import * as path from "path";
import * as logger from "morgan";
import * as bodyParser from "body-parser";

import * as indexRoute from "./routes/index";

/**
 * Server Class
 */
export class Server {
    /**
     * @type {express.Application}
     */
    public app : express.Application;

    /**
     * Application instance 
     * @class Server
     * @Method instance
     * @static
     * @return Returns the new created injector for this app
     */
    public static instance() : Server
    {
        return new Server();
    }

    /**
     * Configure app
     * 
     * @class Server
     * @method config
     * @return void
     */
    private config() {
        // configure logger
        this.app.use(logger("dev"));

        // configure body-Parser
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));

        // configure static paths
        this.app.use(express.static(path.join(__dirname, "public")));

        // cath 404 errors
        this.app.use(this.onError);
    }

    /**
     * Error handler
     *
     * @class Server
     * @method onError
     * @return void
     */
    private onError(err : any, req: express.Request, res: express.Response, next: express.NextFunction) {
        console.error(err);
        //err.status = HttpStatusCode.NotFound;
        //let notFoundError: NotFoundError = new NotFoundError("Resource not found."); 

        //switch (err.getStatusCode()) {
        //    case HttpStatusCode.NotFound:
        //        res.status(HttpStatusCode.NotFound).send(notFoundError.message);
        //        break;
        //}   
    }

    /**
     * Configure routes
     * 
     * @class Server
     * @method routes
     * @return void
     */
    private routes(){
        // get router
        let router : express.Router;
        router = express.Router();

        // create routes
        var index : indexRoute.Index = new indexRoute.Index()

        // homepage
        router.get("/", index.index.bind(index.index));

        // use router
        this.app.use(router);
    }

    /**
     * start listening
     * 
     * @class Server
     * @method run
     * @return void 
    */
    public run(port: number) {
        this.app.set("port", port);

        this.app.listen(port);
    }

    /**
     * Constructor
     * 
     * @class Server
     * @method constructor
     */
    constructor() {
        this.app = express();

        // configure application
        this.config();

        // configure routes
        this.routes();
    }
}