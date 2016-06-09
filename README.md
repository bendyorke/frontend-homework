# Invoicer

Creating invoices with Clojure, Datomic, React, and Redux.

## Development

Requires Node v5+, npm v3+, Java 7+, and boot-clj 2.6+

*All data is stored in an in-memory database, which means restarting the server
will wipe the database.*

To start the backend server in development mode, run:

```
$ boot dev
```

You can optionally specify a port with `-p <PORT>`, but it will default to 5888

To start the frontend server in development mode, run:

```
$ npm i
$ npm start
```

You can now open `localhost:5888/`

To run all the tests, run:

```
$ npm test -- test/
```

or pass it a path to a specific file/directory.
