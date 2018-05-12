import * as fs from "fs";
import * as path from "path";

class Db {
    fname: string;
    parent: any;

    public constructor(name: string) {
        this.fname = path.join("dist", name + ".json");
        this.parent = {};

        if (!fs.existsSync(this.fname)) {
            fs.writeFileSync(this.fname, "{}");
        }
    }

    /*public readAsync(callback: (content: any) => any): any {
        fs.readFile(this.fname, "utf8", (err, data) => {
            if (err)
                throw err;

            let object = JSON.parse(data);
            callback(object);
        });
    }*/

    public read() {
        var file = fs.readFileSync(this.fname, "utf8");
        let object = JSON.parse(file);
        return object;
    }

    /*public pushAsync(data: any, callback?: (err?: any) => any): void {
        data = JSON.stringify(data);
        fs.writeFile(this.fname, data, (err) => {
            if (callback !== undefined) {
                callback(err);
            }
        });
    }*/

    public push(path: string, data: any): void {
        this.parent[path] = data;
        let insert = JSON.stringify(this.parent);
        fs.writeFileSync(this.fname, insert);
    }

    private update() {
        this.insert(this.parent);
    }

    private insert(object: Object) {
        var data = JSON.stringify(object);
        fs.writeFileSync(this.fname, data);
    }

    public truncate() {
        this.parent = {};
        this.update();
    }

    public delete(path: string) {
        delete(this.parent[path]);
        this.update();
    }

    public unlink() {
        fs.unlinkSync(this.fname);
    }
    
    /*public deleteAsync(callback: (err?: any) => any) {
        fs.unlink(this.fname, (err) => {
            callback(err);
        })
    }*/

    public exists() {
        return fs.existsSync(this.fname);
    }
}

export default Db;