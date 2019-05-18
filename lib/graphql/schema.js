

const { gql } = require('apollo-server');

// Define the published schema
module.exports = gql`
  scalar Date

  # Reduction
  type Reduction {
    amount: Float
    description: String
  }

  enum ProductTypeEnum {
    GROCERY
    OTHER
  }

  # Product
  type Product {
    productType: ProductTypeEnum
    amount: Float
  }

  # Basket
  type Basket {
    products: [Product]  
    priceBreakdown: PriceBreakDown
  }

  # PriceBreakDown 
  type PriceBreakDown {
    payableAmount: Float
    totalAmount: Float
    totalReductions: Float
    reductions: [Reduction]
  }

  enum UserSegmentEnum {
    EMPLOYEE
    AFFILIATE
    CUSTOMER
  }

  # User Profile
  type UserProfile {
    segment: UserSegmentEnum
    userSince: Date
  }

  # Let's look from an existing user
  type User {
    userProfile: UserProfile
    basket: Basket
  }

  # Expose Queries
  type Query {
    user(id: String!): User
  }
`;
