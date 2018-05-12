import Database from "../src/index";

var testObject = {
    foo: "bar",
    bic: "boi",
}

var db: Database;

test("C - Creating db", () => {
    db = new Database("jest-testing");
    expect(db.exists()).toEqual(true);
});

test("R - Making sure read works", () => {
    let emptyfile = db.read();
    expect(emptyfile).toEqual({});
});

test("U - Inserting to db", () => {
    db.push("test", testObject);
    var newDb = db.read();
    expect(newDb).toEqual({test: testObject});
});

test("U - Inserting multiple to db", () => {
    db.push("test2", testObject);
    expect(db.read()).toEqual({test: testObject, test2: testObject})
});

test("R - Read specific object", () => {
    let test2 = db.read("test2");
    expect(test2).toEqual(testObject);
});

test("D - Deleting specific object", () => {
    db.delete("test");
    expect(db.read()).toEqual({test2: testObject});
});

test("D - Truncating db", () => {
    db.truncate();
    expect(db.read()).toEqual({});
});

test("D - Deleting database", () => {
    db.unlink();
    expect(db.exists()).toEqual(false);
});



