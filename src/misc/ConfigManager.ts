import * as fs from "fs";

export default class ConfigManager {
    private configMap: Dictionary;
    private fileName: string;

    constructor(fileName: string) {
        this.configMap = {};
        this.fileName = fileName;
    }

    initialize() {
        return new Promise((resolve, reject) => {
            if (fs.existsSync(this.fileName)) {
                fs.promises.readFile(this.fileName, { encoding: "utf-8" }).then(rawText => {
                    try {
                        const parsed = JSON.parse(rawText);
                        this.configMap = Object.assign({}, this.configMap, parsed);
                        resolve(true);
                    } catch {
                        reject(new Error('Error parsing JSON:' + this.fileName));
                    }
                });
            } else {
                resolve(false);
            }
        });
    }

    getValue(key: string) {
        return this.configMap[key];
    }
}

interface Dictionary {
    [id: string]: string;
}