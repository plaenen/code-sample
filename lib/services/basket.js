const productCategory = require('./../productCategories');

//Mock implementation ofr baskets / user
module.exports = {
  getBasket: (userId) => {
    const baskets = {
      "0": [ 
        {
        productCategory: productCategory.OTHER,
        amount: 1000,
        },
        {
          productCategory: productCategory.GROCERY,
          amount: 100,
        },
        {
          productCategory: productCategory.OTHER,
          amount: 1000,
        },
        {
          productCategory: productCategory.GROCERY,
          amount: 100,
        }
      ],
      "1": [
        {
          productCategory: productCategory.OTHER,
          amount: 1000,
        }
      ],
      "2": [
        {
          productCategory: productCategory.GROCERY,
          amount: 100,
        }      
      ],
      "3": [
        {
          productCategory: productCategory.GROCERY,
          amount: 100,
        },  
        {
          productCategory: productCategory.GROCERY,
          amount: 100,
        }    
      ]
    }
    return baskets[userId];
  } 
}