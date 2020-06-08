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

    static getMovies(req: Request, res: Response, next: NextFunction): void {
        MovieManager.getAvailablePages().then(pages => {
            const styledPages = pages.map(page => {
                return `${prefix}/${page}`;
            });

            res.json(styledPages);
        }).catch(err => {
            //next(err);
            res.json({});

            writeLine("Error handling request: " + err.message, LogLevel.Warning);
        });
    }
}

