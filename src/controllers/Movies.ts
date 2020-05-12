import Movie from "../models/Movie";
import { pageSize } from "../config/Constants";
import { Request, Response } from "express";
import { pulp, godfather2, harryPotters } from "./hardmovies";
import UIMovieGroup from "../models/UIMovieGroup";

export default class Movies {
    private projection: object;

    constructor() {
        this.projection = {
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
            torrents: 1
        };
    }

    getMovies(req: Request, res: Response, next: Function) {
        Movie.countDocuments().exec().then(count => {
            const pages = Math.round(count / pageSize);
            const docs = [];

            for (let i = 1; i < pages + 1; i++) {
                docs.push(`movies/${i}`);
            }

            return res.json(docs);
        }).catch(err => next(err));
    }

    getSlideshow(req: Request, res: Response, next: Function) {
        return res.json([pulp]);
    }

    getFeatured(req: Request, res: Response, next: Function) {
        return res.json(new UIMovieGroup("Harry Potter week", harryPotters));
    }

}