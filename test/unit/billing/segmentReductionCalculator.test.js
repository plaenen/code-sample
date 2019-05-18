const test = require('tape');
const moment = require('moment');
const segmentReductionCalculator = require('./../../../lib/services/billing/segmentReductionCalculator');
const userSegment = require('./../../../lib/services/userSegments');
const productCategory = require('./../../../lib/services/productCategories');
const displayResult = require('./../../utils/displayTestResults');

test('should give 30% reduction for employees on non-grocery products', (assert) => {
  const given = {
    userProfile: {
      userSegment: userSegment.EMPLOYEE,
      loyalSince: moment().subtract(2, 'years').subtract(1, 'day'), // 2 years and 1 day
    },
    amount: {
      grandTotal: 100,
      GROCERY: 50,
    },
    segmentationRules: {
      EMPLOYEE: {
        percentage: 30,
        minLoyaltyInYears: 0,
        excludedProductCategories: [productCategory.GROCERY],
      },
    },
  };

  const expected = 15;

  let result = segmentReductionCalculator(given.userProfile, given.amount, given.segmentationRules);
  displayResult(result);
  assert.isEqual(result.reduction, expected, '$' + result.reduction + ' reduction applied');
  assert.end();
});

test('should give 10% reduction for affiliates on non-grocery products', (assert) => {
  const given = {
    userProfile: {
      userSegment: userSegment.AFFILIATE,
      loyalSince: moment().subtract(2, 'years').subtract(1, 'day'), // 2 years and 1 day
    },
    amount: {
      grandTotal: 100,
      GROCERY: 50,
    },
    segmentationRules: {
      AFFILIATE: {
        percentage: 10,
        minLoyaltyInYears: 0,
        excludedProductCategories: [productCategory.GROCERY],
      },
    },
  };

  const expected = 5;

  let result = segmentReductionCalculator(given.userProfile, given.amount, given.segmentationRules);
  displayResult(result);

  assert.isEqual(result.reduction, expected, '$' + result.reduction + ' reduction applied');
  assert.end();
});

test('should give 5% reduction for customers with a loyalty > 2 years', (assert) => {
  const given = {
    userProfile: {
      userSegment: userSegment.CUSTOMER,
      loyalSince: moment().subtract(2, 'years').subtract(1, 'day'), // 2 years and 1 day
    },
    amount: {
      grandTotal: 100,
      GROCERY: 50,
    },
    segmentationRules: {
      CUSTOMER: {
        percentage: 5,
        minLoyaltyInYears: 2,
        excludedProductCategories: [productCategory.GROCERY],
      },
    },
  };

  const expected = 2.5;

  let result = segmentReductionCalculator(given.userProfile, given.amount, given.segmentationRules);
  displayResult(result);

  assert.isEqual(result.reduction, expected, '$' + result.reduction + ' reduction applied');
  assert.end();
});

test('should give 0% reduction for customers with a loyalty < 2 years', (assert) => {
  const given = {
    userProfile: {
      userSegment: userSegment.CUSTOMER,
      loyalSince: moment().subtract(2, 'years').add(1, 'day'), // 2 years - 1 day
    },
    amount: {
      grandTotal: 100,
      GROCERY: 50,
    },
    segmentationRules: {
      CUSTOMER: {
        percentage: 5,
        minLoyaltyInYears: 2,
        excludedProductCategories: [productCategory.GROCERY],
      },
    },
  };

  const expected = 0;

  let result = segmentReductionCalculator(given.userProfile, given.amount, given.segmentationRules);
  displayResult(result);

  assert.isEqual(result.reduction, expected, '$' + result.reduction + ' reduction applied');
  assert.end();
});

test('should give no reduction when no rules are given', (assert) => {
  const given = {
    userProfile: {
      userSegment: userSegment.EMPLOYEE,
      loyalSince: moment().subtract(2, 'years').subtract(1, 'day'), // 2 years and 1 day
    },
    amount: {
      grandTotal: 100,
      GROCERY: 50,
    },
    segmentationRules: null,
  };

  const expected = 0;

  let result = segmentReductionCalculator(given.userProfile, given.amount, given.segmentationRules);
  console.log('result: ', result);
  displayResult(result);
  assert.isEqual(result.reduction, expected, '$' + result.reduction + ' reduction applied');
  assert.end();
});
