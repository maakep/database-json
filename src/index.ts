import * as fs from "fs";
import * as path from "path";

class Db {
    fname: string;

    constructor(name: string) {
        this.fname = name + ".json";

        fs.writeFile(this.fname, "", { flag: 'wx' }, function (err) {
            if (err) throw err;
            console.log("File created!");
        });
    }

    get(callback: (fileContentObject: any) => any): any {
        fs.readFile(this.fname, "utf8", (err, data) => {
            if (err) 
                throw err;

            let object = JSON.parse(data);
            callback(object);
        });
    }

    getSync() {
        var file = fs.readFileSync(this.fname, "utf8");
        if (file === undefined) {
            console.log("Couldn't find " + this.fname + ".json");
        }
        let object = JSON.parse(file);
        return object;
    }

    push(path: string, data: any, callback?: (err?: any) => any) {
        let obj 
        let jsonString = JSON.stringify(data);
        fs.writeFile(this.fname, data, (err) => {
            if (callback !== undefined) {
                callback(err);
            }
        });
    }

    delete() {

    }

}

export default Db;