const Block = require('./block');
const {GENESIS_DATA} = require('./config');
const cryptoHash = require('./crypto-hash');

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
        });

        it('returns the genesis data', () => {
            expect(genesisBlock).toEqual(GENESIS_DATA);
        });
    });

    describe('mineBlock()', () => {
        const lastBlock = Block.genesis();
        const data = 'Mined Data';
        const minedBlock = Block.mineBlock({lastBlock, data});

        it('returns a Block instance', () => {
            // Expecting the Mined Block to be an instance of the Block class
            expect(minedBlock instanceof Block).toBe(true)
        });

        it('sets the `lastHash` to be the `hash` of the last block', () => {
            expect(minedBlock.lastHash).toEqual(lastBlock.hash);
        });

        it('sets the `data`', () => {
            expect(minedBlock.data).toEqual(data);
        });

        it('sets a `timestamp`', () => {
            expect(minedBlock.timestamp).not.toEqual(undefined);
        });

        it('creates a SHA-256 hash', () => {
            expect(minedBlock.hash)
                .toEqual(cryptoHash(minedBlock.timestamp, lastBlock.hash, data));
        });
    });
});