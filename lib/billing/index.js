

const basketValueCalculator = require('./basketValueCalculator');
const valueReductionCalculator = require('./valueReductionCalculator');
const segmentReductionCalculator = require('./segmentReductionCalculator');

const billCalculator = {};

billCalculator.getPayableAmount = (userProfile, basket, businessRules) => {
  // Create amount / product type
  let amounts = basketValueCalculator(basket);

  // Set an empty reduction object
  amounts.totalReductions = 0;
  amounts.reductions = [];

  // Apply Value Reduction
  amounts = billCalculator._applyValueReduction(amounts, businessRules.valueReduction);

  // Apply User Segment Reduction
  amounts = billCalculator._applySegmentReduction(userProfile, amounts, businessRules.userSegments);

  // Set Payable amount
  amounts.payableAmount = amounts.grandTotal - amounts.totalReductions;

  return amounts;
};

billCalculator._addReduction = (amounts, reduction) => {
  if (reduction.reduction > 0) {
    // Add the reduction
    amounts.totalReductions += reduction.reduction;
    // Push the reduction description
    amounts.reductions.push(reduction);
  };

  return amounts;
};

billCalculator._applyValueReduction = (amounts, valueReductionRules) => {
  // Calculate valueReduction
  let reduction = valueReductionCalculator(amounts.grandTotal - amounts.totalReductions, valueReductionRules);
  return billCalculator._addReduction(amounts, reduction);
};

billCalculator._applySegmentReduction = (userProfile, amounts, segmentReductionRules) => {

  // Calculate valueReduction
  let reduction = segmentReductionCalculator(userProfile, amounts, segmentReductionRules);

  return billCalculator._addReduction(amounts, reduction);
};


module.exports = billCalculator;
