//import Logger from "../../misc/Logger";
import Movie from "../../database/models/Movie";
import { escapeRegExp } from "../../misc/Utils";
import MovieController from "../controllers/MovieController";

//const writeLine = Logger.generateLogger("MovieManager");
const pageSize = 50;

export default class MovieManager {

    static getAvailablePages(): Promise<number[]> {
        return Movie.countDocuments().exec().then(count => {
            const pages = Math.round(count / pageSize);
            const docs: number[] = [];

            for (let i = 1; i < pages + 1; i++) {
                docs.push(i);
            }

            return docs;
        });
    }

    static getPage(page: number, data: { order?: number, keywords?: string, sort?: string, genre?: string }): Promise<any> {
        page = page - 1;
        const offset = page * pageSize;
        const query: any = {};

        if (!data.order) {
            data.order = -1;
        }

        let sort: any = {
            "rating.votes": data.order,
            "rating.percentage": data.order,
            "rating.watching": data.order
        };

        if (data.keywords) {
            const words = data.keywords.split(" ");

            let regex = "^";

            for (const w in words) {
                words[w] = words[w].replace(/[^a-zA-Z0-9]/g, "");
                regex += `(?=.*\\b${escapeRegExp(words[w].toLowerCase())}\\b)`;
            }

            query.title = {
                $regex: new RegExp(`${regex}.*`),
                $options: "gi"
            };
        }

        if (data.sort) {
            if (data.sort.match(/last added/i)) {
                sort = {
                    "released": data.order
                };
            }
            if (data.sort.match(/rating/i)) {
                sort = {
                    "rating.percentage": data.order,
                    "rating.votes": data.order
                };
            }
            if (data.sort.match(/title/i)) {
                sort = {
                    "title": (data.order * 1)
                };
            }
            if (data.sort.match(/trending/i)) {
                sort = {
                    "rating.watching": data.order
                };
            }
            if (data.sort.match(/year/i)) {
                sort = {
                    "year": data.order
                };
            }
        }

        if (data.genre && !data.genre.match(/all/i)) {
            if (data.genre.match(/science[-\s]fiction/i) || data.genre.match(/sci[-\s]fi/i)) {
                data.genre = "science-fiction";
            }
            query.genres = data.genre.toLowerCase();
        }

        return Movie.aggregate(
            [
                {
                    $sort: sort
                }, {
                    $match: query
                }, {
                    $project: MovieController.projection
                }, {
                    $skip: offset
                }, {
                    $limit: pageSize
                }
            ]
        ).exec() as Promise<any>;
    }
}