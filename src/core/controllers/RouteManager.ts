import Express from "express";
import MovieManager from "../movies/MovieManager";
import Logger, { LogLevel } from "../../misc/Logger";
import MovieController from "./MovieController";

const writeLine = Logger.generateLogger("RouteManager");

export default class RouteManager {

    initialize(app: Express.Application) {
        app.get("/movies", MovieController.getMovies);

        /*this.app.get("/movies/:page", this.movies.getPage);
        this.app.get("/slideshow", this.movies.getSlideshow);
        this.app.get("/featured", this.movies.getFeatured);
        this.app.get("/explore", this.movies.getExplore);
        this.app.get("/search/:query", this.movies.getSearch);
        this.app.get("/search", this.movies.getEmpty);*/

        return true;
    }
}