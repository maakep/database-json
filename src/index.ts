import * as fs from "fs";
import * as path from "path";

class Db {
    fname: string;
    parent: any;

    public constructor(name: string) {
        this.fname = path.resolve(name + ".json");
        this.parent = {};

        if (!fs.existsSync(this.fname)) {
            fs.writeFileSync(this.fname, "{}");
        }
    }

    public read(path?: string) {
        var file = fs.readFileSync(this.fname, "utf8");
        let object = JSON.parse(file);
        
        if (path !== undefined) {
            return object[path];
        }

        return object;
    }

    public push(path: string, data: any): void {
        this.parent[path] = data;
        let insert = JSON.stringify(this.parent);
        fs.writeFileSync(this.fname, insert);
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

    public exists() {
        return fs.existsSync(this.fname);
    }

    private update() {
        this.insert(this.parent);
    }

    private insert(object: Object) {
        var data = JSON.stringify(object);
        fs.writeFileSync(this.fname, data);
    }
}

export default Db;