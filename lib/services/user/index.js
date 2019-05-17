const userSegment = require('./../userSegments');
const moment = require('moment');

module.exports = {
  // Mock getting the current user
  // TODO get profile thought JWT token
  getUserProfile: (id) => {
    const users = [
      {
        userId: 0,
        userSegment: userSegment.EMPLOYEE,
        loyalSince: moment(),
      },
      {
        userId: 1,
        userSegment: userSegment.AFFILIATE,
        loyalSince: moment(),
      },
      {
        userId: 2,
        userSegment: userSegment.CUSTOMER,
        loyalSince: moment().subtract(2, 'years').subtract(1, 'day'), // More then 2 years
      },
      {
        userId: 3,
        userSegment: userSegment.CUSTOMER,
        loyalSince: moment(),
      },
    ];
    return users[id];
  },
};
