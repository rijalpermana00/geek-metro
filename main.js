const Metro = require("./metro");

class Main{
    
    constructor(){
        this.metro = new Metro();
    }
    
    main(payload){
        const lines = payload.toString().split(/\r?\n/);
        lines.forEach((line, i) => {
            let inputLine = line;
            this.metro.commands(inputLine)
        });
    }
}

module.exports = Main;
