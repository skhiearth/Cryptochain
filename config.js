const INITIAL_DIFFICULTY = 2;
const MINE_RATE = 1000; //One second

const GENESIS_DATA = {
    timestamp: 1,
    lastHash: '!@#$%',
    hash: 'foo-bar-hash',
    data: [],
    difficulty: INITIAL_DIFFICULTY,
    nonce: 0
};

module.exports = {GENESIS_DATA, MINE_RATE};