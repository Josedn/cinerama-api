import UIMovie from "./UIMovie";

export default class UIMovieGroup {
    title: string;
    movies: UIMovie[];
    constructor(title: string, movies: UIMovie[]) {
        this.title = title;
        this.movies = movies;
    }
}