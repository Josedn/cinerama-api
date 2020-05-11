import Movies from "./Movies";
import Express from "express";

export default class RouteManager {
    private app: Express.Application;
    private movies: Movies;

    constructor(app: Express.Application) {
        this.app = app;
        this.movies = new Movies();
    }

    setup() {
        this.app.get("/movies", this.movies.getMovies);
        this.app.get("/slideshow", this.movies.getSlideshow);
        this.app.get("/featured", this.movies.getFeatured);
    }
}