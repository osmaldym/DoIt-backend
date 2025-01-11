<p align="center">
  <img width='30%' src="https://github.com/osmaldym/DoIt/blob/main/assets/logo.png?raw=true" />
</p>

# Getting Started

## 1. Download all dependencies.

```bash
$ yarn install
```

## 2. Edit environments

Edit `.env.example` variables and rename it to `.env`

## 3. Compile and run the project (I recommend use deno watch mode)

```bash
# Watch mode
deno run start:dev
# Or
yarn run start:dev

# Development
yarn run start

# Production mode
yarn run start:prod
```

## To use mongodb from terminal

```bash
# You can change the name of DB in .env.
mongosh mongodb://localhost/DoIt
```

## If you want to create your own categories manually, to show by default to all users:

```js
db.categories.insertOne({ name: 'Category name', deleted: false })
```

### If you want it with all properties (no indispensable)

```js
db.categories.insertOne({ name: 'Category name', deleted: false, by_user: false, updatedAt: new Date(), createdAt: new Date() })
```

## 4. Use the app

* ### Go to [DoIt app](https://github.com/osmaldym/DoIt) and follow README instructions, except, obviusly the part of coming back here.

# And you're ready!.