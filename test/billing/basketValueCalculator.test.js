const test = require('tape');
const basketValueCalculator = require('../../lib/billing/basketValueCalculator');
const ProductCategory = require('./../../lib/productCategories');
const displayResult = require('./../utils/displayTestResults');

test('should calculate value of groceries in a total bill', (assert) => {
  const given = [
    {
      productCategory: ProductCategory.OTHER,
      amount: 31
    },
    {
      productCategory: ProductCategory.OTHER,
      amount: 71
    },
    {
      productCategory: ProductCategory.GROCERY,
      amount: 30
    },
    {
      productCategory: ProductCategory.GROCERY,
      amount: 70
    }
  ];

  const expected = {
    grandTotal: 202, 
    groceries: 100, //30 + 70 for grocery products
    other: 102 //31 + 71 for other products
  };

  let result = basketValueCalculator(given);
  displayResult(result);

  // Ensure the grand-total is correct
  assert.isEqual(result.grandTotal, expected.grandTotal);
  // Ensure the total for per product category only is correct
  assert.isEqual(result[ProductCategory.GROCERY], expected.groceries);
  assert.isEqual(result[ProductCategory.OTHER], expected.other);
  assert.end();
});