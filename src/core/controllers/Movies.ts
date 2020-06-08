import Express, { Request, Response } from "express";

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

    static linkRoutes = (app: Express.Application) => {
        app.get("/movies", () => {

        });
    };
}

