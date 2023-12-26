const fs = require("fs")
const Trip = require("./trip");
const SERVICE_CHARGE_RATE = 0.02;
const ADULT_RATE = 200;
const CHILD_RATE = 50;
const SENIOR_RATE = 100;

class Transaction{
    
    constructor(){
        this.collections = [];
        this.rate = {
            ADULT:ADULT_RATE,
            SENIOR_CITIZEN:SENIOR_RATE,
            KID:CHILD_RATE
        };
        this.serviceChargeRate = SERVICE_CHARGE_RATE;
        this.trips = new Trip(this)
    }
    
    checkCollection(destination){
        return this.collections.find(collection => collection.destination === destination);
    }
    
    calculateCollection(destination,cost = 0, discount = 0, serviceCharge = 0){
        const collectionExists = this.checkCollection(destination)
        if(collectionExists){
            collectionExists.collection += cost+serviceCharge;
            collectionExists.discount += discount
        }else{
            this.collections.push({
                destination,
                collection:cost+serviceCharge,
                discount,
                trips:[]
            });
        }
    }
}

module.exports = Transaction;
