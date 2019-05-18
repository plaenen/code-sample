const moment = require('moment');
const userSegment = require('./../userSegments');

class User {
  /**
   * create a new user
   * @param {String} userId
   * @param {Date} loyalSince
   */
  constructor(userId, loyalSince) {
    this.userId = userId;
    this.loyalSince = loyalSince;
  }

  getUserId() {
    return this.userId;
  }

  getUserSegment() {
    return null;
  }

  getLoyalSince() {
    return this.loyalSince;
  }

  getUserReductionPercentage() {
    return 0;
  }
};

class Employee extends User {
  getUserReductionPercentage() {
    return 30;
  };

  getUserSegment() {
    return userSegment.EMPLOYEE;
  }
};

class Affiliate extends User {
  getUserReductionPercentage() {
    return 10;
  };

  getUserSegment() {
    return userSegment.AFFILIATE;
  }
};

class Customer extends User {
  getUserReductionPercentage() {
    let loyaltyInYears = moment(moment()).diff(this.loyalSince, 'years');
    if (loyaltyInYears >= 2) {
      return 5;
    }
    return 0;
  };

  getUserSegment() {
    return userSegment.CUSTOMER;
  }
};

module.exports = {
  Employee: Employee,
  Affiliate: Affiliate,
  Customer: Customer,
};
