import program from "commander";
import Api from "./Api";

export default class CLI {
    run() {
        const mainApi = new Api();
        mainApi.run();
    }
}