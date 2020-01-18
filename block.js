class Block {
    constructor({timestamp, lastHash, hash, data}){
        this.timestamp = timestamp;
        this.data = data;
        this.hash = hash;
        this.lastHash = lastHash;
    }
}

const fooBlock = new Block({
    timestamp: '01/01/01', 
    lastHash: 'demo-lasthash', 
    hash: 'demo-hash', 
    data: 'data'
});

console.log('fooBlock', fooBlock);