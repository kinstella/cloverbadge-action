const { generateSVG } = require('../svggenerator');

test('can generate an SVG with passing as green', () => {
    const svgResult = generateSVG(300, 100, 1.5, true);
    expect(svgResult).toContain("<svg");
    expect(svgResult).toContain("</svg>");
    expect(svgResult).toContain("fill=\"#00cc00\" rx=\"5\" ry=\"5\""); // green
});

test('can generate an SVG with failing color', () => {
    const svgResult = generateSVG(300, 100, 1.5, false);
    expect(svgResult).toContain("<svg");
    expect(svgResult).toContain("</svg>");
    expect(svgResult).toContain("fill=\"#ff0000\" rx=\"5\" ry=\"5\""); // red
});

test('can generate an SVG with wonky percentage', () => {
    const svgResult = generateSVG(300, 100, "x", true);
    expect(svgResult).toContain("<svg");
    expect(svgResult).toContain("</svg>");
    expect(svgResult).toContain("fill=\"#00cc00\" rx=\"5\" ry=\"5\""); // green
});