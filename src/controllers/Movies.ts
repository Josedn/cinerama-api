import Movie from "../models/Movie";
import { pageSize } from "../config/Constants";
import { Request, Response } from "express";
import { pulp, godfather2, harryPotters } from "./hardmovies";
import UIMovieGroup from "../models/UIMovieGroup";
import { escapeRegExp } from "../Misc";


export default class Movies {
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
        return res.json([pulp, godfather2]);
    }

    getFeatured(req: Request, res: Response, next: Function) {
        return res.json(new UIMovieGroup("Harry Potter week", harryPotters));
    }

    getExplore(req: Request, res: Response, next: Function) {
        return res.json([new UIMovieGroup("Harry Potter week", harryPotters), new UIMovieGroup("Our picks", [pulp, godfather2])]);
    }

    getSearch(req: Request, res: Response, next: Function) {
        if (req.params.query != null) {
            let query = req.params.query.toLowerCase();

            const search = harryPotters.concat([pulp, godfather2]).filter(movie => {
                return movie.title.toLowerCase().includes(query);
            });

            return res.json(new UIMovieGroup("Search: " + query, search));
        }
        return res.json(new UIMovieGroup("No results found", []));
    }

    getEmpty(req: Request, res: Response, next: Function) {
        return res.json([]);
    }

    getPage(req: Request, res: Response, next: Function) {
        const page = parseInt(req.params.page) - 1;
        const offset = page * pageSize;

        if (req.params.page.match(/all/i)) {
            return Movie.aggregate([{
                $project: Movies.projection
            }, {
                $sort: {
                    title: -1
                }
            }]).exec()
                .then((docs: any) => res.json(docs))
                .catch((err: any) => next(err));

        } else {
            const query: any = {};
            const data: any = req.query;

            if (!data.order) {
                data.order = -1;
            }

            let sort: any = {
                "rating.votes": parseInt(data.order, 10),
                "rating.percentage": parseInt(data.order, 10),
                "rating.watching": parseInt(data.order, 10)
            };

            if (data.keywords) {
                const words = data.keywords.split(" ");
                let regex = "^";

                for (let w in words) {
                    words[w] = words[w].replace(/[^a-zA-Z0-9]/g, "");
                    regex += `(?=.*\\b${escapeRegExp(words[w].toLowerCase())}\\b)`;
                }

                query.title = {
                    $regex: new RegExp(`${regex}.*`),
                    $options: "gi"
                };
            }

            if (data.sort) {
                if (data.sort.match(/last added/i)) sort = {
                    "released": parseInt(data.order, 10)
                };
                if (data.sort.match(/rating/i)) sort = {
                    "rating.percentage": parseInt(data.order, 10),
                    "rating.votes": parseInt(data.order, 10)
                };
                if (data.sort.match(/title/i)) sort = {
                    "title": (parseInt(data.order, 10) * 1)
                };
                if (data.sort.match(/trending/i)) sort = {
                    "rating.watching": parseInt(data.order, 10)
                };
                if (data.sort.match(/year/i)) sort = {
                    "year": parseInt(data.order, 10)
                };
            }

            if (data.genre && !data.genre.match(/all/i)) {
                if (data.genre.match(/science[-\s]fiction/i) || data.genre.match(/sci[-\s]fi/i)) data.genre = "science-fiction";
                query.genres = data.genre.toLowerCase();
            }

            return Movie.aggregate([{
                $sort: sort
            }, {
                $match: query
            }, {
                $project: Movies.projection
            }, {
                $skip: offset
            }, {
                $limit: pageSize
            }]).exec()
                .then((docs: any) => res.json(docs))
                .catch((err: any) => next(err));
        }
    }

}