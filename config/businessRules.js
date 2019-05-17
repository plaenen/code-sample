
var productCategory = require('./../lib/productCategories');

/**
 * Business rules configuration
 */
module.exports = {
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
};
