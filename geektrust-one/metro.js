const Transaction = require("./transaction");
const Reporting = require("./reporting");
const Trip = require("./trip");
const Balance = require("./balance");

class Metro{
    
    constructor(){
        this.transaction = new Transaction();
        this.balance = new Balance();
        this.trip = new Trip(
            this.transaction,
            this.balance,
        );
        this.reporting = new Reporting(this.transaction);
    }
    
    commands(input){
        const [action, ...params] = input.split(' ');
        switch(action.toUpperCase()){
            case 'BALANCE': 
                this.balance.updateBalance(...params)
                break;
            case 'CHECK_IN':
                this.checkIn(...params)
                break;
            default:
                this.reporting.summary()
        }
    }
    
    checkIn(cardNumber,passengerType,destination){
        
        this.trip.calculateTrip(cardNumber,passengerType,destination);
        let collection = this.transaction.checkCollection(destination);
        
        if (!collection) {
            collection = {
                destination,
                trips: []
            };
            this.transaction.collections.push(collection);
        }

        collection.trips.push({
            cardNumber,
            passengerType,
            destination
        });
    }
}

module.exports = Metro;
