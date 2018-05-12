# Json DB

Featherweight writing and reading to json files

## Installation

npm i jsondb --save


## Usage
```typescript
import * as Database from 'jsondb';

var db = new Database("database-name");
// An empty database-name.json will be created 

db.push("MyTesting", {hello: "world"});
// Create "MyTesting" key and push an object to it

db.read("MyTesting"); 
/* => 

{ "hello": "world"}

*/


db.read(); 
// Read entire file
/* => 

"MyTesting": {
    "hello": "world"
}

*/

db.delete("MyTesting");
// Removes your "MyTesting" key

db.truncate();
// Wipes everything

db.unlink();
// Permanently deletes the file
```


## Test

```sh
npm run test
```