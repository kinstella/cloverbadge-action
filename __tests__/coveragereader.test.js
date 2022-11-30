const { readCoverageText } = require('../coveragereader');

test('Reading test file returns expected number', () => {
    const res = readCoverageText("__tests__/resources/coverage.example.txt");
    expect(res).toBe(33.3907056798623);
});