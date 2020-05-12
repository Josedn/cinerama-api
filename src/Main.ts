import Express from "express";
import DatabaseManager from "./storage/DatabaseManager";
import bodyParser from "body-parser";
import compress from "compression";
import responseTime from "response-time";
import Movies from "./controllers/Movies";
import { port } from "./config/Constants";
import RouteManager from "./controllers/RouteManager";

export default class Api {
    private app: Express.Application;
    private routeManager: RouteManager;
    private databaseManager: DatabaseManager;

    /**
     * Create an index object.
     * @param {Object} config - Configuration for the API.
     * @param {Boolean} [config.start=true] - Start the scraping process.
     * @param {Boolean} [config.pretty=true] - Pretty output with Winston logging.
     * @param {Boolean} [config.verbose=false] - Debug mode for no output.
     * @param {Boolean} [config.debug=false] - Debug mode for extra output.
     */
    constructor({ start = true, pretty = true, verbose = false, debug = false } = {}) {
        this.app = Express();

        // Enable parsing URL encoded bodies.
        this.app.use(bodyParser.urlencoded({ extended: true }));

        // Enable parsing JSON bodies.
        this.app.use(bodyParser.json());

        // Enables compression of response bodies.
        this.app.use(compress({
            threshold: 1400,
            level: 4,
            memLevel: 3
        }));

        // Enable response time tracking for HTTP request.
        this.app.use(responseTime());

        // Enable cors
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE');
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
            next();
        });

        // Enable HTTP request logging.
        //if (pretty && !verbose) app.use(Logger.expressLogger);

        this.routeManager = new RouteManager(this.app);
        this.routeManager.setup();

        this.databaseManager = new DatabaseManager();
        this.databaseManager.connect();

        //////////
        this.app.listen(port);
    }
}