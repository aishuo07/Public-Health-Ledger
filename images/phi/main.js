const Blockchain = require('./blocks')


let newCard = new Blockchain();
newCard.addBlock(new Block('964', "2/3/21", {
    userid: 766789,
    status: "a",
    statusCode: "yrfv"
}))
newCard.addBlock(new Block('965', "2/3/21", {
    userid: 87789,
    status: "n",
    statusCode: "prfv"
}))

// console.log(JSON.stringify(newCard, null , 4));