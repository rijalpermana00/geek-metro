const assert = require('assert');
const Transaction = require('../transaction');

describe('Transaction Class Tests', () => {
  let transaction;

  beforeEach(() => {
    transaction = new Transaction();
  });

  it('Checking Collection for Existing Destination', () => {
    transaction.collections.push({
      destination: 'CENTRAL',
      collection: 150,
      discount: 20,
      trips: [],
    });

    const collection = transaction.checkCollection('CENTRAL');
    assert.strictEqual(collection.destination, 'CENTRAL');
    assert.strictEqual(collection.collection, 150);
  });

  it('Checking Collection for Nonexistent Destination', () => {
    const collection = transaction.checkCollection('AIRPORT');
    assert.strictEqual(collection, undefined);
  });

  it('Calculating Collection for Existing Destination', () => {
    transaction.collections.push({
      destination: 'AIRPORT',
      collection: 200,
      discount: 30,
      trips: [],
    });

    transaction.calculateCollection('AIRPORT', 50, 10, 5);

    const updatedCollection = transaction.checkCollection('AIRPORT');
    assert.strictEqual(updatedCollection.collection, 255);
    assert.strictEqual(updatedCollection.discount, 40);
  });
});
