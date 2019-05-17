# code sample project

[![Build Status](https://travis-ci.org/plaenen/code-sample.svg?branch=master)](https://travis-ci.org/plaenen/code-sample)
[![codecov](https://codecov.io/gh/plaenen/code-sample/branch/master/graph/badge.svg)](https://codecov.io/gh/plaenen/code-sample)

This is a code-sample which required the following functionality

On a retail website, the following discounts apply:
1. If the user is an employee of the store, he gets a 30% discount
2. If the user is an affiliate of the store, he gets a 10% discount
3. If the user has been a customer for over 2 years, he gets a 5% discount.
4. For every $100 on the bill, there would be a $ 5 discount (e.g. for $ 990, you get $ 45 as a discount).
5. The percentage based discounts do not apply on groceries.
6. A user can get only one of the percentage based discounts on a bill.

Traditionally in programming languages like Java, Python an OOP style approach would be taken.
However in NodeJs this would be an ant-pattern, hence the usage of a more standard javascript approach, there is room for improvement, but that was not the key goal of this coding sample. 

The code is available under the ./lib directory and is split in modules allowing us to extract those modules in the future as separate micro-services if required. 

All services in the /lib/service folder can be split if required in microservice
as well as the individual services in the /lib/services/billing folder.
Loose coupling in code is crucial to avoid monolithic applications. 

see [screenshots](./docs/screenshots.md) for the graphql ui, with some samples.

## Installation & Usage

1. clone the repository 

```
git clone https://github.com/plaenen/code-sample.git
```

2. install pre-requisites

node v10.10.0  or higher [download](https://nodejs.org/en/download/)

3. install dependencies

npm install

4. run the application 

```
npm start
```

## Continuous integration

We use [travis-ci](https://travis-ci.org/plaenen/code-sample) as Continuous integration tool and the build status can be found in the badge on top of this page. 

During the build we test: 

* Unit tests, which can be executed locally as following:

```
  npm run test 
```

## What's next

* [ ] build integration test
* [ ] provide proper JSDOCS
* [ ] automatic deploy to AWS
* [ ] harden to code, exception handling etc 
* [ ] ensure node remains running pm2?
* [ ] remove mock services and implement them
* [ ] security, login with OAuth?
* [ ] improve code coverage
* [ ] ...



