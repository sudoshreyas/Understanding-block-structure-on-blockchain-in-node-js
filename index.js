const SHA256=require('./node_modules/crypto-js/sha256');

class Block{
 constructor(index,timestamp,data,previousHash=''){
   this.index=index;
   this.timestamp=timestamp;
   this.data=data;
   this.previousHash=previousHash;
   this.hash=this.calculateHash();
 }
calculateHash(){
  return SHA256(this.index+this.timestamp+this.previousHash+JSON.stringify(this.data)).toString();
}

}

class Blockchain{
  constructor(){
    this.chain=[this.createGenesisBlock()];
  }
  createGenesisBlock(){
    return new Block(0,'04/04/2018','Genesis Block','0');
  }
  getLatestBlock(){
    return this.chain[this.chain.length-1];
  }
  addBlock(newBlock){
    newBlock.previousHash=this.getLatestBlock().hash;
    newBlock.hash=newBlock.calculateHash();
    this.chain.push(newBlock);
  }
  isChainValid(){
    for(let i=1;i<this.chain.length;i++){

      const currentBlock=this.chain[i];
      const  previousBlock=this.chain[i-1];


      if(currentBlock.hash != currentBlock.calculateHash())
         return false;
      if(currentBlock.previousHash != previousBlock.hash)
        return false;
    }
    return true;
  }
}
let sudoCoin=new Blockchain();
sudoCoin.addBlock(new Block(1,"05/04/2018",{amount:100}));
sudoCoin.addBlock(new Block(2,"06/04/2018",{amount:500}));

//console.log(JSON.stringify(sudoCoin,null,4));

//this will give the output as true
console.log('Is blockchain valid?'+sudoCoin.isChainValid());

//now we would try to tamper some blocks in order to check the behaviour

sudoCoin.chain[1].data={amount:101};

//if we check for validity of blockchian it would give output as false.
console.log('Is blockchain valid?'+sudoCoin.isChainValid());
