import Express from "express";

export default class Api {
    private app: Express.Application;

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
        
    }

    run() {
        
    }
}