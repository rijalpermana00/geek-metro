const HALF = 0.5;

class Discount{
    
    constructor(trip){
        this.trips = trip
    }
    
    tripCostDiscount(cardNumber,rate){
        let discount = 0;
        let cost = rate;
        let discounted = false;
        
        const checkTrip = this.trips.checkTrip(cardNumber);
        if(checkTrip){
            discounted = checkTrip.filter(trip => trip.cardNumber === cardNumber).length === 1;
            if(discounted){
                cost *= HALF;
                discount = cost;
            }
        }
        
        return {cost, discount}
    }
}

module.exports = Discount;
