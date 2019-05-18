const test = require('tape');
const GraphQLClient = require('graphql-request').GraphQLClient;

const endpoint = 'http://127.0.0.1:4000/graphql';

const client = new GraphQLClient(endpoint, { headers: {} });

test('should calculate value of groceries in a total bill', (assert) => {
  let query = `
    query ($userId: String!) {
      user(id:$userId) {
        id
        userProfile {
          segment
          userSince
        }
        basket {
          products{
            productType
            amount
          },
          priceBreakdown{
            payableAmount
            totalAmount
            totalReductions
            reductions {
              amount
              description
            }
          }
        }
      }
    }
  `;

  let variables = `{
    "userId": "1"
  }`;

  client.request(query, variables).then(data => {
    console.log(JSON.stringify(data, null, 2));
    assert.end();
  }).catch(error => {
    console.error(error);
    assert.error(error);
  });
});
