const Block = require('./block');
const  {GENESIS_DATA} = require('./config')

describe('Block', () => {
    const timestamp = 'a-date';
    const lastHash = 'foo-hash';
    const hash = 'bar-hash';
    const data = ['chain', 'data'];
    const block = new Block({
        timestamp, lastHash, hash, data
    });

    it('Block has timestamp, lastHash, hash and data property', () => {
        expect(block.timestamp).toEqual(timestamp);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.hash).toEqual(hash);
        expect(block.data).toEqual(data);
    });

    describe('Genesis()', () => {
        const genesisBlock = Block.genesis();

        it('returns a Block instance', () => {
            // Expecting the Genesis Block to be an instance of the Block class
            expect(genesisBlock instanceof Block).toBe(true)
        })

        it('returns the genesis data', () => {
            expect(genesisBlock).toEqual(GENESIS_DATA);
        })
    })
});