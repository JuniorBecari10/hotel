const express = require("express");
const util = require("./util");

// TODO: prevent crashes when an error occurs inside a handler
function init(app) {
    app.set("view engine", "ejs");

    app.use(express.static("./public"));
    app.use(util.logMiddleware);
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
}

module.exports = init;
