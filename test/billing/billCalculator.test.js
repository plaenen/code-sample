const test = require('tape');
const moment = require('moment');

const billCalculator = require('./../../lib/services/billing');
const userSegment = require('./../../lib/services/userSegments');
const productCategory = require('./../../lib/services/productCategories');
const displayResult = require('./../utils/displayTestResults');

test('should give 5$ reduction and an additional 30% employee reduction', function(assert) {
  const given = {
    userProfile: {
      userSegment: userSegment.EMPLOYEE,
      loyalSince: moment(),
    },
    basket: [
      {
        productCategory: productCategory.OTHER,
        amount: 100,
      },
    ],
    businessRules: {
      // Reduction on total amount
      valueReduction: {
        amount: 5,
        per: 100,
      },
      // % Reduction per user segment
      userSegments: {
        EMPLOYEE: {
          percentage: 30,
          minLoyaltyInYears: 0,
          excludedProductCategories: [productCategory.GROCERY],
        },
        AFFILIATE: {
          percentage: 10,
          minLoyaltyInYears: 0,
          excludedProductCategories: [productCategory.GROCERY],
        },
        CUSTOMER: {
          percentage: 5,
          minLoyaltyInYears: 2,
          excludedProductCategories: [productCategory.GROCERY],
        },
      },
    },
  };

  const expected = (100 - 5) * (1 - 0.3); // First $5 totalAmount Reduction then 30% for employee

  let result = billCalculator.getPayableAmount(given.userProfile, given.basket, given.businessRules);
  displayResult(result);

  assert.isEqual(result.payableAmount, expected, 'total payable amount is $' + result.payableAmount);
  assert.end();
});

test('should give 5$ reduction and an additional 10% Affiliate reduction', function(assert) {
  const given = {
    userProfile: {
      userSegment: userSegment.AFFILIATE,
      loyalSince: moment(),
    },
    basket: [
      {
        productCategory: productCategory.OTHER,
        amount: 100,
      },
      {
        productCategory: productCategory.GROCERY,
        amount: 100,
      },
    ],
    businessRules: {
      // Reduction on total amount
      valueReduction: {
        amount: 5,
        per: 100,
      },
      // % Reduction per user segment
      userSegments: {
        EMPLOYEE: {
          percentage: 30,
          minLoyaltyInYears: 0,
          excludedProductCategories: [productCategory.GROCERY],
        },
        AFFILIATE: {
          percentage: 10,
          minLoyaltyInYears: 0,
          excludedProductCategories: [productCategory.GROCERY],
        },
        CUSTOMER: {
          percentage: 5,
          minLoyaltyInYears: 2,
          excludedProductCategories: [productCategory.GROCERY],
        },
      },
    },
  };

  // First $5 totalAmount Reduction then 10% on OTHER products value - totalamount reduction of 5
  const expected = (200 - 10) - (90 * 0.1);

  let result = billCalculator.getPayableAmount(given.userProfile, given.basket, given.businessRules);
  displayResult(result);

  assert.isEqual(result.payableAmount, expected, 'total payable amount is $' + result.payableAmount);
  assert.end();
});
