# code sample project

[![Build Status](https://travis-ci.org/plaenen/code-sample.svg?branch=master)](https://travis-ci.org/plaenen/code-sample)

This is a code-sample which required the following functionality

On a retail website, the following discounts apply:
1. If the user is an employee of the store, he gets a 30% discount
2. If the user is an affiliate of the store, he gets a 10% discount
3. If the user has been a customer for over 2 years, he gets a 5% discount.
4. For every $100 on the bill, there would be a $ 5 discount (e.g. for $ 990, you get $ 45 as a discount).
5. The percentage based discounts do not apply on groceries.
6. A user can get only one of the percentage based discounts on a bill.

Traditionally in programming languages like Java, Python an OOP style approach would be taken.
However in NodeJs this would be an ant-pattern, hence the usage of as much as possible pure functions without side-effect. 

The code is available under the ./lib directory and is split in modules allowing us to extract those modules in the future as separate micro-services if required. 

And example could be the segmentationReductionCalculator which could be extract as a micro-service when the logic would become more complex. 

## Installation & Usage


1. clone the repository 

```
git clone https://github.com/plaenen/code-sample.git
```

2. install pre-requisites

node v10.10.0  or higher [download](https://nodejs.org/en/download/)

3. install dependencies

npm install

4. running the test to understand the capabilities
```
npm test
```

5. run the application 

```
npm start
```
