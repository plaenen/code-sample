

const moment = require('moment');

/**
 * calculate the reduction for a given segment based on
 * an amount summary and segmentation reduction rules
 * @param {object} userProfile e.g. {
      userSegment: UserSegment.CUSTOMER,
      // 2 years and 1 day
      loyalSince: moment().subtract(2, 'years').subtract(1, 'day')
    }
 * @param {object} amount e.g. {
      grandTotal: 100,
      groceries: 50
    }
 * @param {object} segmentReductionRules e.g. {
      percentage: 30,
      minLoyaltyInYears: 0,
      excludedProductCategories: [productCategory.GROCERY]
    }
 */
module.exports = (userProfile, amounts, segmentReductionRules) => {
  let result = {
    reduction: 0,
    description: '',
  };
  // Get the business rules for a given segment or go to the default
  let reductionRules = segmentReductionRules[userProfile.userSegment];

  // No rules given --> no reduction
  if (!reductionRules) return 0;

  // Don't apply reductions on the total amount, take the grand total and reduce
  // previous reductions
  let baseAmount = amounts.grandTotal - (amounts.totalReductions || 0);

  // Reduce the total amount with categories to exclude
  reductionRules.excludedProductCategories.forEach(productCategory => {
    baseAmount += -1 * (amounts[productCategory]) || 0;
  });

  // Ensure the loyalty period is met
  let loyaltyInYears = moment(moment()).diff(userProfile.loyalSince, 'years');
  if (loyaltyInYears >= reductionRules.minLoyaltyInYears) {
    // Calculate the reduction
    result.reduction = baseAmount * (reductionRules.percentage / 100);
    result.description = 'Applied an user segment reduction (' + userProfile.userSegment + ') of '
      + reductionRules.percentage + '% on the amount of $' + baseAmount;
  }

  return result;
};
