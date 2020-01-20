"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var PORT = 3000;
var app = express();
app.use(express.json());
app.get('/', function (req, res) {
    res.send("Hello, world!");
});
app.listen(PORT, function () {
    console.log("Listening on port " + PORT);
});
//# sourceMappingURL=index.js.map