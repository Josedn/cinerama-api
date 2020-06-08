import * as fs from "fs";
import { ConfigKeys } from "./Constants";

export default class ConfigManager {
    private configMap: Dictionary;
    private fileName: string;

    constructor(fileName: string) {
        this.configMap = {};
        this.fileName = fileName;
    }

    initialize(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (fs.existsSync(this.fileName)) {
                fs.promises.readFile(this.fileName, { encoding: "utf-8" }).then(rawText => {
                    try {
                        const parsed = JSON.parse(rawText);
                        this.configMap = Object.assign({}, this.configMap, parsed);
                        resolve(true);
                    } catch {
                        reject(new Error("Error parsing JSON:" + this.fileName));
                    }
                });
            } else {
                resolve(false);
            }
        });
    }

    getValue<T>(key: ConfigKeys): T {
        const value = ConfigKeys[key];
        return this.configMap[value] as T;
    }
}

interface Dictionary {
    [id: string]: any;
}