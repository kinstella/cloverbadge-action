#!/usr/bin/env node
const core = require('@actions/core');
const { readCoverageText } = require('./coveragereader');
const { uploadToServer } = require('./uploader');
const { generateSVG } = require('./svggenerator');


function main() {

    const covTextPath = core.getInput('coverageTextPath') ||
        process.env.COVERAGE_FILE;
    const path = core.getInput('hostedPath');
    const svgFilename = core.getInput('hostedFilename');
    const host = core.getInput('host');

    const covPercent = readCoverageText(covTextPath);
    const formattedPercent = Number.parseFloat(covPercent).toFixed(1);
    const svgData = generateSVG(120, 20, formattedPercent, true);

    // TODO: and now we write this somewhere publicly accessible
    uploadToServer(host, path, svgFilename);

    console.log(svgData);
}

//------------------------
main();