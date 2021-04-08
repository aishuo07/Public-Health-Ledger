import SHA256 from 'crypto-js/sha256.js';
class Block{
    constructor(index, timestamp, data, previousHash=''){
        this.index=index;
        this.timestamp=timestamp;
        this.data=data;
        this.previousHash = previousHash;
        this.hash= this.calculateHash();
        this.nonce= 0;
    }
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.nonce +
            JSON.stringify(this.data) + this.timestamp).toString();
    }
    mineblock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty +1 ).join("0")){
            this.nonce++;
            this.hash= this.calculateHash();

        }
        console.log("Hash of Mined Block : "+ this.hash);
    }
}

class Blockchain{
        constructor(){
            this.chain = [this.createGenesisBlock()];
            this.difficulty= 3;
        }
    createGenesisBlock(){
        return new Block(9900 , "30/02/2021", "Genesis Block", "0");
    }

    getNewBlock(){
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock){
        newBlock.previousHash=this.getNewBlock().hash;
        // newBlock.hash=newBlock.calculateHash();
        newBlock.mineblock(this.difficulty);
        this.chain.push(newBlock);
    }
    
    isChainValid(){
        for (let i=1; i<this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];
            if(currentBlock.hash!== currentBlock.calculateHash()){
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}

exports.get = function get(Blockchain){
    return Blockchain
}