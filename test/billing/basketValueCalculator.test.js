const test = require('tape');
const basketValueCalculator = require('../../lib/services/billing/basketValueCalculator');
const ProductCategory = require('./../../lib/services/productCategories');
const displayResult = require('./../utils/displayTestResults');

test('should calculate value of groceries in a total bill', (assert) => {
  const given = [
    {
      productCategory: ProductCategory.OTHER,
      amount: 31,
    },
    {
      productCategory: ProductCategory.OTHER,
      amount: 71,
    },
    {
      productCategory: ProductCategory.GROCERY,
      amount: 30,
    },
    {
      productCategory: ProductCategory.GROCERY,
      amount: 70,
    },
  ];

  const expected = {
    grandTotal: 202,
    groceries: 100, // 30 + 70 for grocery products
    other: 102, // 31 + 71 for other products
  };

  let result = basketValueCalculator(given);
  displayResult(result);

  // Ensure the grand-total is correct
  assert.isEqual(result.grandTotal, expected.grandTotal, 'basket total value is $' + result.grandTotal);
  // Ensure the total for per product category only is correct
  assert.isEqual(result[ProductCategory.GROCERY], expected.groceries,
    'total value for grocery products is $' + result.GROCERY);
  assert.isEqual(result[ProductCategory.OTHER], expected.other, 'total value for other products is $' + result.OTHER);
  assert.end();
});
