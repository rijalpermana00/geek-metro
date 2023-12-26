const HALF = 0.5;
const Discount = require("./discount");

class Trip{
    
    constructor(transaction,balance){
        this.transaction = transaction;
        this.balance = balance;
        this.discount = new Discount(this)
    }
    
    checkTrip(cardNumber){
        const trips = this.transaction.collections.reduce((trips, entry) => {
            const tripsForCard = entry.trips.filter(trip => trip.cardNumber === cardNumber);
            return trips.concat(tripsForCard);
        }, []);
        
        return trips.length > 0 ? trips : false;
    }
    
    calculateTrip(cardNumber,passengerType,destination){
        const {balance} = this.balance.checkBalance(cardNumber);
        const rate = this.transaction.rate[passengerType];
        const enoughBalance = balance > rate;
        let serviceCharge = 0;
        
        const {cost,discount} = this.discount.tripCostDiscount(cardNumber,rate);
        
        serviceCharge = enoughBalance ? 0 : this.calculateServiceCharge(balance,cost);
        
        let fee = cost + serviceCharge;
        
        this.balance.updateBalance(cardNumber,-fee);
        
        this.transaction.calculateCollection(destination,cost,discount,serviceCharge)   
    }
    
    calculateServiceCharge(balance,cost){
        return (cost - balance) * this.transaction.serviceChargeRate;
    }
}

module.exports = Trip;
