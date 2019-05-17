'use strict';

/**
 * Calculate the total value of a given basket, and calculate the total
 * value of a product category
 * @basket: array of products e.g. [{productCategory: ProductCategory.GROCERY, amount:100.10}) 
 */
module.exports = (basket) => {
  let result = {
    grandTotal: 0
  };  

  basket.forEach(product => {
    // Add to the grand total
    result.grandTotal += product.amount;

    // Ensure there is a start value for the category
    if (!result[product.productCategory]) {
      result[product.productCategory] = 0;
    }
    // Add to the product category total
    result[product.productCategory] += product.amount;
  });

  return result;
};