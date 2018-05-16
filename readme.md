[![Build Status](https://travis-ci.org/maakep/database-json.svg?branch=master)](https://travis-ci.org/maakep/database-json)
[![Weekly downloads](https://img.shields.io/npm/dt/object-to-file.svg)](https://www.npmjs.com/package/object-to-file)

# Object-to-file, JSON database

Featherweight writing and reading object to/from json files.

### Installation
```sh
npm i object-to-file --save
```

## Module usage
### Try it out in RunKit
https://npm.runkit.com/object-to-file
```javascript
var objectToFile = require("object-to-file")
var db = new objectToFile.default("testing-runkit");
db.push("Greeting", { Hello: "World"});
db.read("Greeting");
```

## Typescript docs
### Creating database
Create a database named "database-name":
```typescript
import Database from 'object-to-file';
var db = new Database("database-name");

// or, in js

var objectToFile = require("object-to-file");
var db = new objectToFile.default("database-name");
```
An empty database-name.json will be created. 


### Updating
Create "MyTesting" key and push an object to it:
```typescript
db.push("MyTesting", { hello: "world" });
``` 


### Reading
#### Single key
Get the object(s) of MyTesting key:
```typescript
db.read("MyTesting");
```
object returned: 
```json
{ "hello": "world" }
```


#### Everything
Read entire file:
```typescript
db.read(); 
```
object returned:
```json
"MyTesting": {
    "hello": "world"
}
```

### Deleting
Remove everything under "MyTesting" and the key:
```typescript
db.delete("MyTesting");
```

Remove all data:
```typescript
db.truncate();
```

Permanently remove the database (file):
```typescript
db.unlink();
```


## Test
ts-jest to run tests (not included in )
```sh
npm run test
```
