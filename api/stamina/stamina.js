const http = require("http");
const path = require("path");
const fs = require("fs");
const express = require("express");
const _ = require('lodash');

// const Tx = require("ethereumjs-tx");

const BigNumber = require("bignumber.js")
const Web3 = require("web3");
const httpProviderUrl = "http://127.0.0.1:8547";
const wsProviderUrl = "ws://127.0.0.1:8546";
// const wsProvider = new Web3.providers.WebsocketProvider(wsProviderUrl);

const web3 = new Web3(new Web3.providers.HttpProvider(httpProviderUrl));
const ether = n => new BigNumber(n * 1e18);

const app = express();
app.use(express.json());

app.post('/api/stamina/:method', async(req, res, next) => {
  const abiPath = path.join(__dirname, '..', '..', 'build', 'contracts', 'Stamina.json');
  const abi = JSON.parse(fs.readFileSync(abiPath).toString()).abi;

  const contract_address = "0x000000000000000000000000000000000000dead";
  const contract = new web3.eth.Contract(abi, contract_address);

  // const from = "0x575f4B87A995b06cfD2A7D9370D1Fb2bc710fdc9";
  // const delegator = "0x16Fb96a5fa0427Af0C8F7cF1eB4870231c8154B6";
  // const from = "0x16Fb96a5fa0427Af0C8F7cF1eB4870231c8154B6";
  // const privateKey = new Buffer('3b5cb209361b6457e068e7abdccbcc1d88e1e82d73074434f117d3bb4eab0481', 'hex');
  
  let params = {};
  const method = req.params.method;

  // const value = ether(0.1);
  // const value = new Buffer("1000000000000000", 'hex');
  if (!_.isUndefined(req.body.params)) params = Object.values(req.body.params);

  try{
    const result = await contract.methods[method](...params).send(req.body.msg);
    // const result = await contract.methods.deposit("0x575f4B87A995b06cfD2A7D9370D1Fb2bc710fdc9").send({ from: '0x3e37e68230bd4da3fe670fe10b44ffd16c36735e', value: 1000000000000000000 });
    return res.status(200).json({
      code: 0,
      message: 'success',
      response: result
    })
  } catch (err) {
    return res.status(400).json({
      code: 1,
      message: err.message,
    });
  }
});

// getter
app.get('/api/stamina/:method/:address', async(req, res, next) => {
  const abiPath = path.join(__dirname, '..', '..', 'build', 'contracts', 'Stamina.json');
  const abi = JSON.parse(fs.readFileSync(abiPath).toString()).abi;

  const contract_address = "0x000000000000000000000000000000000000dead";
  const contract = new web3.eth.Contract(abi, contract_address);

  const method = req.params.method;
  const address = req.params.address;
  
  try {
    result = await contract.methods[method](address).call();
    return res.status(200).json({
      code: 0,
      message: 'success',
      response: result
    })
  } catch (err) {
    return res.status(400).json({
      code: 1,
      message: err.message,
    });
  }  
});



app.listen(8080, async () => {
  console.log("Express listening 8080");
});