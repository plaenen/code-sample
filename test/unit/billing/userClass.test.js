const test = require('tape');
const moment = require('moment');
const userClass = require('../../../lib/services/user/userClass');

const Employee = userClass.Employee;
const Affiliate = userClass.Affiliate;
const Customer = userClass.Customer;

test('should give 30% reduction percentage for employees', function(assert) {
  let employee = new Employee('1', moment());
  assert.isEqual(employee.getUserReductionPercentage(), 30, 'Employees get 30%');
  assert.isEqual(employee.getUserSegment(), 'EMPLOYEE', 'user should be in the employee segment');
  assert.end();
});

test('should give 10% reduction percentage for affiliates', function(assert) {
  let affiliate = new Affiliate('1', moment());
  assert.isEqual(affiliate.getUserReductionPercentage(), 10, 'Employees get 10%');
  assert.isEqual(affiliate.getUserSegment(), 'AFFILIATE', 'user should be in the affiliate segment');
  assert.end();
});

test('should give 0% reduction percentage for customers with a loyalty < 2 years', function(assert) {
  let customer = new Customer('1', moment());
  assert.isEqual(customer.getUserReductionPercentage(), 0, 'Customer with < 2 years do not get any reduction');
  assert.isEqual(customer.getUserSegment(), 'CUSTOMER', 'user should be in the customer segment');
  assert.end();
});

test('should give 0% reduction percentage for customers with a loyalty > 2 years', function(assert) {
  let customer = new Customer('1', moment().subtract(2, 'years').subtract(1, 'day')); // 2 years and 1 day
  assert.isEqual(customer.getUserReductionPercentage(), 5, 'Customer with > 2 years do not get 5% reduction');
  assert.isEqual(customer.getUserSegment(), 'CUSTOMER', 'user should be in the customer segment');
  assert.end();
});

