const cryptoHash = require('./crypto-hash');

describe('cryptoHash()', () => {

    it('generates a SHA-256 hashed output', () => {
        expect(cryptoHash('bar'))
        .toEqual('fcde2b2edba56bf408601fb721fe9b5c338d10ee429ea04fae5511b68fbf8fb9');
    });

    it('produces same hash for same input arguments', () => {
        expect(cryptoHash('one', 'two', 'three'))
            .toEqual(cryptoHash('two', 'one', 'three'));
    });
});