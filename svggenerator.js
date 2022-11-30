const Sqrl = require('squirrelly');

function generateSVG(h, w, pct, passing = true) {
    return Sqrl.render("{{@includeFile('svgTemplate', it) /}}",
        { label: "coverage", percent: pct, height: h, width: w, passing: passing },
        { filename: './' });
}

exports.generateSVG = generateSVG;