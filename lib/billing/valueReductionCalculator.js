'use strict';

/**
 * Calculate the value reduction for a given amount and valueReductionRules
 * @param {float} amount 
 * @param {float} valueReductionRule  e.g. {per: 100, amount: 5} 
 */
module.exports = (amount, valueReductionRule) => {
  const result = {
    reduction: 0,
    description: ""
  }
  
  result.reduction = Math.floor(amount / valueReductionRule.per) * valueReductionRule.amount; 
  
  if (result.reduction > 0) {
    result.description = "Volume discount of $" + valueReductionRule.amount + " per $" + valueReductionRule.per 
      + " applied on the amount of $" + amount;
  }
  return result;
};