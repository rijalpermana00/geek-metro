const fs = require('fs');
const assert = require('assert');
const Metro = require('../geektrust');
const { captureConsoleLog } = require('./test-utils');


describe('Metro Test', () => {
  function testMetroData(filename, expectedOutput) {
    it(`Should correctly show data for ${filename}`, () => {
      const filePath = `sample_input/${filename}`;
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          throw {
            code: 500,
            msg: err.message,
          };
        }

        const metro = new Metro();
        const consoleOutput = captureConsoleLog(() => {
          metro.main(data);
        });

        expectedOutput.forEach((expected) => {
          assert.ok(consoleOutput.includes(expected));
        });
      });
    });
  }

  beforeEach(() => {
    const metro = new Metro();
  });

  // Test 1
  testMetroData('input1.txt', [
    'TOTAL_COLLECTION CENTRAL 300 0',
    'PASSENGER_TYPE_SUMMARY',
    'ADULT 1',
    'SENIOR_CITIZEN 1',
    'TOTAL_COLLECTION AIRPORT 403 100',
    'PASSENGER_TYPE_SUMMARY',
    'ADULT 2',
    'KID 2',
  ]);
});