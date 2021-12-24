#!/usr/bin/env node
var s=require("./main.js");(async()=>{const a=process.argv[2],o=process.argv[3]==="--watch";await(0,s.jsmin)({path:a,watch:o})})();
