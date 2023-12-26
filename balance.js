class Balance{
    
    constructor(){
        this.collections = [];
        this.balances = [];
    }
    
    updateBalance(cardNumber,amount){
        const existingBalance = this.checkBalance(cardNumber);
        if (existingBalance) {
            existingBalance.balance = (existingBalance.balance + amount >= 0 ? existingBalance.balance + amount : 0);
        } else {
            this.balances.push({
                cardNumber,
                balance: parseInt(amount)
            });
        }   
    }
    
    checkBalance(cardNumber){
        const balance = this.balances.find(balance => balance.cardNumber === cardNumber);
        
        return balance ? balance : null;

    }
}

module.exports = Balance;
