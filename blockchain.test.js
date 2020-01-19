const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Blockchain', () => {
    let blockchain;

    beforeEach(() => {
        blockchain = new Blockchain();
    })

    it('constains a `chain` array instance', () => {
        expect(blockchain.chain instanceof Array).toBe(true);
    });

    it('starts with the genesis block', () => {
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    });

    it('can add new block', () => {
        const newData = 'foo';
        blockchain.addBlock({data : newData});

        expect(blockchain.chain[blockchain.chain.length-1].data).toEqual(newData);
    });

    describe('isValidChain()', () => {
        describe('when the chain does not start with the genesis block', () => {
            it('returns false', () => {
                blockchain.chain[0] = {
                    data: 'fake-genesis',
                }

                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false)
            });
        });

        describe('when the chain starts with genesis block and has multiple blocks', () => {
            beforeEach(() => {
                blockchain.addBlock({data: 'foo-bar'});
                blockchain.addBlock({data: 'foo-bar1'});
                blockchain.addBlock({data: 'foo-bar2'});
            })

            describe('lastHash reference has changed', () => {
                it('returns false', () => {
                    blockchain.chain[2].lastHash = 'brokenlastHash';

                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            });

            describe('chain contains a block with an invalid field', () => {
                it('returns false', () => {
                    blockchain.chain[2].data = 'notfoo-bar2';

                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            });
        });

        describe('the chain does not contain any invalid blocks', () => {
            it('returns true', () => {
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
            });
        });
    });
});