# **8-1 Introduction to mongoose**

ODN - OBJECT DATA MODELING 

## ****8-2 Installing express , mongoose, typescript, dotenv ,cors****

step 1: first of all create project folder 

step 2: https://expressjs.com/en/starter/installing.html create express project without index.js

step 3:  https://mongoosejs.com/docs/ install this command : `npm install mongoose --save`

step 4:  https://www.typescriptlang.org/download install this command : npm install typescript --save-dev

step 5: https://www.npmjs.com/package/cors install this command : npm i cors

step 6: https://www.npmjs.com/package/dotenv install this command : npm i dotenv

step 7:  install type Script JSON FILE : tsc -init

step 8:  create file folder :

     step 1 : create source folder : src —→ folder name 

     step 2:  src under create app folder .

     step 3:  src folder under create app.ts file and server.ts file 

     step 4:  go to the tsconfig.json  —→ search the rootDic and rootDic added : rootDic;’./src’

      step5: go to the tsconfig.json  —→ search the outDir and rootDic added : outDic;’./dist

step 10: express js doc code execute in app.js file 

step 11:  npm install --save @types/node 

step 12:  import express from ‘express’

step 13:  npm install --save @types/express

step 14: package.json file we have to write  under “scripts” :{

"build": "tsc",

}

step 15 : server js under code execute this 

**`const** mongoose = require('mongoose');`

```jsx
/*async function main() {
//await mongoose.connect('mongodb://127.0.0.1:27017/test');
try {
    await mongoose.connect(config.database_url as string);
    console.log('successfully run');
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }

}*/

```

step 15 :  root under create .env file 

step 16:  src folder under create app folder and app folder under create  config folder and config folder undser create index.ts file 

step 17:  index. ts file we have to execute this line of code 

```tsx
/*import donenv from 'dotenv';
import path from 'path';
donenv.config({ path: path.join(process.cwd(), '.env') });
export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
};*/

```

## ****8-3 Installing eslint, refactor code, fix errors using command****

step 18: https://blog.logrocket.com/linting-typescript-eslint-prettier/

step 19: **`// tsconfig.json` file execute this code of line**  

```
"include": ["src"], // which files to compile
  "exclude": ["node_modules"], // which files to skip
```

step 20: install this line :  **`npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev`**

step 21:  install this line : **`npx eslint --init`**

step 22: **`// .eslintrc`  setup the sum role** 

“roles”:{

```json
"no-unused-vars": "error",
        "no-unused-expressions":"error",
        "prefer-const":"error",
        "no-console":"warn",
        "no-undef":"error"
```

}

step 23 : create **.eslintignore file in the root folder** 

step 24 : **.eslintignore this file added the this line of code** 

```
node_modules
dist
```

step 25: go to the .packages.json  and 

```
{
  // ...
  "scripts": {
    "build": "tsc",
   "lint": "eslint src --ignore-path .eslintignore --ext .ts",
   },
  // ...
}
```

step 26 : fix error  command in the script ——> package.json file 

```
{
   // ...
  "scripts": {
    "build": "tsc",
   "lint": "eslint src --ignore-path .eslintignore --ext .ts",
   "lint:fix": "npm run lint --fix",
   },
  // ...
}
```

step 27:  **`// .eslintrc`  setup the  global value** 

```json
"rules": {
        "no-unused-vars": "error",
        "no-unused-expressions":"error",
        "prefer-const":"error",
        "no-console":"warn",
        "no-undef":"error"

    },
    "globals": {
        "process":"readonly"
    }
```

step 28 : install prettier  : **`npm install --save-dev prettier`**

step 29:  create a root folder—> **.prettierrc.json**

step 30: **.prettierrc.json under execute this line of code** 

```json
{
    "semi": true,
    "singleQuote": true
  }
```

step 31 : Package .JSON added this line "prettier": "prettier --ignore-path .gitignore --write \"./src/**/*.+(js|ts|json)\"",

{
// ...
"scripts": {
"build": "tsc",
"lint": "eslint src --ignore-path .eslintignore --ext .ts",

"prettier": "prettier --ignore-path .gitignore --write \"./src/**/*.+(js|ts|json)\"",
},
// ...
}

step : 32 : install this : **`npm install --save-dev eslint-config-prettier`**

step 33: **`// .eslintrc` josn** 

added the existing extends  er under this line of code 

**`"extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],`**

step 34 : prettier:fix script in package.json file 

{
// ...
"scripts": {
"build": "tsc",
"lint": "eslint src --ignore-path .eslintignore --ext .ts",

"prettier": "prettier --ignore-path .gitignore --write \"./src/**/*.+(js|ts|json)\"",

"prettier:fix": "npx prettier --write src",
},
// ...
}

setp 35: create root file .gitigonore

```
node_modules
dist
.env
```

step : 36 install the run project command : `npm i ts-node-dev --save-dev`

https://www.npmjs.com/package/ts-node-dev

command with out script is : ts-node-dev --respawn --transpile-only src/server.ts

step 37 : Finally run the project Script in Package.JSON

```json
"scripts": {
    "start:prod": "node ./dist/sever.js",
    "start:dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "build": "tsc",
    "lint": "eslint src --ignore-path .eslintignore --ext .ts",
    "lint:fix": "npm run lint --fix",
    "prettier": "prettier --ignore-path .gitignore --write \"./src/**/*.+(js|ts|json)\"",
    "prettier:fix": "npx prettier --write src",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
```