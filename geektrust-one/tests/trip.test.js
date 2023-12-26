const assert = require('assert');
const Trip = require('../trip');
const Transaction = require('../transaction');
const Balance = require('../balance');

describe('Trip Class Tests', () => {
  let trip;

  beforeEach(() => {
    mockTransaction = new Transaction()
    mockBalance = new Balance()
    trip = new Trip(mockTransaction, mockBalance);
  });

  it('Checking Trip for Existing Card Number', () => {
   
    trip.transaction.collections.push({
      trips: [
        {
          cardNumber: 'MC1',
          passengerType: 'ADULT',
          destination: 'CENTRAL',
        },
      ],
    });

    const trips = trip.checkTrip('MC1');
    assert.strictEqual(trips.length, 1);
    assert.strictEqual(trips[0].cardNumber, 'MC1');
  });

  it('Checking Trip for Nonexistent Card Number', () => {
    const trips = trip.checkTrip('MC2');
    assert.strictEqual(trips, false);
  });

  it('Calculating Trip with Sufficient Balance', () => {
    trip.balance.updateBalance('MC1', 300);
  
    const destination = 'CENTRAL';
    trip.calculateTrip('MC1', 'ADULT', destination);
  
    const updatedBalance = trip.balance.checkBalance('MC1');
    assert.strictEqual(updatedBalance.balance, 100);
  });  

  it('Calculating Trip with Insufficient Balance', () => {
    trip.balance.updateBalance('MC1', 50);
    const destination = 'CENTRAL';
    trip.calculateTrip('MC1', 'ADULT', destination);
    
    const updatedBalance = trip.balance.checkBalance('MC1');
    assert.strictEqual(updatedBalance.balance, 0);
  });
});
