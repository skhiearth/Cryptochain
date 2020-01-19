const PubNub = require('pubnub');

const credentials = {
    publishKey: 'pub-c-3701a97d-ace8-4fb0-a0ec-b98156932e24',
    subscribeKey: 'sub-c-a34f01a0-3acc-11ea-be28-ae0ede4a022d',
    secretKey: 'sec-c-MzA2YTJmYTktODc4OC00MTM1LThhYjQtOTIyZWNjNGZlNDhk'
};

const CHANNELS = {
    TEST: 'TEST',
    BLOCKCHAIN: 'BLOCKCHAIN'
};

class PubSub {
    constructor({blockchain}){
        this.blockchain = blockchain;
        this.pubnub = new PubNub(credentials);

        this.pubnub.subscribe({channels: Object.values(CHANNELS)});

        this.pubnub.addListener(this.listener());
    }

    listener(){
        return {
            message: messageObject => {
                const {channel, message} = messageObject;
                console.log(`Message received. Channel: ${channel}. Message: ${message}`);

                const parsedMessage = JSON.parse(message);

                if(channel == CHANNELS.BLOCKCHAIN){
                    this.blockchain.replaceChain(parsedMessage);
                }
            }
        }
    };

    publish({channel, message}){
        this.pubnub.publish({channel, message})
    };

    broadcastChain(){
        this.publish({
            channel: CHANNELS.BLOCKCHAIN,
            message: JSON.stringify(this.blockchain.chain)
        });
    }
}

module.exports = PubSub;