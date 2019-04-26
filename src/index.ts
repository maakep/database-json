import * as fs from "fs";
import * as path from "path";

class Db {
  fname: string;
  data: any;

  public constructor(name: string) {
    this.fname = path.resolve(name + ".json");
    this.data = {};

    if (!fs.existsSync(this.fname)) {
      fs.writeFileSync(this.fname, "{}");
    } else {
      const file = fs.readFileSync(this.fname, "utf8");
      this.data = JSON.parse(file);
    }
  }

  public read(path?: string) {
    const object = this.data;

    if (path !== undefined) {
      return object[path];
    }

    return object;
  }

  public push(path: string, data: any) {
    this.data[path] = data;
    this.update();
  }

  public truncate() {
    this.data = {};
    this.update();
  }

  public drop(path: string) {
    delete (this.data[path]);
    this.update();
  }

  public delete() {
    fs.unlinkSync(this.fname);
  }

  public exists() {
    return fs.existsSync(this.fname);
  }

  private update() {
    this.insert(this.data);
  }

  private insert(object: Object) {
    var data = JSON.stringify(object);
    fs.writeFileSync(this.fname, data, "utf8");
  }
}

export default Db;