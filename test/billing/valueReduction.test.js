const test = require('tape');
const valueReductionCalculator = require('../../lib/billing/valueReductionCalculator');
const displayResult = require('./../utils/displayTestResults');

test('should give 5$ reduction per $100 on the bill', function(assert) {
  const valueReduction = {
    amount: 5,
    per: 100,
  };

  const fixtures = [
    {
      given: 0,
      expected: 0,
    },
    {
      given: 50,
      expected: 0,
    },
    {
      given: 990,
      expected: 45,
    },
  ];

  fixtures.forEach((fixture) => {
    let result = valueReductionCalculator(fixture.given, valueReduction);
    displayResult(result);
    let assertDescription = 'no reduction applied on amount $' + fixture.given;
    if (result.reduction > 0) assertDescription = result.description;
    assert.isEqual(result.reduction, fixture.expected, assertDescription);
  });

  assert.end();
});
