const moment = require('moment');
const billCalculator = require('./../billing');
const businessRules = require('./../../config/businessRules');
const userService = require('./../services/user');
const basketService = require('./../services/basket');

//obj, args, context, info

// Create resolvers for the schema
module.exports = {
  Query: {
    user: (obj, args, context, info) => {
      // Resolve the basic user profile information here once
      // in this way it can be reused by underlying resolvers
      context.userProfile = userService.getUserProfile(args.id);
      return {};
    }
  },
  User: {
    userProfile: (obj, args, context, info) => {
      //return from context as it's already resolved on user level
      let user = context.userProfile;
      return {
        segment: user.userSegment,
        userSince: user.loyalSince
      }
    },
    calculateBill: (obj, args, context, info) => {
      let response = {
        payableAmount: 0,
        totalAmount: 0,
        totalReductions: 0,
        reductions: [],
        products: []
      }

      // Get the basket using the userId (retrieved from the context set by user resolver)
      let basket = basketService.getBasket(context.userProfile.userId);
  
      let result = billCalculator.getPayableAmount(context.userProfile, basket, businessRules);
  
      // Set amounts
      response.payableAmount = result.payableAmount;
      response.totalAmount = result.grandTotal;
      response.totalReductions = result.totalReductions;

      // List reduction details
      result.reductions.forEach(reduction => {
        response.reductions.push({
          amount: reduction.reduction,
          description: reduction.description
        });
      });

      // List Products
      basket.forEach(product => {
        response.products.push({
          productType: product.productCategory,
          amount: product.amount
        })
      });

      return response;
    }
  }
};