import Database from "../src/index";

var testObject = {
    foo: "bar",
    bic: "boi",
}

var dab: Database;

test("C - Creating db", () => {
    dab = new Database("jest-testing");
    expect(dab.exists()).toEqual(true);
});

test("R - Making sure read works", () => {
    let emptyfile = dab.read();
    expect(emptyfile).toEqual({});
});

test("U - Inserting to db", () => {
    dab.push("test", testObject);
    var newDb = dab.read();
    expect(newDb).toEqual({test: testObject});
});

test("U - Inserting multiple to db", () => {
    dab.push("test2", testObject);
    expect(dab.read()).toEqual({test: testObject, test2: testObject})
});

test("D - Deleting specific object", () => {
    dab.delete("test");
    expect(dab.read()).toEqual({test2: testObject});
});

test("D - Truncating db", () => {
    dab.truncate();
    expect(dab.read()).toEqual({});
});

test("D - Deleting database", () => {
    dab.unlink();
    expect(dab.exists()).toEqual(false);
});



