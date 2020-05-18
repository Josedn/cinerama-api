import path from "path";

/**
 * The host of the server of the database. Default is `["localhost"]`.
 * @type {Array}
 */
export const dbHosts = ["localhost"];

/**
 * The name of the database. Default is `popcorn`.
 * @type {String}
 */
export const dbName = "popcorn";

/**
 * The amount of object show per page. Default is `50`.
 * @type {Integer}
 */
export const pageSize = 50;

/**
 * The port on which the API will run on. Default is `5000`.
 * @type {Integer}
 */
export const port = 1232;

/**
 * The path to the temprary directory.. Default is `./tmp`.
 * @type {String}
 */
export const tempDir = path.join(process.cwd(), "tmp");