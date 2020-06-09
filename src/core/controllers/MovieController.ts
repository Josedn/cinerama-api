import { Request, Response, NextFunction } from "express";
import Logger, { LogLevel } from "../../misc/Logger";
import MovieManager from "../movies/MovieManager";

const writeLine = Logger.generateLogger("MovieController");
const prefix = "movies";

export default class MovieController {
    static projection = {
        imdb_id: 1,
        title: 1,
        year: 1,
        runtime: 1,
        images: 1,
        genres: 1,
        synopsis: 1,
        trailer: 1,
        certification: 1,
        released: 1,
        rating: 1,
        slug: 1
    };

    static getAvailablePages(req: Request, res: Response, next: NextFunction): void {
        writeLine("Requested page list", LogLevel.Debug);

        MovieManager.getAvailablePages().then(pages => {
            const styledPages = pages.map(page => {
                return `${prefix}/${page}`;
            });
            res.json(styledPages);
        }).catch(err => {
            //next(err);
            res.status(500).json("something went wrong");
            writeLine("Error handling request: " + err.message, LogLevel.Warning);
        });
    }

    static getPage(req: Request, res: Response, next: NextFunction): void {
        const page = parseInt(req.params.page) - 1;
        
        writeLine("Requested page " + page, LogLevel.Debug);

        if (!isNaN(page) && page >= 0) {
            MovieManager.getPage(0, {keywords: "Harry"}).then(page => {
                res.json(page);
            }).catch(err => {
                res.status(500).json("something went wrong");
                writeLine("Error getting page " + err.message, LogLevel.Warning);
            });
        } else {
            res.status(404).json("not found");
        }
    }
}
