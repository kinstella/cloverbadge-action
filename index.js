#!/usr/bin/env node
const core = require('@actions/core');
const fs = require('fs');
const Sqrl = require('squirrelly');

function readCoverageText(covTextFile) {
    try {
        const data = fs.readFileSync(covTextFile, 'utf8').split('\n');

        let nonBlankLines = 0;
        let covLines = 0;
        data.slice(1).forEach(row => {
            const [, nbLines = 0, , cov = 0,] = row.trim().split(/\s+/); // note implicitly skipped columns
            nonBlankLines += parseInt(nbLines);
            covLines += parseInt(cov);
        });
        return (covLines / nonBlankLines) * 100;

    } catch (err) {
        console.error(err);
    }
}

function generateSVG(h, w, pct, passing = true) {
    return Sqrl.render("{{@includeFile('svgTemplate', it) /}}",
        { label: "coverage", percent: pct, height: h, width: w, passing: passing },
        { filename: './' });
}

function main() {

    const covTextPath = core.getInput('coverageTextPath') ||
        process.env.COVERAGE_FILE;
    const outputFilename = core.getInput('outputImageFilename');

    const covPercent = readCoverageText(covTextPath);
    const formattedPercent = Number.parseFloat(covPercent).toFixed(1);
    const svgData = generateSVG(120, 20, formattedPercent, true);
    console.log(svgData);
}

//------------------------
main();