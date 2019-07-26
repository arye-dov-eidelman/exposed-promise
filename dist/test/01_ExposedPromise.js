"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExposedPromise_1 = require("../ExposedPromise");
const expect_1 = require("../expect");
expect_1.expect("(Sample test) ExposedPromise initial state is pending", () => {
    let ep = new ExposedPromise_1.ExposedPromise(new Promise(resolve => setTimeout(resolve, 100)));
    return { itPassed: ep.state == "pending" };
});
