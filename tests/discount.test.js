const assert = require('assert');
const Trip = require('../trip');
const Discount = require('../discount');

describe('Discount Class Tests', () => {
  let mockTrip;

  beforeEach(() => {
    
    mockTrip = new Trip();
  });

  it('Discount for Trip with Card Number', () => {
    mockTrip.checkTrip = (cardNumber) => {
      if (cardNumber === 'MC1') {
        return [
          { cardNumber: 'MC1', passengerType: 'ADULT', destination: 'CENTRAL' },
        ];
      }
      return [];
    };

    const discount = new Discount(mockTrip);
    const { cost, discount: actualDiscount } = discount.tripCostDiscount('MC1', 100);

    assert.strictEqual(cost, 50); 
    assert.strictEqual(actualDiscount, 50);
  });

  it('Discount for Trip without Card Number', () => {
    
    mockTrip.checkTrip = () => {
      return [];
    };

    const discount = new Discount(mockTrip);
    const { cost, discount: actualDiscount } = discount.tripCostDiscount('MC2', 100);

    assert.strictEqual(cost, 100); 
    assert.strictEqual(actualDiscount, 0);
  });

  
});
