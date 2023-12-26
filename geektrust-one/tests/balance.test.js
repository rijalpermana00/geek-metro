const assert = require('assert');
const Balance = require('../balance');

describe('Balance Class Tests', () => {
  let balance;

  beforeEach(() => {
    // Initialize a new instance of the Balance class before each test
    balance = new Balance();
  });

  it('Updating Existing Balance', () => {
    balance.updateBalance('MC1', 50);
    const updatedBalance = balance.checkBalance('MC1');
    assert.strictEqual(updatedBalance.balance, 50);
  });

  it('Updating Negative Balance', () => {
    balance.updateBalance('MC2', 20);
    balance.updateBalance('MC2', -30);
    const updatedBalance = balance.checkBalance('MC2');
    assert.strictEqual(updatedBalance.balance, 0);
  });

  it('Updating Nonexistent Balance', () => {
    balance.updateBalance('MC3', 100);
    const newBalance = balance.checkBalance('MC3');
    assert.strictEqual(newBalance.balance, 100);
  });

  it('Checking Existing Balance', () => {
    balance.updateBalance('MC1', 50);
    const existingBalance = balance.checkBalance('MC1');
    assert.strictEqual(existingBalance.balance, 50);
  });

  it('Checking Nonexistent Balance', () => {
    const nonexistentBalance = balance.checkBalance('MC4');
    assert.strictEqual(nonexistentBalance, null);
  });

  it('Updating with Negative Amount', () => {
    balance.updateBalance('MC1', 50);
    balance.updateBalance('MC1', -30);
    const updatedBalance = balance.checkBalance('MC1');
    assert.strictEqual(updatedBalance.balance, 20);
  });
});
