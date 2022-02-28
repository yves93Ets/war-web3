// const HDWalletProvider = require('@truffle/hdwallet-provider');

// const mnemonic = require('secret.json').mnemonic;
module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*',
    },
    // https://rpc-mumbai.maticvigil.com to moralis node matic
    //faucet for pgolygon
    // matic: {
    //   provider: () =>
    //     new HDWalletProvider(mnemonic, `https://rpc-mumbai.maticvigil.com`),
    //   network_id: 80001,
    //   confirmations: 2,
    //   timeoutBlocks: 200,
    //   skipDryRun: true,
    // },
  },

  mocha: {
    // timeout: 100000
  },

  compilers: {
    solc: {
      version: '0.8.11',
    },
  },
};
