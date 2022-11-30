const fs = require('fs');

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

exports.readCoverageText = readCoverageText;